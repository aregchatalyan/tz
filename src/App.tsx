import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { List } from './components/List';
import { ListItem } from './components/ListItem';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <List/> }/>
      <Route path="/:countryName" element={ <ListItem/> }/>

      <Route path="/*" element={ <Navigate to="/" replace/> }/>
    </Routes>
  );
}

export default App;
