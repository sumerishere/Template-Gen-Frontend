import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../created-templates/CreatedTemplate.css";

const TemplateCreated = () => {
  const location = useLocation();
  const username = location.state?.username || '';
  const [templateData, setTemplateData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get-template-username?userName=${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); // Debugging: Check the data structure
          if (Array.isArray(data) && data.length > 0) {
            setTemplateData(data);
          } else {
            setTemplateData([]);
          }
        } else {
          setTemplateData([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setTemplateData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [username]);

  if (loading) {
    return <div id="loading-id">Loading...</div>;
  }

  if (templateData.length === 0) {
    return <div className="empty-text-div"><p id="empty-text">Template not created yet. 🥲</p></div>;
  }

  const template = templateData[0];
  const fields = template?.fields;

  if (!fields) {
    return <div>Fields not available.</div>;
  }

  const fieldKeys = Object.keys(fields);

  return (
    <div className="createdTemplate-root-div">
      <h1 id="createdTemplate-h1">Your Created Template</h1>
      <form className="created-template-form">
        {fieldKeys.map((field, index) => (
          <div key={index} className="form-group">
            <label htmlFor={field}>{field}</label>
            <input type="text" required={true} id={field} name={field} />
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default TemplateCreated;
