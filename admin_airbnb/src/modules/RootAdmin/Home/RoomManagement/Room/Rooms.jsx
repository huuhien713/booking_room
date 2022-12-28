import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRooms, setRoomNull } from "../../../../../slices/roomSlice";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Table, Modal } from "antd";
import Swal from "sweetalert2";
import roomAPI from "../../../../../services/RoomAPI";
import { handleModalAddImgRoom, handleModalEditRoom } from "../../../../../slices/modalSlice";
import EditRoom from "../EditRoom/EditRoom";
import AddImgRoom from "../AddImgRoom/AddImgRoom";

import styles from "./Room.module.scss";



const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, loading } = useSelector((state) => state.roomSlice);
  const { modalEditRoom, modalAddImgRoom} = useSelector(state => state.modalSlice)

  const [deletedRoom, setDeletedRoom] = useState(false);
  const [idRoom, setIdRoom] = useState(null);

  useEffect(() => {
    dispatch(getRooms());
  }, [deletedRoom]);

  //Modal
  const showModalAddImg = (id) => {
    dispatch(handleModalAddImgRoom());
    setIdRoom(id);
  };

  const handleCancelAddImg = () => {
    dispatch(handleModalAddImgRoom());
    setIdRoom(null);
  };

  const showModalEditRoom = (id) => {
    dispatch(handleModalEditRoom())
    setIdRoom(id);
  };
  const handleCancelEditRoom = () => {
    dispatch(handleModalEditRoom());
    setIdRoom(null);
    dispatch(setRoomNull());
  };

  // Delele room
  const deleteRoom = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await roomAPI.deleteRoom(id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setDeletedRoom(!deletedRoom);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          }
        })();
      }
    });
  };

  // Table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Bed room",
      dataIndex: "bedroom",
      key: "bedroom",
      width: 50,
    },
    {
      title: "Bed",
      dataIndex: "bed",
      key: "Bed",
      width: 50,
    },
    {
      title: "Bathroom",
      dataIndex: "bathroom",
      key: "bathroom",
      width: 50,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 55,
    },
    {
      title: "Location Code",
      dataIndex: "locationCode",
      key: "locationCode",
      width: 75,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Utilities",
      dataIndex: "utilities",
      key: "utilities",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 60,
    },
  ];

  const dataSource = rooms.map((item) => {
    return {
      key: item.id,
      id: item.id,
      name: item.tenPhong,
      bedroom: item.phongNgu,
      bed: item.giuong,
      bathroom: item.phongTam,
      price: `${item.giaTien} $`,
      locationCode: item.maViTri,
      image: item.hinhAnh ? (
        <img
          src={item.hinhAnh}
          alt={item.tenPhong}
          width="100%"
          height="100%"
        />
      ) : (
        <div className={styles.addImgRoom} onClick={() => showModalAddImg(item.id)}>
          <div className={styles.iconAddImg}>
            <FileImageOutlined />
          </div>
          <p>Add image</p>
        </div>
      ),
      utilities: (
        <div>
          {item.maygiac ? <span>washing machine, </span> : ""}
          {item.banla ? <span>iron, </span> : ""}
          {item.tive ? <span>television, </span> : ""}
          {item.dieuHoa ? <span>air codition, </span> : ""}
          {item.wifi ? <span>wifi, </span> : ""}
          {item.bep ? <span>kitchen, </span> : ""}
          {item.doXe ? <span>parking, </span> : ""}
          {item.hoBoi ? <span>pool, </span> : ""}
        </div>
      ),
      description: item.moTa,
      action: (
        <div className={styles.action}>
          <div
            className={styles.iconEdit}
            // onClick={() => navigate(`/admin/rooms/${item.id}`)}
            onClick={() => showModalEditRoom(item.id)}
          >
            <EditOutlined />
          </div>
          <div
            className={styles.iconDelete}
            onClick={() => deleteRoom(item.id)}
          >
            <DeleteOutlined />
          </div>
        </div>
      ),
    };
  });

  return (
    <div>
      <div className={styles.headerRoom}>
        {/* Header Users */}
        <div className={styles.headerRoom}>
          <h4>ROOMS</h4>
          <div className={styles.search}>
            <input type="text" placeholder="Search rooms" />
            <SearchOutlined />
          </div>
        </div>

        {/* Table */}
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          size="small"
          pagination={{
            position: ["bottomCenter"],
          }}
          scroll={{
            y: 500,
            // x: 700,
          }}
        />

        {/* Modal */}
        <Modal
          title="Adding image"
          open={modalAddImgRoom}
          width={1000}
          style={{ top: 20 }}
          footer={null}
          onCancel={handleCancelAddImg}
        >
          <AddImgRoom idRoom={idRoom} />
        </Modal>

        {/* Modal Edit Room */}
        <Modal
          title="Editing room"
          open={modalEditRoom}
          width={1000}
          style={{ top: 20 }}
          footer={null}
          onCancel={handleCancelEditRoom}
        >
          <EditRoom idRoom={idRoom} />
        </Modal>
      </div>
    </div>
  );
};

export default Rooms;
