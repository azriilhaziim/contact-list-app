import { useState, useEffect } from "react";

export default function ContactForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({ name: "", email: "", contact: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", email: "", contact: "" });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^(\(\d+\)\s?\d{3}-\d{4}|\d{3}-\d{7}|\d{8,12})$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact is required.";
    } else if (!contactRegex.test(formData.contact)) {
      newErrors.contact = "Contact should match: (171) 555-7788, 030-0074321, or 0126449966.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    if (!initialData) {
      setFormData({ name: "", email: "", contact: "" });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="contact">Contact:</label>
        <input
          id="contact"
          name="contact"
          placeholder="Enter contact"
          value={formData.contact}
          onChange={handleChange}
        />
        {errors.contact && <p className="error-text">{errors.contact}</p>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="add-update-btn">
          {initialData ? "Update" : "Add"} Contact
        </button>

        {initialData && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}