import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { Col, Row } from "antd";
import userAPI from '../../../../../services/userAPI';
import Loading from '../../../../../components/Loading/Loading';


const UserId = () => {

    const { id } = useParams();

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        ( async () => {
            try {
                const user = await userAPI.getUserById(id);
                setUser(user);
            } catch (error) {
                console.log(error);
            }
        })()
    },[])
    console.log(user);

    if(!user) {
        return <Loading />;
    }
  return (
    <div>UserId</div>
  );
};

export default UserId;