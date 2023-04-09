export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img || "https://th.bing.com/th/id/R.6b2351c5f3b1cfc1a37ddcb48cca409d?rik=aRY9Mv868zVQZQ&riu=http%3a%2f%2fwww.thegurughantal.com%2fuploads%2f7%2f5%2f8%2f2%2f75825867%2fdelhinightclubs-5-bwxyimsnzqm_orig.jpg&ehk=BS8gKOIIbCDvGce%2fxrFVowNY47FPPvnJ9hze55GjMxw%3d&risl=&pid=ImgRaw&r=0"} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },

    {
        field: "country",
        headerName: "Country",
        width: 100,
    },
    {
        field: "city",
        headerName: "City",
        width: 100,
    }, {
        field: "phone",
        headerName: "Phone",
        width: 100,
    },

];



export const hotelColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "name",
        headerName: "Name",
        width: 230,
    },
    {
        field: "type",
        headerName: "Type",
        width: 230,
    },
    {
        field: "title",
        headerName: "Title",
        width: 230,
    },
    {
        field: "city",
        headerName: "City",
        width: 100,
    },

];






export const roomColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "title",
        headerName: "Title",
        width: 230,
    },

    {
        field: "desc",
        headerName: "Description",
        width: 100,
    },
    {
        field: "price",
        headerName: "Price",
        width: 100,
    }, {
        field: "maxPeople",
        headerName: "Max People",
        width: 100,
    },

];


























// //temporary data
// export const userRows = [
//     {
//         id: 1,
//         username: "Snow",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         status: "active",
//         email: "1snow@gmail.com",
//         age: 35,
//     },
//     {
//         id: 2,
//         username: "Jamie Lannister",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "2snow@gmail.com",
//         status: "passive",
//         age: 42,
//     },
//     {
//         id: 3,
//         username: "Lannister",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "3snow@gmail.com",
//         status: "pending",
//         age: 45,
//     },
//     {
//         id: 4,
//         username: "Stark",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "4snow@gmail.com",
//         status: "active",
//         age: 16,
//     },
//     {
//         id: 5,
//         username: "Targaryen",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "5snow@gmail.com",
//         status: "passive",
//         age: 22,
//     },
//     {
//         id: 6,
//         username: "Melisandre",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "6snow@gmail.com",
//         status: "active",
//         age: 15,
//     },
//     {
//         id: 7,
//         username: "Clifford",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "7snow@gmail.com",
//         status: "passive",
//         age: 44,
//     },
//     {
//         id: 8,
//         username: "Frances",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "8snow@gmail.com",
//         status: "active",
//         age: 36,
//     },
//     {
//         id: 9,
//         username: "Roxie",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "snow@gmail.com",
//         status: "pending",
//         age: 65,
//     },
//     {
//         id: 10,
//         username: "Roxie",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         email: "snow@gmail.com",
//         status: "active",
//         age: 65,
//     },
// ];