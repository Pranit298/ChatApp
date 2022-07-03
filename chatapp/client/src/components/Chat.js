import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'

import ChatHeader from './chatheader'
import PrevMessages from './prevmssg'
import InputMessage from './input'
import TextContainer from './txtcontainer'

let socket
const url = 'localhost:5000'

const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([]) //type - array
    const [users, setUsers] =useState('')
    

    useEffect(() => { 
    //whenever ReactDOM.render is called , useEffect is executed
        const {name, room} = queryString.parse(location.search)

        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket","polling","flashsocket"]
        };

        socket = io(url, connectionOptions);

        setName(name)
        setRoom(room)
        
        socket.emit('join', {name, room}, (error)=>{
            if(error){
                alert(error)
            }
        })

        return ()=>{
            socket.emit('disconnect')
            socket.disconnect()
        }

    },[url, location.search]) //only if values inside [] change, useEffect will be called

    useEffect(()=>{
        socket.on('message', (message)=>{
            setAllMessages( (allMessages) => [...allMessages,message] )
        })

        socket.on('roomData', ( {users} ) => {
            setUsers(users)
        })
    },[])

    //function for sending messages
    const sendMessage = (event)=>{
        event.preventDefault() //don't want to refresh browser on keypress

        if(message){
            socket.emit('sendMessage', message,()=>setMessage('')) //clears message after sending
        }
    }

    console.log(`Message you sent : ${message}`,`List of all messages :  ${allMessages}`);

    return (
        <div className='outerContainer'>
            <div className='container'>
                {/* The skeleton */}
                <ChatHeader room={room} />                

                {/* contains the conversation */}
                <PrevMessages allMessages={allMessages} name={name} />
                
                {/* Users types his mssg here */}
                <InputMessage message={message} setMessage={setMessage} sendMessage={sendMessage} /> 
            </div>

            {/* Shows those users that are online */}
            <TextContainer users={users}/> 
        </div>
    )
}

export default Chat