from flask import Flask, jsonify, request, render_template

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
    if state["query"]:
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

        # Reset the query after processing
        state["query"] = 0

    return render_template('index.html', initial_state=state)

if __name__ == '__main__':
    app.run()