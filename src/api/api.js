import { data } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

//heleper func to get token 
const getToken = () => localStorage.getItem('token')

//GET request 
export const getData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            authorization: getToken()
        }
    });
    return response.json();
};

//POST request 
export const postData = async (endpoint, body, needsAuth = false) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(needsAuth && { authorization: getToken() })
        },
        body: JSON.stringify(body)
    });
    return response.json();
};

//put rqst

export const putData = async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: getToken()
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

//delete rqst
export const deleteData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            authorization: getToken()
        }
    });
    return response.json();
};