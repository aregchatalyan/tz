import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader = () => {
  return (
    <Spinner className="spinner" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
