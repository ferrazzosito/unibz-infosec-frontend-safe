import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios';
import jwt_decode from "jwt-decode";

export default function useUser () {

    const [user, setUser] = useState({});

    async function log(email, password) {

      
      let data = {
        "email": email,
        "password": password
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };

      // return 
      // axios.post('/auth/login', {
      //     email: email,
      //     password: password
      // })
      return axios.request(config)
      .then(response => response.data)
      .catch(e => {throw new Error("Error while registering the user: " + e.message)})
    }

    function logUser(email, password) {
      log(email, password)
      .then(response => {
        setUser({
          accessToken : response.accessToken,
          payload: jwt_decode(response.accessToken)
        })
      })
    }

    // useEffect (
    //   () =>  {
    //       logUser({email,  password})
    //       .catch(e => {}) //TODO: there's should be a sort of alert or smth 
    //   }, []
    // )

    async function register({/*name, lastName, */email, password, type}) {

      return axios.post('/auth/register', {
          email: email,
          password: password,
          type: type
      })
      .then(response => response.json())
      .catch(e => {throw new Error("Error while registering the user: " + e.message)})
    }

    function registerUser({/*name, lastName, */email, password, type}) {
      const response = register(user);
    }

    // async function get(email, password) {
      
    //   const {data} = axios.post('/v1/users/login', {
    //     email: email,
    //     password: password
    //   }).then(response => {

    //     return response;

    //   })
    // }

    // function getUser(email, password) {
    //   get(email, password)
    // }

    // useEffect(getUser, []);

    return [user, logUser, registerUser]

    // useEffect(getPlaces, []);

    //riflettere on how to handle login with the hook
    //magari ne handlo solo uno

    // async function get() {
    //   const { data } = await axios.get('/v1/users/getAll');
    //   setPlaces(data);  
    // }

    // function getPlaces() {
    //   get()
    // }

    // useEffect(getPlaces, []);
    
    // return [places, setPlace];
}
