from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Global variable for storing state
state = {'query': 0, 'result':None}

@app.route('/')
def index():
    return render_template('index.html', initial_state=state)

if __name__ == '__main__':
    app.run()