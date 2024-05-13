import { useState } from "react";
import axios from "axios";

// custom hook for axios to use in different components
const useAxios = (baseUrl) => {
  // defining the states for data, alert and loading
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  // a function to showalert for a 5 seconds
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  // generic asynchronous method using axios for get, post , put and delete method
  // if succesful show successful message and if error show error message and stop loading
  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data);
      showAlert("Book added successfully", "success");
    } catch (err) {
      showAlert(`Error: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };
  // functions to handle get, post, put and delete request
  const get = async (endpoint) => makeRequest("get", endpoint);
  const post = async (endpoint, payload) =>
    makeRequest("post", endpoint, payload);
  const update = async (endpoint, payload) =>
    makeRequest("put", endpoint, payload);
  const remove = async (endpoint) => makeRequest("delete", endpoint);

  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
