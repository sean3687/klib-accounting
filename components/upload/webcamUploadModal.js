import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import ThumbnailManager from "../../components/promptStructure/thumbnailmanager";
import Image from "next/image";

function WebcamUploadComponent({ onClose, handleFileChange }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    toast.success("Image captured and ready for upload");
  }, [webcamRef, setImgSrc]);

  const uploadImage = async () => {
    if (imgSrc) {
      // Convert Base64 image to a File object
      const fetchResponse = await fetch(imgSrc);
      const blob = await fetchResponse.blob();
      const file = new File([blob], "webcam_image.jpeg", {
        type: "image/jpeg",
      });

      // Trigger the file upload handler
      handleFileChange({ target: { files: [file] } });

      
      onClose();
    }
  };

  return (
    <div className="bg-white w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="text-md w-full flex p-2 border-b items-center ">
        <div className="font-semibold ml-0">Scan your document</div>
        <div className="ml-auto mr-0 " onClick={onClose}>
        
          <IoClose className="text-xl"/>
        </div>
      </div>

      <div className="flex">
        <div className="">
          <Webcam
            className="mt-2 rounded-lg "
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <div className="my-2 flex items-center justify-center w-full">
            <button
              className="w-full max-w-xs mx-4 align-items font-semibold text-sm py-2 bg-blue-600 text-white shadow-sm rounded-md ring-0 ring-blue-600 hover:ring-2 active:ring-0 transition-all duration-200 outline-none hover:outline-none focus:outline-none"
              onClick={capture}
            >
              Scan
            </button>
          </div>
        </div>

        {imgSrc && (
          <div className="bg-slate-50 py-5 px-5  max-w-[40vh] min-h-[60vh]">
            <div className="text-sm font-semibold mb-2 text-gray-600 ">
              Upload this image?
            </div>
            {/* <ThumbnailManager preview={preview ? null} type={fileType} /> */}
            
              <Image
                className="rounded-md"
                width={500}
                height={1200}
                src={imgSrc}
              />
           
            <div
              className="my-2 flex items-center justify-center w-full"
              onClick={uploadImage}
            >
                <button className="w-full max-w-xs mx-4 align-items font-semibold text-sm py-2 bg-blue-600 text-white shadow-sm rounded-md ring-0 ring-blue-600 hover:ring-2 active:ring-0 transition-all duration-200 outline-none hover:outline-none focus:outline-none">Upload</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WebcamUploadComponent;
