import React from 'react'
import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";



const Navbar = () => {
    const { dispatch } = useContext(DarkModeContext);
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='search...' />
                    <SearchOutlinedIcon className='icon' />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className='icon' />
                        English
                    </div>
                    <div className="item">
                        <NightlightRoundOutlinedIcon className='icon' onClick={() => dispatch({ type: "TOGGLE" })} />
                    </div>
                    <div className="item">
                        <FullscreenExitOutlinedIcon className='icon' />

                    </div>
                    <div className="item">
                        <NotificationsActiveOutlinedIcon className='icon' />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <MessageOutlinedIcon className='icon' />
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <FormatListBulletedOutlinedIcon className='icon' />

                    </div>
                    <div className="item">

                        <img src="" alt="" className='avatar' />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
