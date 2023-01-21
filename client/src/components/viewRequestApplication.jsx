import React from "react";
import { Button } from "@mui/material";
import responseStatus from "../utils/status";

export default function ViewRequestApplication({
  doc,
  handleViewResponse,
  response,
}) {
  const { status } = response;
  console.log(response);
  const type = responseStatus(status);
  return (
    <div className={`application__submits`}>
      <div className="application__request">
        <div className="application__request--info">
          <h3 className="submission-info">
            Заявка ID: {String(doc.id).toUpperCase().slice(0, 7)}
          </h3>
          <p className="submission-date text-disabled">
            {new Date(doc.timeStamp.seconds * 1000).toDateString()},
            {new Date(doc.timeStamp.seconds * 1000).toTimeString()}
          </p>
        </div>
        <div className="application__request--status">
          <Button
            className={`status-button--${type.status} app-button`}
            onClick={() => handleViewResponse(doc)}
          >
            {type.text}
          </Button>
        </div>
      </div>
    </div>
  );
}
