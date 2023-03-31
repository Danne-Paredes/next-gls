import '@/styles/globals.css'
import { useEffect, useState } from 'react';


function checkIsLoggedIn() {
  return document.cookie.includes('loggedIn=true');
}

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
      if (!checkIsLoggedIn) {
        console.log('login')
    } else {
      
      setIsLoggedIn(true);
      
    }
  }, []);
  return <Component {...pageProps} />
}
