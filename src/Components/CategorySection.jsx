"use client";
import React, { useState, useEffect } from "react";
import { blog_data as initialData } from "./BlogsData";
import BlogCard from "./BlogCard";
import AddBlogModal from "./AddBlogModal";

const categories = ["All", "Technology", "Startup", "Lifestyle"];

const CategorySection = ({ showModalExternal, setShowModalExternal }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState(initialData);
  const [internalShowModal, setInternalShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showModal = showModalExternal !== undefined ? showModalExternal : internalShowModal;
  const setShowModal = setShowModalExternal || setInternalShowModal;

  // Load stored blogs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nature_daily_blogs");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlogs(parsed);
        }
      } else {
        localStorage.setItem("nature_daily_blogs", JSON.stringify(initialData));
      }
    } catch (err) {
      console.error("Failed to load blogs from localStorage:", err);
    }
  }, []);

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  const handleAddBlog = (newBlog) => {
    const updated = [newBlog, ...blogs];
    setBlogs(updated);
    try {
      localStorage.setItem("nature_daily_blogs", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save new blog to localStorage:", err);
    }
    // Auto-switch to "All" so user immediately sees their newly added blog!
    setActiveCategory("All");

    // Toast alert feedback
    setToastMessage("🎉 Blog added successfully!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleDeleteBlog = (blogId) => {
    const updated = blogs.filter((b) => b.id !== blogId);
    setBlogs(updated);
    try {
      localStorage.setItem("nature_daily_blogs", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to update localStorage:", err);
    }
    setToastMessage("🗑️ Blog deleted.");
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <section className="category-section" id="blogs-section">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}

      {/* Top bar: category buttons + Add Blog button */}
      <div className="category-topbar">
        <div className="category-buttons-wrapper">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          className="add-blog-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Blog
        </button>
      </div>

      {/* Blog count */}
      <p className="blog-count">
        Showing <strong>{filteredBlogs.length}</strong> blog{filteredBlogs.length !== 1 ? "s" : ""}
        {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}
      </p>

      {/* Blog Grid */}
      <div className="blog-grid">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onDelete={typeof blog.id === "number" && blog.id > 1000 ? () => handleDeleteBlog(blog.id) : undefined}
          />
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="no-blogs">
          <span>📭</span>
          <p>No blogs found in this category.</p>
          <button className="add-blog-btn" onClick={() => setShowModal(true)}>
            + Add the first blog
          </button>
        </div>
      )}

      {/* Add Blog Modal */}
      {showModal && (
        <AddBlogModal
          onAdd={handleAddBlog}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default CategorySection;

