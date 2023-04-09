import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios"
const New = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [info, setinfo] = useState({});
    const handlechange = (e) => {
        setinfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleclick = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file)
        data.append("upload_preset", "upload")



        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dwc7aty0x/image/upload", data)
        console.log(uploadRes.data);

        const { url } = uploadRes.data;
        const newUser = {
            ...info,
            img: url
        };
        await axios.post("/auth/register", newUser)
    }
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
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
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input onChange={handlechange} type={input.type} placeholder={input.placeholder} id={input.id} />
                                </div>
                            ))}
                            <button onClick={handleclick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;

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