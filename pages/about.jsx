// pages/about.js
import React from 'react';
import Layout from '../src/Layout'
import About from '../src/components/About/About'

const AboutPage = () => {
  return (
    <Layout>
      <div>
        <About/>
        {/* Add more content here */}
      </div>
    </Layout>
  );
};

export default AboutPage;
