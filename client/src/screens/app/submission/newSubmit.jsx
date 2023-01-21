import Select from "../../../components/select";
import Choice from "../../../components/choice";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Backdrop, CircularProgress } from "@mui/material";

function NewSubmit({ drawerStatus }) {
  const [procedure, setProcudure] = useState("");
  const [rejim, setRejim] = useState("");
  const [transportNak, setTransportNak] = useState("");
  const [transportNakURL, setTransportNakURL] = useState("");
  const [invoice, setInvoice] = useState("");
  const [invoiceURL, setInvoiceURL] = useState("");
  const [packageList, setPackageList] = useState("");
  const [packageListURL, setPackageListURL] = useState("");
  const [contract, setContract] = useState("");
  const [contractURL, setContractURL] = useState("");
  const [certificate, setCertificate] = useState("");
  const [certificateURL, setCertificateURL] = useState("");
  const [extraDocument, setExtraDocument] = useState("");
  const [extraDocumentURL, setExtraDocumentURL] = useState("");
  const [imageProduct, setImageProduct] = useState("");
  const [imageProductURL, setImageProductURL] = useState("");
  const [checking, setChecking] = useState(false);
  const [sostavDogovor, setSostavDogovor] = useState(false);
  const [prochieDocument, setProchieDocument] = useState("");
  const [prochieDocumentURL, setProchieDocumentURL] = useState("");
  const [comment, setComment] = useState("");
  const [backDrop, toggleBackDrop] = useState(false);
  //   500 - Processing,
  //   200 - Accepted
  //   404 - Rejected
  //   499 - NOT SEEN
  // eslint-disable-next-line
  const [status, setStatus] = useState(499);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [progress5, setProgress5] = useState(false);
  const [progress6, setProgress6] = useState(false);
  const [progress7, setProgress7] = useState(false);
  const [progress8, setProgress8] = useState(false);

  const handleProcedureChange = (e) => {
    setProcudure(e.target.value);
  };

  const handleRejimChange = (e) => {
    setRejim(e.target.value);
  };

  const handleTransportNakChange = (e) => {
    setTransportNak(e.target.files[0]);
  };

  const handleInvoiceChange = (e) => {
    setInvoice(e.target.files[0]);
  };
  const handlePackageListChange = (e) => {
    setPackageList(e.target.files[0]);
  };
  const handleContractChange = (e) => {
    setContract(e.target.files[0]);
  };
  const handleCertificateChange = (e) => {
    setCertificate(e.target.files[0]);
  };
  const handleExtraDocumentChange = (e) => {
    setExtraDocument(e.target.files[0]);
  };
  const handleImageProductChange = (e) => {
    setImageProduct(e.target.files[0]);
  };
  const handleCheckingChange = (value) => {
    setChecking(value);
  };
  const handleSostavDogovorChange = (value) => {
    setSostavDogovor(value);
  };
  const handleProchieDocumentChange = (e) => {
    setProchieDocument(e.target.files[0]);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + transportNak.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, transportNak);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress1(progress);
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
            setTransportNakURL(downloadURL);
          });
        }
      );
      return;
    };
    transportNak && uploadFile();
  }, [transportNak]);

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + invoice.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, invoice);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress2(progress);
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
            setInvoiceURL(downloadURL);
          });
        }
      );
      return;
    };
    invoice && uploadFile();
  }, [invoice]);

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + packageList.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, packageList);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress3(progress);
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
            setPackageListURL(downloadURL);
          });
        }
      );
      return;
    };
    packageList && uploadFile();
  }, [packageList]);

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + contract.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, contract);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress4(progress);
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
            setContractURL(downloadURL);
          });
        }
      );
      return;
    };
    contract && uploadFile();
  }, [contract]);

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + certificate.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, certificate);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress5(progress);
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
            setCertificateURL(downloadURL);
          });
        }
      );
      return;
    };
    certificate && uploadFile();
  }, [certificate]);

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + extraDocument.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, extraDocument);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress6(progress);
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
            setExtraDocumentURL(downloadURL);
          });
        }
      );
      return;
    };
    extraDocument && uploadFile();
  }, [extraDocument]);

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + imageProduct.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, imageProduct);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress7(progress);
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
            setImageProductURL(downloadURL);
          });
        }
      );
      return;
    };
    imageProduct && uploadFile();
  }, [imageProduct]);

  useEffect(() => {
    const uploadFile = () => {
      const getName = new Date().getTime() + prochieDocument.name;

      const storageRef = ref(storage, getName);
      const uploadTask = uploadBytesResumable(storageRef, prochieDocument);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress8(progress);
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
            setProchieDocumentURL(downloadURL);
          });
        }
      );
      return;
    };
    prochieDocument && uploadFile();
  }, [prochieDocument]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      toggleBackDrop(true);
      const userEmail = JSON.parse(localStorage.getItem("user")).email;
      console.log(userEmail);
      const documentsRef = doc(collection(db, "documents"));

      await setDoc(documentsRef, {
        procedure: procedure,
        rejim: rejim,
        transportNak: transportNakURL,
        invoice: invoiceURL,
        packageList: packageListURL,
        contract: contractURL,
        certificate: certificateURL,
        extraDocument: extraDocumentURL,
        imageProduct: imageProductURL,
        prochieDocument: prochieDocumentURL,
        comment: comment,
        checking: checking,
        sostavDogovor: sostavDogovor,
        status: status,
        userEmail: userEmail,
        timeStamp: serverTimestamp(),
      });

      drawerStatus();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Backdrop
        open={backDrop}
        className={"register-user__backdrop"}
        onClick={() => toggleBackDrop(!backDrop)}
      >
        <CircularProgress />
      </Backdrop>
      <form>
        <h3>Добавление заявки</h3>
        <Select
          label={"Выбор процедуры"}
          keyName={"submit-1"}
          arrowKey={"down"}
          selections={["Импорт", "Экспорт"]}
          onChange={handleProcedureChange}
          defaultVariant={procedure}
        />
        <Select
          label={"Выбор режима"}
          keyName={"submit-2"}
          arrowKey={"down"}
          selections={[
            "Реэкспорт",
            "Временный ввоз",
            "Выпуск для свободного обращения",
            "Экспорт",
          ]}
          onChange={handleRejimChange}
          defaultVariant={rejim}
        />
        <Select
          label={
            "Транспортная накладная (TIR,CMR,жд,накладная,авиа накладная,коносамент и т.д"
          }
          keyName={"file-1"}
          type={"upload"}
          onChange={handleTransportNakChange}
          progress={progress1}
          sublabel={
            transportNak
              ? transportNak.name && transportNak.name.slice(0, 70)
              : ""
          }
        />
        <Select
          label={"Инвойс"}
          keyName={"file-2"}
          onChange={handleInvoiceChange}
          type={"upload"}
          progress={progress2}
          sublabel={invoice ? invoice.name && invoice.name.slice(0, 70) : ""}
        />
        <Select
          onChange={handlePackageListChange}
          label={"Упаковочный лист"}
          keyName={"file-3"}
          type={"upload"}
          progress={progress3}
          sublabel={
            packageList ? packageList.name && packageList.name.slice(0, 70) : ""
          }
        />
        <Select
          onChange={handleContractChange}
          label={"Конракт"}
          keyName={"file-4"}
          type={"upload"}
          progress={progress4}
          sublabel={contract ? contract.name && contract.name.slice(0, 70) : ""}
        />
        <Select
          onChange={handleCertificateChange}
          label={"Сертефикат происхождения"}
          keyName={"file-4"}
          type={"upload"}
          progress={progress5}
          sublabel={
            certificate ? certificate.name && certificate.name.slice(0, 70) : ""
          }
        />
        <Select
          onChange={handleExtraDocumentChange}
          label={"Дополнительная документация"}
          keyName={"file-4"}
          type={"upload"}
          progress={progress6}
          sublabel={
            extraDocument
              ? extraDocument.name && extraDocument.name.slice(0, 70)
              : ""
          }
        />
        <Select
          onChange={handleImageProductChange}
          label={"Фотографии товаров"}
          keyName={"file-4"}
          type={"upload"}
          progress={progress7}
          sublabel={
            imageProduct
              ? imageProduct.name && imageProduct.name.slice(0, 70)
              : ""
          }
        />
        <h4 className="subtitle padding-height-1">Дополнительная услуги</h4>
        <Choice
          defaultChecked
          text={'Определение кодов ТНВЭД в "Узбекэспертиза"'}
          onChange={handleCheckingChange}
        />
        <Choice
          text={
            "Составление договора ( контракта) и сопроводительных документов"
          }
          onChange={handleSostavDogovorChange}
        />
        <Select
          onChange={handleProchieDocumentChange}
          label={"Прочие документы"}
          keyName={"file-4"}
          type={"upload"}
          progress={progress8}
          sublabel={
            prochieDocument
              ? prochieDocument.name && prochieDocument.name.slice(0, 70)
              : ""
          }
        />
        <div className="form form--textarea">
          <h4 className="subtitle padding-top">Комментарий к заявке</h4>
          <textarea
            onChange={handleCommentChange}
            value={comment}
            placeholder="Введите комментарий..."
          />
        </div>
        <Button
          className="app-button app-button--warning padding-height"
          onClick={handleAdd}
          type="submit"
        >
          Подать заявку
        </Button>
      </form>
    </div>
  );
}
export default NewSubmit;
