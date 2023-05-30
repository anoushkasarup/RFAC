from flask import Flask, jsonify, request, render_template, redirect, url_for
import requests
import db_client
import json

app = Flask(__name__)

# Global variable for storing state

# query has values in [0,3] with the following mapping:
# 0 - no query yet
# 1 - fetchFromTable
# 2 - fetchChangeData
# 3 - fetchAggregateData

# result maintains the processed results from the last query

state = {'query': 0, 'result':None, "queryDetails":{}}
base_url = 'https://4nh98bdxtj.execute-api.us-east-1.amazonaws.com/'

# TODO:
# 1. Making API calls - from where, building query, storing results
# 2. Adding CSV data (API post call)

@app.route('/')
def index():
    if state["query"] and not state["result"]:
        # Perform the necessary API call and update the result based on the query
        if state["query"] == 1:
            # Logic for fetchFromTable query
            # Make the API call, process the data, and update the state
            state["result"] = fetch_from_table(state["queryDetails"])
        elif state["query"] == 2:
            # Logic for fetchChangeData query
            # Make the API call, process the data, and update the state
            state["result"] = fetch_change_data(state["queryDetails"])
        elif state["query"] == 3:
            # Logic for fetchAggregateData query
            # Make the API call, process the data, and update the state
            state["result"] = fetch_aggregate_data(state["queryDetails"])
        elif state["query"] == 4:
            # Add CSV data to the table
            state["result"] = add_to_table(state["queryDetails"])

        # Reset the query after processing
        # state["query"] = 0

    return render_template('index.html', initial_state=state)

@app.route('/update', methods=['POST'])
def update_state():
    #example queryDetails obj
    #query_details = {
    #    "tableName":"ParticipantRainbow",
    #    "filters":{"Gender":["Male"], "RaceEthnicity":["White or Caucasian"]},
    #    "outputCol":"PersonalBehavior"
    #}
    data = request.get_json()
    state['query'] = data['query']
    state['queryDetails'] = validate_details(data['queryDetails'])
    state['result'] = None  # Reset the result to trigger re-processing
    return redirect(url_for(index))

def validate_details(query_details):
    if "tableName" not in query_details:
        query_details["tableName"] = ""
    if "filters" not in query_details:
        query_details["filters"] = {}
    if "outputCol" not in query_details:
        query_details["outputCol"] = ""
    if "category" not in query_details:
        query_details["category"] = "All"
    if "csvData" not in query_details:
        query_details["csvData"] = ""
    return query_details

def generate_query_string(fn_name, table_string, table_name,filters,output_col):
    #'https://4nh98bdxtj.execute-api.us-east-1.amazonaws.com/fetchFromTable?tableName=PostParticipantRainbow&filters={"Gender":["Male"], "RaceEthnicity": ["White or Caucasian"]}&outputCol=PersonalBehavior'
    filters = json.dumps(filters)
    return base_url + f"{fn_name}?{table_string}={table_name}&filters={filters}&outputCol={output_col}"

def fetch_averages(query_string):
    result_sums = {}
    result_counts = {}
    all_results = make_api_call(query_string)
    for ind_res in all_results:
        for k,v in ind_res.items():
            if k not in result_sums:
                result_sums[k] = 0
                result_counts[k] = 0
            result_sums[k] += v
            result_counts[k] += 1
    result = {}
    for q, s in result_sums.items():
        result[q] = round(s/result_counts[q],2)
    return result 

def fetch_from_table(query_details):
    #question mapping to average answer
    query_string = generate_query_string("fetchFromTable", "tableName", query_details["tableName"], query_details["filters"], query_details["outputCol"])
    state["result"] = fetch_averages(query_string)

def fetch_change_data(query_details):
    #question mapping to delta average as a percent of pre
    #delta: post average - pre average
    pre_query_string = generate_query_string("fetchFromTable", "tableName", "Pre" + query_details["tableName"], query_details["filters"], query_details["outputCol"])
    pre_result = fetch_averages(pre_query_string)
    post_query_string = generate_query_string("fetchFromTable", "tableName", "Post" + query_details["tableName"], query_details["filters"], query_details["outputCol"])
    post_result = fetch_averages(post_query_string)
    result = {}
    for k,v in pre_result.items():
        result[k] = round(post_result[k] - v, 2)
    state["result"] = result

def fetch_aggregate_data(query_details):
    #straight output
    query_string = generate_query_string("fetchAggregateData", "category", query_details["category"], query_details["filters"], query_details["outputCol"])
    state["result"] = make_api_call(query_string)

def add_to_table(query_details):
    #status output
    pass

def make_api_call(endpoint):
    try:
        response = requests.get(endpoint)
        response.raise_for_status()  # Raise an exception if the request was unsuccessful (status code >= 400)
        result = response.json()  # Assuming the response is in JSON format
        return result
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

if __name__ == '__main__':
    app.run()