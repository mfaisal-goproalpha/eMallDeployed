import React, { useContext, useState } from 'react'
import './style.css'
import Admin from './Admin'
import Customer_dashboard from './Guest/Components/Customer_dashboard';
import Cookies from 'js-cookie';
//import AdminOld from './Admin-old'

import Guest from './Guest'

import { decodeToken } from 'react-jwt'
import { GlobalContext } from './Context/context'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

//server path

export const routePath = ""
export default function App() {
  const { state, dispatch } = useContext(GlobalContext)
  const url = window.location.href;
  const loginuser = [];
  var shop = '';
  var user = '';

  const shopData = Cookies.get('shop');
  const shopData_token = Cookies.get('token');
  const userData = Cookies.get('user');
  const userData_token = Cookies.get('user_token');

  //const shop = shopData ? JSON.parse(shopData) : null;
  //const user = userData ? JSON.parse(userData) : null;
  
  //Check if the values are defined
  if (shopData == null || typeof shopData == 'undefined') {
    console.log('shopData is not defined');
  } else {
    
    if (shopData_token == null) {
      console.log('Parsed shop is => ', shopData);
    }else{
      //shop = JSON.parse(shopData);
      shop = shopData_token;
      console.log('Parsed shop is not NULL => ', shop);
    }
    
  }

  if (userData_token == null) {
    console.log('userData is not defined');
  } else {
    //user = JSON.parse(userData);
    user = userData_token;
    console.log('Parsed user is => ', user);
    
  }


  if(user){
    loginuser['user'] = 'user';
  }else if(shop){
    loginuser['user'] = 'admin';
  }
  console.log('current user is => ', loginuser);
  console.log('user data is => ', userData);
  console.log('shop data is => ', shopData);
  return(
    <>

    {
      loginuser?.user == "admin"? (<Admin />):(loginuser?.user =="user"? (<Guest />):(<Guest />))
      
    }
    
    </>
  )

}
