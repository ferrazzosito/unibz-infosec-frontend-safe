import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export default function useUser (email, password) {

    const [user, setUser] = useState({});

    async function log({email, password}) {

      return axios.post('/v1/users/login', {
          email: email,
          password: password
      })
      .then(response => response.json())
      .catch(e => {throw new Error("Error while logging the user: " + e.message)})
    }

    async function logUser(user) {
      const response = await log(user);
      setUser({
        accessToken : response.accessToken,
        payload: parseJwt(user.accessToken)
      })
    }

    useEffect (
      () =>  {
          logUser({email,  password})
          .catch(e => {}) //TODO: there's should be a sort of alert or smth 
      }, []
    )

    async function register({/*name, lastName, */email, password, type}) {

      return axios.post('/v1/users/register', {
          email: email,
          password: password,
          type: type
      })
      .then(response => response.json())
      .catch(e => {throw new Error("Error while registering the user: " + e.message)})
    }

    function registerUser(user) {
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
