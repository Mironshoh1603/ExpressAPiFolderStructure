import { Button, IconButton } from "@mui/material";
import {
  FileDownload as DownloadIcon,
  FileUpload as UploadIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../firebase";
import { updateDoc, doc as docFirebase } from "firebase/firestore";
import Choice from "../../../../components/choice";
import { Backdrop, CircularProgress } from "@mui/material";

export default function ViewRequests({ drawerStatus, doc }) {
  const [completedFile, setCompletedFile] = useState("");
  const [completedFileURL, setCompletedFileURL] = useState("");
  const [adminComment, setAdminComment] = useState("");
  const [backDrop, toggleBackDrop] = useState(false);

  //   500 - Processing,
  //   200 - Accepted
  //   404 - Rejected
  //   499 - NOT SEEN
  // eslint-disable-next-line
  const [status, setStatus] = useState(499);
  const [progress, setProgress] = useState(false);

  const handleCompletedFileChange = (e) => {
    setCompletedFile(e.target.files[0]);
  };
  const handleAdminComment = (e) => {
    setAdminComment(e.target.value);
  };

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + completedFile.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, completedFile);

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
          console.log(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at ", downloadURL);
            setCompletedFileURL(downloadURL);
          });
        }
      );
      return;
    };
    completedFile && uploadFile();
  }, [completedFile]);

  const handleUpdate = async () => {
    delete doc.status;
    delete doc.completedFile;
    delete doc.adminComment;
    const newDocument = {
      completedFile: completedFileURL,
      adminComment: adminComment,
      status: 200,
      ...doc,
    };
    toggleBackDrop(true);
    const washingtonRef = docFirebase(db, "documents", doc.id);
    try {
      await updateDoc(washingtonRef, newDocument);
      toggleBackDrop()
      drawerStatus(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="request-view">
      <Backdrop
        open={backDrop}
        className={"register-user__backdrop"}
        onClick={() => toggleBackDrop(!backDrop)}
      >
        <CircularProgress />
      </Backdrop>
      <header className="request-view__header">
        <h3 className="request-view__header--title">Добавление заявки</h3>
      </header>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">Процедуры</h4>
        <div className="request-view__selection--choice">
          <h4 className="choice--name">{doc.procedure}</h4>
        </div>
      </div>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">Выбор режима</h4>
        <div className="request-view__selection--choice">
          <h4 className="choice--name">{doc.rejim}</h4>
        </div>
      </div>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">
          Транспортная накладная (TIR,CMR,жд,накладная,авиа накладная,коносамент
          и т.д
        </h4>
        <div className="request-view__selection--choice choice--uploads">
          <h4 className="choice--name">
            Скачать файл:{" "}
            <span className="choice--name--file">
              {String(doc.transportNak).slice(75, 90) +
                "." +
                String(doc.transportNak).slice(
                  String(doc.transportNak).indexOf("alt") - 4,
                  String(doc.transportNak).indexOf("alt") - 1
                )}
            </span>
          </h4>
          <a target="_blank" href={doc.transportNak}>
            <IconButton className="choice--icon">
                <DownloadIcon />
            </IconButton>
          </a>
        </div>
      </div>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">Инвойс</h4>
        <div className="request-view__selection--choice choice--uploads">
          <h4 className="choice--name">
            Скачать файл:{" "}
            <span className="choice--name--file">
              {" "}
              {String(doc.invoice).slice(75, 90) +
                "." +
                String(doc.invoice).slice(
                  String(doc.invoice).indexOf("alt") - 4,
                  String(doc.invoice).indexOf("alt") - 1
                )}
            </span>
          </h4>
          <a target="_blank" href={doc.invoice}>
            <IconButton className="choice--icon">
                <DownloadIcon />
            </IconButton>
          </a>
        </div>
      </div>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">Конракт</h4>
        <div className="request-view__selection--choice choice--uploads">
          <h4 className="choice--name">
            Скачать файл:{" "}
            <span className="choice--name--file">
              {" "}
              {String(doc.contract).slice(75, 90) +
                "." +
                String(doc.contract).slice(
                  String(doc.contract).indexOf("alt") - 4,
                  String(doc.contract).indexOf("alt") - 1
                )}
            </span>
          </h4>
          <a target="_blank" href={doc.contract}>
            <IconButton className="choice--icon">
                <DownloadIcon />
            </IconButton>
          </a>
        </div>
      </div>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">
          Сертефикат происхождения
        </h4>
        <div className="request-view__selection--choice choice--uploads">
          <h4 className="choice--name">
            Скачать файл:{" "}
            <span className="choice--name--file">
              {" "}
              {String(doc.certificate).slice(75, 90) +
                "." +
                String(doc.certificate).slice(
                  String(doc.certificate).indexOf("alt") - 4,
                  String(doc.certificate).indexOf("alt") - 1
                )}
            </span>
          </h4>
          <a target="_blank" href={doc.certificate}>
            <IconButton className="choice--icon">
                <DownloadIcon />
            </IconButton>
          </a>
        </div>
      </div>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">
          Дополнительная документация
        </h4>
        <div className="request-view__selection--choice choice--uploads">
          <h4 className="choice--name">
            Скачать файл:{" "}
            <span className="choice--name--file">
              {String(doc.extraDocument).slice(75, 90) +
                "." +
                String(doc.extraDocument).slice(
                  String(doc.extraDocument).indexOf("alt") - 4,
                  String(doc.extraDocument).indexOf("alt") - 1
                )}
            </span>
          </h4>
          <a target="_blank" href={doc.extraDocument}>
            <IconButton className="choice--icon">
                <DownloadIcon />
            </IconButton>
          </a>
        </div>
      </div>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">Фотографии товаров</h4>
        <div className="request-view__selection--choice choice--uploads">
          <h4 className="choice--name">
            Скачать файл:{" "}
            <span className="choice--name--file">
              {" "}
              {String(doc.imageProduct).slice(75, 90) +
                "." +
                String(doc.imageProduct).slice(
                  String(doc.imageProduct).indexOf("alt") - 4,
                  String(doc.imageProduct).indexOf("alt") - 1
                )}
            </span>
          </h4>
          <a target="_blank" href={doc.imageProduct}>
            <IconButton className="choice--icon">
                <DownloadIcon />
            </IconButton>
          </a>
        </div>
      </div>
      <div className="request-view__selection">
        <h4 className="request-view__selection--name">Список пакетов</h4>
        <div className="request-view__selection--choice choice--uploads">
          <h4 className="choice--name">
            Скачать файл:
            <span className="choice--name--file">
              {String(doc.prochieDocument).slice(75, 90) +
                "." +
                String(doc.prochieDocument).slice(
                  String(doc.prochieDocument).indexOf("alt") - 4,
                  String(doc.prochieDocument).indexOf("alt") - 1
                )}
            </span>
          </h4>
          <a target="_blank" href={doc.prochieDocument}>
            <IconButton className="choice--icon">
                <DownloadIcon />
            </IconButton>
          </a>
        </div>
      </div>
      <div className="request-view__selection padding-height-2">
        <h4 className="subtitle padding-height-1">Дополнительная услуги</h4>
        <Choice text={'Определение кодов ТНВЭД в "Узбекэспертиза"'}/>
      </div>
      <div className="request-view__selection margin-top-1">
        <h4 className="request-view__selection--name">Прочие документы</h4>
        <div className="request-view__selection--choice choice--uploads">
          <h4 className="choice--name">
            Скачать файл:{" "}
            <span className="choice--name--file">
              {" "}
              {String(doc.prochieDocument).slice(75, 90) +
                "." +
                String(doc.prochieDocument).slice(
                  String(doc.prochieDocument).indexOf("alt") - 4,
                  String(doc.prochieDocument).indexOf("alt") - 1
                )}
            </span>
          </h4>
          <a target={'_blank'} href={doc.prochieDocument}>
            <IconButton className="choice--icon">
              <DownloadIcon />
            </IconButton>
          </a>
        </div>
      </div>
      <div className="form form--textarea">
        <h4 className="subtitle padding-top">Комментарий к заявке</h4>
        <textarea
          onChange={handleAdminComment}
          value={adminComment}
          placeholder="Введите комментарий..."
        />
      </div>
      <div className="w-100 bg-gray border-radius padding-1">
        <h4 className="subtitle">Загрузить готовый документ</h4>
        <label
          className="request-view__selection--choice choice--uploads margin-top-1"
          htmlFor="upload-folder"
        >
          <div className="choice--name">
            {/* If uploaded file is true then this not does not even needs to appear */}
            Выберите файл...
            {/* If the uploaed file is true then show this file name */}
            <span className="choice--name--file--uploaded">
              {completedFile.name}
            </span>
          </div>
          <input
            onChange={handleCompletedFileChange}
            type={"file"}
            id={"upload-folder"}
            className="display-none"
          />
          <IconButton className="choice--icon">
            <UploadIcon />
          </IconButton>
        </label>
      </div>
      <div className="display-flex-center margin-top-1">
        <Button
          onClick={handleUpdate}
          className="app-button app-button--warning padding-height margin-top"
        >
          Подать заявку
        </Button>
        <Button className="app-button-white padding-height margin-left-1 margin-top">
          Отклонить
        </Button>
        <Button className="app-button-white padding-height margin-left-1 margin-top">
          На доработку
        </Button>
      </div>
    </div>
  );
}
