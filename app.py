from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

# Global variable for storing state

# query has values in [0,3] with the following mapping:
# 0 - no query yet
# 1 - fetchFromTable
# 2 - fetchChangeData
# 3 - fetchAggregateData

# result maintains the processed results from the last query

state = {'query': 0, 'result':None, 'queryString':""}

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
            state["result"] = fetch_from_table(state["queryString"])
        elif state["query"] == 2:
            # Logic for fetchChangeData query
            # Make the API call, process the data, and update the state
            state["result"] = fetch_change_data(state["queryString"])
        elif state["query"] == 3:
            # Logic for fetchAggregateData query
            # Make the API call, process the data, and update the state
            state["result"] = fetch_aggregate_data(state["queryString"])
        elif state["query"] == 4:
            # Add CSV data to the table
            state["result"] = add_to_table(state["queryString"])

        # Reset the query after processing
        # state["query"] = 0

    return render_template('index.html', initial_state=state)

@app.route('/update', methods=['POST'])
def update_state():
    data = request.get_json()
    state['query'] = data['query']
    state['queryString'] = data['queryString']
    state['result'] = None  # Reset the result to trigger re-processing
    return jsonify(success=True)

def fetch_from_table(query_string):
    #question mapping to average answer
    pass

def fetch_change_data(query_string):
    #question mapping to delta average as a percent of pre
    #delta: post average - pre average
    pass

def fetch_aggregate_data(query_string):
    #straight output
    state["result"] = make_api_call(query_string)

def add_to_table(query_string):
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