// import "./TemplateComp.css";
// import { useState } from "react";

// const DynamicForm = () => {

//   const [fields, setFields] = useState([
//     { type: "input", label: "Fullname", value: "", selectValue: "" },
//     { type: "input", label: "Address", value: "", selectValue: "" },
//   ]);

//   const handleAddField = () => {
//     setFields([
//       ...fields,
//       { type: "input", label: "", value: "", selectValue: "" },
//     ]);
//   };

//   const handleInputChange = (index, value) => {
//     const newFields = [...fields];
//     newFields[index].value = value;
//     setFields(newFields);
//   };

//   const handleSelectChange = (index, value) => {
//     const newFields = [...fields];
//     newFields[index].selectValue = value;
//     setFields(newFields);
//   };

//   const handleRemoveField = (index) => {
//     setFields(fields.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="root-template-div">

//       <div className="form-container">

//         <form className="form-template">

//           {fields.map((field, index) => (

//             <div key={index} className="field-row">

//               <input
//                 type="text"
//                 placeholder={field.label || `Field ${index + 1}`}
//                 value={field.value}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//               />

//               <select
//                 value={field.selectValue}
//                 onChange={(e) => handleSelectChange(index, e.target.value)}>

//                 <option value="">Select Field Type</option>
//                 <option value="option1">Text(String)</option>
//                 <option value="option2">Number(int)</option>
//                 <option value="option3"> Yes/No button(Radio)</option>
//                 <option value="option3">Image</option>
//                 <option value="option3">Pdf File</option>

//               </select>

//               {index >= 2 && (
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveField(index)}
//                   id="remove-button">
//                     Remove
//                 </button>
//               )}
//             </div>
//           ))}

//         </form>

//         <button
//           type="button"
//           onClick={handleAddField}
//           className="add-button">
//             +
//         </button>

//       </div>
//     </div>
//   );
// };

// export default DynamicForm;

import "./TemplateComp.css";
import { useState } from "react";

const DynamicForm = () => {
  const [fields, setFields] = useState([
    { type: "input", label: "Fullname", value: "", selectValue: "option1" },
    { type: "input", label: "Address", value: "", selectValue: "option1" },
  ]);

  const [showNotificationForm, setShowNotificationForm] = useState(false);

  const handleAddField = () => {
    setFields([
      ...fields,
      { type: "input", label: "", value: "", selectValue: "" },
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

  const handleSubmit = () => {
    setShowNotificationForm(true);
  };

  return (
    <div className="root-template-div">
      <div className="form-container">
        <form className="form-template">
          {fields.map((field, index) => (
            <div key={index} className="field-row">
              <input
                type="text"
                placeholder={field.label || `Field ${index + 1}`}
                value={field.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <select
                value={field.selectValue}
                onChange={(e) => handleSelectChange(index, e.target.value)}
              >
                <option value="">Select Field Type</option>
                <option value="option1">Text(String)</option>
                <option value="option2">Number(int)</option>
                <option value="option3">Yes/No button(Radio)</option>
                <option value="option4">Image</option>
                <option value="option5">Pdf File</option>
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
        {/* Submit button to show the notification form */}
        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>

      {/* Notification form container */}

      {showNotificationForm && (
        <div className="notification-form-div">
          <div className="notification-form-container">
            <form className="notification-form">
              <div className="form-row">
                <label>Organization Name:</label>
                <input type="text" placeholder="Organization Name" />
              </div>
              <div className="form-row">
                <label>Date-Time:</label>
                <input required={true} type="datetime-local" />
              </div>
              <div className="form-row">
                <label>Enter Username:</label>
                <input
                  required={true}
                  type="text"
                  placeholder="Enter Username"
                />
              </div>
              <div className="form-row">
                <button type="submit" className="final-submit-button">
                  Final Submit
                </button>
              </div>
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
