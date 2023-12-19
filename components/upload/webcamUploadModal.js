import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ThumbnailManager from "../../components/promptStructure/thumbnailmanager";
import Image from "next/image";

function WebcamUploadComponent({ onClose, handleFileChange }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const uploadImage = async () => {
    if (imgSrc) {
      // Convert Base64 image to a File object
      const fetchResponse = await fetch(imgSrc);
      const blob = await fetchResponse.blob();
      const file = new File([blob], "webcam_image.jpeg", { type: "image/jpeg" });

      // Trigger the file upload handler
      handleFileChange({ target: { files: [file] } });

      toast.success("Image captured and ready for upload");
      onClose();
    }
  };

  return (
    <div className="bg-white w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="text-md w-full flex p-2 border-b items-center justify-center">
        <div className="text-md font-semibold">Scan your document</div>
      </div>

      <div className="flex">
      <div className="">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500} height={800}
          />
          <button onClick={capture}>Scan</button>
        </div>

        {imgSrc && (
          <div className="bg-slate-50 py-5 px-5  max-w-[40vh] min-h-[60vh]">
            <div className="text-sm font-semibold mb-2 text-gray-600 ">
              Document preview
            </div>
            {/* <ThumbnailManager preview={preview ? null} type={fileType} /> */}
            <>
              <Image width={500} height={800} src={imgSrc} />
              
            </>
          </div>
        )}
      </div>
      <div className="text-md w-full flex p-2 border-t align-items">
        <button
          className="mr-0 ml-auto border px-4 rounded-md text-sm font-bold"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="p-5 max-w-xs mx-4 align-items font-semibold text-sm py-2 bg-blue-600 text-white shadow-sm rounded-md ring-0 ring-blue-600 hover:ring-2 active:ring-0 transition-all duration-200 outline-none hover:outline-none focus:outline-none"
          onClick={uploadImage}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default WebcamUploadComponent;
