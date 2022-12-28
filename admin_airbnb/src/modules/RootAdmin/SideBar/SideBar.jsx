import React, { useState } from "react";
import {
  HomeOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  GoldOutlined,
  BookOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../slices/authSlice";
import styles from "./SideBar.module.scss";
import Loading from "../../../components/Loading/Loading";

const SideBar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const { user, loading } = useSelector(state => state.authSlice)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Home", "1", <HomeOutlined />),
    getItem("User Management", "sub1", <IdcardOutlined />, [
      getItem(<Link to="/admin/users">Users</Link>, "2"),
      getItem(<Link to="/admin/addUser">Add User</Link>, "3"),
    ]),
    getItem("Room Management", "sub2", <GoldOutlined />, [
      getItem(<Link to="/admin/rooms">Rooms</Link>, "4"),
      getItem(<Link to="/admin/addRoom">Add Room</Link>, "5"),
    ]),
    getItem("Booking Management", "sub3", <BookOutlined />, [
      getItem(<Link to="/admin/bookedRoom">Booking Rooms</Link>, "6"),
      getItem(<Link to="/admin/bookingRoom">Add Booking Rooms</Link>, "7"),
    ]),
    getItem("Comment Management", "sub4", <CommentOutlined />, [
      getItem(<Link to="/admin/comments">Comments</Link>, "8"),
      getItem(<Link to="/admin/addComment">Add Comment</Link>, "9"),
    ]),
    getItem("Location Management", "sub5", <EnvironmentOutlined />, [
      getItem(<Link to="/admin/locations">Locations</Link>, "10"),
      getItem(<Link to="/admin/addLocation">Add Location</Link>, "11"),
    ]),
    getItem("Account", "sub6", <UserOutlined />, [
      getItem(
        <div onClick={() => dispatch(logout())}>
          <p>Logout</p>
        </div>,
        "13"
      )
    ]),
  ];


  if(loading){
    return <Loading />;
  }

  return (
    <div className={styles.wrapSidebar}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        // theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};

export default SideBar;
