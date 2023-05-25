import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

export function useUser () {

    const [user, setUser] = useState([]);

    async function post({name, lastName, email, password, type}) {

      //different requests depending the type | consider in case to create another hook for clients
      return axios.post('/v1/users/create', {
          name: name,
          lastName: lastName,
          email: email,
          password: password
      }).then(response => {

        // getUsers();
        return response;

      })
    }

    function addUser(user) {
      return post(user);
    }

    async function get(email, password) {
      
      const {data} = axios.post('/v1/users/login', {
        email: email,
        password: password
      }).then(response => {

        return response;

      })
    }

    function getUser(email, password) {
      get(email, password)
    }

    useEffect(getUser, []);

    return []

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
