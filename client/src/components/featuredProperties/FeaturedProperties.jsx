import React from 'react'
import useFetch from '../hooks/useFetch';
import "./featuredProperties.css"
const FeaturedProperties = () => {
    const { data, loading, error } = useFetch("/hotels?featured=true");



    return (
        <div className="fp">
            {loading ? "loading plz " : <>
                {data.map(item => (
                    <div className="fpItem">
                        <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/371729302.jpg?k=a9a4fe70aa26093c048acd0e9416b9bada0fa6df4fba03811bc7cdef3676f780&o=&hp=1" alt="" className="featuredimg" />
                        <span className='fpName'>{item.name}</span>
                        <span className='fpCity'>{item.city}</span>
                        <span className='fpPrice'>{item.cheapestprice}</span>
                        {item.rating && <div className='fpRating'>
                            <button>{item.rating}</button>
                            <span>excellent</span>
                        </div>}
                    </div>
                ))}
            </>}    </div>


    )
}

export default FeaturedProperties
