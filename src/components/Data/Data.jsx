import React from 'react';
import styles from './Data.module.css';
import { FiDownload } from "react-icons/fi";
import '@fontsource/inter'; // Import Inter font
// import data from './lora.json'; // Assuming lora.json is in the same directory
import * as XLSX from 'xlsx';

const Data = () => {
  const [loraData, setLoraData] = useState([]);

  useInterval(() => {
    axios.get('/api/getLoraDevices')
    .then(response=>{
      setLoraData(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching Internet status: ', error);
    });
  },3000)

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.devices);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'data.xlsx');
  };
  return (
    <div className={styles.data}>
      {loraData.devices?.length > 0 ? (
        <div className={styles.tablecontainer}>
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr>
                <th>Device ID</th>
                <th>Timestamp</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Light Intensity</th>
              </tr>
            </thead>
            <tbody>
              {loraData.devices?.map((device, index) => (
                <tr className={styles.row} key={device.id} style={{ backgroundColor: index % 2 == 0 ? '#365E82' : '#2C5274' }}>
                  <td className={styles.id}>{device.id}</td>
                  <td className={styles.timestamp}>{device.timestamp}</td>
                  <td className={styles.temperature}>{device.temperature}</td>
                  <td className={styles.humidity}>{device.humidity}</td>
                  <td className={styles.lightIntensity}>{device.lightIntensity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.table}>No Data available</div>
      )}

      <div className={styles.export} onClick={exportToExcel}>
        <p></p>
        <div className={styles.button}>
          <FiDownload style={{ fontSize: '22' }} />
        </div>
      </div>
    </div>
  );
}

export default Data;
