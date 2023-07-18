"use client"
import { useState } from 'react';
import styles from './login_module.css';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loginTUPCID, setLoginTUPCID] = useState('');
  const [loginPASSWORD, setLoginPASSWORD] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    axios({
      method: 'post',
      data: {
        TUPCID: loginTUPCID,
        PASSWORD: loginPASSWORD
      },
      withCredentials: true,
      url: 'http://localhost:3001/login'
    })
      .then((res) => {
        if (res.data === 'NO USER EXISTING') {
          console.log('No user exists');
        } else if (res.data === 'USER LOGIN') {
          console.log('User logged in successfully');
          router.push('/userpage');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.log}>
      <h1>LOGIN PAGE</h1>
      <p>TUPC ID</p>
      <input
        type="text"
        name="TUPCID"
        onChange={(e) => setLoginTUPCID(e.target.value)}
      />
      <p>PASSWORD</p>
      <input
        type="password"
        name="password"
        onChange={(e) => setLoginPASSWORD(e.target.value)}
      />
      <div></div>
      <p></p>
      <button onClick={handleLogin}>LOGIN</button>
      <p></p>
      <Link href="/">BACK</Link>
    </div>
  );
}
