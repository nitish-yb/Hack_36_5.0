import React from 'react'
import Button from '@mui/material/Button';
import './Home.css'
import Login from './login';
import {Link} from "react-router-dom";
function home() {
  return (
    <div className='homeDiv'>
    
    <Button variant="outlined">Ambulance</Button>
    <Button variant="outlined"><a href='http://localhost:3000/login'>Civilian</a></Button>
    </div>
  )
}

export default home