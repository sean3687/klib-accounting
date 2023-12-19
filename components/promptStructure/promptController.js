import React, { use, useEffect, useState } from "react";
import PromptReceipts from "./promptReceipts";
import PromptBankStatements from "./promptBankStatements";
import PromptCheck from "./promptCheck";
import axios from "axios";
import { PiWarningCircle, PiCheck } from "react-icons/pi";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import ThumbnailManager from "./thumbnailmanager";
import DocumentTypeDropdown from "./documentTypeDropdown";
import PromptOptionDropdown from "./promptOptionDropdown";
import PromptGeneral from "./promptGeneral";
import PromptMessageController from "./promptMessageManager";
import toast, { Toaster } from "react-hot-toast";
import firstLetterLowercase from "../../utils/firstLetterLowercase";

function PromptController({ itemId, onClose, type, fetchDocumentList }) {
  const [accessToken] = useSessionStorage("accessToken", "");
  const [documentType, setDocumentType] = useState(type);
  const [extractStatus, setExtractStatus] = useState("");
  const [formData, setFormData] = useState();
  const [preview, setPreview] = useState("");
  const [fileType, setFileType] = useState("");

  const tabs = [
    {
      text: "General",
    },
    {
      text: "Receipt",
    },
    {
      text: "Bank_statement",
    },
  ];

  useEffect(() => {
    if (type !== "General" || type !== "") {
    } else {
      setFormData("");
      fetchStructureData();
    }
    getDownloadDocument(itemId);
  }, []);

  useEffect(() => {
    if (type !== "General" || type !== "") {
    } else {
      setFormData("");
      fetchStructureData();
    }
  }, [documentType]);

  async function fetchStructureData() {
    console.log("sync clicked");
    try {
      const response = await axios.get(
        `/api/upload/getJsonData?file_id=${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Fetched StructureData", response.data.data);
        setFormData(response.data.data);
        setExtractStatus("syncCompleted");
      }
    } catch (error) {
      toast.error("Please try again later");
    }
  }

  const updateStructureData = (e) => {
    console.log("This is form data333", formData);
    try {
      postToStructureData().then(() => {
        fetchDocumentList();
        onClose(e);
        setExtractStatus("");
        setFormData("");
        toast.success("Successfully saved");
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  async function getDownloadDocument(id) {
    console.log("this is id", id);
    if (!id) return;

    console.log("this is download document id" + id);
    try {
      const response = await axios.post(
        `/api/upload/getDownloadDocument`,
        { selectedId: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      setPreview(URL.createObjectURL(blob));

      //set file type img, pdf, etc
      const blobType = response.headers["content-type"].split(";")[0];
      setFileType(blobType);

      if (response.status === 200) {
        console.log("Document Opened");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function postToStructureData() {
    try {
      console.log("this is form data", formData);
      const response = await axios.post(
        `/api/upload/postVerifyJSON`,
        { data: formData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Posted to StructureData");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function extractStructureData() {
    if (type === documentType ) {
      toast.error("Already extracted");
    } else {
      await getAutoFill();
      let extractStatus = await getExtractStatus();
      do{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        extractStatus = await getExtractStatus();
        if(extractStatus === "verified"){
          setExtractStatus("verified");
          break;
        } 
        if(extractStatus === "error" || extractStatus === "failed" || extractStatus ===""){
          setExtractStatus("failed");
          break;
        }
        if(extractStatus === "to_verify"){
          setExtractStatus("syncReady");
          break;
        } else {
          setExtractStatus("extracting");
        }
        console.log("this is extract status", extractStatus)
      }
      while (extractStatus !== "extracting" || extractStatus !== "");
      
        // console.log("this is response", response);
        // // Check if rresponse is undefined
        // if (!response) {
        //   console.error("No response from getAutoFill");
        //   return;
        // } else if (response.status === 500) {
        //   console.error("Error in getAutoFill");
        //   toast.error("Cannot extract data");
        // } else {
        //   do {
        //     let status;
        //     await new Promise((resolve) => setTimeout(resolve, 1000));
        //     status = await getExtractStatus();
        //     console.log("this is status", status);
           
        //     if (status === "to_verify") {
        //       setExtractStatus("syncReady");
        //       break;
        //     } else if (status === "error" || status === "failed" || status ==="") {
        //       console.error("Error or failed status encountered");
        //       setExtractStatus("failed");
        //       break;
        //     } else if (status === "verified"){
        //       setExtractStatus("verified");
        //       break;
        //     }
        //     else {
        //       setExtractStatus("extracting");
        //     }
        //   } while (extractStatus !== "extracting");
        // }
     
    }
  }

  async function getAutoFill() {
    let item_id = itemId;
    let file_type = firstLetterLowercase(documentType);

    try {
      const response = await axios.get(
        `/api/upload/getAutoFill?file_type=${file_type}&file_id=${item_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("this is response", response);
      

    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Cannot extract data");
    }
  }

  async function getExtractStatus() {
    let item_id = itemId;
    console.log("this is item id", item_id)
    try {
      const response = await axios.get(
        `api/upload/getExtractStatus?item_id=${item_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("getExtractStatus response", response.data.status)
      return response.data.status;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "failed";
    }
  }

  function closePromptModal(e) {
    setExtractStatus("");
    fetchDocumentList();
    onClose(e);
  }

  return (
    <div className="bg-white w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="text-md w-full flex p-2 border-b items-center justify-center">
        <div className="text-xl font-bold h-full">
          <DocumentTypeDropdown
            documentType={documentType}
            setDocumentType={setDocumentType}
            setExtractStatus={setExtractStatus}
          />
        </div>
        <div className="flex ml-auto items-center">
          <PromptMessageController
            message={extractStatus}
            extractStructureData={extractStructureData}
            sync={fetchStructureData}
          />
          <PromptOptionDropdown
            fetchStructureData={fetchStructureData}
            extractStructureData={extractStructureData}
          />
        </div>
      </div>

      <div className="flex">
        <div className="max-h-[60vh] min-w-[60vh] overflow-y-scroll flex min-w-fit">
          {/* Form */}
          <div>
            {documentType === "General" && (
              <PromptGeneral formData={formData} setFormData={setFormData} />
            )}
            {documentType === "Receipt" && (
              <PromptReceipts
                formData={formData}
                setFormData={setFormData}
                fetchStructureData={fetchStructureData}
              />
            )}
            {documentType === "Check" && (
              <PromptCheck
                formData={formData}
                setFormData={setFormData}
                fetchStructureData={fetchStructureData}
              />
            )}
          </div>
        </div>
        {/* Preview */}
        <div className="bg-slate-50 py-5 px-5  max-w-[40vh] min-h-[60vh]">
          <div className="text-sm font-semibold mb-2 text-gray-600 ">
            Document preview
          </div>
          {
            
          }
          <ThumbnailManager preview={preview} type={fileType} />
        </div>
      </div>
      <div className="text-md w-full flex p-2 border-t align-items">
        <button
          className="mr-0 ml-auto border px-4 rounded-md text-sm font-bold"
          onClick={closePromptModal}
        >
          Cancel
        </button>
        <button
          className="p-5 max-w-xs mx-4 align-items font-semibold text-sm py-2 bg-blue-600 text-white shadow-sm rounded-md ring-0 ring-blue-600 hover:ring-2 active:ring-0 transition-all duration-200 outline-none hover:outline-none focus:outline-none"
          onClick={updateStructureData}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PromptController;
