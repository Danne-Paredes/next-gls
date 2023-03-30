import logo from '../public/KVLogo.png'
import Time from './time';
import Image from 'next/image'
import styles from '../styles/input-engine.module.css'
import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


export const InputEngine = () => {
    const uuid = uuidv4();
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


    const [inputValues, setInputValues] = useState({
        uuid: uuid,
        timestamp: timestamp.toString(),
        ein: 'test',
        associate: '',
        casino: '',
        event: '',
        game : '',
        date: ' ',
        trainer: '',
        time: '',
        mistakes: '',
        version: '',
        notes: '',
        next_step: ''
    });

    // console.logs what would be submit on update
    useEffect(() => {
        console.log(inputValues);
    }, [inputValues]);
    // on load
    useEffect(() => {
        setDateValue(today.toISOString().substr(0, 10))
    }, []);

    const handleChange = (event)=>{
        const {name, value} = event.target
        // console.log(`name: ${name}  value: ${value}`)
        setInputValues({ ...inputValues, [name]: value })
        if (name == 'date') {setDateValue(value)}
        // console.log(inputValues)
    }
      const handleTimeData = (data)=>{
        for (let key in data) {
          console.log(key + ': ' + data[key]);
          setInputValues({ ...inputValues, [key]: data[key] })
        //   console.log(inputValues)
        }
    }
    // const handleSubmit = ()=>{
    //     console.log(inputValues)
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send a POST request to the insert-row API route
        await fetch('http://localhost:3000/api/sendData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({  ...inputValues }),
        });
    
        // // Reset the form
        // setName('');
        // setEmail('');
      };

    return (
        <div className={styles.background}>
          <form onSubmit={handleSubmit} className={styles.gridContainer}>
            <div className={styles.logo}><Image priority='false' className={styles.logoImage} src={logo} alt="KV Logo" /></div>
            <input className={`${styles.item} ${styles.associate}`} name='associate' placeholder='Associate' list="associates" onChange={handleChange} tabIndex="2" />
              <datalist id="associates">
                  <option value="associate-1">associate-1</option>
                  <option value="associate-2">associate-2</option>
                  <option value="associate-3">associate-3</option>
              </datalist>
            <input className={`${styles.item} ${styles.casino}`} name='casino' onChange={handleChange} placeholder='Casino' list="casino" tabIndex="1"/>
              <datalist id="casino">
                  <option value="casino-1">casino-1</option>
                  <option value="casino-2">casino-2</option>
                  <option value="casino-3">casino-3</option>
              </datalist>
            <input className={`${styles.item} ${styles.event}`} name='event' onChange={handleChange} placeholder='Event'  list="event" />
              <datalist id="event">
                  <option value="event-1">event-1</option>
                  <option value="event-2">event-2</option>
                  <option value="event-3">event-3</option>
              </datalist>
            <input className={`${styles.item} ${styles.game}`} name='game' onChange={handleChange} placeholder='Game' list="games"/>
              <datalist id="games">
                  <option value="game-1">game-1</option>
                  <option value="game-2">game-2</option>
                  <option value="game-3">game-3</option>
              </datalist>
            <input className={`${styles.item} ${styles.date}`} name="date" type='date' value={dateValue || today.toISOString().substr(0, 10)} onChange={handleChange}/>
    
            {/* use below example to grab value */}
            {/* <input className="item date" onChange={e=>console.log(e.target.value)} type='date'/> */}
            <input className={`${styles.item} ${styles.trainer}`} name='trainer' onChange={handleChange} placeholder='Trainer' list="trainers"/>
              <datalist id="trainers">
                  <option value="trainer-1">trainer-1</option>
                  <option value="trainer-2">trainer-2</option>
                  <option value="trainer-3">trainer-3</option>
              </datalist>
            <Time className={`${styles.item} ${styles.time}`} sendData={handleTimeData}/>
            <textarea className={`${styles.item} ${styles.notes}`} name='notes' onChange={handleChange} placeholder='Notes'/>
            <input className={`${styles.item} ${styles.next_step}`} name='next_step' onChange={handleChange} placeholder='Next Step'/>
            <input type="submit" className={`${styles.item} ${styles.submit}`} />
            <input type="button"  value={'clear'} className={`${styles.item} ${styles.clear}`}/>
          </form>
        </div>
      )
}

export default InputEngine;