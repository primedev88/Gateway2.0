// pages/_app.js
import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import '../styles/global.css'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Gateway 5G</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/static/favicon.ico" />
          <meta name="description" content="Your description goes here" />
          {/* Other meta tags */}
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
