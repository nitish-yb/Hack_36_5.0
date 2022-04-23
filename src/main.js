import React,{useState} from 'react';
import { auth } from './firebase';
import Firebase from "firebase/compat/app";
require('firebase/compat/auth');
require('firebase/compat/database');
require('firebase/compat/firestore');
const Mainpage = () => {
    const [pos, setPos] = useState({lat: "", long: ""})
    
    const logout = () => {
        auth.signOut();
    }

    const getLocation = async () => {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(getCoords);
            console.log(auth.currentUser.phoneNumber);
            console.log(pos.lat);
            const ll = new Firebase.firestore.GeoPoint(pos.lat, pos.long);
            Firebase.firestore().collection('location').add({
               loc: ll
           })
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
        <div style={{ marginTop: 250 }}>
            <center>
                <h3>Welcome{auth.currentUser.phoneNumber}</h3>
                <button style={{ "marginLeft": "20px" }}
                    onClick={logout}>Logout</button>
                <button onClick={getLocation}>Click me</button>
                <p>lat: {pos.lat}</p>
                <p>long {pos.long}</p>

            </center>
        </div>
    );
}

export default Mainpage;
