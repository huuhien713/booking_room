import React from "react";
import { useForm } from "react-hook-form";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../slices/authSlice";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const {user } = useSelector(state => state.authSlice);


  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const { errors } = formState;

  
  const onSubmit = (values) => {
    dispatch(login(values));
  };

  if(user){
    return <Navigate to="/admin" />
  }

  return (
    <div className={styles.wrapLogin}>
      <div className={styles.logIn}>
        <div className={styles.title}>
          <div className={styles.iconLogin}>
            <UserOutlined />
          </div>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className={styles.inputLogin}>
            <label>Email</label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email không được để trống !",
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                  message: "Email phải đúng định dạng !",
                },
              })}
            />
            {errors.email && (
              <p className={styles.txtError}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className={styles.inputLogin}>
            <label>Password</label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống !",
                },
              })}
            />
            {errors.password && (
              <p className={styles.txtError}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.btn}>
            <button>Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
