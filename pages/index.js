
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const renderContent = (data, heading = "h4") => {
  return data.map((item,index) => {
    if (item.list) {
      return (
        <li key={index}>
          {heading === "h6" ? <h6>{item.title}</h6> : <h4>{item.title}</h4>}
          <ul>{renderContent(item.list, "h6")}</ul>
        </li>
      );
    } else {
      return <li key={index}>{item.content}</li>;
    }
  });
};

const renderSection = (data) => {
  return Object.entries(data).map(([key, value]) => {
    return (
      <div key={key}>
        {value.title && <h2>{value.title}</h2>}
        <ul>{renderContent(value.list)}</ul>
      </div>
    );
  });
};

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setMessage(data);
    }
    fetchData();
  }, []);

  return<div>{renderSection(message)}</div>;
}
