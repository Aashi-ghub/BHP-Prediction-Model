 Bangalore Home Price Estimator

## Overview

**Bangalore Home Price Estimator** is an AI-powered web application that delivers accurate property price predictions across various localities in Bangalore. Developed as part of an internal internship project, this tool leverages advanced machine learning algorithms to analyze thousands of real estate listings and provide reliable price estimates based on user inputs such as area, number of bedrooms, bathrooms, and location.

Built with production readiness in mind, this project secured a position in the top 1% of submissions during the internship, demonstrating strong skills in data science, model building, backend API development, and frontend integration.

---
![App Screenshot](screenshot.jpeg)

## Features

* **Accurate Price Prediction:** Utilizes a trained Linear Regression model to estimate home prices in Bangalore.
* **Dynamic Location Selection:** Supports multiple Bangalore localities with one-hot encoded input features.
* **Interactive UI:** User-friendly interface built with React.js for seamless experience.
* **REST API Backend:** Flask-based server handling prediction requests securely and efficiently.
* **Cross-Origin Support:** CORS enabled for smooth frontend-backend communication.
* **Production Deployment:** Hosted live on Vercel and Render platforms ensuring availability and scalability.

---

## Technologies Used

* **Data Science:** Python, Pandas, NumPy, Scikit-learn (Linear Regression)
* **Backend:** Python, Flask, Gunicorn
* **Frontend:** React.js, Tailwind CSS
* **Deployment:** Vercel (Frontend), Render (Backend)
* **Version Control:** Git, GitHub

---

## Project Structure

```
Bangalore-Home-Price-Estimator/
├── artifacts/
│   ├── banglore_home_prices_model_pickle  # Serialized ML model
│   └── columns.json                        # Feature columns used in training
├── server.py                              # Flask API server
├── util.py                                # Utility functions for loading artifacts & prediction logic
├── frontend/                              # React frontend application
│   ├── src/
│   └── public/
├── README.md
└── requirements.txt
```

---

## Getting Started

### Prerequisites

* Python 3.8+
* Node.js 14+
* pip or conda package manager

### Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Aashi-ghub/Bangalore-Home-Price-Estimator.git
   cd Bangalore-Home-Price-Estimator
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask backend server:

   ```bash
   python server.py
   ```

4. Navigate to the `frontend` folder, install frontend dependencies, and start React app:

   ```bash
   cd frontend
   npm install
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to use the app.

---

## How It Works

1. **Data Preparation & Model Training:**
   Collected and cleaned housing data from Bangalore real estate listings. Feature engineering was performed by encoding categorical locations and standardizing numerical inputs (sqft, BHK, bathrooms). A Linear Regression model was trained to predict prices based on these features.

2. **Model Serialization:**
   The trained model and feature columns were serialized using `pickle` and saved as artifacts (`.pkl` and `.json` files).

3. **Backend API Development:**
   Developed a Flask server exposing endpoints:

   * `/get_location_names` - returns list of locations for the frontend dropdown.
   * `/predict_home_price` - accepts user input via POST, processes inputs, and returns the predicted price.

4. **Frontend Integration:**
   Built a React UI for user input and display of price estimates. The frontend consumes backend API endpoints asynchronously, handling user interactions smoothly.

5. **Deployment:**
   Backend deployed on Render with Gunicorn server, frontend deployed on Vercel, enabling reliable, scalable, and accessible application hosting.

---

## Challenges & Learnings

* Handling missing location features gracefully in prediction.
* Cross-origin resource sharing (CORS) setup for frontend-backend communication.
* Model feature mapping and consistent preprocessing between training and inference.
* Production deployment of both backend and frontend components.

---

## Future Improvements

* Expand dataset with more property features for better accuracy.
* Experiment with advanced models like Gradient Boosting or Neural Networks.
* Add user authentication and save favorite predictions.
* Provide price trend analytics and neighborhood insights.

---

## Acknowledgements

* Special thanks to the internship mentors and data science community for guidance and support.
* Inspired by real estate market trends and AI-powered prediction tools.

---


## Contact

For questions, suggestions, or collaboration, reach out at:
**Aashi** – [GitHub](https://github.com/Aashi-ghub) | [aashi.email@example.com](mailto:aashi.email@example.com)

---

---

If you want, I can help you customize this further, add screenshots or deployment instructions, or make a project report doc based on this. What do you think?
