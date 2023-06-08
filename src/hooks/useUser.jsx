import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import * as React from "react";
import store from 'store';

/**
 * This context keeps the user object and makes it available for every component 
 */
export const authContext = React.createContext();

/**
 * This custom hook handles everything that concerns the users
 */
export function useUser(token = null) {

    const [user, setUser] = useState(undefined);
    const cookies = new Cookies();
    
    /**
     * Get the user jwt token from the local storage to resume the session
     */
    const retrieveFromStore = () => {
      
      const userStore = store.get('user');

      if(userStore) {
        setUser(userStore)
      }

    }

    useEffect (retrieveFromStore, [])

    useEffect (() => {
      
      if(user !== undefined){
        store.set('user', user);// da rimuove nella parte secure
        cookies.set('jwt', user.accessToken, { path: '/' }); 
      }

    }, [user])

    
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

      return axios.request(config)
      .then(response => response.data)
      .catch(e => {throw new Error(e.message)})
    }

    /**
     * Allows to log the user in through email and password
     */
    async function logUser(email, password) {
      return await log(email, password)
      .then( response => {
        
        setUser({
          accessToken : response.accessToken,
          payload: jwt_decode(response.accessToken)
        });

        return {payload: jwt_decode(response.accessToken)};
  
      }).catch(e => {throw new Error("Error while loggin the user: " + e.message)})
    }

    async function register({email, role, password }) {

      let data = {
        "email": email,
        "password": password,
        "role" : role
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/auth/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => JSON.stringify(response.data))
      .catch(e => {throw new Error("Error while registering the user: " + e.message)})
    }

    /**
     * Allows to sign up the user through email and password
     */
    async function registerUser({/*name, lastName, */email, role, password /*, type*/}) {
      return await register({email, role, password});
    }

    function logout () {
      setUser({});
    }

    async function findAUser(id) {
      console.log(user.accessToken);
      return await axios.get(`/v1/users/${id}`, { withCredentials: true });
    }

    /**
     * Allows to get user informatino through their id
     */
    async function findUser(id) {
        return await findAUser(id)
        .then(({data}) => data)
        .catch((e) => {throw new Error(e.message)});
    }

    /**
     * Allows to top up the user balance of a certain amount
     */
    async function topUp(amount) {
      return await axios.post(`/v1/users/topup`, {
        balanceIncrease: amount
      }, {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': jwt_decode(token).csrf
        }
      }).then(({data}) => data).catch(err => {
        throw new Error(err.message);
      });
    }

    return {user, logUser, registerUser, logout, findUser, topUp};

}