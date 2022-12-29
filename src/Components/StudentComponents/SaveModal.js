import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const SaveModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        Please Save after choosing every option
        <Button onClick={props.onHide} style={{marginTop:"1rem"}}>Start</Button>
        </Modal.Body>
    </Modal>
  )
}

export default SaveModal