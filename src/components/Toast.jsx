import React from "react";
import Alert from "@mui/material/Alert";

const Toast = ({children, variant, severity, onClose}) => {
  return (
    <Alert
      style={{ marginBottom: 10, marginTop: 10 }}
      variant={variant}
      severity={severity}
      onClose={onClose}
    >
      {children}
    </Alert>
  );
};

export default Toast;
