import React from 'react'
import styles from './Data.module.css'
import { FiDownload } from "react-icons/fi";
import '@fontsource/inter'; // Import Inter font

const Data = () => {
  return (
    <div className={styles.data}>
      <div className={styles.table}> No Data availaible</div>
      <div className={styles.export}>
        <p></p>
        <div className={styles.button}>
          
          <FiDownload style={{fontSize: '22'}}/>
        </div>
      </div>
    </div>
  )
}

export default Data