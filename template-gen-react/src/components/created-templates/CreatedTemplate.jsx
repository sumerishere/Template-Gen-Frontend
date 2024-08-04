import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../created-templates/CreatedTemplate.css";
import { Link } from "react-router-dom";

const TemplateCreated = () => {
  const location = useLocation();
  const username = location.state?.username || "";
  const [templateData, setTemplateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [formTemplateId, setFormTemplateId] = useState(null);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/get-template-username?userName=${username}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data); 
          if (Array.isArray(data) && data.length > 0) {
            setTemplateData(data);
            setFormTemplateId(data[0].id); // Assuming the ID is available as `id` in the response
          } else {
            setTemplateData([]);
          }
        } else {
          setTemplateData([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setTemplateData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [username]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0] 
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data as JSON structure
    const formSubmissionData = {
      formTemplateId: formTemplateId,
      formData: { ...formData }
    };

    // Create a FormData object if there are file uploads
    const formDataObject = new FormData();
    formDataObject.append("formTemplateId", formTemplateId);
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        formDataObject.append(key, formData[key]);
      } else {
        formDataObject.append(key, JSON.stringify(formData[key]));
      }
    });

    try {
      // Send form data using fetch API
      const response = await fetch("http://localhost:8080/submit-form-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formSubmissionData),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!", {
          position: "top-center",
        });
        console.log("Form submitted successfully.");
      } else {
        toast.error("Error submitting form.", {
          position: "top-center",
        });
        console.error("Error submitting form.");
      }
    } catch (error) {
      toast.error("Submission error.", {
        position: "top-center",
      });
      console.error("Submission error:", error);
    }
  };

  if (loading) {
    return <div id="loading-id">Loading...</div>;
  }

  if (templateData.length === 0) {
    return (
      <div className="empty-text-div">


        <img className="bg-template-img" src="/images/data-8873303_1920.png" alt="" />
        <p id="empty-text">Template not created yet. 🥲</p>
        <p id="alert-emoji">⚠️</p>
        <p id="empty-template-note">{`Note :" First you will have to create your own template form then you will able to see your template form here."`}</p>
      </div>
    );
  }

  const template = templateData[0];
  const fields = template?.fields || [];

  return (
    <div className="createdTemplate-root-div">
      <ToastContainer />
      <h1 id="createdTemplate-h1">Your Created Template</h1>

      <div className="data-table">
          <p>
           <Link to="/DataTableComp">
              <button id="check-data-id">check table</button> 
           </Link> 
          </p>
      </div>

      <div className="form-div-container">
        <form className="created-template-form" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="form-group">
              <label htmlFor={field.columnName}>{field.columnName}</label>

              {field.dataType === "Yes/No button(Radio)" ? (
                <div>
                  <label id="label-radio-1">
                    <input
                      id="radio-input-1"
                      style={{ cursor: "pointer" }}
                      type="radio"
                      name={field.columnName}
                      value="Yes"
                      onChange={handleChange}
                    />{" "}
                    Yes
                  </label>
                  <label id="label-radio-2">
                    <input
                      id="radio-input-2"
                      style={{ cursor: "pointer" }}
                      type="radio"
                      name={field.columnName}
                      value="No"
                      onChange={handleChange}
                    />{" "}
                    No
                  </label>
                </div>
              ) : field.dataType === "Yes/No check(checkbox)" ? (
                <div>
                  <label id="label-checkbox">
                    <input
                      style={{ cursor: "pointer" }}
                      id="checkbox-input"
                      type="checkbox"
                      name={field.columnName}
                      onChange={handleChange}
                    />{" "}
                    Yes
                  </label>
                </div>
              ) : field.dataType === "Image" ? (
                <div>
                  <label id="label-image">
                    <input
                      style={{
                        border: "1px solid grey",
                        borderRadius: "3px",
                      }}
                      id="image-input"
                      type="file"
                      accept="image/*"
                      name={field.columnName}
                      onChange={handleChange}
                    />{" "}
                    Upload Image
                  </label>
                </div>
              ) : field.dataType === "Pdf File" ? (
                <div>
                  <label id="label-pdf">
                    <input
                      style={{
                        border: "1px solid grey",
                        borderRadius: "3px",
                      }}
                      id="pdf-input"
                      type="file"
                      accept="application/pdf"
                      name={field.columnName}
                      onChange={handleChange}
                    />{" "}
                    Upload PDF
                  </label>
                </div>
              ) : (
                <input
                  className="form-input"
                  placeholder={`Enter ${
                    field.columnName !== "comment box"
                      ? field.columnName
                      : "comment"
                  }`}
                  type={field.dataType === "Number(int)" ? "number" : "text"}
                  min={field.dataType === "Number(int)" ? 0 : undefined}
                  required={true}
                  id={field.columnName}
                  name={field.columnName}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TemplateCreated;



