import React, { useState, useEffect, useLayoutEffect } from 'react';
import { auth } from './firebase';
import Firebase from "firebase/compat/app";
import axios from 'axios'
import Button from '@mui/material/Button';
import './main.css'
require('firebase/compat/auth');
require('firebase/compat/database');
require('firebase/compat/firestore');
const Mainpage = () => {
    const [pos, setPos] = useState({ lat: "", long: "" })
    const [userPhone, setUserPhone] = useState("")
    const [info, setInfo] = useState([])
    const [dist, setDist] = useState(0)
    let array = []
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
        setUserPhone(auth.currentUser.phoneNumber.substring(3))



        // console.log(info[1]?.loc.latitude)
        // console.log('.............')
        //   sendSms()
    }, [])

    const forall = async () => {
        await fetchData();
        console.log(array.length)
        for (var i = 0; i < array.length; i++) {
            getDistance(i);
        }
    }

    const fetchData = async () => {
        const response = Firebase.firestore().collection('location');

        const data = await response.get();
        let tempInfo = data.docs.map(e => e.data());
        //  let array = []
        setInfo(tempInfo);
        console.log("TempInfo", tempInfo);
        data.docs.forEach(element => {
            array.push(element.id.substring(3));
        });
        console.log("data", array);
    }

    const getDistance = (i) => {
        var R = 6371; // km
        var dLat = Math.abs((info[i]?.loc.latitude - info[0]?.loc.latitude)) * Math.PI / 180;
        var dLon = Math.abs((info[i]?.loc.longitude - info[0]?.loc.longitude)) * Math.PI / 180;
        var lat1 = (info[0]?.loc.latitude) * Math.PI / 180;;
        var lat2 = (info[i]?.loc.latitude) * Math.PI / 180;;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        setDist(d)
        //console.log(dLat, dLon);
        console.log(d)
        console.log("in getDis")
        // if(dist)
        sendSms(i, d)
    }

    const sendSms = (i, dist) => {
        if (dist > 0.5) {

            axios({

                // Endpoint to send files
                url: `https://www.fast2sms.com/dev/bulkV2?authorization=IRcoKfOBT3Upx2JunbPAWaZ8i76zFHVwQk1Gqsvhy9YENeDCLm7yvIhGBH3MRYinejsX5EwCZdzA9FTt&sender_id=TXTIND&message=This is a test message&route=v3&numbers=${array[i]}`,
                method: "GET",
                // headers: {

                //   // Add any auth token here
                //   authorization: "IRcoKfOBT3Upx2JunbPAWaZ8i76zFHVwQk1Gqsvhy9YENeDCLm7yvIhGBH3MRYinejsX5EwCZdzA9FTt",
                // },

                // Attaching the form data
                // data: formData,

            })

                // Handle the response from backend here
                .then((res) => {
                    console.log(res)
                    alert("Message sent succesfully")
                })

                // Catch errors if any
                .catch((err) => { console.log(err) });
        }
    }
    return (
        <div className='mainPage' style={{ marginTop: 250 }}>
            <center>
                <h3>Welcome{auth.currentUser.phoneNumber}</h3>
                <Button style={{ "marginLeft": "20px" }}
                    onClick={logout}
                    variant="outlined"
                >Logout</Button>
                <Button onClick={getLocation} variant="outlined">My Location</Button>
                <p>Latitude: {pos.lat}</p>
                <p>Longitude: {pos.long}</p>

                <Button onClick={forall}>Calculate</Button>
                <p>distance:{dist} km</p>


            </center>
        </div>
    );
}

export default Mainpage;
