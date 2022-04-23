import React, { useState, useEffect, useLayoutEffect } from 'react';
import { auth } from './firebase';
import Firebase from "firebase/compat/app";
require('firebase/compat/auth');
require('firebase/compat/database');
require('firebase/compat/firestore');
const Mainpage = () => {
    const [pos, setPos] = useState({ lat: "", long: "" })
    const [userPhone, setUserPhone] = useState("")
    const [info, setInfo] = useState([])
    const [dist,setDist]=useState(0)
    const logout = () => {
        auth.signOut();
    }

    const getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoords);
            console.log(auth.currentUser.phoneNumber);

            console.log(pos.lat);
            console.log("..........")
            console.log(userPhone)
            console.log(pos.long);
            const ll = new Firebase.firestore.GeoPoint(pos.lat, pos.long);
            await Firebase.firestore().collection('location').doc(auth.currentUser.phoneNumber).set({
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

    useLayoutEffect(() => {
        fetchData();
        setUserPhone(auth.currentUser.phoneNumber)
        
        console.log(info[1]?.loc.latitude)
        console.log('.............')
      
    }, [])

    const fetchData = async () => {
        const response = Firebase.firestore().collection('location');

        const data = await response.get();
        let tempInfo = data.docs.map(e=>e.data());
        setInfo(tempInfo);
        console.log("TempInfo", tempInfo);
    }

    const getDistance=()=>{
        var R = 6371; // km
      var dLat = Math.abs((info[1]?.loc.latitude-info[0]?.loc.latitude))* Math.PI / 180;
      var dLon = Math.abs((info[1]?.loc.longitude-info[0]?.loc.longitude))* Math.PI / 180;
      var lat1 = (info[0]?.loc.latitude)* Math.PI / 180;;
      var lat2 = (info[1]?.loc.latitude)* Math.PI / 180;;

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = dLat;
      setDist(d)
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
                <p>hello {info[0]?.loc.latitude}</p>
                <p>hello {info[1]?.loc.latitude}</p>
                <button onClick={getDistance}>Calculate</button>
                <p>distance:{dist} km</p>
            </center>
        </div>
    );
}

export default Mainpage;
