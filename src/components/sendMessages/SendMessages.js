import React, {useState} from 'react'
import "./sendMessages.css"

function SendMessages({socket, username, topic}) {
    const [message, setMessage] = useState('');
    const sendMessage = ()=>{
        if (message !== ''){
            const createdTime = Date.now();
            // send message to server, we cant specify who we send the message to from the client, we can only send to server
            // server can now send to the rest of the users
            socket.emit('send_message', {username, topic, message, createdTime})
            setMessage('')
        }
    }
  return (
    <div className='sendMessageContainer'>
      <input className='messageInput' placeholder='message...' 
      value={message} onChange={(e)=>setMessage(e.target.value)}></input>
      <button className='btn btn-primary' onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default SendMessages
