// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
// import Reports from "../../components/reports/Reports";
// import Table from "../../components/table/Table";
import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()

  useEffect(()=> {
    if (!localStorage.getItem('accessToken')){
      navigate('/login')
    }
  },[])
  return (
    <div className="home">
      {/* <Sidebar /> */}
      <div className="homeContainer">
        {/* <Navbar /> */}
        {/* <Reports/> */}
        <h1>DASHBOARD</h1>
      </div>
    </div>
  );
};

export default Home;
