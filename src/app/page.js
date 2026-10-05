"use client";
import React, { useState } from "react";
import Header from "@/Components/Header";
import Hero from "@/Components/Hero";
import CategorySection from "@/Components/CategorySection";
import SubscribeModal from "@/Components/SubscribeModal";

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleScrollToBlogs = () => {
    const el = document.getElementById("blogs-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribeSuccess = (email) => {
    setToastMsg(`🎉 Subscribed successfully with ${email}!`);
    setTimeout(() => setToastMsg(""), 4000);
  };

  return (
    <>
      {toastMsg && (
        <div className="toast-notification">
          {toastMsg}
        </div>
      )}

      <Header
        onOpenAddModal={() => setShowAddModal(true)}
        onGetStarted={handleScrollToBlogs}
      />
      <Hero
        onExploreClick={handleScrollToBlogs}
        onSubscribeClick={() => setShowSubscribeModal(true)}
      />
      <CategorySection
        showModalExternal={showAddModal}
        setShowModalExternal={setShowAddModal}
      />

      {showSubscribeModal && (
        <SubscribeModal
          onClose={() => setShowSubscribeModal(false)}
          onSubscribeSuccess={handleSubscribeSuccess}
        />
      )}
    </>
  );
}