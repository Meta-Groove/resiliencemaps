import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap'


// const modalStyle: React.CSSProperties = {
// 	width: 400,
// 	height: 400,
// // 	zIndez
// 	// border: '1px solid black',
// 	position: 'relative',
// 	backgroundImage: background,
// 	whiteSpace: 'break-spaces',
//
// 	//backgroundColor: 'blue'
// }

export default function PostToIPFS(props) {

  const [ipfsHash, setIpfsHash] = useState('')
  const [showModal, setShowModal] = useState(true)
  const [clickedSave, setClickedSave] = useState(false)

  const sendToIPFS = async () => {
    setClickedSave(true)
    // console.log('some button props: ', props)
    const response = await fetch('http://api.scim.metagroove.io/create', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({boxes: props.boxes})
    })

    const result = await response.json()

    setIpfsHash(result.ipfs.IpfsHash)
    setShowModal(true)
    // setShowModal(true)
    //   setClickedSave(false)
  }

   const hideModal = () => {
      setShowModal(false)
      setClickedSave(false)
      setIpfsHash('')
   }

      if (ipfsHash) {

      return (
      <div>
        <Button onClick={sendToIPFS}>Save</Button>
        <Modal
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
{/*           <Modal.Header closeButton> */}
          <Modal.Header>
            <Modal.Title>Saved</Modal.Title>
          </Modal.Header>
{/*  @todo ipaddress from config on build / local prod  */}
          <Modal.Body>
            <p>View at: <a href={'http://scim.metagroove.io/'+ipfsHash}>scim.metagroove.io/{ipfsHash}</a></p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={hideModal} variant="secondary">Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
        )
      }
      else {

        return (
          <div>
            {clickedSave
              ?  <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Saving
              </Button>
             :  <Button onClick={sendToIPFS}>Save</Button>
            }
          {/*<Button onClick={sendToIPFS}>Save</Button>*/}

          </div>
        )
      }







}