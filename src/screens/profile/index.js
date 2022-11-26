import React from 'react'
import { getUser } from "../../components/useLocalStorage";
import UserService from "../../services/user.service";
const userService = new UserService();

function Profile() {
    const [user, setUser] = React.useState({
        id: "",
        fullname: "",
        phonenumber: "",
        address: "",
        avatar: "",
        role_id: "",
        province_id: "",
        district_id: "",
        ward_id: "",
        street_id: "",
    });

    const updateUser = (newState) => {
        setUser((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const getUserByID = async (user_id) => {
        try {
            var result = await userService.userByID(user_id);
            updateUser({
                id: result.data[0].id,
                fullname: result.data[0].fullname,
                phonenumber: result.data[0].phonenumber,
                address: result.data[0].address,
                province_id: result.data[0].province_id,
                role_id: result.data[0].role_id,
            })
        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        let user_id = getUser().id;
        getUserByID(user_id);
    }, []);


    return (
        <div>
            <h3>Chào mừng người dùng {user.fullname} !!!</h3>
            <p>Số điện thoại: {user.phonenumber}</p>
            <p>Địa chỉ:{user.address}</p>
        </div>
    )
}

export default Profile