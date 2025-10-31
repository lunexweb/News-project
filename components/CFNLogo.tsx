export default function CFNLogo() {
  return (
    <div className="flex flex-col items-center relative">
      {/* Curved decorative lines */}
      <svg 
        className="hidden md:block absolute -top-1 -left-4 w-24 h-14 md:w-40 md:h-24 opacity-30"
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0,0 Q25,30 40,40 L20,55" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
          className="text-cfn-black"
        />
      </svg>
      <svg 
        className="hidden md:block absolute -bottom-1 -right-4 w-24 h-14 md:w-40 md:h-24 opacity-30"
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M100,60 Q75,30 60,20 L80,5" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
          className="text-cfn-black"
        />
      </svg>

      {/* CFN Acronym - Large, Bold, Serif with outline effect */}
      <div className="relative z-10">
        <span className="text-2xl md:text-5xl font-serif font-bold text-cfn-black tracking-tight">
          <span className="drop-shadow-[2px_2px_0_rgba(255,255,255,1)]">CFN</span>
        </span>
      </div>
      {/* Full name - Smaller, Serif */}
      <span className="text-[9px] md:text-sm font-serif text-cfn-black -mt-0.5 md:-mt-1 relative z-10">
        CURRENT FOOTBALL NEWS
      </span>
      {/* Year */}
      <span className="text-[9px] md:text-xs font-sans text-cfn-black mt-0.5 md:mt-1 relative z-10">
        2024
      </span>
    </div>
  );
}

