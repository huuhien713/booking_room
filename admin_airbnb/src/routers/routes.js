import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import NotFound from "../components/NotFound";
import Access from "../modules/Access/Access";
import Auth from "../modules/Auth/Auth";
import Login from "../modules/Auth/Login/Login";
import Register from "../modules/Auth/Resgister/Register";
import RootAdmin from "../modules/RootAdmin";
import AddBookingRoom from "../modules/RootAdmin/Home/BookingRoomManagement/AddBookingRoom/AddBookingRoom";
import BookedRoom from "../modules/RootAdmin/Home/BookingRoomManagement/BookingRoom/BookedRoom";
import BookingRoomId from "../modules/RootAdmin/Home/BookingRoomManagement/IdBooking/BookingRoomId";
import AddComment from "../modules/RootAdmin/Home/CommentManagement/AddComment/AddComment";
import Comments from "../modules/RootAdmin/Home/CommentManagement/Comments/Comments";
import Home from "../modules/RootAdmin/Home/Home";
import AddLocation from "../modules/RootAdmin/Home/LocationManagement/AddLocation/AddLocation";
import Locations from "../modules/RootAdmin/Home/LocationManagement/Locations/Locations";
import AddRoom from "../modules/RootAdmin/Home/RoomManagement/AddRoom";
import RoomId from "../modules/RootAdmin/Home/RoomManagement/IdRoom/RoomId";
import Rooms from "../modules/RootAdmin/Home/RoomManagement/Room/Rooms";
import AddUser from "../modules/RootAdmin/Home/UserManagement/AddUser/AddUser";
import UserId from "../modules/RootAdmin/Home/UserManagement/IdUser/UserId";
import Users from "../modules/RootAdmin/Home/UserManagement/User/Users";

import Protected from "./Protected";

const routes = createBrowserRouter([
  // Access
  { path: "/", element: <Access />, errorElement: <ErrorBoundary /> },

  // Auth
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // Admin
  {
    path: "/admin",
    element: (
      <Protected>
        <RootAdmin />
      </Protected> 
    ),
    errorElement: <ErrorBoundary />,
    children: [
        { path: "/admin", element: <Home />,children: [
            // User
            {path:"/admin/users", element: <Users />},
            {path:"/admin/addUser",element: <AddUser />},
            {path:"/admin/users/:id", element: <UserId />},
            // Room
            {path:"/admin/rooms",element: <Rooms />},
            {path:"/admin/addRoom",element: <AddRoom />},
            {path:"/admin/rooms/:id", element: <RoomId />},
            // Booking
            {path:"/admin/bookedRoom",element: <BookedRoom />},
            {path:"/admin/bookingRoom",element: <AddBookingRoom />},
            {path: "/admin/bookedRoom/:id",element: <BookingRoomId />},
            // Comment
            {path:"/admin/comments",element: <Comments />},
            {path:"/admin/addComment",element: <AddComment />},
            // Location
            {path:"/admin/locations",element: <Locations />},
            {path:"/admin/addLocation",element: <AddLocation />}
        ]},
    ]
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;
