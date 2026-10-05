"use client";
import React, { useState } from "react";

const CATEGORIES = ["Technology", "Startup", "Lifestyle"];

const AddBlogModal = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Technology",
    image: "",
    author: "",
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.author.trim())      e.author = "Author name is required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

    onAdd({
      id: Date.now(),
      title: form.title,
      description: form.description,
      category: form.category,
      image: form.image || `https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&q=80`,
      author: form.author,
      date: today,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">✍ Add New Blog</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Blog Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? "input-error" : ""}`}
              placeholder="Enter an engaging blog title..."
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-input form-select"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="form-group">
            <label className="form-label">Author Name *</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className={`form-input ${errors.author ? "input-error" : ""}`}
              placeholder="Your name..."
            />
            {errors.author && <span className="form-error">{errors.author}</span>}
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label className="form-label">Image URL <span className="form-optional">(optional)</span></label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="form-input"
              placeholder="https://images.unsplash.com/..."
            />
            {form.image && (
              <div className="img-preview-wrap">
                <img
                  src={form.image}
                  alt="preview"
                  className="img-preview"
                  onError={(e) => e.target.style.display = "none"}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className={`form-input form-textarea ${errors.description ? "input-error" : ""}`}
              placeholder="Write a compelling description for your blog..."
              rows={4}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-publish">🚀 Publish Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogModal;
