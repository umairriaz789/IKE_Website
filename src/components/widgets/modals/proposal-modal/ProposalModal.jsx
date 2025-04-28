import { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../helpers/firebase";

function ProposalModal() {
  // const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(true);
  const [proposals, setProposals] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getDataToProposalsTable();
  }, []);

  // if api call is on seprate click // GET API (Get data to backend)
  const getDataToProposalsTable = async () => {
    try {
      const menuCollection = collection(db, "proposals");
      const result = await getDocs(menuCollection);
      const res = [];
      result.forEach((proposal) => {
        res.push({
          id: proposal.id,
          ...proposal.data(),
        });
      });

      setProposals(res);
      console.log("testing: ", res);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // function handleShow(breakpoint) {
  //   setFullscreen(breakpoint);
  //   setShow(true);
  // }

  return (
    <div>
      {/* <Button className="me-2 mb-2" onClick={() => handleShow(true)}>
        Full screen
      </Button> */}

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {proposals.map((proposal, index) => (
            <li key={index}>
              {/* Display relevant data from each proposal */}
              <div>{proposal.title}</div>
              <div>{proposal.description}</div>
              {/* Add additional fields as needed */}
            </li>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProposalModal;
