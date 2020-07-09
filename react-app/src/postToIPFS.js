import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'


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

  const sendToIPFS = async () => {
    // console.log('some button props: ', props)
    const response = await fetch('http://localhost:8081/create', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     // mode: 'no-cors',
      body: JSON.stringify({boxes: props.boxes})
    })

    const result = await response.json()

    setIpfsHash(result.ipfs.IpfsHash)
    setShowModal(true)

   // console.log(result)
    console.log('zoo ', result.ipfs.IpfsHash)




// JSON.stringify(
//    // console.log(await response)
//     const result = response.json()

    // need some sort of useEffects thing....


    //setIPFSHash(response)



//     .then(response => response.json())
//     .then(data => {
//         setIPFSHash({foo: 'moo'})
//     })

//     .then(response => response.json())
//     .then(data =>  {
//         console.log(data)
//          setIPFSHash({foo: 'moo'})
//     })
  }

   const hideModal = () => {
        setShowModal(false)
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
            <p>View at: <a href={'http://localhost:3000/'+ipfsHash}>localhost:3000/{ipfsHash}</a></p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={hideModal} variant="secondary">Close</Button>
{/*             <Button variant="primary">Save changes</Button> */}
          </Modal.Footer>
        </Modal>
        </div>
        )
      }
      else {
        return <Button onClick={sendToIPFS}>Save {ipfsHash}</Button>
      }


}