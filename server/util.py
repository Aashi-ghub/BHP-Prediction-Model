import json
import pickle
import sys
import sklearn.linear_model
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1  # Location not found

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0], 2)

def get_location_names():
    global __locations
    if __locations is None:
        load_saved_artifacts()
    return __locations or []

def load_saved_artifacts():
    print("Loading server artifacts...start")
    global __data_columns
    global __locations
    global __model

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = [col.lower() for col in json.load(f)['data_columns']]
        __locations = __data_columns[3:]

    sys.modules['sklearn.linear_model.base'] = sklearn.linear_model

    if not hasattr(sklearn.linear_model.LinearRegression, 'positive'):
        sklearn.linear_model.LinearRegression.positive = False

    with open("./artifacts/banglore_home_prices_model_pickle", 'rb') as f:
        __model = pickle.load(f)
    print("Loading server artifacts..done")

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st phase jp nagar', 1000, 2, 2))
    print(get_estimated_price('indira nagar', 1000, 2, 2))
    print(get_estimated_price('indira nagar', 1000, 3, 3))
    print(get_estimated_price('indira nagar', 1000, 4, 4))