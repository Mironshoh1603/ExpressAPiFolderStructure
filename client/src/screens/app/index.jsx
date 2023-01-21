import { Outlet } from "react-router-dom";
import Drawer from "../../components/drawer";
import Header from "../../components/header";
import menuItems from "../../utils/menuItems";

function AppView() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  return (
    <div className="app__view">
      <Drawer to={"/"} parent={"app"} menuItems={menuItems} />
      <Header user={user} navPanel />
      <main className="app__view--main">
        <Outlet context={[user]} />
      </main>
    </div>
  );
}

export default AppView;
