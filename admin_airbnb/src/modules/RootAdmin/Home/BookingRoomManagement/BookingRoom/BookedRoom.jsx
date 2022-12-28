import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookingRooms } from "../../../../../slices/bookingRoomSlice";
import { Table, Modal } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import bookingRoomAPI from "../../../../../services/bookingRoomAPI";
import { useNavigate } from "react-router-dom";
import styles from "./BookingRoom.module.scss";
import { handleModalEditBooking } from "../../../../../slices/modalSlice";
import EditBooking from "../EditBooking/EditBooking";
const BookedRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookingRooms, loading } = useSelector(
    (state) => state.bookingRoomSlice
  );
  const { modalEditBooking } = useSelector((state) => state.modalSlice);

  const [deletedBooking, setDeletedBooking] = useState(false);

  useEffect(() => {
    dispatch(getBookingRooms());
  }, [deletedBooking]);

  const deleteBooking = (id) => {
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
            await bookingRoomAPI.deleteBooking(id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setDeletedBooking(!deletedBooking);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Deletion failed`,
            });
          }
        })();
      }
    });
  };

  //Modal

  const handleCancel = () => {
    dispatch(handleModalEditBooking());
  }

  // table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Room Code",
      dataIndex: "roomCode",
      key: "roomCode",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Customer Quantity",
      dataIndex: "customerQuan",
      key: "customerQuan",
    },
    {
      title: "User Code",
      dataIndex: "userCode",
      key: "userCode",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = bookingRooms.map((item) => {
    return {
      key: item.id,
      id: item.id,
      roomCode: item.maPhong,
      startDate: item.ngayDen,
      endDate: item.ngayDi,
      customerQuan: item.soLuongKhach,
      userCode: item.maNguoiDung,
      action: (
        <div className={styles.action}>
          <div
            className={styles.iconEdit}
            onClick={() => dispatch(handleModalEditBooking(item))}
          >
            <EditOutlined />
          </div>
          <div
            className={styles.iconDelete}
            onClick={() => deleteBooking(item.id)}
          >
            <DeleteOutlined />
          </div>
        </div>
      ),
    };
  });

  return (
    <div className={styles.wrapBooking}>
      {/* Header Users */}
      <div className={styles.headerBooking}>
        <h3>Booking Room</h3>
        <div className={styles.search}>
          <input type="text" placeholder="Search users" />
          <SearchOutlined />
        </div>
      </div>

      {/* Table */}
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        size="middle"
        pagination={{
          position: ["bottomCenter"],
        }}
      />

      {/* Modal */}
      <Modal
        title="Editing booking"
        open={modalEditBooking}
        footer={null}
        onCancel={handleCancel}
        width={1000}
        style={{ top: 20 }}
      >
        <EditBooking />
      </Modal>
    </div>
  );
};

export default BookedRoom;
