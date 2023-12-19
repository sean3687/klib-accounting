import React, {useEffect} from "react";

function PromptCheck({ formData, setFormData, fetchDocumentList }) {
  const fields = [
    { id: "bank_name", label: "Bank Name", type: "text" },
    { id: "bank_address", label: "Bank Address", type: "text" },
    { id: "bank_fractional", label: "Bank Fractional", type: "text" },
    { id: "bank_routing_number", label: "Routing Number", type: "text" },
    { id: "date", label: "Date/Time", type: "date" },
    { id: "amount", label: "Amount", type: "price" },
    { id: "payer_name", label: "Payer Name", type: "text" },
    { id: "payer_address", label: "Payer Address", type: "text" },
    { id: "check_number", label: "Check Number", type: "text" },
    { id: "checking_account_number", label: "Check Account Number", type: "text" },
    { id: "memo", label: "Notes", type: "textarea" },
  ];

  const initialFormData = {
    bank_name: "",
    bank_address: "",
    bank_fractional: "",
    bank_routing_number: "",
    date: "",
    amount: "",
    payer_name: "",
    payer_address: "",
    check_number: "",
    checking_account_number: "",
    memo: "",
  };

  useEffect(() => {
    console.log("here is form data", formData)
    setFormData({})
    setFormData(initialFormData);
    
    fetchDocumentList
  }, []);

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
                    value={
                      formData[field.id] ? formData[field.id].split(" ")[0] : ""
                    }
                    onChange={(e) => {
                      // Extract the date part in 'YYYY-MM-DD' format
                      const datePart = e.target.value;

                      // Define a default time or use a dynamic one
                      const defaultTime = "17:31:00";

                      // Combine date and time
                      const dateTime = `${datePart} ${defaultTime}`;

                      handleFieldChange(field.id, dateTime);
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

export default PromptCheck;
