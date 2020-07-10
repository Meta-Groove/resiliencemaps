import React from "react"
import html2canvas from "html2canvas"
import { Button } from "react-bootstrap"

export default function CaptureImage() {

  const capture = () => {
    html2canvas(document.querySelector("#scimContainer"))
      .then(function (canvas) {
        const base64URL = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
        saveScreenshot(canvas)
      })
  }

  const saveScreenshot = (canvas) => {
    let fileName = "scim"
    const link = document.createElement('a');
    link.download = fileName + '.jpg';
    console.log(canvas)
    canvas.toBlob(function (blob) {
      console.log(blob)
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  }

  return (<Button variant="success" onClick={capture}>Download image</Button>)
}