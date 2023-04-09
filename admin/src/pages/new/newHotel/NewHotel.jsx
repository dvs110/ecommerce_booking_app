
import "./newHotel.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../../formSource";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

const NewHotel = () => {
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);

    const { data, loading, error } = useFetch("/rooms");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSelect = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRooms(value);
    };

    console.log(files)

    const handleClick = async (e) => {
        e.preventDefault();

        const list = await Promise.all(
            Object.values(files).map(async (file) => {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload");
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dwc7aty0x/image/upload",
                    data
                );
                console.log(uploadRes.data);
                const { url } = uploadRes.data;
                return url;
            })
        );





        const newhotel = {
            ...info,
            rooms,
            photos: list,
        };
        console.log(newhotel);

        await axios.post("/hotels", newhotel);
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Product</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                files
                                    ? URL.createObjectURL(files[0])
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {hotelInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Featured</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="selectRooms">
                                <label>Rooms</label>
                                <select id="rooms" multiple onChange={handleSelect}>
                                    {loading
                                        ? "loading"
                                        : data &&
                                        data.map((room) => (
                                            <option key={room._id} value={room._id}>
                                                {room.title}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewHotel;









// import "./newHotel.scss";
// import Sidebar from "../../../components/sidebar/Sidebar";
// import Navbar from "../../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";
// import { hotelInputs, roomInputs } from "../../../formSource";
// //dwc7aty0x
// import useFetch from "../../../hooks/useFetch";
// import axios from "axios"
// const NewHotel = () => {
//     const { data, loading, error } = useFetch("/rooms")

//     const [files, setFiles] = useState("");
//     const [info, setinfo] = useState({});
//     const [rooms, setRooms] = useState([]);
//     const handleChange = (e) => {
//         setinfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
//     }
//     const handleSelect = (e) => {
//         const value = Array.from(e.target.selectedOptions, (option) => option.value)//it will give html collection so we need to transform it into array
//         setRooms(value)
//     }
//     const handleclick = async (e) => {
//         e.preventDefault();
//         try {
//             const list = Promise.all(
//                 Object.values(files).map(async (file) => {
//                     const data = new FormData();
//                     data.append("file", file)
//                     data.append("upload_preset", "upload")
//                     const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dwc7aty0x/image/upload", data)


//                     const { url } = uploadRes.data;
//                     return url;
//                 })
//             );
//             const newHotel = {
//                 ...info,
//                 rooms,
//                 photos: list
//             };
//             await axios.post("/hotels", newHotel)
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }
//     return (
//         <div className="new">
//             <Sidebar />
//             <div className="newContainer">
//                 <Navbar />
//                 <div className="top">
//                     <h1>Ad new product</h1>
//                 </div>
//                 <div className="bottom">
//                     <div className="left">
//                         <img
//                             src={
//                                 files
//                                     ? URL.createObjectURL(files[0])
//                                     : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//                             }
//                             alt=""
//                         />
//                     </div>
//                     <div className="right">
//                         <form>
//                             <div className="formInput">
//                                 <label htmlFor="file">
//                                     Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                                 </label>
//                                 <input
//                                     type="file"
//                                     id="file"
//                                     multiple
//                                     onChange={(e) => setFiles(e.target.files)}
//                                     style={{ display: "none" }}
//                                 />
//                             </div>

//                             {hotelInputs.map((input) => (
//                                 <div className="formInput" key={input.id}>
//                                     <label>{input.label}</label>
//                                     <input id={input.id} onChange={handleChange}
//                                         type={input.type} placeholder={input.placeholder} />
//                                 </div>
//                             ))}
//                             <div className="formInput" >
//                                 <label>Featured</label>
//                                 <select id="featured" onChange={handleChange}>
//                                     <option value={false}>no</option>
//                                     <option value={true}>yes</option>
//                                 </select>
//                             </div>
//                             <div className="selectRooms" >
//                                 <label>Rooms</label>
//                                 <select id="rooms" multiple onChange={handleSelect}>
//                                     {loading ? "loading" : data && data.map(room => (
//                                         <option key={room._id} value={room._id}>{room.title}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <button onClick={handleclick}>Send</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NewHotel;






{/* <div className="formInput">
                                <label>name and surname</label>
                                <input type="text" placeholder='john doe' />
                            </div>
                            <div className="formInput">
                                <label>email</label>
                                <input type="email" placeholder='john_doe@gmail.com' />
                            </div>
                            <div className="formInput">
                                <label>phone num</label>
                                <input type="text" placeholder='+915223551' />
                            </div>
                            <div className="formInput">
                                <label>password</label>
                                <input type="password" />
                            </div>
                            <div className="formInput">
                                <label>adress</label>
                                <input type="text" placeholder='ambi' />
                            </div>
                            <div className="formInput">
                                <label>country</label>
                                <input type="text" placeholder='india' />
                            </div> */}
