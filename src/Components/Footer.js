import React from 'react';
import {
  MDBFooter,
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='bg-dark text-center text-white' >

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        © Powered By 
        <a  href='https://mdbootstrap.com/' style={{textDecoration:"none" ,color:"white",marginLeft:"0.3rem"}}>
          Ecera System
        </a>
      </div>
    </MDBFooter>
  );
}