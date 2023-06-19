from flask import Flask, jsonify, request, render_template, redirect, url_for
import requests
import backend.db_client as db_client
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

@app.route('/', methods=["GET"])
def index():
    if state["query"] and state["result"] is None:
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

    return jsonify(state["result"])

@app.route('/update', methods=['POST'])
def update_state():
    #example queryDetails obj
    #query_details = {
    #    "csvData": ""
    #    "filters":{"Gender":["Male"], "RaceEthnicity":["White or Caucasian"]},
    #    "outputCol":"PersonalBehavior",
    #    "category": "Rainbow", 
    #    "time": ["Pre", "Post"],
    #    "person": ["Participant", "Parent"]
    #}
    data = request.get_json()

    #set state['query']
    #state['query'] = data['query']
    if data["time"] == ["Change"] and data["outputCol"] != "Aggregate":
        state["query"] = 2
    elif data["outputCol"] == "Aggregate":
        state["query"] = 3
    else:
        state["query"] = 1
    
    
    query_details = {}
    query_details["category"] = data["category"] 
    query_details["filters"] = data["filters"]
    query_details["outputCol"] = data["outputCol"]
    query_details["tableName"] = data["time"] + data["person"] + data["category"]
    state['queryDetails'] = query_details
    state['result'] = None  # Reset the result to trigger re-processing
    return 

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
    if db_client.add_to_dynamo_db(query_details["tableName"], query_details["csv_string"]):
        state["result"] = True
    else:
        state["result"] = False


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