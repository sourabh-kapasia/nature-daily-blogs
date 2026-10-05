"use client";
import React, { useState, useEffect, use } from "react";
import { blog_data } from "@/Components/BlogsData";
import Link from "next/link";

const categoryColors = {
  Technology: { bg: "#dbeafe", text: "#1d4ed8", dot: "#3b82f6", accent: "#3b82f6" },
  Startup:    { bg: "#fef3c7", text: "#b45309", dot: "#f59e0b", accent: "#f59e0b" },
  Lifestyle:  { bg: "#dcfce7", text: "#15803d", dot: "#22c55e", accent: "#22c55e" },
};

export default function BlogDetail({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check static blog_data
    let found = blog_data.find((b) => String(b.id) === String(id));

    // 2. If not found in static data, check localStorage
    if (!found && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("nature_daily_blogs");
        if (stored) {
          const parsed = JSON.parse(stored);
          found = parsed.find((b) => String(b.id) === String(id));
        }
      } catch (err) {
        console.error("Error reading blogs from localStorage:", err);
      }
    }

    setBlog(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--clr-muted)", fontSize: "1.2rem" }}>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <main className="blog-detail-page" style={{ textAlign: "center", padding: "5rem 1rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--clr-text)" }}>Blog Not Found</h1>
        <p style={{ color: "var(--clr-muted)", marginBottom: "2rem" }}>
          The blog post you are looking for does not exist or has been removed.
        </p>
        <Link href="/" className="back-btn" style={{ display: "inline-block" }}>
          ← Back to All Blogs
        </Link>
      </main>
    );
  }

  const colors = categoryColors[blog.category] || { bg: "#f0f0f0", text: "#333", dot: "#999", accent: "#999" };

  const paragraphs = blog.description
    ? blog.description.split(". ").reduce((acc, sent, i, arr) => {
        if (i % 2 === 0) acc.push(sent + (arr[i + 1] ? ". " + arr[i + 1] + "." : "."));
        return acc;
      }, [])
    : [];

  return (
    <main className="blog-detail-page">
      {/* Back button */}
      <div className="blog-detail-back">
        <Link href="/" className="back-btn">
          ← Back to Blogs
        </Link>
      </div>

      {/* Hero Image */}
      <div className="blog-detail-hero">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-detail-hero-img"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&q=80";
          }}
        />
        <div className="blog-detail-hero-overlay" />
        <div className="blog-detail-hero-content">
          <span
            className="blog-detail-badge"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            <span className="badge-dot" style={{ backgroundColor: colors.dot }} />
            {blog.category}
          </span>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <span>✍ {blog.author}</span>
            <span className="meta-dot">•</span>
            <span>📅 {blog.date}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="blog-detail-body">
        {paragraphs.map((para, i) => (
          <p key={i} className="blog-detail-para">{para}</p>
        ))}

        {/* Pull quote */}
        <blockquote
          className="blog-detail-quote"
          style={{ borderColor: colors.accent }}
        >
          "Knowledge shared is knowledge multiplied. Every new perspective brings fresh insights to our community."
        </blockquote>

        <p className="blog-detail-para">
          Thank you for reading this article on {blog.category}. Stay tuned for more engaging stories and daily updates from Nature Daily Blogs.
        </p>

        {/* Tags */}
        <div className="blog-detail-tags">
          <span className="detail-tag" style={{ borderColor: colors.dot, color: colors.text }}>
            #{blog.category}
          </span>
          <span className="detail-tag" style={{ borderColor: colors.dot, color: colors.text }}>
            #NatureDailyBlogs
          </span>
        </div>

        {/* Back CTA */}
        <div className="blog-detail-cta">
          <Link href="/" className="cta-back-btn">
            ← Read More Blogs
          </Link>
        </div>
      </article>
    </main>
  );
}

