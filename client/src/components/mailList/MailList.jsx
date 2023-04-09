import React from 'react'
import "./mailList.css"
const MailList = () => {
    return (
        <div className='mail'>
            <h1 className='mailTitle'>save name,money</h1>
            <span className='mailDesc'>sign up and we will send the best deals to u</span>
            <div className='mailInputContainer'>
                <input type="text" placeholder="your email" />
                <button>suscribe</button>

            </div>
        </div>
    )
}

export default MailList
