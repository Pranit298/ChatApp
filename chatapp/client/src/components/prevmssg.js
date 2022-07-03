//Responsible for displaying all messages of the conversation in a room

import React from 'react'
import Scroll from 'react-scroll-to-bottom'
import Message from './message'
import './prevmssg.css'

const PrevMessages = ( {allMessages, name} ) => (
    <Scroll className="messages">
        {/* traversing through each Message(component) */}
        {allMessages.map( (message, i)  => 
            <div key={i}>
                <Message message={message} name={name} />
            </div>
        )}
    </Scroll>
)        

export default PrevMessages