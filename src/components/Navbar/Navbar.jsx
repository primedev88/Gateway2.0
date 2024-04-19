// src/Navbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css'
import { MdOutlinePhotoCamera,MdOutlineSignalCellularAlt, MdOutlineSpaceDashboard, MdOutlineSettings } from "react-icons/md";
import { BsDeviceSsd ,BsFillDeviceSsdFill} from "react-icons/bs";
import Credential from "./Credential/Credential.jsx";
import { LuDroplets } from "react-icons/lu";
import { RiSignalTowerFill } from "react-icons/ri";
import { FiDatabase } from "react-icons/fi";
import axios from 'axios';

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

const Navbar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingToggle,setIsLoadingToggle] = useState(false);
  const [isHotspotOn, setIsHotspotOn] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLora, setLora] = useState(false);
  const ip = "http://localhost:6020";

  
  useEffect(() => {
    // Check if localStorage is available before using it
    if (typeof window !== 'undefined') {
      const storedIsHotspotOn = sessionStorage.getItem('isHotspotOn');
      setIsHotspotOn(storedIsHotspotOn ? JSON.parse(storedIsHotspotOn) : false);

      const storedIsConnected = sessionStorage.getItem('isConnected');
      setIsConnected(storedIsConnected ? JSON.parse(storedIsConnected) : false);
    }
  }, []);

  useEffect(() => {
    // Check if localStorage is available before using it
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isHotspotOn', JSON.stringify(isHotspotOn));
    }
  }, [isHotspotOn]);

  useEffect(() => {
    // Check if localStorage is available before using it
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isConnected', JSON.stringify(isConnected));
    }
  }, [isConnected]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useInterval(() => {
    axios.get('/api/getNetStatus')
    .then(response => {
      setIsConnected(response.data.isConnected);
      console.log(response.data.isConnected)
    })
    .catch(error => {
      console.error('Error fetching Internet status: ', error);
    });
  }, 3000);

  const isActiveLink = (href) =>{
    return router.pathname ===href;
  }

  const handleFormSubmit = (ssid, password) => {
     setIsLoading(true);

      axios.post(`${ip}/api/update-credentials`, {
        ssid: ssid,
        password: password
      }, {
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then((response) => {
        console.log("Success:", response.data);
        if(response.data.result){
          setIsHotspotOn(!isHotspotOn)
        }
        setModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        // Reset loading state to false when request is completed (whether success or failure)
        setIsLoading(false);
      });
  };
  const toggleHotspot = () => {
    setIsLoadingToggle(true);
    axios.post(`${ip}/api/toggle-hotspot`,{
      isHotspotOn: !isHotspotOn
    },{
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response)=>{
      console.log("Success:", response.data);
      if(response.data.result){
        setIsHotspotOn(!isHotspotOn);
      }
    })
    .catch((error) => {
      console.error("Error", error);
    }).finally(()=>{
      setIsLoadingToggle(false);
    });
  };

  const handleLora = ()=>{
    
    axios.post(`${ip}/api/start-lora`,{
      isLora: !isLora
    },{
      headers: {
        "Content-Type": "application/json",
      }
    })
    // .then((response)=>{
    //   console.log("Success:", response.data);
    // })
    // .catch((error) => {
    //   console.error("Error", error);
    // })
    setLora(!isLora);
  }

  return (
    <>
    <nav className={styles.navbar}>
      <div >
        <img src="/static/favicon.ico" alt="Logo" />
      </div>
      <div className={styles.flexGrow}>
        <div className={styles.connect}>
          <MdOutlineSignalCellularAlt style={{ fontSize: '25' , color:isConnected?'#10FFD4':'white'}} />
        </div>
        <ul className={styles.selectul}>
          <li className={styles.selectli}>
            <Link legacyBehavior href="/" >
              <a className={styles.link}>
                <MdOutlineSpaceDashboard style={{ fontSize: '26', marginTop: '3vh' ,color:isActiveLink('/')? '#60F9A6':'white' }} />
                <div style={{ width: '100%', background:  isActiveLink('/')? '#60F9A6':'#03334E', height: '1vh', marginTop: '1.5vh', borderRadius: '4px' }}></div>
              </a>
            </Link>
          </li>
          <li className={styles.selectli}>
            <Link legacyBehavior href="/data">
              <a className={styles.link} >
                <FiDatabase style={{ fontSize: '24', marginTop: '3vh' , color:isActiveLink('/data')? '#60F9A6':'white' }} />
                <div style={{ width: '100%', background:  isActiveLink('/data')? '#60F9A6':'#03334E', height: '1vh', marginTop: '1.5vh', borderRadius: '4px' }}></div>
              </a>
            </Link>
          </li>
          <li className={styles.selectli} >
            <Link legacyBehavior href="/about">
              <a className={styles.link} >
                <LuDroplets style={{ fontSize: '24', marginTop: '3vh' ,color:isActiveLink('/about')? '#60F9A6':'white' }} />
                <div style={{ width: '100%', background:  isActiveLink('/about')? '#60F9A6':'#03334E', height: '1vh', marginTop: '1.5vh', borderRadius: '4px' }}></div>
              </a>
            </Link>
          </li>
          <li className={styles.selectli} >
            <Link legacyBehavior href="/stream">
              <a className={styles.link} >
                <MdOutlinePhotoCamera style={{ fontSize: '24', marginTop: '3vh' ,color:isActiveLink('/stream')? '#60F9A6':'white' }} />
                <div style={{ width: '100%', background:  isActiveLink('/stream')? '#60F9A6':'#03334E', height: '1vh', marginTop: '1.5vh', borderRadius: '4px' }}></div>
              </a>
            </Link>
          </li>

        </ul>
      </div>
      <div className={styles.setting}>
        <div className={styles.lora} onClick={handleLora}>
          <BsFillDeviceSsdFill style={{ fontSize: '23' ,color:isLora? '#10FFD4':'#D6F8FF'}}       />
        </div>
        <div className={styles.hotspot} onClick={toggleHotspot} disable={isLoadingToggle.toString()}>
          {isLoadingToggle? <div className={styles.loader} /> :
          <RiSignalTowerFill style={{ fontSize: '23' ,color:isHotspotOn? '#10FFD4':'#D6F8FF'}} />
          }
          
        </div>
        <div className={styles.setting2} onClick={openModal} >
          <MdOutlineSettings style={{ fontSize: '24' }} />
        </div>
      </div>
    </nav>
    {isModalOpen && (
        <Credential closeModal={closeModal} handleSubmit={handleFormSubmit} isLoading={isLoading}/>
      )}
    </>
  );
};

export default Navbar;
