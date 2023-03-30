import React, { useState } from "react"
import styles from '../styles/time.module.css'

const Time = (props) => {
  const [timeValues, setTimeValues] = useState("");
  const handleChange = (event)=>{
    const {name, value} = event.target
    // console.log(`name: ${name}  value: ${value}`)
    setTimeValues({ ...timeValues, [name]: value })
    // console.log(`time values name: ${name}  value: ${value}`)
    props.sendData(timeValues)
  }
  return (
    <div className={styles.timeGridContainer}>
        <input className={`${styles.item} ${styles.score}`} name='time' onChange={handleChange} placeholder='Time'/>
        <input className={`${styles.item} ${styles.mistakes}`} name='mistakes' onChange={handleChange} placeholder='Mistakes'/>
        <input className={`${styles.item} ${styles.version}`} name='version' onChange={handleChange} placeholder='Version'/>
    </div>
  )
};

export default Time;
