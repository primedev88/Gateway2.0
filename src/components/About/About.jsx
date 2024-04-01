import React from 'react'
import styles from './About.module.css'
import '@fontsource/inter'; // Import Inter font

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.manual}>
        <div className={styles.text}>
          <h4>User Manual :</h4>
          <p>The WiFi LoRa gateway serves as a bridge between LoRaWAN devices and the internet.
            With its integrated WiFi module, it connects to your local network effortlessly. Simply power
            it up and configure network settings via a user-friendly interface. Its LoRa capabilities enable
            long-range communication with LoRa devices, extending coverage for IoT applications.</p>
          <p>
            The gateway efficiently manages data transmission, ensuring reliability and security. Its
            compact design allows for versatile placement, and its robust build ensures durability.
            xperience seamless integration and expanded connectivity for your IoT projects with the
            WiFi LoRa gateway. For detailed setup instructions, refer to the accompanying user manual.
            
          </p>
          <p>
            For more about us you can visit our official website: <a href="https://mantiswave.in/" target="_blank">mantiswave.in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default About