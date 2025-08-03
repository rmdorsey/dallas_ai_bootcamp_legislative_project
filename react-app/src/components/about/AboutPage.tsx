// components/about/AboutPage.tsx
import React from 'react';

interface AboutPageProps {
  onBackToHome: () => void;
  onGetStarted: () => void;
  onAboutClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onGetStarted, onAboutClick }) => {
  // Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to navigate back to home and scroll to specific section
  const navigateToHomeSection = (sectionId: string) => {
    onBackToHome(); // This should switch to the home page
    // Small delay to ensure the page has switched, then scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <button
                onClick={scrollToTop}
                className="text-2xl font-bold hover:text-teal-400 transition-colors cursor-pointer"
              >
                legisl<span className="text-teal-400">AI</span>tive
              </button>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <button
                  onClick={() => navigateToHomeSection('problem')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Problem
                </button>
                <button
                  onClick={() => navigateToHomeSection('features')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </button>
                <button
                  onClick={() => navigateToHomeSection('how-it-works')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  How it Works
                </button>
                <button
                  onClick={() => navigateToHomeSection('solution')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Solution
                </button>
                <button
                  onClick={onAboutClick}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onGetStarted}
                className="hidden md:block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-black to-black"></div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Main Headline */}
            <h1 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              About
              <br />
            </h1>

            {/* Subtitle */}
            <p className="mb-12 text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              We are passionate about making democracy accessible through technology and AI innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Dallas AI Bootcamp Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Dallas AI Logo */}
            <div className="mb-8 flex justify-center">
              <img
                src="/DallasAI_Logo-blue.webp"
                alt="Dallas AI Logo"
                className="h-20 w-auto hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Born at the
              <a
                href="https://dallas-ai.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 transition-colors underline decoration-2 decoration-teal-400/50 hover:decoration-teal-300"
              >
                {" "}Dallas AI Summer Bootcamp
              </a>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              LegislAItive was conceived and developed during the intensive Dallas AI Summer Bootcamp,
              where innovation meets practical application. This program provided the perfect environment
              to transform an idea into a working solution that could make a real difference in how people
              interact with their government.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-gray-400 text-sm">Applying cutting-edge AI to solve real-world civic challenges</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Collaboration</h3>
                <p className="text-gray-400 text-sm">Working with talented developers and AI enthusiasts</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Impact</h3>
                <p className="text-gray-400 text-sm">Creating tools that strengthen democratic participation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Creators Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="text-gray-300">Meet the Creators</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Team Behind
              <span className="text-teal-400"> LegislAItive</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Three passionate developers united by a vision to democratize access to legislative information through AI.
            </p>
          </div>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Creator 1 - Matt Dorsey */}
  <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
    <div className="text-center mb-6">
      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
        <img
          src="/Mattprofile.jpeg"
          alt="Matt Dorsey"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            const fallback = target.nextElementSibling as HTMLElement;
            target.style.display = 'none';
            if (fallback) {
              fallback.style.display = 'flex';
            }
          }}
        />
        <div className="w-24 h-24 rounded-full bg-teal-500/30 flex items-center justify-center hidden">
          <span className="text-2xl font-bold text-teal-400">MD</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">Matt Dorsey</h3>
      <p className="text-teal-400 mb-4">Lead - Developer</p>
      <a
        href="https://www.linkedin.com/in/rmdorsey/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
    </div>
    <div className="space-y-4 text-sm text-gray-300">
      <div>
        <h4 className="font-semibold text-white mb-2">Bio</h4>
        <p className="leading-relaxed text-justify">
          Matt Dorsey is a civic tech innovator passionate about using software to make government systems more transparent and accessible. With over a decade of experience in full-stack development and cybersecurity, including roles at AT&T, Sally Beauty, and the Oklahoma Supreme Court. Matt bridges deep technical expertise with a commitment to public service. He thrives at the intersection of data, law, and AI, building tools that empower citizens and modernize institutions.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Experience</h4>
        <p className="leading-relaxed">
         <ul className="list-disc pl-5 space-y-4">
      <li>
        <strong>Senior Application Developer</strong> – Oklahoma Supreme Court (Jan 2025 – Present)
        <br />
        Enhancing and modernizing judicial technology across the full tech stack.
      </li>
      <li>
        <strong>Senior Full Stack Developer</strong> – Sally Beauty (Dec 2022 – Jun 2024)
        <br />
        Developed scalable APIs and Angular frontends. Optimized SQL procedures and cloud deployment using Azure.
      </li>
      <li>
        <strong>Full Stack Developer</strong> – Design Patent Pro (Dec 2021 – Dec 2022)
        <br />
        Built AI-powered IP tools using Azure Form Recognizer, Cognitive Search, Angular, and NGRX.
      </li>
      <li>
        <strong>Principal, Technology Security</strong> – AT&T (Jan 2020 – Sep 2021)
        <br />
        Led cyber analytics dashboards using Splunk and mentored new UI/UX developers.
      </li>
      <li>
        <strong>Lead UI/UX Developer</strong> – AT&T (Nov 2017 – Jan 2020)
        <br />
        Migrated monolith apps into micro-frontends and interviewed full-stack candidates.
      </li>
      <li>
        <strong>Full Stack Developer</strong> – AT&T Partner Solutions (Dec 2015 – May 2017)
        <br />
        Built internal/external buy-flow applications and acted as scrum master across teams.
      </li>
      <li>
        <strong>Web Developer & Sr. Training Manager</strong> – AT&T Learning Services (Apr 2011 – Dec 2015)
        <br />
        Built training portals and custom feedback tools; promoted from contractor to full-time.
      </li>
    </ul>

        </p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Education</h4>
        <p className="leading-relaxed">
          <ul className="list-disc pl-5 space-y-4">
      <li>
        <strong>University of Texas at Dallas</strong>
        <br />
        M.S. Software Engineering (Expected May 2025)
        <br />
        <span>Focus: Machine Learning, NLP, Big Data, Generative AI</span>
        <br />
        <span>GPA: 3.75</span>
      </li>
      <li>
        <strong>Dallas AI Summer Bootcamp 2025</strong>
        <br />
        Project: Legislative Bill Analyzer & Agentic RAG Q&A Chatbot
        <br />
        <span>Tools: FastAPI, LangChain, LangGraph, Ollama</span>
      </li>
    </ul>
        </p>
      </div>
    </div>
  </div>

             {/* Creator 2 - Angela Cortes */}
  <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
    <div className="text-center mb-6">
      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
        <img
          src="/Angelaprofile.png"
          alt="Angela Cortes"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            const fallback = target.nextElementSibling as HTMLElement;
            target.style.display = 'none';
            if (fallback) {
              fallback.style.display = 'flex';
            }
          }}
        />
        <div className="w-24 h-24 rounded-full bg-teal-500/30 flex items-center justify-center hidden">
          <span className="text-2xl font-bold text-teal-400">MD</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">Angela Cortes</h3>
      <p className="text-teal-400 mb-4">Developer - QA</p>
      <a
        href="https://www.linkedin.com/in/angela-cortes-pabon/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
    </div>
    <div className="space-y-4 text-sm text-gray-300">
      <div>
        <h4 className="font-semibold text-white mb-2">Bio</h4>
        <p className="leading-relaxed text-justify">
           Angela Cortes is a QA and Digital Transformation Leader focused on integrating AI into quality assurance, automation, and DevOps workflows. With over a decade of experience leading cross-functional QA teams in global organizations like Citibank and MiningTag, she blends technical expertise with a passion for community building, innovation, and mentorship. Angela is actively researching AI-assisted testing strategies and building open-source frameworks to redefine the future of software quality.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Experience</h4>
        <p className="leading-relaxed">
          <ul className="list-disc pl-5 space-y-4">
      <li>
        <strong>Quality Assurance Test Lead</strong> – Citibank, Chile (Feb 2023 – Jul 2024)
        <br />
        Led BDD automation and Agile transformation efforts, improving release cycles and onboarding efficiency.
      </li>
      <li>
        <strong>QA Test Lead (Contractor)</strong> – Tata Consultancy Services at Citibank (Aug 2021 – May 2023)
        <br />
        Spearheaded LATAM-wide automation strategy with Selenium and Java; boosted global team alignment and delivery.
      </li>
      <li>
        <strong>QA Test Lead</strong> – Mining Tag, Chile (Sep 2019 – Aug 2021)
        <br />
        Established QA/DevOps practices from scratch, integrated CI/CD, and improved code quality with SonarQube.
      </li>
      <li>
        <strong>QA Analyst</strong> – Surecomp, Chile (Oct 2017 – Sep 2019)
        <br />
        Introduced test automation and centralized case management to increase efficiency and reduce regressions.
      </li>
      <li>
        <strong>Functional Analyst</strong> – Cardiovascular Foundation of Colombia (Jan 2014 – Jan 2017)
        <br />
        Managed documentation and QA for healthcare systems; led HL7-based integrations with robotic pharmacy systems.
      </li>
    </ul>
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Education</h4>
        <p className="leading-relaxed">
           <ul className="list-disc pl-5 space-y-4">
      <li>
        <strong>Master in Information Technology</strong> – University of Chile, Chile
      </li>
      <li>
        <strong>Bachelor in Telecommunications Engineering</strong> – Santo Tomas University, Colombia
      </li>
      <li>
        <strong>Certifications:</strong>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>AI-Driven Testing and Automation – The Test Tribe</li>
          <li>Commercial Management of Telecom Projects – Santo Tomas University</li>
          <li>ITIL Foundation</li>
          <li>Leadership (Agile, CX, Digital Transformation) – Eclass, Chile</li>
          <li>Selenium XPath/CSS/Locators – Coursera</li>
        </ul>
      </li>
    </ul>
        </p>
      </div>
    </div>
  </div>
            {/* Creator 3 - Aksh */}
  <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
    <div className="text-center mb-6">
      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
        <img
          src="/Akshanthmprofile.webp"
          alt="Akshanth (Ash) Mamidala"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            const fallback = target.nextElementSibling as HTMLElement;
            target.style.display = 'none';
            if (fallback) {
              fallback.style.display = 'flex';
            }
          }}
        />
        <div className="w-24 h-24 rounded-full bg-teal-500/30 flex items-center justify-center hidden">
          <span className="text-2xl font-bold text-teal-400">MD</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">Akshanth (Ash) Mamidala</h3>
      <p className="text-teal-400 mb-4">Developer</p>
      <a
        href="https://www.linkedin.com/in/akshanthm/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
    </div>
    <div className="space-y-4 text-sm text-gray-300">
      <div>
        <h4 className="font-semibold text-white mb-2">Bio</h4>
        <p className="leading-relaxed text-justify">
          Akshanth Mamidala is a passionate software engineer with a Master’s in Computer Science from Missouri S&T. He focuses on building AI-driven applications, web tools, and data solutions that solve real-world problems. Akshanth enjoys exploring emerging technologies and contributing to open-source projects.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Experience</h4>
        <p className="leading-relaxed">
          <ul className="list-disc pl-5 space-y-4">
    <li>
      <strong>System Support Analyst</strong> – Missouri S&T (May 2023 – Apr 2024)
      <br />
      Improved IT operations by 25% through process documentation and system optimization. Delivered support for Windows, macOS, and Linux environments, managed cloud backups, and resolved issues using remote diagnostics and help desk tools like Cherwell.
    </li>
  </ul>
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Education</h4>
        <p className="leading-relaxed">
          <ul className="list-disc pl-5 space-y-4">
     <li>
      <strong>Missouri University of Science and Technology</strong> – M.S. Computer Science (May 2024)
      <br />
      Focus: Database Systems, Machine Learning, Cloud and Big Data<br />
      GPA: 3.4/4
    </li>
    <li>
      <strong>Keshav Memorial Institute of Technology</strong> – B.Tech in Computer Science (May 2022)
      <br />
      Focus: Algorithms, Java, Web Technologies<br />
      GPA: 3.2/4
    </li>
    <li>
      <strong>Certifications</strong>
      <ul className="list-disc pl-5 mt-1 space-y-1">
        <li>AWS Certified Cloud Practitioner – Issued May 2025</li>
        <li>AWS Certified Solutions Architect – Associate (Expected Aug 2025)</li>
        <li>AWS Certified AI Practitioner (Expected Aug 2025)</li>
        <li>Certified Dell Technician – Issued Dec 2023</li>
      </ul>
    </li>
  </ul>
        </p>
      </div>
    </div>
  </div>
          </div>
        </div>
      </section>

      {/* Meet the Leader Section */}
      <section className="py-16 border-t border-gray-800">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="text-center mb-16">
      {/* Badge */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
          <span className="text-gray-300">Meet the Leader</span>
        </div>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Our
        <span className="text-blue-400"> Guiding Force</span>
      </h2>
      <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
        The visionary mentor who guided our team through the Dallas AI Summer Bootcamp journey.
      </p>
    </div>

    {/* Leader Profile */}
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Leader Image */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 text-center">
            <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center overflow-hidden">
              <img
                src="/Anilprofile.jpeg"
                alt="Leader Name"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  const fallback = target.nextElementSibling as HTMLElement;
                  target.style.display = 'none';
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="w-32 h-32 rounded-full bg-blue-500/30 flex items-center justify-center hidden">
                <span className="text-4xl font-bold text-blue-400">[XX]</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Anil Pantangi</h3>
            <p className="text-blue-400 mb-4">Mentor - Delivery Executive, AI and Analytics @ Capgemini </p>
            <div className="flex justify-center">
              <a
                href="https://www.linkedin.com/in/anilkpantangi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Leader Bio Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Leadership & Vision</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Award-winning leader with 15+ year's experience in product, technology, and AI, managing large-scale enterprise platforms and consumer-grade products.
              </p>
              <p>
                Expertise in AI/ML-drive automation, predictive analytics, and solution architecture, focused on driving business growth and innovation.
              </p>
              <p>
               His leadership stands out for being both strategic and empowering, always guiding us with clarity while giving us the space to grow. He brought deep technical insight to our project, helping us align our architecture with real-world use cases, and encouraged thoughtful collaboration within the team. Thanks to his support, we stayed focused, confident, and committed to delivering meaningful results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Let's Connect &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              Build Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Interested in collaborating or learning more about civic tech? I'd love to hear from you.
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            © 2025 LegislAItive. All rights reserved. Idea develop in the Dallas AI Summer Bootcamp.
          </div>
        </div>
      </footer>
    </div>
  );
};