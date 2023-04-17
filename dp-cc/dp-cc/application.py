from flask import Flask, request, jsonify
import pickle

from flask_cors import CORS, cross_origin



application = Flask(__name__)
cors = CORS(application)

@application.route('/',methods=['GET'])
@cross_origin()
def welcome():
    return "Hello MFs!!"

@application.route('/predict',methods=['POST'])
@cross_origin()
def predict():
    # payload = request.get_json()
    # params = payload['params']
    data = request.json;
    # print(data);
    params = data['arr'];
    with open('model.pkl','rb') as f:
        model = pickle.load(f)
    f.close()
    print(model)
    ans = model.predict([params])
    response = jsonify(answer=ans[0])
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__=="__main__":
    application.run(host="0.0.0.0", port="5000",debug=True)
