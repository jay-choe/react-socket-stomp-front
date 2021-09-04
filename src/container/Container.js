import * as React from "react";
import Stomp from 'stompjs';
import SockJS from "sockjs-client";
import {useEffect} from "react";

// URL 변경!!
let sockJS = new SockJS("http://localhost:8080/ws");
let stompClient  = Stomp.over(sockJS);
stompClient.debug= () => {};

export const Container = ({}) => {

	const [message, setMessage] = React.useState([]);

	useEffect(()=>{
	  stompClient.connect({},()=>{
		stompClient.subscribe('/visitor',(frame)=>{
			// body에 내용이 담겨져서 옵니다.
			let data = frame.body
			addMessage(data);
		});
	});
	},[message]);
	
	const addMessage = (message) =>{
	  setMessage(prev=>[...prev, message]);
	};
  
	return (
	  <div className={"container"}>
		{message.map((msg) => <div>{msg}</div>)}
	  </div>
	);
  };