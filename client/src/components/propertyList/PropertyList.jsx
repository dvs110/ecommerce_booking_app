import React from 'react'
import useFetch from '../hooks/useFetch'
import './propertyList.css'
const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotels/countByType");
    const images = ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/348447338.jpg?k=48a74205d5fc3b876701e8c4d87a3e1c7c8f846cd613f2f1b7ab080967ad41ba&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/348447338.jpg?k=48a74205d5fc3b876701e8c4d87a3e1c7c8f846cd613f2f1b7ab080967ad41ba&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/348447338.jpg?k=48a74205d5fc3b876701e8c4d87a3e1c7c8f846cd613f2f1b7ab080967ad41ba&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/348447338.jpg?k=48a74205d5fc3b876701e8c4d87a3e1c7c8f846cd613f2f1b7ab080967ad41ba&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/348447338.jpg?k=48a74205d5fc3b876701e8c4d87a3e1c7c8f846cd613f2f1b7ab080967ad41ba&o=&hp=1"]

    return (
        <div className='pList'>
            {loading ? "loading wait" : (<>{data && images.map((img, i) => (<div className='pListItem'>
                <img src={img} alt="" className='pListImg'></img>
                <div className='pListTitles'>
                    <h1>{data[i]?.type}s</h1>
                    <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
            </div>))}
            </>)}
        </div>
    )
}

export default PropertyList
