import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WarnTimer from './WarnTimer';

const WarnModal = (props) => {
  return (
    
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Warning
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <WarnTimer />
        <Button onClick={props.onHide} style={{marginTop:"1rem"}}>Close</Button>
        </Modal.Body>
    </Modal>
  )
}

export default WarnModal