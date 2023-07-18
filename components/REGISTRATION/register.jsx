"use client"
import { useState } from "react";
import styles from "./register_module.css";
import axios from "axios";


export default function REGISTER () {

    const [registerTUPCID, setregisterTUPCID] =  useState('');
    const [registerUSERNAME, setregisterUSERNAME] =  useState('');
    const [registerPASSWORD, setregisterPASSWORD] =  useState('');

    const register = () => {
        axios({
            method: "post",
            data: {
                TUPCID: registerTUPCID,
                USERNAME: registerUSERNAME,
                PASSWORD: registerPASSWORD
            },
            
            withCredentials: true, 
            url: "http://localhost:3001/register"
        }).then((res) => console.log(res))
        .catch((err) => console.log(err));
    };

    return (
        <div className={styles.reg}>
            <h1>REGISTRATION PAGE</h1>
            <p>TUPC ID</p>
            <input type="text" name="TUPCID" onChange={e => setregisterTUPCID(e.target.value)}></input>
            <p>USERNAME</p>
            <input type="text" name="username" onChange={e => setregisterUSERNAME(e.target.value)}></input>
            <div></div>
            <p>PASSWORD</p>
            <input type="password" name="password" onChange={e => setregisterPASSWORD(e.target.value)} ></input>
            <div></div>
            <p></p>
            <button onClick={register}>REGISTER</button>
            <p></p>
            <a href="/">BACK</a>

        </div>

    )

}