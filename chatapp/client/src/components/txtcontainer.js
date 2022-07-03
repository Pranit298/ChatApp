import React from 'react';

import onlineIcon from './onlineIcon.png'
import './txtcontainer.css';

const TextContainer = ( {users} ) => (
  <div className="textContainer">
    <div>
      <h1>Realtime ChatApp <span role="img" aria-label="emoji">💬</span></h1>
      <h2>Character to Emoji conversion enabled!
      <br />
      For Example,  :D → 😀
      </h2>

      <h1>Happy Texting!<span role="img" aria-label="emoji">⬅️</span></h1>
    </div>
    {
      users
      ?
      (
          <div>
            <h1>Online:</h1>

            <div className="activeContainer">
              <h2>{users.map(({name}) => (
                  <div key={name} className="activeItem">
                  <img alt="Online Icon" src={onlineIcon}/>&nbsp;
                  {name}
                  </div>
              ))}
              </h2>
            </div>
          </div>
      )
      :
      null
    }
  </div>
);

export default TextContainer;