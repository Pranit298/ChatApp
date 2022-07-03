import React from 'react'
import ReactEmoji from 'react-emoji';
import './message.css'

const Message = ( {message : {text, user}, name} ) => {
    let flag = false //determines whether a mssg is from current user(displayed in green) or someone else(displayed in)

    const username = name.trim().toLowerCase() //just like we trimmed the name in backend

    if(user === username){ //sent by current user (in blue)
        flag = true 
    }
    return (
        flag ? 
        (   //If sent by user
            <div className="messageContainer justifyEnd">
                <p className="sentBy pr-10">{username}</p>

                <div className="messageBox bgBlue">
                    <p className="message">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        :
        (   //If received by user
            <div className="messageContainer justifyStart">
                <div className="messageBox bgGreen">
                    <p className="message">{ReactEmoji.emojify(text)}</p>
                </div>

                <p className="sentBy pl-10">{user}</p>
            </div>
        )
    )   
}   

export default Message