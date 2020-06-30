import React from "react"
import html2canvas from "html2canvas"

export default function CaptureImage() {

  const capture = () => {
    html2canvas(document.querySelector("#scimContainer"))
      .then(function (canvas) {
        //CanvasToImage.saveAsImage(canvas, 1, 1, 'PNG',);
        const base64URL = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
        saveScreenshot(canvas)

        //document.location.href = base64URL;
        //  console.log(base64URL)
        //canvas.toDataURL('image/jpeg')
      })
  }

  const saveScreenshot = (canvas) => {
    let fileName = "scim"
    const link = document.createElement('a');
    link.download = fileName + '.png';
    console.log(canvas)
    canvas.toBlob(function (blob) {
      console.log(blob)
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  }

  return (<button onClick={capture}>Save as PNG</button>)
}