import React, { use, useEffect, useState } from "react";
import PromptReceipts from "./promptReceipts";
import PromptBankStatements from "./promptBankStatements";
import axios from "axios";
import { PiWarningCircle } from "react-icons/pi";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import ThumbnailManager from "./thumbnailmanager";
import Dropdown from "./documentTypeDropdown";
import PromptGeneral from "./promptGeneral";

function PromptController({ itemId, onClose, type }) {
  const [accessToken] = useSessionStorage("accessToken", "");
  const [documentType, setDocumentType] = useState(type);
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
    fetchStructureData();
    getDownloadDocument(itemId);
    console.log("here is preview", documentType);
  }, []);

  useEffect(() => {
    fetchStructureData();
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
      console.error("Error fetching user data:", error);
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
        `/api/upload/postVerifyReceipt`,
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

  function PromptMessageController({ message }) {
    //initiate extraction first
    //extracting document
    //sync ready
    //failed
    //sync ready
    if (message === "requireExtraction") {
      return (
        <div className="text-xs bg-orange-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2">
          <PiWarningCircle className="text-xl font-bold" />
          <div>Please initiate Extraction first</div>
        </div>
      );
    }

    if (message === "extracting") {
      return (
        <div className="text-xs bg-yellow-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2">
          <PiWarningCircle className="text-xl font-bold" />
          <div>Extracting document</div>
        </div>
      );
    }

    if (message === "syncReady") {
      return (
        <div className="text-xs bg-green-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2">
          <PiWarningCircle className="text-xl font-bold" />
          <div>Sync ready</div>
        </div>
      );
    }

    if (message === "failed") {
      return (
        <div className="text-xs bg-red-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2">
          <PiWarningCircle className="text-xl font-bold" />
          <div>Failed</div>
        </div>
      );
    }
    if (message === "") {
      return (
        <div className="">
          
        </div>
      );
    }
  }

  return (
    <div className="bg-white w-full">
      <div className="text-md w-full flex p-2 border-b items-center justify-center">
        <div className="text-xl font-bold h-full">
          <Dropdown
            documentType={documentType}
            setDocumentType={setDocumentType}
          />
        </div>
        <div className="flex ml-auto items-center">
          <PromptMessageController message={"requireExtraction"} />
          <div
            className="mr-2 text-md cursor-pointer"
            onClick={fetchStructureData}
          >
            sync
          </div>
          <div>Options</div>
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
        <div className="bg-slate-50 py-5 px-5  max-w-[40vh]">
          <div className="text-sm font-semibold mt-5 mb-2 text-gray-600 ">
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
