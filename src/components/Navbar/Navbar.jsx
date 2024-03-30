// src/Navbar.jsx
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css'
import { MdOutlineSignalCellularAlt,MdOutlineSpaceDashboard ,MdOutlineSettings } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { LuDroplets } from "react-icons/lu";
import { RiSignalTowerFill } from "react-icons/ri";
import { FiDatabase } from "react-icons/fi";

const Navbar = () => {
  
  return (

    <nav className={styles.navbar}>
      <div >
        <img src="/static/favicon.ico" alt="Logo"  />
      </div>
      <div className={styles.flexGrow}>
        <div className={styles.connect}>
          <MdOutlineSignalCellularAlt style={{fontSize:'25'}}/>
        </div>
        <ul className={styles.selectul}>
          <li className={styles.selectli}>
            <Link legacyBehavior href="/" >
              <a className={styles.link}>
                <MdOutlineSpaceDashboard style={{fontSize:'26',marginTop:'3vh'}}/>
                <div style={{width:'100%', background:'white', height: '1vh', marginTop: '1.5vh'}}></div>
              </a>
            </Link>
          </li>
          <li className={styles.selectli}>
            <Link legacyBehavior href="/data">
            <a className={styles.link}>
              <FiDatabase  style={{fontSize:'24',marginTop:'3vh'}}/>
            </a>
            </Link>
          </li>
          <li className={styles.selectli}>
            <Link legacyBehavior href="/about">
            <a className={styles.link}>
              <LuDroplets style={{fontSize:'24',marginTop:'3vh'}}/>
            </a>
            </Link>
          </li>
          
        </ul>
      </div>
      <div className={styles.setting}>
        <div className={styles.hotspot}>
          <RiSignalTowerFill style={{fontSize:'23'}}/>
        </div>
        <div className={styles.setting2}>
          <MdOutlineSettings style={{fontSize:'24'}}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
