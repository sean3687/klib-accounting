import React from "react";

function PromptReceipts({ formData, setFormData }) {
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
        <div className="flex">
          <form className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className={`flex flex-col ${
                  field.type === "textarea" ? "col-span-2" : ""
                }`}
              >
                <label
                  htmlFor={field.id}
                  className="mb-2 text-sm font-semibold text-gray-700"
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    className="p-2 border mb-4 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                    value={formData[field.id] ? `$${formData[field.id]}` : ""}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^\d.]/g,
                        ""
                      );
                      handleFieldChange(field.id, numericValue);
                    }}
                  />
                ) : field.type === "date" ? (
                  <input
                    type="date"
                    id={field.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={formData[field.id] || ""}
                    onChange={(e) => {
                      // Convert the date to ISO string and then take the date part
                      const isoDateString = new Date(e.target.value).toISOString();
                      const datePart = isoDateString.split('T')[0];
                
                      // Set time to '00:00:00.000Z'
                      const dateTimeWithMidnight = `${datePart}T00:00:00.000Z`;
                
                      handleFieldChange(field.id, dateTimeWithMidnight);
                    }}
                  />
                ) : field.type === "array" ? (
                  <input
                    type="text"
                    id={field.id}
                    className="min-w-fit  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleArrayFieldChange(field.id, e.target.value)
                    }
                  />
                ) : (
                  <input
                    type="text"
                    id={field.id}
                    className="min-w-fit  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
