import requests
import json
import pprint

base_url = 'https://4nh98bdxtj.execute-api.us-east-1.amazonaws.com/'

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


def fetch_aggregate_data(query_details):
    #straight output
    query_string = generate_query_string("fetchAggregateData", "category", query_details["category"], query_details["filters"], query_details["outputCol"])
    return make_api_call(query_string)

def fetch_from_table(query_details):
    #question mapping to average answer
    query_string = generate_query_string("fetchFromTable", "tableName", query_details["tableName"], query_details["filters"], query_details["outputCol"])
    return fetch_averages(query_string)

def fetch_change_data(query_details):
    #question mapping to delta average as a percent of pre
    #delta: post average - pre average
    pre_query_string = generate_query_string("fetchFromTable", "tableName", "Pre" + query_details["tableName"], query_details["filters"], query_details["outputCol"])
    pre_result = fetch_averages(pre_query_string)
    #print(pre_result)
    post_query_string = generate_query_string("fetchFromTable", "tableName", "Post" + query_details["tableName"], query_details["filters"], query_details["outputCol"])
    post_result = fetch_averages(post_query_string)
    #print(post_result)
    #input()
    result = {}
    for k,v in pre_result.items():
        result[k] = round(post_result[k] - v,2)
    return result

def make_api_call(endpoint):
    try:
        response = requests.get(endpoint)
        response.raise_for_status()  # Raise an exception if the request was unsuccessful (status code >= 400)
        result = response.json()  # Assuming the response is in JSON format
        return result
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

query_details = {
    "category":"Spectrum",
    "filters":{"Gender":["Female"]},
    "outputCol":"RaceEthnicity"
}
query = 'https://4nh98bdxtj.execute-api.us-east-1.amazonaws.com/fetchFromTable?tableName=PostParticipantRainbow&filters={"Gender":["Male"], "RaceEthnicity": ["White or Caucasian"]}&outputCol=PersonalBehavior'
pprint.pprint(fetch_aggregate_data(query_details))

