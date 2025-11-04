interface LogoIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const LogoIcon = ({ width, height = 32, className }: LogoIconProps) => {
  return (
    <svg
      width={width || height}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Shipping Box Logo"
    >
      {/* Box base */}
      <path
        d="M4 8L16 4L28 8V24L16 28L4 24V8Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top face - isometric */}
      <path
        d="M4 8L16 4L28 8L16 12L4 8Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Right face */}
      <path
        d="M28 8V24L16 28V12L28 8Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Shipping tape stripe */}
      <path
        d="M7 16L25 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Tape edges */}
      <circle cx="7" cy="16" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="25" cy="16" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
};

// interface LogoTextProps {
//   text: string;
//   className?: string;
// }

// const LogoText = ({ text, className }: LogoTextProps) => {
//   return <span className={className}>{text}</span>;
// };

// interface LogoProps {
//   href?: string;
//   logoWidth?: number;
//   logoHeight?: number;
//   text?: string;
//   className?: string;
// }

// const Logo = ({
//   href = "/",
//   logoWidth,
//   logoHeight = 32,
//   text = "Shipping Box",
//   className,
// }: LogoProps) => {
//   const logoContent = (
//     <>
//       <LogoIcon
//         width={logoWidth}
//         height={logoHeight}
//         className={styles.logoImage}
//       />
//       <LogoText text={text} className={styles.logoText} />
//     </>
//   );

//   if (href) {
//     return (
//       <Link href={href} className={`${styles.logoLink} ${className || ""}`}>
//         {logoContent}
//       </Link>
//     );
//   }

//   return (
//     <div className={`${styles.logoContainer} ${className || ""}`}>
//       {logoContent}
//     </div>
//   );
// };

export default LogoIcon;
