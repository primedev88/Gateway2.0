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
  const [error, setError] = useState('');
  
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
    let errorMessage = '';

    // Password length check
    if (password.length < 8) {
      errorMessage = "Password must be greater than 8 characters";
    }

    // SSID validation
    if (ssid.trim() === "") {
      errorMessage = "SSID cannot be empty";
    }

    // SSID should not begin with a digit
    if (/^\d/.test(ssid)) {
      errorMessage = "SSID cannot begin with a digit";
    }

    // If any error occurred, display it and return
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    // All checks passed, clear any previous error and proceed with form submission
    setError('');
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

        <div className={styles.Submit} onClick={handleFormSubmit} disabled={isLoading.toString()}>
          {isLoading ? <div className={styles.loader} /> : 'Submit'}
        </div>
        {error && <div className={styles.error}>! {error}</div>}
      </div>
    </div>
  );
}

export default Credential;

Credential.propTypes = { closeModal:propTypes.func , handleSubmit:propTypes.func, isLoading:propTypes.bool}
