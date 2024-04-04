import { useState } from 'react';
import styles from './Stream.module.css'
import axios from 'axios';

const Stream = () => {
    const [stream, setStream] = useState(false);
    const [isLoadingStream, setIsLoadingStream] = useState(false);
    const streamURL = 'http://localhost:8084/?action=stream';

    const handleStream = () => {
        setIsLoadingStream(true);
        axios.post('/api/stream', {
            stream: !stream
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                console.log("Success:", response.data);
                if (response.data.result) {
                    setStream(!stream);
                }
            })
            .catch((error) => {
                console.error("Error", error);
            }).finally(() => {
                setIsLoadingStream(false);
            });

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
                    <iframe
                        title="stream"
                        className={styles.streamOn}
                        src={streamURL}
                        // frameBorder="0"
                    />
                )}
            </div>
        </div>
    );
}

export default Stream;