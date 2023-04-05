import GoogleButton from 'react-google-button'
import { useRouter } from 'next/router';
import {auth, provider} from '../credentials/config'
import logo from '../public/KVLogo.png'
import { signInWithPopup } from 'firebase/auth'
import styles from '../styles/login.module.css'
import Image from 'next/image'

const Login = () => {
    const router = useRouter();
    const signInWithGoogle = async (event) =>{
        const result = await signInWithPopup(auth,provider);
        sessionStorage.setItem('token', result);
        router.push('/')
      }

  return (
    <div>
      <div className={styles.logoCard}>
        <Image priority='false' className={styles.logoImage} src={logo} alt="KV Logo" />
        <p>Please login with your Knighted Account</p>
        <GoogleButton onClick={signInWithGoogle} className={styles.gButton}/>
      </div>
    </div>
  );
}

export default Login