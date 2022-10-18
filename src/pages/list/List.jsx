import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { Outlet } from "react-router-dom"
// import Datatable from "../../components/datatable/Datatable"
// import AllUsersData from "../../components/usersData/AllUsersData"
// import Reports from "../../components/reports/Reports"

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* <AllUsersData/> */}
        {/* <Reports/> */}
        <Outlet />

      </div>
    </div>
  )
}

export default List