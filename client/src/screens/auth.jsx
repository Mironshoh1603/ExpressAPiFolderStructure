import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserAuthContext";
import { doc, getDoc } from "firebase/firestore";
import { Backdrop, CircularProgress } from "@mui/material";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [backDrop, toggleBackDrop] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn = () => {
    toggleBackDrop(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserData(user);
        toggleBackDrop(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", userData.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        if (docSnap.data().role === "user") {
          console.log(docSnap.data());
          dispatch({ type: "LOGIN", payload: { ...docSnap.data() } });
          setTimeout(() => {
            navigate("/app/submissions");
          }, 1200);
        } else {
          navigate("/dashboard/requests");
        }
      }
    };
    getData();
    // eslint-disable-next-line
  }, [userData]);
  return (
    <div className="auth-user">
      <Backdrop 
        open={backDrop} 
        className={'register-user__backdrop'} 
        onClick={() => toggleBackDrop(!backDrop)}
      >
        <CircularProgress/>
      </Backdrop>
      <div className="auth-user__form">
        <div className="auth-user__form--group">
          <h2 className="form__group--title">Авторизоваться</h2>
          <div className="form__group">
            <input
              id="name"
              type="email"
              className="form__input"
              placeholder="Адрес электронной почты"
              required
              onChange={handleEmailChange}
              value={email}
            />
            <label className="form__label">Эл. адрес</label>
          </div>
          <div className="form__group">
            <input
              id="name"
              type="password"
              className="form__input"
              placeholder="Bаш пароль"
              required
              onChange={handlePasswordChange}
              value={password}
            />
            <label className="form__label">Bаш пароль</label>
          </div>
          <div className="form__submits">
            <button onClick={handleSignIn} className="form__submits--button">
              Bход
            </button>
            <h4>
              Или войдите как <Link to={"/auth/admin"}>Aдминистратор</Link>
            </h4>
          </div>
          <div className="form__submits--details">
            <h4>
              Еще нет аккаунта? <Link to={"/register"}>Pегистр</Link>
            </h4>
          </div>
        </div>
      </div>
      <div className="auth-user__layout" />
    </div>
  );
}
