import Head from 'next/head'
import { Inter } from 'next/font/google'
import InputEngine from '@/components/input-engine'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const router = useRouter();
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [])

  const {data} = props;

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
      <InputEngine data={data}/>
    </>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roster`);
  const data = await response.json();

  return {
    props: { data },
  };
}