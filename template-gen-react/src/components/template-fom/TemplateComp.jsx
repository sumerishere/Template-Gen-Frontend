import "./TemplateComp.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DynamicForm = () => {
  const [fields, setFields] = useState([
    { type: "input", label: "Fullname", value: "fullName", selectValue: "Text(String)", readOnly: true, required: true },
    { type: "input", label: "Address", value: "Address", selectValue: "Text(String)", readOnly: true, required: true },
  ]);

  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [notificationFormData, setNotificationFormData] = useState({
    formName: "",
    createdAt: "",
    userName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddField = () => {
    setFields([
      ...fields,
      { type: "input", label: "", value: "", selectValue: "", readOnly: false, required: true },
    ]);
  };

  const handleInputChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  const handleSelectChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].selectValue = value;
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const validateFields = () => {
    for (let field of fields) {
      if (!field.value || !field.selectValue) {
        return false;
      }
    }
    return true;
  };

  const handleInitialSubmit = () => {
    if (validateFields()) {
      setShowNotificationForm(true);
    } else {
      toast.error("Please fill out all fields before submitting...", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleNotificationFormChange = (e) => {
    const { name, value } = e.target;
    setNotificationFormData({
      ...notificationFormData,
      [name]: value,
    });
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formTemplateDTO = {
      formName: notificationFormData.formName,
      createdAt: notificationFormData.createdAt,
      userName: notificationFormData.userName,
      fields: fields.reduce((acc, field) => {
        if (field.value) {
          acc[field.value] = field.selectValue;
        }
        return acc;
      }, {}),
    };

    try {
      const response = await fetch("http://localhost:8080/create-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formTemplateDTO),
      });

      if (response.ok) {
        toast.success(`Template Created Successfully!! 😊`, {
          position: "top-center",
          autoClose: 5000,
        });
        console.log("Form template saved successfully");
      } else {
        toast.error("Failed to Create Template, Try Again", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error("Error saving form template");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setShowNotificationForm(false);
    }
  };

  return (
    <div className="root-template-div">
      <ToastContainer />
      <div className="form-container">
        <form className="form-template">
          {fields.map((field, index) => (
            <div key={index} className="field-row">
              <input
                type="text"
                placeholder={field.label || `Field ${index + 1}`}
                value={field.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                readOnly={field.readOnly}
                required={field.required}
              />
              <select
                value={field.selectValue}
                onChange={(e) => handleSelectChange(index, e.target.value)}
                required={field.required}
              >
                <option value="">Select Field Type</option>
                <option value="Text(String)">Text(String)</option>
                <option value="Number(int)">Number(int)</option>
                <option value="Yes/No button(Radio)">Yes/No button(Radio)</option>
                <option value="Image">Image</option>
                <option value="Pdf File">Pdf File</option>
              </select>
              {index >= 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  id="remove-button"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </form>
        <button type="button" onClick={handleAddField} className="add-button">
          +
        </button>

        <button
          type="button"
          onClick={handleInitialSubmit}
          className="submit-button"
        >
          Submit
        </button>
      </div>

      {showNotificationForm && (
        <div className="notification-form-overlay">
          <div className="notification-form-container">
            <form className="notification-form" onSubmit={handleFinalSubmit}>
              <div className="form-row">
                <label>Form Name:</label>
                <input
                  type="text"
                  name="formName"
                  value={notificationFormData.formName}
                  onChange={handleNotificationFormChange}
                  required={true}
                  placeholder="Organization Name"
                />
              </div>

              <div className="form-row">
                <label>Date-Time:</label>
                <input
                  type="datetime-local"
                  name="createdAt"
                  value={notificationFormData.createdAt}
                  onChange={handleNotificationFormChange}
                  required={true}
                />
              </div>

              <div className="form-row">
                <label>Enter Username:</label>
                <input
                  type="text"
                  name="userName"
                  value={notificationFormData.userName}
                  onChange={handleNotificationFormChange}
                  required={true}
                  placeholder="Enter Your Username"
                />
              </div>

              <button
                type="submit"
                className="final-submit-button"
              >
                {isLoading ? <div className="spinner"></div> : "Final Submit"}
              </button>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowNotificationForm(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
