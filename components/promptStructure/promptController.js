import React, { use, useEffect, useState } from "react";
import PromptReceipts from "./promptReceipts";
import PromptBankStatements from "./promptBankStatements";
import axios from "axios";
import { PiWarningCircle } from "react-icons/pi";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import ThumbnailManager from "./thumbnailmanager";
import DocumentTypeDropdown from "./documentTypeDropdown";
import PromptOptionDropdown from "./promptOptionDropdown";
import PromptGeneral from "./promptGeneral";
import PromptMessageController from "./promptMessageManager";
import toast, { Toaster } from "react-hot-toast";
import firstLetterLowercase from "../../utils/firstLetterLowercase";

function PromptController({ itemId, onClose, type }) {
  const [accessToken] = useSessionStorage("accessToken", "");
  const [documentType, setDocumentType] = useState(type);
  const [extractStatus, setExtractStatus] = useState("");
  const initialFormData = {
    date_time: "",
    vendor_name: "",
    vendor_address: "",
    vendor_contact: "",
    contract: "",
    items: [],
    subtotals: "",
    total: "",
    price: "",
    taxes: "",
    payment_type: "",
    payment_details: "",
    transaction_id: "",
    cashier_name: "",
    discounts: "",
    tips: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [preview, setPreview] = useState("");
  const [fileType, setFileType] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

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
      console.log("why is it running 1 : ", type);
    } else {
      fetchStructureData();
    }
    getDownloadDocument(itemId);
  }, []);

  useEffect(() => {
    if (type !== "General" || type !== "") {
      console.log("why is it running 1 : ", type);
    } else {
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
      }
    } catch (error) {
      toast.error("Please try again later");
    }
  }

  const updateStructureData = (e) => {
    console.log("This is form data333", formData);
    try {
      postToStructureData().then(() => {
        onClose(e);
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
    if (type === documentType) {
      toast.error("Already extracted");
  } else {
      getAutoFill();
      setExtractStatus("extracting")
      let status;
      do {
          status = await getExtractStatus();
          console.log("this is status", status);
          if (status !== "to_verify" && status !== "error") {
              await new Promise(resolve => setTimeout(resolve, 1000));
          }
      } while (status !== "to_verify" && status !== "error");
      setExtractStatus("syncReady")
  }
  }

  async function getAutoFill() {
    let item_id = itemId;
    let file_type = firstLetterLowercase(documentType);

    console.log("item_id and file_type", item_id, " ", file_type);
    try {
      const response = await axios.get(
        `/api/upload/getAutoFill?file_type=${file_type}&file_id=${itemId}`,
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

  async function getExtractStatus() {
    let item_id = itemId;
    try {
      const response = await axios.get(
        `https://chitchatrabbit.me/cpal/auto_fill_status?hashed_file_id=${item_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

     

      // if (response.data.auto_fill_status === "to_verify") {
      //   // If the status is "to_verify", stop polling
      //   console.log("Status is to_verify. Stopping polling.");
      //   setExtractStatus("syncReady");
        
      // }
      return response.data.auto_fill_status;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "error";
    }
    // while (true) {

    //   const status = await checkStatus();
    //   console.log("this is " ,status)
    //   if (status === "to_verify" || status === "error") {
    //     break;
    //   } else {
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //   }
    // }
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
          <PromptMessageController message={extractStatus} />
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
              <PromptReceipts formData={formData} setFormData={setFormData} />
            )}
            {documentType === "BankStatements" && <PromptBankStatements />}
          </div>
        </div>
        {/* Preview */}
        <div className="bg-slate-50 py-5 px-5  max-w-[40vh] min-h-[60vh]">
          <div className="text-sm font-semibold mb-2 text-gray-600 ">
            Document preview
          </div>
          <ThumbnailManager preview={preview} type={fileType} />
        </div>
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
          onClick={updateStructureData}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PromptController;
