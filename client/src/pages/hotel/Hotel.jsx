import React, { useContext, useState } from 'react'
import "./hotel.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../components/hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext, SearchContextProvider } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    // console.log(id);
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setopen] = useState(false);
    const [openModal, setopenModal] = useState(false);
    const { data, loading, error } = useFetch(`/hotels/find/${id}`)
    // console.log(data);

    const { dates, options } = useContext(SearchContext);
    const { user } = useContext(AuthContext)
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

    // console.log(dates);
    // console.log(options.room);


    // console.log(new Date(dates[0].endDate).getTime());

    const navigate = useNavigate();
    const days = Math.ceil(Math.abs(new Date(dates[0].endDate).getTime() - new Date(dates[0].startDate).getTime())) / MILLISECONDS_PER_DAY
    // const photos = [
    //     { 
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/228670982.jpg?k=ebead53fe07e28b0b05de6f74edcf4e765ef65306bffdd84f2e22a0864f687f1&o=&hp=1"
    //     }, {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/348447338.jpg?k=48a74205d5fc3b876701e8c4d87a3e1c7c8f846cd613f2f1b7ab080967ad41ba&o=&hp=1"
    //     }, {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/348447338.jpg?k=48a74205d5fc3b876701e8c4d87a3e1c7c8f846cd613f2f1b7ab080967ad41ba&o=&hp=1"
    //     },
    // ];
    const handleOpen = (i) => {
        setSlideNumber(i);
        setopen(true)
    }
    const handleMove = (direction) => {
        let new_slide_number;
        if (direction === "l") {
            new_slide_number = slideNumber === 0 ? 2 : slideNumber - 1

        }
        else
            new_slide_number = slideNumber === 2 ? 0 : slideNumber + 1
        setSlideNumber(new_slide_number)
    }
    const handleClick = () => {
        if (user) {
            setopenModal(true)
        }
        else {
            navigate("/login")
        }
    }
    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? "loading" : (<div className="hotelContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => {
                        setopen(false)
                    }} />

                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => {
                        handleMove("l")
                    }} />
                    <div className="sliderWrapper">
                        <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => {
                        handleMove("r")
                    }} />
                </div>}
                <div className="hotelWrapper">
                    <button className='booknow'>reserve or book now</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                    </div>
                    <span className='hotelDistance'>{data.distance}</span>
                    <span className='hotelPriceHighLight'>{data.cheapestPrice}</span>
                    <div className="hotelImages">
                        {data.photos?.map((photo, i) => (
                            <div className="hotelImgWrapper">
                                <img onClick={() => handleOpen(i)}
                                    src={photo} alt="" className="hotelImg" />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsText">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">{data.desc}</p>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>perfect for {days} night</h1>
                            <span>located in yhe real ..</span>
                            <h2>
                                <b>${days * data.cheapestPrice * options.room} for </b>{days} nights
                            </h2>
                            <button onClick={handleClick}>reserve or book now</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>)}
            {openModal && <Reserve setOpen={setopenModal} hotelId={id} />}
        </div>
    )
}

export default Hotel
//////////////////////////////////////////////////////////////////