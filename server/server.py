from flask import Flask, request, jsonify
import util

# Make sure artifacts are loaded even in production deployments
util.load_saved_artifacts()

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to Home Price Prediction API"

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    import os
    print("Starting Python Flask Server For Home Price Prediction...")
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
