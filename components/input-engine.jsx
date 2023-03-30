import logo from '../public/KVLogo.png'
import Time from './time';
import Image from 'next/image'
import styles from '../styles/input-engine.module.css'
import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDocs, collection} from 'firebase/firestore'
import db from '../credentials/config'
// import secret from '../credentials/client_secret.json'



export const InputEngine = (props) => {
    // Data from roster API and creates list filtered for trainers
    const {data} = props;
    const [names, setNames] = useState(data);
    const [trainers, setTrainers] = useState(data.filter((row)=> row['isTrainer'] == true));


    // pulls settings from data_validation collection in FireStore
    
    const [casinos, setCasinos] = useState([]);
    const [events, setEvents] = useState([]);
    const [active_games, setActiveGames] = useState([]);
    const [csa_games, setCSAGames] = useState([]);
    const [pa_games, setPAGames] = useState([]);
    const [games, setGames] = useState([]);
    useEffect(() => {
        async function fetchData() {
          // Get a reference to the collection
          const collectionRef = collection(db, 'gls');
    
          // Fetch data from the collection
          const querySnapshot = await getDocs(collectionRef);
    
          // Extract the data from each document in the collection
          const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          // Set the state with the extracted data
          setCasinos(documents[0].casinos);
          setEvents(documents[0].events);
          setGames(documents[0].active_games);
          setActiveGames(documents[0].active_games);
          setCSAGames(documents[0].csa_games);
          setPAGames(documents[0].pa_games);

        }
        fetchData();
    }, []);
    
    



    // generates UUID
    const uuid = uuidv4();

    // Sets up date and timestamp
    const [dateValue, setDateValue] = useState("");
    const now = new Date();
    const timestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
    );
    const today = new Date();
    const offset = today.getTimezoneOffset();
    today.setTime(today.getTime() - offset * 60 * 1000); // adjust for time zone offset

    // form data to be submit
    const [inputValues, setInputValues] = useState({
        uuid: uuid,
        timestamp: timestamp.toString(),
        ein: '',
        associate: '',
        casino: '',
        event: '',
        game : '',
        date: dateValue,
        trainer: '',
        time: '',
        mistakes: '',
        version: '',
        notes: '',
        next_step: ''
    });


    // // logs what would be submit on update
    useEffect(() => {
        console.log(inputValues);
    }, [inputValues]);
    // on load
    useEffect(() => {
        setDateValue(today.toISOString().substr(0, 10))
        setInputValues({...inputValues,['date']:today.toISOString().substr(0, 10)})
    }, []);

    // When the form is updated..
    const handleChange = (event)=>{
        // updates inputValues with the current information
        const {name, value} = event.target
        console.log(`Name: ${name} Value: ${value}`)
        setInputValues({ ...inputValues, [name]: value })

        // keeps date value up to date
        if (name == 'date') {setDateValue(value)}

        // filters name and trainer list by selected casino
        if (name == 'casino') {
            setNames(data.filter((row)=> row['casino'] == value))
            setTrainers(data.filter((row)=> row['casino'] == value && row['isTrainer'] == true))
        }

        // sets ein
        if (name == 'associate') {
            const selectedOption = data.find((option) => option.name === value);
            try{setInputValues({...inputValues, ['ein']: selectedOption.ein})}catch(e){}
            }
        // updates games list by selected event
        if (name == 'event' && (value == 'Procedural Assessment' || value == 'Gold Belt - PA')) {setGames(pa_games)} else {setGames(active_games)}
        if (name == 'event' && (value == 'Card Speed Assessment' || value == 'Gold Belt - CSA')) {setGames(csa_games)} else {setGames(active_games)}
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputValues)
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     // Send a POST request to the insert-row API route
    //     await fetch('http://localhost:3000/api/sendData', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({  ...inputValues }),
    //     });
    
    //     // // Reset the form
    //     // setName('');
    //     // setEmail('');
    //   };

    const clear = (event) => {
        event.target.value = "";
    };

    return (
        <div className={styles.background}>
          <form onSubmit={handleSubmit} className={styles.gridContainer}>
            <div className={styles.logo}><Image priority='false' className={styles.logoImage} src={logo} alt="KV Logo" /></div>
            <input className={`${styles.item} ${styles.associate}`} name='associate' placeholder='Associate' list="associates" onChange={handleChange} tabIndex="2"  onClick={clear}/>
              <datalist id="associates">
                {
                    names.map((row) => {return <option key={row.ein} value={row.name} label={row.name}></option>})
                }
              </datalist>
            <input className={`${styles.item} ${styles.casino}`} name='casino' onChange={handleChange} placeholder='Casino' list="casino" tabIndex="1"  onClick={clear}/>
              <datalist id="casino">
                {
                    casinos.map((row) => {return <option key={row} value={row} label={row}></option>})
                }
              </datalist>
            <input className={`${styles.item} ${styles.event}`} name='event' onChange={handleChange} placeholder='Event'  list="event"  onClick={clear} />
              <datalist id="event">
                {
                    events.map((row) => {return <option key={row} value={row} label={row}></option>})
                }
              </datalist>
            <input className={`${styles.item} ${styles.game}`} name='game' onChange={handleChange} placeholder='Game' list="games"  onClick={clear}/>
              <datalist id="games">
                {
                    games.map((row) => {return <option key={row} value={row} label={row}></option>})
                }
              </datalist>
            <input className={`${styles.item} ${styles.date}`} name="date" type='date' value={dateValue || today.toISOString().substr(0, 10)} onChange={handleChange}/>
            <input className={`${styles.item} ${styles.trainer}`} name='trainer' onChange={handleChange} placeholder='Trainer' list="trainers"  onClick={clear}/>
              <datalist id="trainers">
                {
                    trainers.map((row) => {return <option key={row.ein} value={row.name} label={row.name}></option>})
                }
              </datalist>
            <input className={`${styles.item} ${styles.score}`} name='time' onChange={handleChange} placeholder='Time' />
            <input className={`${styles.item} ${styles.mistakes}`} name='mistakes' onChange={handleChange} placeholder='Mistakes'/>
            <input className={`${styles.item} ${styles.version}`} name='version' onChange={handleChange} placeholder='Version'/>
            <textarea className={`${styles.item} ${styles.notes}`} name='notes' onChange={handleChange} placeholder='Notes'/>
            <input className={`${styles.item} ${styles.next_step}`} name='next_step' onChange={handleChange} placeholder='Next Step'/>
            <input type="submit" className={`${styles.item} ${styles.submit}`} />
            <input type="button"  value={'clear'} className={`${styles.item} ${styles.clear}`}/>
          </form>
        </div>
      )
}

export async function getStaticProps() {
    const response = await fetch('http://localhost:3000/api/roster');
    const data = await response.json();
    return { props: { data } };
  }

export default InputEngine;