import React, { useEffect, useState } from "react";
import useToggle from "../../../../hooks/useToggleState";
//FIREBASE
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import ApplicationDrawer from "../../../../components/applicationDrawer";
import ViewRequests from "./viewRequests";
import ViewRequestApplication from "../../../../components/viewRequestApplication";

export default function Submits() {
  const [state, toggle] = useToggle(false);
  const [posts, setPosts] = useState("");
  const [viewDocuments, setViewDocuments] = useState({});


  
useEffect(() => {
    const getData = async () => {
      const userEmail = JSON.parse(localStorage.getItem("user"));
      console.log(userEmail);
      const postData = [];
      const q = query(collection(db, "documents"));
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
  }, [state]);

  const handleViewResponse = (viewDocuments) => {
    toggle();
    setViewDocuments(viewDocuments);
    console.log(viewDocuments);
  };

  // const renderData = () => {
  //   return 
  // };

  return (
    <div className="requests">
      <div className="requests__header">
        <h3 className="requests__header--title">Таможенное оформление</h3>
      </div>
      {/* {posts ? renderData() : <h2>Пустые документы</h2>} */}
      {posts && posts.map((doc, key) => {
        return (
          <div key={key}>
            <ViewRequestApplication
              doc={doc}
              response={{ status: doc.status }}
              handleViewResponse={handleViewResponse}
            />
          </div>
        );
      })}
      <ApplicationDrawer
        drawer={state}
        drawerStatus={toggle}
        // MIDDLE-SIZE: "middle-screen-drawer"
        // JUNIOR-SIZE:
        width={"status"}
      >
        <ViewRequests
          //OTHER PROP STATES GOES HERE
          doc={viewDocuments}
          drawerStatus={toggle}
        />
      </ApplicationDrawer>
    </div>
  );
}
