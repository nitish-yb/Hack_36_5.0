import React, { useState } from 'react';
import { firebase, auth } from './firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
require('firebase/compat/auth');
const Login = () => {
	// Inputs
	const [mynumber, setnumber] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');

	// Sent OTP
	const signin = () => {

		if (mynumber === "" || mynumber.length < 10) return;

		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
		auth.signInWithPhoneNumber(mynumber, verify).then((result) => {
			setfinal(result);
			alert("code sent")
			setshow(true);
		})
			.catch((err) => {
				alert(err);
				window.location.reload()
			});
	}

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		final.confirm(otp).then((result) => {
			// success
		}).catch((err) => {
			alert("Wrong code");
		})
	}

	return (
		<div style={{ "marginTop": "200px" }}>
			<center>
				<div style={{ display: !show ? "block" : "none" }}>
				
					<TextField id="outlined-basic" label="Phone " variant="outlined" value={mynumber} onChange={(e) => {
						setnumber(e.target.value) }}
							/>
					<br /><br />
					<div id="recaptcha-container"></div>
					<Button onClick={signin} variant='filled'>Send OTP</Button>
				</div>
				<div style={{ display: show ? "block" : "none" }}>
			
					<TextField id="outlined-basic" label="OTP" variant="outlined" placeholder={"Enter your OTP"}
						onChange={(e) => { setotp(e.target.value) }}/>
					<br /><br />
					<Button onClick={ValidateOtp}>Verify</Button>
				</div>
			</center>
		</div>
	);
}

export default Login;
