import Navbar from './components/Navbar'
import ScrollFrameHero from './components/ScrollFrameHero'
import WisdomTeachings from './components/WisdomTeachings'
import RealTransformations from './components/RealTransformations'
import WorkshopsRetreats from './components/WorkshopsRetreats'
import FaqSection from './components/FaqSection'
import BookSession from './components/BookSession'
import SiteFooter from './components/SiteFooter'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      {/* Redesigned Premium Navbar */}
      <Navbar />

      {/* Hero — scroll-scrubbed frame sequence */}
      <ScrollFrameHero />

      {/* About Dr. Sachin Bansal Banner Section (Compact Height & Tight Spacing) */}
      <section 
        id="about"
        className="relative w-full h-[520px] md:h-[560px] bg-cover bg-center overflow-hidden flex items-center border-b border-[#D9C79E]/30"
        style={{ backgroundImage: `url(/banner_section.png)` }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left side column matches the gold frame placement on banner_section.png */}
          <div className="hidden lg:block lg:col-span-5"></div>

          {/* Right side content occupying the red box area with tight spacing */}
          <div className="lg:col-span-7 flex flex-col items-center text-center max-w-xl mx-auto lg:mx-0">
            
            {/* Sub-heading */}
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#B08A3A] sm:text-[12px]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                MEET YOUR GUIDE
              </span>
              <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
            </div>

            {/* Main Title */}
            <h2 
              className="text-[42px] sm:text-[50px] md:text-[56px] leading-[1.05] font-medium mb-1.5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="engrave-ink">About </span>
              <span className="engrave-green font-semibold">Dr. Sachin Bansal</span>
            </h2>

            {/* Lotus Emblem Divider */}
            <div className="flex items-center justify-center gap-2.5 my-1 w-full max-w-xs">
              <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
              <div className="relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-5 w-5 text-[#C49A45]" fill="currentColor">
                  <path d="M50 15 C42 32 25 42 32 55 C38 55 45 42 50 25 C55 42 62 55 68 55 C75 42 58 32 50 15 Z" fill="#D49942" />
                  <path d="M50 25 C46 36 38 42 42 50 C46 50 48 44 50 32 C52 44 54 50 58 50 C62 42 54 36 50 25 Z" fill="#E86B8A" />
                  <circle cx="50" cy="48" r="3" fill="#FFF2A1" />
                </svg>
              </div>
              <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
            </div>

            {/* Tagline Paragraph (Italic Heading) */}
            <p 
              className="text-[20px] md:text-[23px] text-[#8C6621] tracking-wide leading-tight mb-1.5 font-normal italic max-w-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A beacon of light for those seeking clarity, peace, and purpose.
            </p>

            {/* Body Paragraph */}
            <p 
              className="text-[17px] md:text-[18.5px] text-[#4A4235] tracking-wide leading-relaxed mb-2.5 max-w-lg font-normal"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Through ancient wisdom and a modern understanding, Dr. Sachin Bansal guides you to reconnect with your true self and create a life of abundance and harmony.
            </p>

            {/* Handwritten Signature */}
            <div className="flex flex-col items-center mb-3">
              <span 
                className="engrave-gold text-[36px] md:text-[40px] leading-none"
                style={{ fontFamily: "'Pinyon Script', cursive" }}
              >
                Sachin Bansal
              </span>
              <span className="w-20 h-[1px] bg-[#C49A45]/40 mt-0.5"></span>
            </div>

            {/* Compact 4-Column Stats Card */}
            <div className="w-full max-w-lg bg-[#FAF5EC]/90 backdrop-blur-sm border border-[#E3D5C1] rounded-xl px-4 py-2.5 shadow-sm mb-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E3D5C1] gap-y-2 sm:gap-y-0">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center px-1.5 py-0.5 text-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#B88A2E] mb-1" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 4C10 8 6 10 7 14C8 14 10 12 12 8C14 12 16 14 17 14C18 10 14 8 12 4Z" fill="#B88A2E" opacity="0.2" />
                    <path d="M12 4C10 8 6 10 7 14C8 14 10 12 12 8C14 12 16 14 17 14C18 10 14 8 12 4Z" />
                    <path d="M12 8C7 12 3 14 4 18C6 18 9 16 12 12C15 16 18 18 20 18C21 14 17 12 12 8Z" />
                  </svg>
                  <span className="engrave-green text-[26px] md:text-[28px] font-semibold leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    15+
                  </span>
                  <span className="text-[10px] text-[#5A5042] uppercase tracking-wider mt-0.5 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Years of Experience
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center px-1.5 py-0.5 text-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#B88A2E] mb-1" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="engrave-green text-[22px] md:text-[24px] font-semibold leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Thousands
                  </span>
                  <span className="text-[10px] text-[#5A5042] uppercase tracking-wider mt-0.5 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    of Lives Transformed
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center px-1.5 py-0.5 text-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#B88A2E] mb-1" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="engrave-green text-[26px] md:text-[28px] font-semibold leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    500+
                  </span>
                  <span className="text-[10px] text-[#5A5042] uppercase tracking-wider mt-0.5 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Workshops & Sessions
                  </span>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center px-1.5 py-0.5 text-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#B88A2E] mb-1" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span className="engrave-green text-[26px] md:text-[28px] font-semibold leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Global
                  </span>
                  <span className="text-[10px] text-[#5A5042] uppercase tracking-wider mt-0.5 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Reach & Impact
                  </span>
                </div>

              </div>
            </div>

            {/* CTA Button */}
            <a 
              href="#journey" 
              className="inline-flex items-center gap-2 rounded-full bg-[#123A1A] hover:bg-[#0d2a13] text-[#F5EFE6] text-[10.5px] md:text-[11px] font-semibold tracking-[0.2em] px-7 py-3 shadow-md border border-[#B88A2E]/70 transition-all duration-300 hover:scale-[1.03]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              DISCOVER MY JOURNEY
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#B88A2E]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>

          </div>
        </div>
      </section>

      {/* Your Transformation Philosophy Section matching Image 1 */}
      <section 
        className="relative w-full min-h-[580px] md:min-h-[620px] bg-cover bg-center overflow-hidden flex flex-col justify-center py-10 md:py-14 border-b border-[#D9C79E]/30"
        style={{ backgroundImage: `url(/programs_bg.png)` }}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Sub-heading */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-10 h-[1px] bg-[#C49A45]/60"></span>
            <span className="text-[11.5px] md:text-[12.5px] tracking-[0.28em] text-[#A67B2A] uppercase font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              THE SACRED JOURNEY
            </span>
            <span className="w-10 h-[1px] bg-[#C49A45]/60"></span>
          </div>

          {/* Main Title: Your Transformation Philosophy */}
          <h2 
            className="text-[40px] sm:text-[48px] md:text-[54px] leading-[1.05] font-normal mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="engrave-ink">Your </span>
            <span className="engrave-green italic font-medium">Transformation</span>
            <span className="engrave-ink"> Philosophy</span>
          </h2>

          {/* Lotus Emblem Divider 1 */}
          <div className="flex items-center justify-center gap-3 my-2 w-full max-w-xs">
            <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-5 w-5 text-[#C49A45]" fill="currentColor">
                <path d="M50 15 C42 32 25 42 32 55 C38 55 45 42 50 25 C55 42 62 55 68 55 C75 42 58 32 50 15 Z" fill="#D49942" />
                <path d="M50 25 C46 36 38 42 42 50 C46 50 48 44 50 32 C52 44 54 50 58 50 C62 42 54 36 50 25 Z" fill="#E86B8A" />
                <circle cx="50" cy="48" r="3" fill="#FFF2A1" />
              </svg>
            </div>
            <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
          </div>

          {/* Description Paragraph */}
          <p 
            className="text-[17px] md:text-[19px] text-[#4A4235] tracking-wide leading-relaxed max-w-xl font-normal"
            style={{ fontFamily: "'Cormorant Garamond', serif", marginBottom: "80px" }}
          >
            A holistic approach to awaken your inner wisdom,<br />
            restore balance and create a fulfilling life.
          </p>

          {/* 4-Step Process Flow with Golden Badges & Connecting Arrows */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-start justify-items-center relative" style={{ marginBottom: "72px" }}>
            
            {/* Step 1: AWAKEN */}
            <div className="flex flex-col items-center text-center max-w-[210px] relative w-full group">
              <img
                src="/icon_awaken.png"
                alt="Awaken"
                className="h-20 w-20 rounded-full object-cover mb-3 shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#E0D0B5]"
              />
              <h3 className="engrave-green text-[13.5px] md:text-[14.5px] font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                AWAKEN
              </h3>
              <p className="text-[17px] md:text-[18.5px] text-[#4A4235] leading-snug font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Reconnect with your true self
              </p>
            </div>

            {/* Connecting Arrow 1 (Desktop) */}
            <div className="hidden md:flex items-center justify-center absolute left-[22%] top-7 -translate-x-1/2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C49A45]/80" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </div>

            {/* Step 2: ALIGN */}
            <div className="flex flex-col items-center text-center max-w-[210px] relative w-full group">
              <img
                src="/icon_align.png"
                alt="Align"
                className="h-20 w-20 rounded-full object-cover mb-3 shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#E0D0B5]"
              />
              <h3 className="engrave-green text-[13.5px] md:text-[14.5px] font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                ALIGN
              </h3>
              <p className="text-[17px] md:text-[18.5px] text-[#4A4235] leading-snug font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Bring harmony to mind, body & soul
              </p>
            </div>

            {/* Connecting Arrow 2 (Desktop) */}
            <div className="hidden md:flex items-center justify-center absolute left-[47%] top-7 -translate-x-1/2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C49A45]/80" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </div>

            {/* Step 3: HEAL */}
            <div className="flex flex-col items-center text-center max-w-[210px] relative w-full group">
              <img
                src="/icon_heal.png"
                alt="Heal"
                className="h-20 w-20 rounded-full object-cover mb-3 shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#E0D0B5]"
              />
              <h3 className="engrave-green text-[13.5px] md:text-[14.5px] font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                HEAL
              </h3>
              <p className="text-[17px] md:text-[18.5px] text-[#4A4235] leading-snug font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Release limitations and past blocks
              </p>
            </div>

            {/* Connecting Arrow 3 (Desktop) */}
            <div className="hidden md:flex items-center justify-center absolute left-[72%] top-7 -translate-x-1/2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C49A45]/80" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </div>

            {/* Step 4: TRANSFORM */}
            <div className="flex flex-col items-center text-center max-w-[210px] relative w-full group">
              <img
                src="/icon_transform.png"
                alt="Transform"
                className="h-20 w-20 rounded-full object-cover mb-3 shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#E0D0B5]"
              />
              <h3 className="engrave-green text-[13.5px] md:text-[14.5px] font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                TRANSFORM
              </h3>
              <p className="text-[17px] md:text-[18.5px] text-[#4A4235] leading-snug font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Live with clarity, peace and purpose
              </p>
            </div>

          </div>

          {/* Lotus Emblem Divider 2 (above button) */}
          <div className="flex items-center justify-center gap-3 my-4 md:my-6 w-full max-w-xs">
            <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-5 w-5 text-[#C49A45]" fill="currentColor">
                <path d="M50 15 C42 32 25 42 32 55 C38 55 45 42 50 25 C55 42 62 55 68 55 C75 42 58 32 50 15 Z" fill="#D49942" />
                <path d="M50 25 C46 36 38 42 42 50 C46 50 48 44 50 32 C52 44 54 50 58 50 C62 42 54 36 50 25 Z" fill="#E86B8A" />
                <circle cx="50" cy="48" r="3" fill="#FFF2A1" />
              </svg>
            </div>
            <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
          </div>

          {/* CTA Button matching Image 1: Gold bordered cream pill button */}
          <a 
            href="#journey" 
            className="inline-flex items-center gap-2 rounded-full bg-[#123A1A] hover:bg-[#0d2a13] text-[#C4A15A] text-[12px] md:text-[13px] font-semibold tracking-[0.1em] px-8 py-3.5 shadow-sm border border-[#C4A15A]/70 transition-all duration-300 hover:scale-[1.03]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Begin Your Inner Journey
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#C4A15A]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>

        </div>
      </section>

      {/* Guidance for Every Step of Your Journey Section matching Image 1 & Image 2 */}
      <section 
        id="programs"
        className="relative w-full min-h-[900px] bg-cover bg-center flex flex-col justify-center py-12 md:py-16 border-b border-[#D9C79E]/30"
        style={{ backgroundImage: `url('/ChatGPT Image Aug 14, 2026, 09_40_16 AM.png')` }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Sub-heading */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#B08A3A] sm:text-[12px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              OUR PROGRAMS & OFFERINGS
            </span>
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
          </div>

          {/* Main Title */}
          <h2 
            className="text-[40px] sm:text-[48px] md:text-[54px] leading-[1.05] font-normal mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="engrave-green font-medium">Guidance for Every Step</span>{" "}
            <span className="engrave-gold italic font-medium">of Your Journey</span>
          </h2>

          {/* Lotus Divider */}
          <div className="flex items-center justify-center gap-3 my-2.5 w-full max-w-xs">
            <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-5 w-5 text-[#C49A45]" fill="currentColor">
                <path d="M50 15 C42 32 25 42 32 55 C38 55 45 42 50 25 C55 42 62 55 68 55 C75 42 58 32 50 15 Z" fill="#D49942" />
                <path d="M50 25 C46 36 38 42 42 50 C46 50 48 44 50 32 C52 44 54 50 58 50 C62 42 54 36 50 25 Z" fill="#E86B8A" />
                <circle cx="50" cy="48" r="3" fill="#FFF2A1" />
              </svg>
            </div>
            <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
          </div>

          {/* Tagline Description */}
          <p 
            className="text-[17px] md:text-[18.5px] text-[#5A5042] tracking-wide leading-relaxed max-w-xl font-normal"
            style={{ fontFamily: "'Cormorant Garamond', serif", marginBottom: "88px" }}
          >
            Personalized spiritual programs and ancient wisdom practices to help you heal, align, and transform your life.
          </p>

          {/* 7 Program Cards Grid */}
          <div className="w-full flex flex-col gap-6 lg:gap-7 mb-10 md:mb-14">
            
            {/* Row 1: 4 columns on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              
              {/* Card 1 */}
              <div className="group bg-white/65 hover:bg-[#123A1A] border border-[#ebdcc5] hover:border-[#C4A15A]/35 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_12px_-4px_rgba(212,153,66,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(18,58,26,0.38)] transition-all duration-500 max-w-[305px] w-full mx-auto">
                <img src="/prog_icon_1.png" alt="Life Coaching" className="h-28 w-28 object-contain mb-3.5 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                <h3 className="engrave-green group-hover:[background-image:linear-gradient(to_right,#C4A15A,#C4A15A)] text-[22px] md:text-[24px] font-semibold mb-2 leading-snug transition-all duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Life Coaching<br />& Guidance
                </h3>
                <p className="text-[16px] md:text-[17px] text-[#5A5042] group-hover:!text-[#FAF5EC] leading-relaxed font-normal transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  One-on-one guidance to bring clarity, purpose and direction to your life.
                </p>
                <div className="mt-auto pt-3">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#B88A2E] group-hover:text-[#C4A15A] opacity-70 transition-colors duration-300" fill="currentColor">
                    <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
                  </svg>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-white/65 hover:bg-[#123A1A] border border-[#ebdcc5] hover:border-[#C4A15A]/35 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_12px_-4px_rgba(212,153,66,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(18,58,26,0.38)] transition-all duration-500 max-w-[305px] w-full mx-auto">
                <img src="/prog_icon_2.png" alt="Crystal Guidance" className="h-28 w-28 object-contain mb-3.5 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                <h3 className="engrave-green group-hover:[background-image:linear-gradient(to_right,#C4A15A,#C4A15A)] text-[22px] md:text-[24px] font-semibold mb-2 leading-snug transition-all duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Crystal Guidance<br />& Energy Healing
                </h3>
                <p className="text-[16px] md:text-[17px] text-[#5A5042] group-hover:!text-[#FAF5EC] leading-relaxed font-normal transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Harness the healing energy of crystals to balance, protect and uplift your energy.
                </p>
                <div className="mt-auto pt-3">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#B88A2E] group-hover:text-[#C4A15A] opacity-70 transition-colors duration-300" fill="currentColor">
                    <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
                  </svg>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-white/65 hover:bg-[#123A1A] border border-[#ebdcc5] hover:border-[#C4A15A]/35 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_12px_-4px_rgba(212,153,66,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(18,58,26,0.38)] transition-all duration-500 max-w-[305px] w-full mx-auto">
                <img src="/prog_icon_3.png" alt="Aura Reading" className="h-28 w-28 object-contain mb-3.5 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                <h3 className="engrave-green group-hover:[background-image:linear-gradient(to_right,#C4A15A,#C4A15A)] text-[22px] md:text-[24px] font-semibold mb-2 leading-snug transition-all duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Aura Reading<br />& Analysis
                </h3>
                <p className="text-[16px] md:text-[17px] text-[#5A5042] group-hover:!text-[#FAF5EC] leading-relaxed font-normal transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Discover insights about your energy field and emotional, mental & spiritual well-being.
                </p>
                <div className="mt-auto pt-3">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#B88A2E] group-hover:text-[#C4A15A] opacity-70 transition-colors duration-300" fill="currentColor">
                    <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
                  </svg>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group bg-white/65 hover:bg-[#123A1A] border border-[#ebdcc5] hover:border-[#C4A15A]/35 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_12px_-4px_rgba(212,153,66,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(18,58,26,0.38)] transition-all duration-500 max-w-[305px] w-full mx-auto">
                <img src="/prog_icon_4.png" alt="Astro Numerology" className="h-28 w-28 object-contain mb-3.5 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                <h3 className="engrave-green group-hover:[background-image:linear-gradient(to_right,#C4A15A,#C4A15A)] text-[22px] md:text-[24px] font-semibold mb-2 leading-snug transition-all duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Astro Numerology<br />Consultation
                </h3>
                <p className="text-[16px] md:text-[17px] text-[#5A5042] group-hover:!text-[#FAF5EC] leading-relaxed font-normal transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Decode the hidden meanings of numbers and align with your life's true path.
                </p>
                <div className="mt-auto pt-3">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#B88A2E] group-hover:text-[#C4A15A] opacity-70 transition-colors duration-300" fill="currentColor">
                    <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Row 2: 3 columns centered on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 max-w-4xl mx-auto w-full justify-center">
              
              {/* Card 5 */}
              <div className="group bg-white/65 hover:bg-[#123A1A] border border-[#ebdcc5] hover:border-[#C4A15A]/35 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_12px_-4px_rgba(212,153,66,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(18,58,26,0.38)] transition-all duration-500 max-w-[305px] w-full mx-auto">
                <img src="/prog_icon_5.png" alt="Vaastu Consultation" className="h-28 w-28 object-contain mb-3.5 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                <h3 className="engrave-green group-hover:[background-image:linear-gradient(to_right,#C4A15A,#C4A15A)] text-[22px] md:text-[24px] font-semibold mb-2 leading-snug transition-all duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Vaastu Consultation<br />& Corrections
                </h3>
                <p className="text-[16px] md:text-[17px] text-[#5A5042] group-hover:!text-[#FAF5EC] leading-relaxed font-normal transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Create harmony in your space and life with ancient Vaastu principles.
                </p>
                <div className="mt-auto pt-3">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#B88A2E] group-hover:text-[#C4A15A] opacity-70 transition-colors duration-300" fill="currentColor">
                    <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
                  </svg>
                </div>
              </div>

              {/* Card 6 */}
              <div className="group bg-white/65 hover:bg-[#123A1A] border border-[#ebdcc5] hover:border-[#C4A15A]/35 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_12px_-4px_rgba(212,153,66,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(18,58,26,0.38)] transition-all duration-500 max-w-[305px] w-full mx-auto">
                <img src="/prog_icon_6.png" alt="Meditations" className="h-28 w-28 object-contain mb-3.5 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                <h3 className="engrave-green group-hover:[background-image:linear-gradient(to_right,#C4A15A,#C4A15A)] text-[22px] md:text-[24px] font-semibold mb-2 leading-snug transition-all duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Meditations
                </h3>
                <p className="text-[16px] md:text-[17px] text-[#5A5042] group-hover:!text-[#FAF5EC] leading-relaxed font-normal transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Guided meditations to calm your mind, awaken within and elevate your soul.
                </p>
                <div className="mt-auto pt-3">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#B88A2E] group-hover:text-[#C4A15A] opacity-70 transition-colors duration-300" fill="currentColor">
                    <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
                  </svg>
                </div>
              </div>

              {/* Card 7 */}
              <div className="group bg-white/65 hover:bg-[#123A1A] border border-[#ebdcc5] hover:border-[#C4A15A]/35 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_12px_-4px_rgba(212,153,66,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(18,58,26,0.38)] transition-all duration-500 max-w-[305px] w-full mx-auto">
                <img src="/prog_icon_7.png" alt="Aura Reset" className="h-28 w-28 object-contain mb-3.5 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                <h3 className="engrave-green group-hover:[background-image:linear-gradient(to_right,#C4A15A,#C4A15A)] text-[22px] md:text-[24px] font-semibold mb-2 leading-snug transition-all duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Aura Reset<br />Self-Healing Workshops
                </h3>
                <p className="text-[16px] md:text-[17px] text-[#5A5042] group-hover:!text-[#FAF5EC] leading-relaxed font-normal transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Learn powerful self-healing techniques to cleanse, reset and renew your energy.
                </p>
                <div className="mt-auto pt-3">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#B88A2E] group-hover:text-[#C4A15A] opacity-70 transition-colors duration-300" fill="currentColor">
                    <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
                  </svg>
                </div>
              </div>

            </div>

          </div>

          {/* CTA Button */}
          <a 
            href="#programs" 
            className="inline-flex items-center gap-2.5 rounded-full bg-[#123A1A] hover:bg-[#0d2a13] text-[#C4A15A] text-[11px] md:text-[11.5px] font-semibold tracking-[0.2em] px-8 py-3.5 shadow-md border border-[#C4A15A]/70 transition-all duration-300 hover:scale-[1.03]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            EXPLORE ALL PROGRAMS
            <svg viewBox="0 0 100 100" className="h-4.5 w-4.5 text-[#C4A15A]" fill="currentColor">
              <path d="M50 15 C42 32 25 42 32 55 C38 55 45 42 50 25 C55 42 62 55 68 55 C75 42 58 32 50 15 Z" fill="#D49942" />
              <path d="M50 25 C46 36 38 42 42 50 C46 50 48 44 50 32 C52 44 54 50 58 50 C62 42 54 36 50 25 Z" fill="#E86B8A" />
              <circle cx="50" cy="48" r="3" fill="#FFF2A1" />
            </svg>
          </a>

        </div>
      </section>

      {/* Cinematic Experience Section matching Image 1 & Image 2 */}
      <section 
        className="relative w-full flex flex-col justify-center py-10 md:py-14 border-b border-[#D9C79E]/30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/ChatGPT Image Aug 14, 2026, 12_14_07 PM.png')` }}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6">
          
          {/* Card Container with Background and Shadow */}
          <div className="bg-white/70 backdrop-blur-md border border-[#ebdcc5] rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_-6px_rgba(212,153,66,0.08)] flex flex-col gap-8 md:gap-10">
            
            {/* Main Grid: Left Video Player, Right Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive Video Player UI */}
              <div className="lg:col-span-7 w-full">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#E3D5C1] shadow-xl bg-black group">
                  
                  {/* Video Thumbnail (meditation silhouette) */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-102"
                    style={{ backgroundImage: `url(/programs_bg.png)` }}
                  />
                  
                  {/* Soft gradient overlay for controls legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Center Play Button */}
                  <button 
                    type="button"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-black/40 hover:bg-black/60 border-2 border-[#C49A45] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg group/btn"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#C49A45] fill-current translate-x-0.5" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>

                  {/* Quote Overlay (Bottom Left) */}
                  <div className="absolute bottom-16 left-6 right-6">
                    <p 
                      className="text-[20px] sm:text-[24px] text-[#FAF5EC] leading-tight drop-shadow-md font-normal"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Your transformation begins<br />
                      when you turn <span className="italic font-medium">inward.</span>
                    </p>
                  </div>

                  {/* Custom Video Controls Bar */}
                  <div className="absolute bottom-0 inset-x-0 h-14 bg-black/40 backdrop-blur-xs border-t border-white/10 flex items-center justify-between px-4 text-white text-[11px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    
                    {/* Left Controls: Play Icon & Time */}
                    <div className="flex items-center gap-3">
                      <button type="button" className="text-white hover:text-[#C49A45] transition-colors">
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </button>
                      <span>0:00 / 2:28</span>
                    </div>

                    {/* Center Seek Bar */}
                    <div className="flex-1 mx-4 h-1 bg-white/20 rounded-full relative overflow-hidden cursor-pointer group/seek">
                      <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-[#C49A45]" />
                    </div>

                    {/* Right Controls: Volume, Settings, Fullscreen */}
                    <div className="flex items-center gap-3.5">
                      {/* Volume */}
                      <button type="button" className="text-white hover:text-[#C49A45] transition-colors">
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      </button>
                      {/* Settings */}
                      <button type="button" className="text-white hover:text-[#C49A45] transition-colors">
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </button>
                      {/* Fullscreen */}
                      <button type="button" className="text-white hover:text-[#C49A45] transition-colors">
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* Right Column: Title, Lotus Divider, Description & Button */}
              <div className="lg:col-span-5 flex flex-col items-center text-center pl-0 lg:pl-4">
                
                {/* Sub-heading */}
                <div className="flex items-center justify-center gap-3 mb-2 w-full">
                  <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#B08A3A] sm:text-[12px]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    CINEMATIC EXPERIENCE
                  </span>
                  <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
                </div>

                {/* Title */}
                <h2 
                  className="text-[32px] sm:text-[38px] md:text-[42px] leading-[1.1] font-normal mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <span className="engrave-green font-medium block">Step Into a Space</span>{" "}
                  <span className="engrave-gold italic font-medium block">of Inner Awakening</span>
                </h2>

                {/* Lotus Divider */}
                <div className="flex items-center gap-2.5 my-1.5 w-full max-w-xs lg:max-w-none">
                  <span className="flex-1 lg:flex-none lg:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
                  <div className="relative flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="h-5 w-5 text-[#C49A45]" fill="currentColor">
                      <path d="M50 15 C42 32 25 42 32 55 C38 55 45 42 50 25 C55 42 62 55 68 55 C75 42 58 32 50 15 Z" fill="#D49942" />
                      <path d="M50 25 C46 36 38 42 42 50 C46 50 48 44 50 32 C52 44 54 50 58 50 C62 42 54 36 50 25 Z" fill="#E86B8A" />
                      <circle cx="50" cy="48" r="3" fill="#FFF2A1" />
                    </svg>
                  </div>
                  <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C49A45]/60 to-[#C49A45]"></span>
                </div>

                {/* Description */}
                <p 
                  className="text-[16px] md:text-[17.5px] text-[#5A5042] tracking-wide leading-relaxed max-w-md font-normal"
                  style={{ fontFamily: "'Cormorant Garamond', serif", marginBottom: "56px" }}
                >
                  A glimpse into the world of healing, wisdom and transformation that awaits you. Feel the energy. Sense the shift. Begin within.
                </p>

                {/* Watch Experience Button */}
                <a 
                  href="#video" 
                  className="inline-flex items-center gap-2 rounded-full bg-[#123A1A] hover:bg-[#0d2a13] text-[#C4A15A] text-[10px] md:text-[10.5px] font-semibold tracking-[0.2em] px-6 py-3 shadow-md border border-[#C4A15A]/70 transition-all duration-300 hover:scale-[1.03]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  WATCH THE EXPERIENCE
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4A15A]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>

              </div>

            </div>

            {/* Bottom Row: 4 Features */}
            <div className="w-full border-t border-[#E3D5C1]/40 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 justify-items-center">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#B88A2E] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4C10 8 6 10 7 14C8 14 10 12 12 8C14 12 16 14 17 14C18 10 14 8 12 4Z" fill="#B88A2E" opacity="0.2" />
                  <path d="M12 4C10 8 6 10 7 14C8 14 10 12 12 8C14 12 16 14 17 14C18 10 14 8 12 4Z" />
                  <path d="M12 8C7 12 3 14 4 18C6 18 9 16 12 12C15 16 18 18 20 18C21 14 17 12 12 8Z" />
                </svg>
                <h4 className="engrave-green text-[13.5px] md:text-[14.5px] font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Soulful Visuals
                </h4>
                <p className="text-[16px] md:text-[17.5px] text-[#5A5042] leading-snug font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Cinematic moments that touch your heart.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#B88A2E] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="#B88A2E" opacity="0.2" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <h4 className="engrave-green text-[13.5px] md:text-[14.5px] font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Real Journeys
                </h4>
                <p className="text-[16px] md:text-[17.5px] text-[#5A5042] leading-snug font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Stories of transformation and inner healing.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#B88A2E] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v18M3 12h18M12 3l3 4.5M12 21l-3-4.5M3 12l4.5-3M21 12l-4.5 3" />
                  <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0 -4 0" fill="#B88A2E" opacity="0.2" />
                </svg>
                <h4 className="engrave-green text-[13.5px] md:text-[14.5px] font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Deep Connection
                </h4>
                <p className="text-[16px] md:text-[17.5px] text-[#5A5042] leading-snug font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Feel the energy of a higher vibration.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#B88A2E] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a10 10 0 1 0 10 10c0-2-1.5-3.5-3-3.5A2.5 2.5 0 0 0 16.5 11c0 3-2.5 5.5-5.5 5.5S5.5 14 5.5 11 8 5.5 11 5.5c2 0 3.5 1.5 3.5 3" />
                </svg>
                <h4 className="engrave-green text-[13.5px] md:text-[14.5px] font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Awaken Within
                </h4>
                <p className="text-[16px] md:text-[17.5px] text-[#5A5042] leading-snug font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Rediscover your truth and life's purpose.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      <WisdomTeachings />

      <RealTransformations />

      <WorkshopsRetreats />

      <FaqSection />

      <BookSession />

      <SiteFooter />
    </div>
  )
}

export default App
