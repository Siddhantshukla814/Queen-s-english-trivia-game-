import React from "react";
import { Alert } from "react-bootstrap";

interface MessageProps {
  varient: string;
  children: string;
}

function Message({ varient, children }: MessageProps) {
  return <Alert variant={varient}>{children}</Alert>;
}

Message.defaultProps = {
  varient: "info",
};

export default Message;
