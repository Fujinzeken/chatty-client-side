import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'

function Home({username, setUsername, topic, setTopic, socket}) {

  const navigate = useNavigate()

  const getIn = ()=>{
    if(topic !== '' && username !== ''){
      socket.emit('get_in', {username, topic});
       // redirect to chat page
    navigate('/chat', {replace:true})
    }
   
  }
  return (
    <div className='container'>
      <div className='formContainer'>
        <h1>Welcome to Webish</h1>
        <input className='input' placeholder='Username...' type='text'onChange={(e)=>{setUsername(e.target.value)}}></input>
        <select className='input password' onChange={(e)=>{setTopic(e.target.value)}}>
        <option>Select Topic</option>
          <option value="Javascript">JavaScript</option>
          <option value="Node.js">Node.js</option>
          <option value="React.js">React.js</option>
          <option value="Express">Express.js</option>
        </select>
        <button className='btn btn-secondary login' onClick={getIn}>Get in</button>
      </div>
    </div>
  )
}

export default Home
