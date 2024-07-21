import {useState, useRef} from "react";
import saveAs from "file-saver";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Qrcode() {

	const rUrl = useRef();
	const [url, setUrl] = useState("");
	const [qrcode, setQrcode] = useState("");
	const [msg,setMsg] = useState("");
	
	const hUrl = (event) => {setUrl(event.target.value);};

	const gqr = (event) => {
		event.preventDefault();
		if(url === "") {
			toast.warning("You didn't entered url");
			rUrl.current.focus();
			setQrcode("");
			return;
		}

		let res = "https://api.qrserver.com/v1/create-qr-code/?data=" + url;
		setQrcode(res);
		toast.success("Generated click the Download button for .png image");
	};

	const dqr = (event) => {
		event.preventDefault();
		if(qrcode === "") {
			toast.warning("No qrcode found");
			return;
		}
		else {
			saveAs(qrcode, "download");
			toast.success("Qr code successfully Downloaded");
		}
	};

	return(
		<>
			<ToastContainer />
			<center>
				<h1>QR Code Generator</h1>
				<form onSubmit={gqr}>
					<label>Enter Website url: </label> &nbsp;
					<input type="text" value={url} ref={rUrl} onChange={hUrl}  /> <br/> <br/>

					<input type="submit" value="Generate" />
				</form> <br/>
				<img src={qrcode} />
			       	<br/> <form onSubmit={dqr}>
					<input type="submit" value="Download OR Code" />
				</form>
			</center>
		</>
	);
}