import React, { useState } from 'react';
import './styles/index.css';
import Form from './components/Form';
import ScrollPost from './pages/ScrollPost'

function App() {


  return (
    <>
      <div>
        <Form />
        <ScrollPost />
      </div>
    </>
  );
}

export default App;
