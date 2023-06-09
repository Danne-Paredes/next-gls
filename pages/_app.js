import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

function checkIsLoggedIn() {
  return document.cookie.includes('loggedIn=true');
}

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  // useEffect(() => { 
  //   console.log(`cookie: ${document.cookie.raw}`)
    
  //   const cookieValue = document.cookie.split('; ').find(row => row.startsWith('isLoggedIn='))?.split('=')[1];

  //   console.log(`Cookies: ${cookieValue}`)
  //   const userCredentials = Cookies.getJSON('userCredentials'); 
  //   if (userCredentials) { 
  //     // Send a request to your backend API to authenticate the user 
  //     console.log(userCredentials)
  //   }
  //  }, []);
  
  useEffect(() => {
      if (!checkIsLoggedIn) {
        
        console.log('login')
        router.push('/login');
    } else {
      
      setIsLoggedIn(true);
      
    }
  }, []);
  return <Component {...pageProps} />
}
