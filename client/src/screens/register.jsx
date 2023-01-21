import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import LinearProgressWithLabel from "../components/LinearProgressWithLabel";
import { Box, Backdrop, CircularProgress } from "@mui/material";

export default function Register() {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [backDrop, toggleBackDrop] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [progress, setProgress] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassChange = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + image.name;

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          //console.log(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at ", downloadURL);
            setImageURL(downloadURL);
          });
        }
      );
    };
    // eslint-disable-next-line
    image && uploadFile();
  }, [image]);

  let handleAdd;

  handleAdd = async (e) => {
    e.preventDefault();
    if (confirmPass === password && password.length > 6) {
      toggleBackDrop(true);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          fullname: name,
          email: email,
          number: number,
          password: password,
          imageURL: imageURL,
          role: "user",
          timeStamp: serverTimestamp(),
        });
        navigate("/auth/user");
      } catch (err) {
        //console.log(err);
      }
    } else {
      alert("Password be the same");
    }
  };

  return (
    <div className="register-user">
      <Backdrop
        open={backDrop}
        className={"register-user__backdrop"}
        onClick={() => toggleBackDrop(!backDrop)}
      >
        <CircularProgress />
      </Backdrop>
      <form className="register-user__form">
        <div className="register-user__form--group">
          <h2 className="form__group--title">Регистрация</h2>
          <div className="form__group">
            <input
              id="name"
              type="name"
              className="form__input"
              placeholder="Имя и фамилия"
              required
              onChange={handleNameChange}
              value={name}
            />
            <label className="form__label">ФИО</label>
          </div>
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
              type="text"
              className="form__input"
              placeholder="Ваш номер телефона."
              required
              onChange={handleNumberChange}
              value={number}
            />
            <label className="form__label">Ваш номер телефона.</label>
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
          <div className="form__group">
            <input
              id="name"
              type="password"
              className="form__input"
              placeholder="Подтвердите свой пароль"
              required
              onChange={handleConfirmPassChange}
              value={confirmPass}
            />
            <label className="form__label">Подтвердите свой пароль</label>
          </div>
          <div className="form__group">
            <label
              className={`form__group--label ${
                progress === 100 && "bg-orange"
              }`}
              htmlFor="upload-picture"
            >
              {progress === 100
                ? "Файл загружен"
                : progress === 0
                ? "Файл загружается..."
                : "Нажмите здесь, чтобы загрузить изображение профиля"}
            </label>
            <input
              id="upload-picture"
              type={!progress ? "file" : "button"}
              className="form__input display-none"
              placeholder="Изображение"
              onChange={handleImageChange}
              required
            />
            {progress !== 100 && (
              <div className="form__group--progress">
                <Box sx={{ width: "100%" }}>
                  <LinearProgressWithLabel value={progress ? progress : 0} />
                </Box>
              </div>
            )}
          </div>
          <div className="form__submits">
            <button
              type="submit"
              disabled={progress < 100 && progress !== null}
              className="form__submits--button"
              onClick={handleAdd}
            >
              Создать аккаунт
            </button>
          </div>
          <div className="form__submits--details">
            <h4>
              уже есть аккаунт? <Link to={"/auth/user"}>Aвторизоваться!</Link>
            </h4>
          </div>
        </div>
      </form>
      <div className="register-user__layout" />
    </div>
  );
}
