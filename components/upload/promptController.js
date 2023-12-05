import React, {useState} from "react";
import PromptReceipts from "./promptReceipts";
import PromptBankStatements from "./promptBankStatements";

function PromptController({itemId }) {

  const [formData, setFormData] = useState("");
  const type = "Receipts"
  return (
    <div className="overflow-y-auto bg-white">
      <div className="text-md w-full flex p-2 border-b">
        <div className="text-xl font-bold">{type}</div>
        <div className="flex mr-0 ml-auto">
          <div className="mr-2">sync</div>
          <div>options</div>
        </div>
      </div>
      <>
        {type === "General" && <PromptReceipts setFormData={setFormData}/>}
        {type === "Receipts" && <PromptReceipts />}
        {type === "BankStatements" && <PromptBankStatements />}
      </>
    </div>
  );
}

export default PromptController;
