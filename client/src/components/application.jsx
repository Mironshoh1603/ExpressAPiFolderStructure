import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowDownOutlined as ArrowDown } from "@mui/icons-material";
import responseStatus from "../utils/status";

export default function Application({
  response,
  doc,
  open,
  changeDrawerStatus,
  info = true,
  handleViewResponse,
}) {
  const [accordion, toggleAccordion] = useState(open ? open : false);
  const { status } = response;
  const type = responseStatus(status);
  const applicationRef = useRef(null);
  const responsePreviewRef = useRef(null);

  useEffect(() => {
    if (accordion)
      applicationRef.current.style.height = `${
        applicationRef.current.scrollHeight + 24
      }px`;
    else applicationRef.current.style.height = "94px";
  }, [accordion]);

  return (
    <div
      className={`application__submits ${accordion && "submits-open"}`}
      ref={applicationRef}
    >
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
            onClick={() => {
              changeDrawerStatus("status", response);
              handleViewResponse(doc);
            }}
          >
            {type.text}
          </Button>
          {(info) && (
            <Button
              onClick={() => toggleAccordion(!accordion)}
              className={`status-button app-button ${
                accordion && "status-button-rotating"
              }`}
            >
              <ArrowDown />
            </Button>
          )}
        </div>
      </div>
      <div className={`response__preview`} ref={responsePreviewRef}>
        {type.status !== 'success' && (
          <div className="response__preview--response">
            <h3 className={`response-alert ${type.status}`}>
              Не хватает документов
            </h3>
            <ul className="response-alert--warnings">
              <li className="text-disabled">
                <span className="warning-subtitle">
                  Причина отклюнения заявки:
                </span>{" "}
                Не хватает документов
              </li>
              <li className="text-disabled">
                <span className="warning-subtitle">
                  Причина отклюнения заявки:
                </span>{" "}
                Не отгрузочных документов
              </li>
            </ul>
          </div>
        )}
        <div className="response__preview--comment">
          <h3 className="response-comment">Комментарий к заявки:</h3>
          <p className="response-comment--message text-disabled">
            {doc.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
