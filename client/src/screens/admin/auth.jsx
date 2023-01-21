import { useContext, useEffect, useState } from "react";
import useInputState from "../../hooks/useInputState";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import {
  EmailOutlined as EmailIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  // collection,
  // query,
  // where,
  // getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/UserAuthContext";

export default function AdminAuth() {
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [email, setEmail, resetEmail] = useInputState("");
  const [password, setPassword, resetPassword] = useInputState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    email ? setValidEmail(true) : setValidEmail(false);
    password ? setValidPassword(true) : setValidPassword(false);
    if (email && password) {
      resetEmail();
      resetPassword();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserData(user);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    const getData = async () => {
      const docRef = doc(db, "users", userData.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().role === "admin") {
          dispatch({ type: "LOGIN", payload: { ...docSnap.data() } });
          navigate("/dashboard");
        } else {
          alert("You are simple user, please login auth/user!");
        }
      }
    };
    getData();
    // eslint-disable-next-line
  }, [userData]);

  return (
    <div className="auth auth-admin">
      <div className="auth__sidebar">
        <div className="form-container">
          <div className="form-container__logo">
            <div className="form-container__logo--sample" />
          </div>
          <form
            className="form-container__body margin-side-2"
            onSubmit={handleSubmit}
          >
            <h3>Вход</h3>
            <div className={`form-container__input`}>
              <h4 className="text-disabled">Ваш логин</h4>
              <div
                className={`form-container__input--field ${
                  !validEmail && "error"
                }`}
              >
                <TextField
                  type={"login"}
                  placeholder={"Ввудите логин..."}
                  variant={"outlined"}
                  name={"login"}
                  className={"text-field-input"}
                  value={email}
                  onChange={setEmail}
                />
                <EmailIcon />
              </div>
            </div>
            <div className="form-container__input">
              <h4 className="text-disabled">Паролъ</h4>
              <div
                className={`form-container__input--field ${
                  !validPassword && "error"
                }`}
              >
                <TextField
                  error={validPassword}
                  type={"password"}
                  placeholder={"Ведите свой паролъ..."}
                  variant={"outlined"}
                  name={"password"}
                  className={"text-field-input"}
                  value={password}
                  onChange={setPassword}
                />
                <LockIcon />
              </div>
            </div>
            <Button
              className="form-container__button padding-height"
              type="submit"
            >
              Войты
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
