import React, { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { ModalProps } from "../interface";

export const ModalNote: React.FC<ModalProps> = ({ handleChange, getText,addChangeNote,hourActive }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addNote = () => {
    handleClose();
    getText();
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Dialog>
          <Modal.Header closeButton={true}>
            <Modal.Title id="contained-modal-title-vcenter">
              Enter the text
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <textarea
              className="form-control"
              name="text"
              onChange={handleChange}
            ></textarea>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addNote} >
              Add
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
      <div className="text-right">
        <Button className="m-2" variant="primary" onClick={handleShow} disabled={!hourActive}>
         {addChangeNote}
        </Button>
      </div>
    </div>
  );
};
