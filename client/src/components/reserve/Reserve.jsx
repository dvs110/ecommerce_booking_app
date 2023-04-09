import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../hooks/useFetch'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./reserve.css"
const Reserve = ({ setOpen, hotelId }) => {
    // console.log(hotelId);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    // console.log(data);
    const [selectedrooms, setselectedrooms] = useState([])
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setselectedrooms(checked ? [...selectedrooms, value] : selectedrooms.filter(item => item !== value))
    }
    const { dates } = useContext(SearchContext);
    const getdates_in_range = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());
        let list = []
        while (date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list;
    }


    console.log(getdates_in_range(dates[0].startDate, dates[0].endDate));
    const alldates = getdates_in_range(dates[0].startDate, dates[0].endDate)
    const isAvailable = (room_no) => {
        const isFound = room_no.unavailabledates.some(date => alldates.includes(new Date(date).getTime()))
        return !isFound
    }
    const navigate = useNavigate()
    const handleClick = async () => {
        try {
            await Promise.all(selectedrooms.map(roomId => {
                const res = axios.put(`/rooms/avaibility/${roomId}`, { dates: alldates })

            }))
            setOpen(false)
            navigate("/")
        }
        catch (err) {

        }
    }


    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => {
                    setOpen(false)
                }} />

                <span>select ur rooms:</span>
                {data?.map(item => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item?.title}</div>
                            <div className="rDesc">{item?.desc}</div>
                            {item?.maxPeople && (<div className="rMax">Max people: <b>{item?.maxPeople}</b></div>)}
                            <div className="rPrice">{item?.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item?.roomnumbers.map(room_no => (
                                <div className="room">

                                    <label>{room_no?.number}</label>
                                    <input type="checkbox" value={room_no?._id} onChange={handleSelect} disabled={!isAvailable(room_no)} />

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">reserve now</button>
            </div>
        </div>
    )
}

export default Reserve
