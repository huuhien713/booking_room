import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Table, Modal } from "antd";
import { getLocations } from "../../../../../slices/locationSlice";
import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
import locationsAPI from "../../../../../services/locationsAPI";

import styles from "./Locations.module.scss";
import EditLocation from "../EditLocation/EditLocation";
import { handleModalAddImgLocation, handleModalEditLocation } from "../../../../../slices/modalSlice";
import AddImgLocation from "../AddImgLocation/AddImgLocation";

const Locations = () => {
  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state) => state.locationSlice);
  const { modalEditLocation, modalAddImgLocation } = useSelector(state => state.modalSlice);

  const [deletedLocation, setDeletedLocation] = useState(false);
  const [addImgLocationSuc, setAddImgLocationSuc] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idLocation, setIdLocation] = useState(null);
  // const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    dispatch(getLocations());
  }, [deletedLocation, addImgLocationSuc]);

  const deleteLocation = (id) => {
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
            await locationsAPI.deleteLocation(id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setDeletedLocation(!deletedLocation);
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

  //Modal
  const showModal = (id) => {
    dispatch(handleModalAddImgLocation());
    // setIsModalOpen(true);
    setIdLocation(id);
  };

  const handleCancel = () => {
    dispatch(handleModalAddImgLocation());
    // setIsModalOpen(false);
    setIdLocation(null);
    // setImgPreview(null);
  };


  //Table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Location Name",
      dataIndex: "locationName",
      key: "locationName",
    },
    {
      title: "Province Name",
      dataIndex: "provinceName",
      key: "provinceName",
    },
    {
      title: "Country Name",
      dataIndex: "countryName",
      key: "countryName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
  ];

  const dataSource = locations.map((item) => {
    return {
      key: item.id,
      id: item.id,
      locationName: item.tenViTri,
      provinceName: item.tinhThanh,
      countryName: item.quocGia,
      image: item.hinhAnh ? (
        <div className={styles.imgLocation}>
          <img
            src={item.hinhAnh}
            alt={item.tenViTri}
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div className={styles.addImgLocation} onClick={() => showModal(item.id)}>
          <div className={styles.iconAddImg} >
            <FileImageOutlined />
          </div>
          <p>Add image</p>
        </div>
      ),
      action: (
        <div className={styles.action}>
          <div className={styles.iconEdit} onClick={() =>dispatch(handleModalEditLocation(item))}>
            <EditOutlined />
          </div>
          <div
            className={styles.iconDelete}
            onClick={() => deleteLocation(item.id)}
          >
            <DeleteOutlined />
          </div>
        </div>
      ),
    };
  });
  return (
    <div>
      <div className={styles.wrapLocations}>
        {/* Header Users */}
        <div className={styles.headerLocations}>
          <h3>Locations</h3>
          <div className={styles.search}>
            <input type="text" placeholder="Search locations" />
            <SearchOutlined />
          </div>
        </div>

        {/* Table Users */}
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          size="middle"
          pagination={{
            position: ["bottomCenter"],
          }}
          scroll={{
            y: 550,
          }}
        />

        {/* Modal add image location*/}
        <Modal
          title="Adding image"
          open={modalAddImgLocation}
          width={1000}
          style={{ top: 20 }}
          footer={null}
          onCancel={handleCancel}
        >
          {/* <div className={styles.addImgLocation}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="file" onChange={handleImg} />
              <button className={styles.btnImgPreview}>Submit</button>
            </form>

            <div className={styles.imgPreview}>
              {imgPreview && <img src={imgPreview} alt="imgPreview" />}
            </div>
          </div> */}
          <AddImgLocation idLocation={idLocation} />
        </Modal>

        {/* Modal edit Location*/}
        <Modal
          title="Editing location"
          open={modalEditLocation}
          width={1000}
          style={{ top: 20 }}
          footer={null}
          onCancel={() => dispatch(handleModalEditLocation())}
        >
          <EditLocation />
        </Modal>
      </div>
    </div>
  );
};

export default Locations;
