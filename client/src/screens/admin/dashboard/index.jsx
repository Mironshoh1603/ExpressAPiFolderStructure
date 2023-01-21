import { Outlet } from "react-router-dom";
import Drawer from "../../../components/drawer";
import Header from "../../../components/header";
import dashboardMenuItems from "../../../utils/dashboardMenuItems";

function Dashboard() {
  const dataUser = localStorage.getItem("user");
  const admin = JSON.parse(dataUser);
  console.log(admin);
  return (
    <div className="app__view">
      <Drawer
        to={"/dashboard/requests"}
        parent={"dashboard"}
        menuItems={dashboardMenuItems}
      />
      <Header user={admin} navPanel />
      <main className="app__view--main">
        <Outlet context={[admin]} />
      </main>
    </div>
  );
}

export default Dashboard;
