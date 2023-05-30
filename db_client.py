import boto3
import json
import pandas as pd
import io

mapping_dict = {"ParentRelation": {"easily communicates",
                                 "communicate well",
                                 "communicate",
                                 "child has a problem",
                                 "people in my life who care",
                                 "family wants me around",
                                 "family changes"
                                 },
               "SchoolPerformance": {"school regularly",
                                     "behavior in school",
                                     "grades"
                                     },
               "Feedback": {"support for parents/caregivers",
                            "child has benefited overall",
                            "recommend rainbows",
                            "tell other kids", 
                            "rainbows experience"},
               "GroupPerformance": {"group"},
               "PersonalBehavior": {"ability",
                                    "happy",
                                    "anxiety",
                                    "self-esteem",
                                    "anger",
                                    "confident",
                                    "destructive",
                                    "behavior at home",
                                    "gang",
                                    "alcohol",
                                    "drugs",
                                    "prescription",
                                    "solve a problem",
                                    "seek out",
                                    "it helps",
                                    "i can share",
                                    "i know healthy",
                                    "stress-free",
                                    "hurting myself",
                                    "am confident",
                                    "helping others",
                                    "positive",
                                    "i am happy",
                                    "i feel loved",
                                    "i am proud of who i am",
                                    "have gifts",
                                    "happened",
                                    "easy",
                                    "having friends",
                                    "have friends",
                                    "hurting others",
                                    "not my job",
                                    "trust",
                                    "fight", 
                                    "what is true",
                                    "ask for help", 
                                    "angry/stressed",
                                    "can tell someone", 
                                    "go through hard times"
                                    }}

num_mapping = {"1", "2", "3", "4", "5"}

nan_val = float("nan")

def add_to_dynamo_db(tablename, csv_string):
    try:
        # Initialize the DynamoDB resource
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        table = dynamodb.Table(tablename)

        # get data to add
        items = split_qs(csv_string)

        with table.batch_writer() as batch:
            for item in items:
                batch.put_item(Item=item)

        response = {
            'statusCode': 200,
            'body': json.dumps(f'data added for {tablename}')
        }

    except Exception as e:
        print(e)
        response = {
            'statusCode': 500,
            'body': json.dumps(f'an error occurred with {tablename}')
        }

    return response

def split_qs(csv_string):
    
    csv_file = io.StringIO(csv_string)
    data = pd.read_csv(csv_file)

    cols = list(data.columns)
    #print(cols)
    classification = [None for _ in range(len(cols))]

    for outputKey in ["GroupPerformance" ,"SchoolPerformance","PersonalBehavior", "Feedback", "ParentRelation"]:
        phrases = mapping_dict[outputKey]
        for id, col in enumerate(cols):
            col = col.lower()
            for phrase in phrases:
                if phrase in col:
                    classification[id] = outputKey

    for id,col in enumerate(cols):
        col = col.lower()
        if id <= 8:
            if "id" in col:
                classification[id] = "ParticipantID"
            elif "gender" in col:
                classification[id] = "Gender"
            elif "race" in col:
                classification[id] = "RaceEthnicity"
            else:
                classification[id] = None

    items = []
    for row in data.values:
        vals = list(row)
        ind_item = {}
        for id, classif in enumerate(classification):
            if classif:
                if classif in {"GroupPerformance" ,"SchoolPerformance","PersonalBehavior", "Feedback", "ParentRelation"}:
                    found = False
                    if classif not in ind_item:
                        ind_item[classif] = {}
                    for key in num_mapping:
                        if type(vals[id]) == type("test") and key in vals[id]:
                            ind_item[classif][cols[id]] = int(key)
                            found = True
                    if not found:
                        if type(vals[id]) == type(float(1)):
                            ind_item[classif][cols[id]] = 0
                        else:
                            ind_item[classif][cols[id]] = vals[id]
                else:              
                    ind_item[classif] = vals[id]
        items.append(ind_item)

    return items