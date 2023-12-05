import React from "react";
import { useState, useEffect } from "react";

function PromptReceipts({ formData, setFormData }) {

  const fields = [
    { id: "dateTime", label: "Date/Time", type: "text" },
    { id: "businessName", label: "Business Name", type: "text" },
    { id: "address", label: "Address", type: "text" },
    { id: "contract", label: "Contract", type: "text" },
    { id: "itemsPurchased", label: "Items Purchased", type: "text" },
    { id: "price", label: "Price", type: "text" },
    { id: "tax", label: "Tax", type: "number"},
    { id: "paymentMethod", label: "Payment Method", type: "text" },
    { id: "transactionNumber", label: "Transaction Number", type: "text" },
    { id: "cashierName", label: "Cashier/Server Name", type: "text" },
    { id: "discountCoupons", label: "Discount Coupons", type: "text" },
    { id: "tips", label: "Tips", type: "text" },
    { id: "notes", label: "Notes", type: "textarea" },
  ];


  const handleFieldChange = (fieldId, value) => {
    const updatedFormData = { ...formData, [fieldId]: value };
    console.log("making prompt : ",updatedFormData)
    setFormData(updatedFormData)
    
  }

  return (
    <>
      {/* this is navigation */}
      <div className="m-10">
        {/* table body */}
        <div className="flex">
          <form className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col">
                <label
                  htmlFor={field.id}
                  className="mb-2 text-sm font-semibold text-gray-700"
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                  />
                ) : field.type === "price" ? (
                  <input
                    type="text"
                    id={field.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        field.id,
                        e.target.value.replace(/^\$/, "")
                      )
                    }
                  />
                ) : field.type === "date" ? (
                  <input
                    type="date"
                    id={field.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                  />
                ) : (
                  <input
                    type="text"
                    id={field.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
            
          </form>
        
        </div>
      </div>
    </>
  );
}

export default PromptReceipts;
