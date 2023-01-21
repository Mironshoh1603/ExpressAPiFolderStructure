import { useState } from "react";
import { IconButton } from "@mui/material";
import { CloseOutlined as CloseIcon } from "@mui/icons-material";

function ApplicationDrawer({
  drawer,
  drawerStatus,
  width,
  children,
  doc = null,
}) {
  // eslint-disable-next-line
  const [submitsProps, setSubmitsProps] = useState({});
  // eslint-disable-next-line
  const setSelectionProps = (propName, value) => {
    console.log(submitsProps);
  };
  return (
    <div
      className={`application__drawer ${drawer && "application__drawer--open"}`}
    >
      <div className={`application__drawer--layout ${width}`}>
        <div className="application__drawer--layout-content">{children}</div>
        <div className="application__drawer--layout-close">
          <IconButton onClick={drawerStatus}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
export default ApplicationDrawer;
