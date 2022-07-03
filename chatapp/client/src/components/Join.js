import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './join.css'

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Welcome! Start making friends today...</h1>


                <input placeholder="Enter Name" className="joinInput" type="text" onChange={event => setName(event.target.value)} />
                <input placeholder="Enter Room Id" className="joinInput" type="text" onChange={event => setRoom(event.target.value)} />


                <Link onClick={(event) => {
                    if(!name || !room){ //empty input unacceptable
                        event.preventDefault()
                    }
                }} to={`/chat?name=${name}&room=${room}`}>
                    <button className='button ' type="submit">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Join