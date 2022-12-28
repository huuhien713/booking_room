import React, { useState } from 'react';
import {  useForm } from "react-hook-form";
import { UserAddOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';

import authAPI from '../../../services/authAPI';
import styles from "./Register.module.scss";

const Register = () => {
  const [successRe, setSuccessRe] = useState(false);
  
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
    },
  });

  const { errors } = formState;
  const onSubmit = async (values) => {
    try {
      await authAPI.register(values);
      
      Swal.fire({
        title: 'Success!',
        text: 'Congratulations on your successful registration',
        icon: 'success',
        confirmButtonText: 'Close'
      })

      setSuccessRe(true);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  };


  if(successRe){
    return <Navigate to="/"  replace/>
  }

  return (
    <div className={styles.wrapRegister}>
      <div className={styles.register}>
        {/* Title */}
        <div className={styles.title}>
          <div className={styles.iconRegister}>
            <UserAddOutlined />
          </div>
          <h1>Register</h1>
        </div>
        {/* Form */}
        <div className={styles.formRegister}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className={styles.inputRegister}>
              <label>Name</label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required!",
                  },
                })}
              />
              {errors.name && (
                <p className={styles.txtError}>{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.inputRegister}>
            <label>Email</label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is require!",
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                  message: "Email must be in the format!",
                },
              })}
            />
            {errors.email && (
              <p className={styles.txtError}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className={styles.inputRegister}>
            <label>Password</label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 character",
                }
              })}
            />
            {errors.password && (
              <p className={styles.txtError}>{errors.password.message}</p>
            )}
          </div>

          {/* phone */}
          <div className={styles.inputRegister}>
            <label>Phone</label>
            <input
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone is required!",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone is number",
                },
              })}
            />
            {errors.phone && (
              <p className={styles.txtError}>{errors.phone.message}</p>
            )}
          </div>

          {/* birthday */}
          <div className={styles.inputRegister}>
            <label>Birthday</label>
            <input 
              {...register("birthday", {
                required: {
                  value: true,
                  message: "Sinh nhật không được để trống !",
                },
                pattern: {
                  value: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                  message: "Sinh nhật có định dạng DD/MM/YYYY"
                }
              })}
            />
            {errors.birthday && (
              <p className={styles.txtError}>{errors.birthday.message}</p>
            )}
          </div>
          <div className={styles.inputRegister}>
            <label>Gender</label>
              <select {...register("gender", {
                required: {
                  value: true,
                  message: "Giới tính không được để trống"
                }
              })}>
                <option value="">Select Gender</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              { errors.gender && (<p className={styles.txtError}>{errors.gender.message}</p>)}
          </div>
          <div className={styles.inputRegister}>
            <label>Role</label>
              <select {...register("role", {
                required: {
                  value: true,
                  message: "Role is required"
                }
              })}>
                <option value="">Select Role</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
              { errors.role && (<p className={styles.txtError}>{errors.role.message}</p>)}
          </div>
          <div className={styles.btn}>
            <button>Sign Up</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;