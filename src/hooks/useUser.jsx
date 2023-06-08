import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import * as React from "react";
import store from 'store';

export const authContext = React.createContext();

export function useUser(token = null) {

    const [user, setUser] = useState(undefined);
    const cookies = new Cookies();
    

    const retrieveFromStore = () => {
      
      const userStore = store.get('user');

      if(userStore) {
        setUser(userStore)
      }

    }

    useEffect (retrieveFromStore, [])

    useEffect (() => {
      
      if(user !== undefined){
        store.set('user', user);
        cookies.set('jwt', user.accessToken, { path: '/' }); // da rimuove nella parte secure
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
      .catch(e => {throw new Error("Error while registering the user: " + e.message)})
    }

    async function logUser(email, password) {
      return await log(email, password)
      .then(async response => {
        
        setUser({
          accessToken : response.accessToken,
          payload: jwt_decode(response.accessToken)
        });

        return {payload: jwt_decode(response.accessToken)};
  
      })
    }

    async function register({/*name, lastName, */email, role, password /*, type*/ }) {

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

    async function registerUser({/*name, lastName, */email, role, password /*, type*/}) {
      return await register({email, role, password});
    }

    function logout () {
      setUser({});
    }

    async function findAUser(id) {
      console.log(user.accessToken);
      return await axios.get(`/v1/users/${id}`, { headers: {"Authorization" : `Bearer ${user.accessToken}`} });
    }

    async function findUser(id) {
        return await findAUser(id)
        .then(({data}) => data)
        .catch((e) => {throw new Error(e.message)});
    }

    async function topUp(amount) {
      return await axios.post(`/v1/users/topup`, {
        balanceIncrease: amount
      }, {
        headers: {
          Authorization: `Bearer ${token || user.accessToken}`
        }
      }).then(({data}) => data).catch(err => {
        throw new Error(err.message);
      });
    }

    function reload() {
      retrieveFromStore();
    }

    return {user, logUser, registerUser, logout/*, reload*/, findUser, topUp};

}