import Sidebar from "./SideBar";
import "./Layout.module.css";
import Header from "./Header";
import Product from "../product";

const Layout = ({ children, width, height, color }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px auto",
      }}
    >
      <div >
      <Sidebar/>
      </div>
      <div className="dashboardContainer">
        <Product />
        {/* {Product} */}
      </div>
    </div>
  );
};

export default Layout;
