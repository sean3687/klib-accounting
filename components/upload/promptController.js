import React, { useEffect, useState } from "react";
import PromptReceipts from "./promptReceipts";
import PromptBankStatements from "./promptBankStatements";
import axios from "axios";
import { useSessionStorage } from "../../hooks/useSessionStorage";

function PromptController({ itemId, onClose }) {
  const [accessToken] = useSessionStorage("accessToken", "");
  const type = "Receipts";
  const initialFormData = {
    dateTime: "",
    businessName: "",
    address: "",
    contract: "",
    itemsPurchased: "",
    price: "",
    tax: "",
    paymentMethod: "",
    transactionNumber: "",
    cashierName: "",
    discountCoupons: "",
    tips: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    console.log("download called");
    fetchStructureData();
    getDownloadDocument(itemId);
  }, []);

  async function fetchStructureData() {
    if (formData === "") {
      setFormData(initialFormData);
    }
  }

  const updateStructureData = (e) => {
    console.log("This is form data", formData);
    onClose(e);
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

      if (response.status === 200) {
        console.log("Document Opened");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div className="bg-white">
      <div className="text-md w-full flex p-2 border-b">
        <div className="text-xl font-bold">{type}</div>
        <div className="flex mr-0 ml-auto">
          <div className="mr-2">sync</div>
          <div>options</div>
        </div>
      </div>
      <div className="flex">
        <div className="max-h-[60vh] overflow-y-scroll flex">
          {/* Form */}
          <div>
            {type === "General" && (
              <PromptReceipts formData={formData} setFormData={setFormData} />
            )}
            {type === "Receipts" && (
              <PromptReceipts formData={formData} setFormData={setFormData} />
            )}
            {type === "BankStatements" && <PromptBankStatements />}
          </div>
        </div>
        {/* Preview */}
        <div className="border p-2 m-2">
          <iframe
            src={preview}
            frameborder="0"
            allowfullscreen
            width={window.innerWidth / 50 - 100}
            height="100%"
            class="iframe"
          ></iframe>
        </div>
      </div>
      <div className="text-md w-full flex p-2 border-t align-items">
        <button className="mr-0 ml-auto" onClick={onClose}>
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
