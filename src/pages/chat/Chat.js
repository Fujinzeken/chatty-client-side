import React from 'react'
import MessagesReceived from '../../components/Messages'
import SendMessages from '../../components/sendMessages/SendMessages'

import './chat.css'

function Chat({socket, username, topic}) {
  return (
    <div className='chatContainer'>
      <MessagesReceived
        socket={socket}
      />
      <SendMessages 
        socket={socket}
        username={username}
        topic={topic}
      />
    </div>
  )
}

export default Chat
