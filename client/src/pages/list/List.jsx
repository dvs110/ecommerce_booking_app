import React from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'//for formatting javascript date
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../components/hooks/useFetch'

const List = () => {

    const location = useLocation()
    const [destination, setdestination] = useState(location.state.destination);
    const [dates, setdates] = useState(location.state.dates);
    const [openDate, setOpendate] = useState(false);
    const [options, setoptions] = useState(location.state.options);
    // console.log(location);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    console.log(dates);
    const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
    const handleClick = () => {
        reFetch();
    }
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label >Destination</label>
                            <input placeholder={destination} type="text" />
                        </div>
                        <div className="lsItem">
                            <label >check in date</label>
                            <span onClick={() => setOpendate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && <DateRange

                                onChange={item => setdates([item.selection])}

                                ranges={dates}
                                minDate={new Date()}
                            />}
                        </div>
                        <div className="lsItem">
                            <label >options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Min price <small>per night</small></span>
                                    <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Max price <small>per night</small></span>
                                    <input type="number" onChange={(u) => setMax(u.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">adult</span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">children</span>
                                    <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">room <small>per night</small> </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>search</button>
                    </div>
                    <div className="listResult">
                        {loading ? "loading" : <>
                            {data.map(item => (

                                <SearchItem item={item} key={item._id} />
                            ))}
                        </>}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default List
