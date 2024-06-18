// Import necessary modules
import React from 'react'; // Import core React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for interacting with the DOM
import './index.css'; // Import the main stylesheet for the application
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Import a function for web performance reporting (optional)

// Create a root using ReactDOM and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <App /> 
  </React.StrictMode>
);

// Call the reportWebVitals function (optional)
reportWebVitals(); 
