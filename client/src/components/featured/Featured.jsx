import useFetch from "../hooks/useFetch";
import "./featured.css"
import { useEffect } from "react"
const Featured = () => {

    const { data, loading, error } = useFetch("/hotels/countByCity?cities=dehradun,dehradun1,mumbai")

    // console.log(data);

    return (
        <div className="featured">
            {loading ? "loading plz wait" : <><div className="featuredItem">
                <img src="https://q-xx.bstatic.com/psb/capla/static/media/gateway_banner.efe9b1ad.jpg" alt="" className="featuredimg" />
                <div className="featuredTitles">
                    <h1>dehradun</h1>
                    <h2>{data[0]}</h2>

                </div>
            </div>

                <div className="featuredItem">
                    <img src="https://q-xx.bstatic.com/psb/capla/static/media/gateway_banner.efe9b1ad.jpg" alt="" className="featuredimg" />
                    <div className="featuredTitles">
                        <h1>dehradun1</h1>
                        <h2>{data[1]}</h2>

                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://q-xx.bstatic.com/psb/capla/static/media/gateway_banner.efe9b1ad.jpg" alt="" className="featuredimg" />
                    <div className="featuredTitles">
                        <h1>mumbai</h1>
                        <h2>{data[2]}</h2>

                    </div>
                </div>
            </>}

        </div>
    )
}
export default Featured;