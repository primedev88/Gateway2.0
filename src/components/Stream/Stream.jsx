import { useEffect, useState } from 'react';
import styles from './Stream.module.css'
import axios from 'axios';

const Stream = () => {
    const [stream, setStream] = useState(false);
    const [isLoadingStream, setIsLoadingStream] = useState(false);
    const [streamKey, setStreamKey] = useState(Date.now());

    useEffect(() => {
        // Check if localStorage is available before using it
        if (typeof window !== 'undefined') {
          const storedStream = sessionStorage.getItem('stream');
          setStream(storedStream ? JSON.parse(storedStream) : false);
        }
    }, []);
    
    useEffect(() => {
    // Check if localStorage is available before using it
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('stream', JSON.stringify(stream));
    }
    }, [stream]);
    
   
    const handleStream = () => {
        if (!stream) {
            setTimeout(() => {
                console.log("delayed")
                setStream(true);
            }, 500); 
            axios.post('/api/startStream', {
                stream: true
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                console.log("Success:", response.data);
                if (response.data.result) {
                    
                }
            })
            .catch((error) => {
                console.error("Error", error);
            });

            setStreamKey(Date.now());
            
            
        } else {
            setTimeout(() => {
                console.log("delayed")
                setStream(false);
            }, 50); 
            axios.post('/api/endStream', {
                stream: !stream
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                console.log("Success:", response.data);
                if (response.data.result) {
                    
                }
            })
            .catch((error) => {
                console.error("Error", error);
            })
            
        }
    }

    return (
        <div className={styles.stream}>
            <div className={styles.button} onClick={handleStream} disable={isLoadingStream.toString()}>
                {isLoadingStream ? <div className={styles.loader} /> : (
                    stream ? 'End Stream' : 'Start Stream'
                )}
            </div>
            <div className={styles.streamWindow}>
                {stream && (
                    <img style={{display:'block',margin:'auto'}} src={`http://localhost:8084/?action=stream`} width="440" height="250" key={streamKey}/>
                )}
            </div>
        </div>
    );
}

export default Stream;
