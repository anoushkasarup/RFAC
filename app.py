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
    if state["query"]: #fetch query and update result
        #front end updates query string and query int and triggers a page reload? 
        state["result"] = None #perform call and get result

    return render_template('index.html', initial_state=state)

if __name__ == '__main__':
    app.run()