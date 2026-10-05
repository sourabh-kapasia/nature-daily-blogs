import React from 'react'

const Header = ({ onOpenAddModal, onGetStarted }) => {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      const section = document.getElementById("blogs-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className='navbar'>

      {/* LEFT: Logo + Site Name */}
      <div className='navbar-brand' onClick={handleGetStarted}>
        {/* SVG Leaf Logo */}
        <div className='navbar-logo-icon'>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer glow circle */}
            <circle cx="18" cy="18" r="18" fill="url(#logoGradient)" opacity="0.15" />

            {/* Leaf shape */}
            <path
              d="M18 6C18 6 8 12 8 20C8 25.523 12.477 30 18 30C23.523 30 28 25.523 28 20C28 12 18 6 18 6Z"
              fill="url(#leafGradient)"
            />

            {/* Leaf vein */}
            <path
              d="M18 28V14"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M18 20C18 20 14 17 12 14"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M18 23C18 23 22 20 24 17"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Small sparkle dot */}
            <circle cx="24" cy="11" r="2" fill="#f472b6" opacity="0.85" />

            <defs>
              <linearGradient id="leafGradient" x1="18" y1="6" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <radialGradient id="logoGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#818cf8" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Site Name */}
        <span className='navbar-site-name'>
          Nature <span className='navbar-site-name-accent'>Daily Blogs</span>
        </span>
      </div>

      {/* RIGHT: Buttons */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button className='navbar-btn' onClick={handleGetStarted}>
          Get Started
        </button>
      </div>

    </header>
  )
}

export default Header