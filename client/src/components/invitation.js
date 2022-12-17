import React, { Component, useEffect, useRef, useState } from "react";

export default function Invitation(props) {
  const [imageLoaded, setImageloaded] = useState(false);
  const [imageData, setImageData] = useState(
    "https://i.ibb.co/0BcsdgS/invitation.jpg"
  );
  const imgRef = useRef();
  // document.getElementById('imggg').focus();

  useEffect(() => {
    // imgRef.current.focus();
    if (imageLoaded == false) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.getElementById("imggg");

    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;
    ctx.drawImage(img, 0, 0);
    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(props.eventType, 100, 400);
    ctx.fillText(props.eventDate, 100, 500);
    ctx.font = "24px Arial";

    ctx.fillText(props.name, 100, 660);
    ctx.fillText(props.location, 100, 700);
    ctx.fillText(props.address, 100, 740);

    img.src = canvas.toDataURL();
    setImageData(canvas.toDataURL());
  }, [imageLoaded]);

  return (
    <div className=" text-center">
      <a
        download="invitation.png"
        className="btn btn-primary-lg"
        href={imageData}
      >
        <img
          ref={imgRef}
          src="https://i.ibb.co/55KP0Dp/invitation.jpg"
          id="imggg"
          onLoad={() => setImageloaded(true)}
          crossOrigin="anonymous"
        />
      </a>
    </div>
  );
}
