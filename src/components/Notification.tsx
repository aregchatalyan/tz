import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export const Notification = ({ error }: { error: string }) => {
  return (
    <ToastContainer position="middle-center">
      <Toast className="m-1 d-inline-block" bg="danger">
        <Toast.Header>
          <strong className="me-auto">404</strong>
        </Toast.Header>
        <Toast.Body>
          { error }
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
