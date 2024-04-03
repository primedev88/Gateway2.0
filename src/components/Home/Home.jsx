import React, { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css'
import '@fontsource/inter'; // Import Inter font
import axios from 'axios';
import Node from './WifiNode/Node'
import Lora from './LoraNode/Lora';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Home = () => {
  const [wifiStatus, setWifiStatus] = useState([]);
  const [loraStatus, setLoraStatus] = useState([]);

  useInterval(() => {
    axios.get('/api/getWifiDevices')
      .then(response => {
        setWifiStatus(response.data);
        console.log(response.data.devices.length)
      })
      .catch(error => {
        console.error('Error fetching Internet status: ', error);
      });
  }, 3000);
  return (
    <div className={styles.home}>
      <div className={styles.wifibody}>
        <div className={styles.wificount}>
          Wifi Nodes : {wifiStatus.devices?.length}
        </div>
        <div className={styles.wifidevice}>
          {wifiStatus.devices?.length === 0 ? 'Try connecting a device' :
            wifiStatus.devices?.map((device, index) => (
              <Node key={index} mac={device.mac} />
            ))
          }

        </div>
      </div>
      <div className={styles.lorabody}>
        <div className={styles.loracount}>
          Lora Nodes : 0
        </div>
        <div className={styles.loradevice}>
          {/* Try connecting a device */}
          <Lora id="01"/>
          <Lora id="02"/>
          

        </div>
      </div>
    </div>
  )
}

export default Home