import GoogleButton from 'react-google-button'
import { useRouter } from 'next/router';
import secret from '../credentials/client_secret.json'
import {auth, provider} from '../credentials/config'
import logo from '../public/KVLogo.png'
import { signInWithPopup } from 'firebase/auth'
import styles from '../styles/login.module.css'
import Image from 'next/image'
// import Cookies from 'js-cookie';
import { useState } from 'react';

export default function Login() {
    const [rememberMe,setRememberMe ]= useState(false);
    const router = useRouter();
    const handleClick = (event)=>{
        // Check if "Remember Me" is checked
        setRememberMe(!rememberMe)
    }

    

    const signInWithGoogle = async (event) =>{
        
        // Check if "Remember Me" is checked
        console.log(rememberMe)
        
        const result = await signInWithPopup(auth,provider);
        console.log(result);
        if (rememberMe) {
            console.log('rememmbered')
          }
        router.push('/')
      }

  return (
    <div>
      <div className={styles.logoCard}>
        <Image priority='false' className={styles.logoImage} src={logo} alt="KV Logo" />
        <p>Please login with your Knighted Account</p>
        <GoogleButton onClick={signInWithGoogle} className={styles.gButton}/>
        <input type="checkbox" onChange={handleClick} name="rememberMe" />
        <label htmlFor="rememberMe" style={{color:'#A03232'}}>Remember Me (Coming soon)</label>
      </div>
    </div>
  );
}
