import React from "react";
import { useState, useEffect } from "react";

function PromptReceipts({ formData, setFormData }) {
  const [localFormData, setLocalFormData] = useState(formData);
  const fields = [
    { id: "dateTime", label: "Date/Time", type: "date" },
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
    { id: "tips", label: "Tips", type: "number" },
    { id: "notes", label: "Notes", type: "textarea" },
  ];

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const formatPrice = (value) => {
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const formatDate = (value) => {
    const date = new Date(value);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleFieldChange = (fieldId, value) => {
    const updatedFormData = { ...localFormData, [fieldId]: value };
    setLocalFormData(updatedFormData);
    setFormData(updatedFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(event.target.value)
  };

  return (
    <>
      {/* this is navigation */}
      <div className="m-10">
        {/* table body */}
        <div className="flex">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
                    // value={formData[field.id]}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                  />
                ) : field.type === "price" ? (
                  <input
                    type="text"
                    id={field.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    // value={formatPrice(formData[field.id])}
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
                    // value={formData[field.id]}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                  />
                ) : (
                  <input
                    type="text"
                    id={field.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    // value={formData[field.id]}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {/* preview */}
          <div>
            <div className="w-1/2">
              <div>here is preview</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PromptReceipts;
