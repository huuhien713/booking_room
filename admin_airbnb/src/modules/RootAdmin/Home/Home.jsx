import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import { getBookingRooms } from "../../../slices/bookingRoomSlice";
import { getComments } from "../../../slices/commentSlice";
import { getLocations } from "../../../slices/locationSlice";
import { getRooms } from "../../../slices/roomSlice";
import { getUser } from "../../../slices/userSlice";
import { Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading: loadUsers } = useSelector((state) => state.userSlice);
  const { rooms, loading: loadRooms } = useSelector((state) => state.roomSlice);
  const { bookingRooms, loading: loadbooking } = useSelector(
    (state) => state.bookingRoomSlice
  );
  const { comments, loading: loadComments } = useSelector(
    (state) => state.commentSlice
  );
  const { locations, loading: loadLocations } = useSelector(
    (state) => state.locationSlice
  );

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  useEffect(() => {
    dispatch(getBookingRooms());
  }, []);

  useEffect(() => {
    dispatch(getComments());
  }, []);

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  if (loadUsers || loadRooms || loadbooking || loadComments || loadLocations) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapHome}>
      <div className={styles.headerHomeAdmin}>
        <h4>HOME ADMIN</h4>
      </div>
      <div className={styles.contentHome}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className={styles.group}>
              <div className={styles.contentGroup}>
                <h1>{users.length}</h1>
                <p>Users</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.group}>
              <div className={styles.contentGroup}>
                <h1>{rooms.length}</h1>
                <p>Rooms</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.group}>
              <div className={styles.contentGroup}>
                <h1>{bookingRooms.length}</h1>
                <p>Booking</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.group}>
              <div className={styles.contentGroup}>
                <h1>{comments.length}</h1>
                <p>Comments</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.group}>
              <div className={styles.contentGroup}>
                <h1>{locations.length}</h1>
                <p>Location</p>
              </div>
            </div>
          </Col>
          <Col span={18}>
            <div className={styles.group}>
              {/* <Swiper
                loop={true}
                slidesPerView={5}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                width={500}
                modules={[Pagination]}
                className="mySwiper"
              >
                {locations.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div>
                      <img src={item.hinhAnh} alt={item.tenViTri} width={200} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper> */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
