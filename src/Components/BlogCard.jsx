import React from "react";
import Link from "next/link";

const categoryColors = {
  Technology: { bg: "#dbeafe", text: "#1d4ed8", dot: "#3b82f6" },
  Startup:    { bg: "#fef3c7", text: "#b45309", dot: "#f59e0b" },
  Lifestyle:  { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
};

const BlogCard = ({ blog, onDelete }) => {
  const colors = categoryColors[blog.category] || { bg: "#f0f0f0", text: "#333", dot: "#999" };

  return (
    <article className="blog-card" style={{ position: "relative" }}>
      {/* Delete button if onDelete is provided */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this blog?")) {
              onDelete();
            }
          }}
          title="Delete Blog"
          className="blog-card-delete-btn"
        >
          🗑️
        </button>
      )}

      {/* Clickable Image → Blog Detail */}
      <Link href={`/blog/${blog.id}`} className="blog-card-img-link">
        <div className="blog-card-img-wrapper">
          <img
            src={blog.image}
            alt={blog.title}
            className="blog-card-img"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback if image fails */}
          <div
            className="blog-card-img-fallback"
            style={{ background: `linear-gradient(135deg, ${colors.bg}, ${colors.dot}44)` }}
          >
            <span className="blog-card-fallback-letter">{blog.category ? blog.category[0] : "B"}</span>
          </div>
        </div>
      </Link>

      <div className="blog-card-body">
        {/* Category Badge */}
        <span
          className="blog-card-badge"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          <span className="badge-dot" style={{ backgroundColor: colors.dot }} />
          {blog.category}
        </span>

        {/* Title */}
        <h2 className="blog-card-title">{blog.title}</h2>

        {/* Description */}
        <p className="blog-card-desc">{blog.description}</p>

        {/* Meta */}
        <div className="blog-card-meta">
          <span className="blog-card-author">✍ {blog.author}</span>
          <span className="blog-card-date">📅 {blog.date}</span>
        </div>

        {/* Read More — navigates to full blog page */}
        <Link href={`/blog/${blog.id}`} className="blog-card-btn">
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
