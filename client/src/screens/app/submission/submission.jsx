import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useToggle from "../../../hooks/useToggleState";
import { Button } from "@mui/material";
import { AddOutlined as NewIcon } from "@mui/icons-material";
import Application from "../../../components/application";
import ApplicationDrawer from "../../../components/applicationDrawer";
import NewSubmit from "./newSubmit";
import ViewSubmit from "./viewSubmit";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Submits() {
  const [user] = useOutletContext();
  const [state, toggle] = useToggle(false);
  const [statusType, setStatusType] = useState(false);
  const [response, setResponse] = useState({});
  const [posts, setPosts] = useState("");
  const [viewDocuments, setViewDocuments] = useState({});

  const changeDrawerStatus = (statusType, statusResponse) => {
    toggle(!state);
    setStatusType(statusType);
    statusResponse && setResponse(statusResponse);
  };
  const handleSubmitApplication = (documents) => {
    console.log(documents);
  };

  useEffect(() => {
    const getData = async () => {
      const userEmail = JSON.parse(localStorage.getItem("user"));
      console.log(userEmail);
      const postData = [];
      const q = query(
        collection(db, "documents"),
        where("userEmail", "==", userEmail.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length) {
        querySnapshot.forEach((doc) => {
          postData.push({ ...doc.data(), id: doc.id });
          console.log(" => ", doc.data());
        });
        setPosts(postData);
      }
    };
    getData();
  }, [statusType, state]);

  const handleViewResponse = (viewDocuments) => {
    toggle();
    setViewDocuments(viewDocuments);
    console.log(viewDocuments);
  };

  return (
    <div className="application">
      <div className="application__header">
        <h3 className="application__header--title">Таможенное оформление</h3>
        <Button
          className="application__header--submit app-button"
          onClick={() => changeDrawerStatus("submission")}
        >
          <NewIcon />
          Подать заявку
        </Button>
      </div>

      {posts && posts.map((doc, key) => (
          <div key={key}>
            <Application
              doc={doc}
              response={{ status: doc.status }}
              changeDrawerStatus={changeDrawerStatus}
              handleViewResponse={handleViewResponse}
            />
          </div>
      ))}

      <ApplicationDrawer
        drawer={state}
        drawerStatus={toggle}
        width={statusType === "status" && "full-screen-drawer"}
      >
        {statusType === "submission" ? (
          <NewSubmit
            drawerStatus={toggle}
            handleSubmit={handleSubmitApplication}
          />
        ) : (
          <ViewSubmit
            doc={viewDocuments}
            response={response}
            drawerStatus={toggle}
            user={user}
          />
        )}
      </ApplicationDrawer>
    </div>
  );
}
