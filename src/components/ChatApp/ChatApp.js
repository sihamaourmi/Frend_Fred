import React,{useEffect,useState} from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')



function ChatApp() {

    //envoyer 
    const [message,setMessage]=useState('')
   // recevoir
    const [messages,setMessages]=useState([]);


   
     useEffect(()=>{
socket.on('message',(data)=>{
    //recuperation des nouveaux messages en gardant les anciens ...
    setMessages([...messages,data]);
});
 return()=>{
    socket.off('message')
 }

     },[messages]);

     const sendMessage =(e)=>{
        e.preventDefault();
        socket.emit('message',message);
        setMessage('')

     }


 //Afficheage la totalete des message 
  return (
    <React.Fragment>
        <ul>
            {messages.map((msg,index)=>( 
                <li key={index}>{msg}</li>
                ))}

        </ul>

        <form onSubmit={sendMessage}>
        <input value={message} onChange={(e)=>setMessage(e.target.value)} />
        <button type='submit'>Send</button>
        </form>
    </React.Fragment>
  )
}

export default ChatApp


