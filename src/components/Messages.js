import React, {useState, useEffect, useRef} from 'react'
import './messages.css'

function Messages({socket}) {
    const [messagesReceived, setMessagesReceived] = useState([])

    const messageColumnRef = useRef(null)
    //receive message when user types it in and pass it to server to be stored inside db 
    //runs whenever a socket event is received from the server
    useEffect(()=>{
        socket.on('recieve_message', (data)=>{
            console.log(data);
            setMessagesReceived((prev)=>[
                ...prev,
                {
                    message:data.message,
                    username:data.username,
                    createdTime:data.createdTime
                }
            ])
        })
        return ()=>{
            socket.off('receive_messages')
        }
    },[socket])

    useEffect(()=>{
        //get last 100 messages in chat room(gotten from db via server )
        socket.on('last_messages', (receivedMessages)=>{
            console.log('last_messages',JSON.parse(receivedMessages));
            receivedMessages = JSON.parse(receivedMessages);
            setMessagesReceived((prev)=>[...receivedMessages,...prev ])
        })
        return ()=>socket.off('last_messages');
    }, [socket])

    // scrolls to most recent message
    useEffect(()=>{
        messageColumnRef.current.scrollTop =messageColumnRef.current.scrollHeight
    }, [messagesReceived])

    const formatDateFromTimestamp = (timestamp)=>{
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }

  return (
    <div className='messageColumn' ref={messageColumnRef}>
      {messagesReceived.map((msg, i)=>(
        <div className='message' key={i}>
            <div className='message-inner'>
                <span className='msgMeta'>{msg.username}</span>
                <span className='msgMeta'>{formatDateFromTimestamp(msg.createdTime)}</span>
            </div>
            <p className='msgText'>{msg.message}</p>
            <br/>
        </div>
      ))}
    </div>
  )
}


export default Messages
