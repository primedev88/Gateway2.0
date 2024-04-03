import styles from "./Credential.module.css";
import { RxCross2 } from "react-icons/rx";
import { PiEye,PiEyeClosed } from "react-icons/pi";
import  { useState } from 'react';
import propTypes from 'prop-types'

function Credential(props) {
  const {closeModal,handleSubmit,isLoading}=props;
  const [ssid, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  
  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  }

  const handleSSIDChange = (event) => {
    setSSID(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit(ssid, password);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.hotspotSettings}>
        <div className={styles.cancelContain}>
          <div className={styles.con}></div>
          <div className={styles.cancel} onClick={closeModal}>
            <RxCross2 size="20" color="#D0FFFC" />
          </div>
        </div>
        <div className={styles.SSID}>
          <div className={styles.txt}>SSID:</div>
          <div className={styles.inputSpace}>
            <input
              className={styles.input}
              type="text"
              id="ssidInput"
              value={ssid}
              onChange={handleSSIDChange}
            />
            <div className="space"></div>
          </div>
        </div>
        <div className={styles.Password}>
          <div className={styles.txt1}>Key:</div>
          <div className={styles.inputHidco}>
            <input
              className={styles.input1}
              type={showPassword ? "password" : "text"}
              id="passwordInput"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className={styles.eye} onClick={togglePasswordVisibility}>
              {showPassword ? (
                <PiEye color="#03334E" size="20" />
              ) : (
                <PiEyeClosed size="20" color="#03334E" />
              )}
            </div>
          </div>
        </div>

        <div className={styles.Submit} onClick={handleFormSubmit} disabled={isLoading}>
          {isLoading ? <div className={styles.loader} /> : 'Submit'}
        </div>
      </div>
    </div>
  );
}

export default Credential;

Credential.propTypes = { closeModal:propTypes.func , handleSubmit:propTypes.func, isLoading:propTypes.bool}
