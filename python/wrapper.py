from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/process', methods=['POST'])
def process_request():
    prompt = request.get_json()
    response = process_prompt(prompt)

    return jsonify(response)

def process_prompt(data):
    # Api call and get the data to return 

    return {
        'message': 'Response generated successfully',
        'data': data  # Replace 'data' with the actual processed data
    }

if __name__ == '__main__':
    app.run()
