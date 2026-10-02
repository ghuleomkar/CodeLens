const CodeLensLogo = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CodeLens logo"
      role="img"
    >
      <defs>
        <linearGradient
          id="codelens-gradient"
          x1="6"
          y1="6"
          x2="34"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C084FC" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Lens / C shape */}
      <path
        d="M31.5 11.5C28.9 8.4 25 6.5 20.7 6.5C12.8 6.5 6.5 12.5 6.5 20C6.5 27.5 12.8 33.5 20.7 33.5C25 33.5 28.9 31.6 31.5 28.5"
        stroke="url(#codelens-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Code brackets */}
      <path
        d="M17 15L12.5 20L17 25"
        stroke="#A78BFA"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M24 15L28.5 20L24 25"
        stroke="#A78BFA"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Code slash */}
      <path
        d="M22 14.5L19 25.5"
        stroke="#E9D5FF"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CodeLensLogo;