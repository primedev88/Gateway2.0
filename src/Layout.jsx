// src/Layout.jsx
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.children}>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
