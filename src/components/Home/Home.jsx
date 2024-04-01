import React from 'react'
import styles from './Home.module.css'
import '@fontsource/inter'; // Import Inter font

const Home = () => {
  
  return (
    <div className={styles.home}>
      <div className={styles.wifibody}>
        <div className={styles.wificount}>
          Wifi Nodes : 0
        </div>
        <div className={styles.wifidevice}>
          Try connecting a device
        </div>
      </div>
      <div className={styles.lorabody}>
        <div className={styles.loracount}>
          Lora Nodes : 0
        </div>
        <div className={styles.loradevice}>
          Try connecting a device
        </div>
      </div>
    </div>
  )
}

export default Home