import { useContext } from "react";
import { IconButton, Badge, Avatar } from "@mui/material";
import {
  NotificationsOutlined as AlertIcon,
  KeyboardArrowDownOutlined as ArrowDown,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserAuthContext";

function Header({ user, navPanel }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSignOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth/user");
    localStorage.removeItem("user");
  };
  return (
    <header className="app__header">
      <nav className="app__nav">
        <div className="app__nav--options">
          <div className="app__nav--notifications">
            <IconButton>
              <Badge overlap={"rectangular"} badgeContent={12} color={"error"}>
                <AlertIcon />
              </Badge>
            </IconButton>
          </div>
          <div className="app__nav--profile">
            <Avatar
              alt={user.fullname}
              src={user.imageURL}
              className="app__nav--profile-photo"
            />
            <h3 className="app__nav--profile-name">{user.fullname}</h3>
            <IconButton onClick={handleSignOut}>
              <LogoutIcon/>
            </IconButton>
          </div>
        </div>
      </nav>
      {navPanel && (
        <div className="preview__panel">
          <div className="preview__panel--menubar">
            <div className="preview__panel--menu active-menu">
              Таможенное оформление
            </div>
            <div className="preview__panel--menu">Сертификация груза</div>
            <div className="preview__panel--menu">
              Подготовка контракта 4 ТНВЕД
            </div>
          </div>
          <div className="preview__panel--options">
            Ещё{" "}
            <IconButton>
              <ArrowDown />
            </IconButton>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
