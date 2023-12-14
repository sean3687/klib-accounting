import React from "react";

function PromptGeneral({ formData, setFormData }) {
  const fields = [
    { id: "vendor_name", label: "Business Name", type: "text" },
    { id: "vendor_address", label: "Address", type: "text" },
    { id: "date_time", label: "Date/Time", type: "date" },
    { id: "vendor_contact", label: "Contact", type: "text" },
    { id: "items", label: "Items", type: "array" },
    { id: "subtotals", label: "SubTotal", type: "price" },
    { id: "taxes", label: "Tax", type: "number" },
    { id: "tips", label: "Tips", type: "text" },
    { id: "total", label: "Total", type: "price" },
    { id: "payment_type", label: "Payment Type", type: "text" },
    { id: "payment_details", label: "Payment Detail", type: "text" },
    { id: "transaction_id", label: "Transaction Number", type: "text" },
    { id: "cashier_name", label: "Cashier/Server Name", type: "text" },
    { id: "itemsPurchased", label: "Items Purchased", type: "text" },
    { id: "notes", label: "Notes", type: "textarea" },
  ];

  const handleFieldChange = (fieldId, value) => {
    const updatedFormData = { ...formData, [fieldId]: value };
    console.log("making prompt : ", updatedFormData);
    setFormData(updatedFormData);
  };

  const handleArrayFieldChange = (fieldId, value) => {
    try {
      // Attempt to parse the input as JSON
      const arrayValue = JSON.parse(value);
      if (Array.isArray(arrayValue)) {
        setFormData({ ...formData, [fieldId]: arrayValue });
      } else {
        // Handle error or inform user of incorrect format
        console.error("Input is not a valid array");
      }
    } catch (error) {
      console.error("Error parsing array input:", error);
    }
  };

  return (
    <>
      {/* this is navigation */}
      <div className="m-10 ">
        {/* table body */}
        We don&apos;t provide structure data for this type of document yet.
      </div>
    </>
  );
}

export default PromptGeneral;
