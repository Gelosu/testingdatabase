"use client"
import styles from './userpage_module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function UserPage() {
  const [USERNAME, setUSERNAME] = useState('');

  useEffect(() => {
    userpage();
  }, []);

  const userpage = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:3001/userpage'
    })
      .then((res) => {
        if (res.data.USERNAME) {
          setUSERNAME(res.data.USERNAME);
        } else {
          console.log('Username not found');
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.log}>
      <h1>USER PAGE</h1>
      <h2>WELCOME TO THIS PAGE...</h2>
      <h3>USERNAME: {USERNAME}</h3>
      <a href="/">Logout</a>

      
    </div>
  );
}
