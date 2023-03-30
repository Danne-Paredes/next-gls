import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import InputEngine from '@/components/input-engine'
// import { getStaticProps } from 'next';



const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const {data} = props;
  // console.log(data)
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
      <InputEngine data={data}/>
    </>
  )
}
export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/roster');
  const data = await response.json();
  return { props: { data } };
}