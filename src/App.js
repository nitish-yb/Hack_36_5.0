// // import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from './login';
import Mainpage from './main';
function App() {
  const [pos, setPos] = useState({lat: "", long: ""})
  const [user] = useAuthState(auth);
  console.log("current user");
  console.log(user);
    const  getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCoords)
        } else {
          alert('GeoLocation not enabled');
        }
      }

    const getCoords = (pos) => {
        console.log(pos)
        setPos({
          lat: pos.coords.latitude,
          long: pos.coords.longitude
        })
      }
  return (
    <div className="App">
      {/* <h1>HeLLO</h1>
      <button onClick={getLocation}>Click me</button>
        <p>lat: {pos.lat}</p>
        <p>long {pos.long}</p> */}
        {/* if(user)
        <Mainpage></Mainpage>
        
        else
        <Login></Login> */}
        {user!=null?<Mainpage/>:<Login/>}
        {/* user ? <Mainpage/> : <Login/> */}
        
        {/* <Login></Login> */}
    </div>

  );
}

export default App;
// import React from 'react';
// import {auth} from './firebase';
// import {useAuthState} from 'react-firebase-hooks/auth';
// import Login from './login';
// import Mainpage from './main';

// function App() {
// const [user] = useAuthState(auth);
// return (
// <h1> hello</h1>
  
// );
// }

// export default App;
