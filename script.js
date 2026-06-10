/* =========================================================
   ABDULLAH MUHAMMAD PORTFOLIO — FIXED FULL SCRIPT.JS
   Navbar + Reveal Animation + PDF Popup + Git Bash Terminal + AI Assistant
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     BASIC ELEMENTS
  ========================= */

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const year = document.getElementById("year");
  const header = document.querySelector(".site-header");
  const banner = document.querySelector(".top-banner");
  const bannerTrack = document.querySelector(".banner-track");

  /* =========================
     AUTO UPDATE FOOTER YEAR
  ========================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================
     MOBILE MENU
  ========================= */

  function closeMobileMenu() {
    if (!navLinks || !menuBtn) return;

    navLinks.classList.remove("show");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", event => {
      event.stopPropagation();

      navLinks.classList.toggle("show");

      const isOpen = navLinks.classList.contains("show");
      menuBtn.textContent = isOpen ? "✕" : "☰";
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", event => {
    if (
      navLinks &&
      menuBtn &&
      !navLinks.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  /* =========================
     REVEAL ANIMATION
  ========================= */

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14
      }
    );

    document.querySelectorAll(".reveal").forEach(element => {
      observer.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("visible");
    });
  }

  /* =========================
     ACTIVE NAVBAR HIGHLIGHT
  ========================= */

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  /* =========================
     HEADER SHADOW ON SCROLL
  ========================= */

  function updateHeaderShadow() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }
  }

  window.addEventListener("scroll", updateHeaderShadow);
  updateHeaderShadow();

  /* =========================
     PAUSE BANNER ON HOVER
  ========================= */

  if (banner && bannerTrack) {
    banner.addEventListener("mouseenter", () => {
      bannerTrack.style.animationPlayState = "paused";
    });

    banner.addEventListener("mouseleave", () => {
      bannerTrack.style.animationPlayState = "running";
    });
  }

  /* =========================
     GIT BASH STYLE TERMINAL
  ========================= */

  const terminalOutput = document.getElementById("terminalOutput");
  const terminalInput = document.getElementById("terminalInput");
  const terminalForm = document.getElementById("terminalForm");

  const portfolioLinks = {
    github: "https://github.com/GMAC1231",
    linkedin: "https://www.linkedin.com/in/abdullah-muhammad-30948623b/",
    whatsapp: "https://api.whatsapp.com/send?phone=96892287421",
    qwetrum: "https://www.qwetrumtechnologies.tech/",
    cv: "Abdullah_cv.pdf"
  };

  const terminalCommands = {
    help: `
Available commands:
  help       Show all commands
  about      Show developer introduction
  skills     Show technical skills
  projects   Show portfolio projects
  certs      Show IBM certificates
  contact    Show contact details
  qwetrum    Open Qwetrum Technologies website
  github     Open GitHub profile
  linkedin   Open LinkedIn profile
  whatsapp   Open WhatsApp chat
  cv         Open CV PDF
  date       Show current date and time
  whoami     Show visitor identity
  clear      Clear terminal
`,

    about: `
Abdullah Muhammad
Software & Mobile Application Developer

I build mobile apps, web platforms, backend APIs, Firebase systems,
and AI-assisted software solutions using Flutter, Flask, React.js,
Firebase, Python, and modern development tools.
`,

    skills: `
Technical Skills:
  Mobile: Flutter, Dart, React Native, Expo, Android Studio
  Web: HTML, CSS, JavaScript, Bootstrap, React.js
  Backend: Python, Flask, REST APIs, Google SMTP
  Database: Firebase, Firestore, SQL, NoSQL
  Tools: GitHub, AI tools, LaTeX, Overleaf
`,

    projects: `
Key Projects:
  1. SmartFixOman — Household service app with chat and bidding
  2. E-Scooter Rental System — SQU campus rental platform
  3. Food Ordering System — Flask backend web app
  4. WeatherApp — Android mini project
  5. MeditationApp — React.js / Expo capstone
  6. FlowerShop — React.js frontend project
`,

    certs: `
IBM Professional Certificates:
  1. IBM iOS and Android Mobile App Developer
  2. IBM AI Developer
  3. IBM Full Stack Software Developer

Use the certificate buttons above to preview each PDF.
`,

    contact: `
Contact:
  Email: abdullahmshafiq098@gmail.com
  WhatsApp: +968 92287421
  GitHub: github.com/GMAC1231
  LinkedIn: Abdullah Muhammad
`,

    whoami: `
guest@abdullah-portfolio

You are viewing Abdullah Muhammad's interactive developer portfolio.
`,

    date: () => new Date().toString()
  };

  function printTerminalLine(content, type = "normal") {
    if (!terminalOutput) return;

    const line = document.createElement("div");
    line.className = `terminal-line ${type}`;
    line.textContent = content;

    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function printTerminalBlock(content, type = "normal") {
    if (!terminalOutput) return;

    const block = document.createElement("pre");
    block.className = `terminal-block ${type}`;
    block.textContent = content.trim();

    terminalOutput.appendChild(block);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function openPortfolioLink(linkKey) {
    const url = portfolioLinks[linkKey];

    if (!url) {
      printTerminalLine(`Link not found: ${linkKey}`, "error");
      return;
    }

    printTerminalLine(`Opening ${linkKey}: ${url}`, "success");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function runTerminalCommand(commandText) {
    if (!terminalOutput) return;

    const command = commandText.trim().toLowerCase();

    if (!command) return;

    printTerminalLine(`guest@abdullah:~$ ${command}`, "command");

    if (command === "clear") {
      terminalOutput.innerHTML = "";

      printTerminalBlock(
        `
Welcome to Abdullah Muhammad's Portfolio Terminal 🚀
Type "help" to see available commands.
        `,
        "success"
      );

      return;
    }

    if (["github", "linkedin", "whatsapp", "qwetrum", "cv"].includes(command)) {
      openPortfolioLink(command);
      return;
    }

    if (terminalCommands[command]) {
      const response =
        typeof terminalCommands[command] === "function"
          ? terminalCommands[command]()
          : terminalCommands[command];

      printTerminalBlock(response, "success");
      return;
    }

    printTerminalBlock(
      `
Command not found: ${command}

Type "help" to see available commands.
      `,
      "error"
    );
  }

  if (terminalForm && terminalInput && terminalOutput) {
    terminalOutput.innerHTML = "";

    printTerminalBlock(
      `
Welcome to Abdullah Muhammad's Portfolio Terminal 🚀

Type "help" to see available commands.
Try: about, skills, projects, certs, qwetrum, github, linkedin, cv
      `,
      "success"
    );

    terminalForm.addEventListener("submit", event => {
      event.preventDefault();

      const command = terminalInput.value;
      runTerminalCommand(command);

      terminalInput.value = "";
      terminalInput.focus();
    });
  }

  /* =========================
     AI ASSISTANT CHATBOT
  ========================= */

  const aiFloatingBtn = document.getElementById("aiFloatingBtn");
  const aiChatBox = document.getElementById("aiChatBox");
  const aiCloseBtn = document.getElementById("aiCloseBtn");
  const aiChatForm = document.getElementById("aiChatForm");
  const aiChatInput = document.getElementById("aiChatInput");
  const aiChatMessages = document.getElementById("aiChatMessages");

  const aiAnswers = {
    help: `
You can ask me about:<br>
• Abdullah<br>
• Skills<br>
• Projects<br>
• Certificates<br>
• SmartFixOman<br>
• Qwetrum<br>
• Contact<br>
• GitHub<br>
• CV
`,

    abdullah: `
Abdullah Muhammad is a Software and Mobile Application Developer.<br>
He works with Flutter, React.js, Flask, Firebase, Python, and AI-assisted development tools.
`,

    skills: `
Abdullah's main skills include:<br>
• Flutter and Dart<br>
• React.js and JavaScript<br>
• Python and Flask<br>
• Firebase and Firestore<br>
• REST APIs<br>
• GitHub<br>
• AI-assisted coding and debugging<br>
• LaTeX and Overleaf documentation
`,

    projects: `
Main projects:<br>
• SmartFixOman — household service app with chat and bidding<br>
• E-Scooter Rental System<br>
• Food Ordering System<br>
• WeatherApp<br>
• MeditationApp<br>
• FlowerShop
`,

    smartfixoman: `
SmartFixOman is a household service management mobile app.<br>
It connects customers with service providers using Flutter, Flask, Firebase, chat, bidding, and notification features.
`,

    certificates: `
Abdullah has completed IBM Professional Certificates:<br>
• IBM iOS and Android Mobile App Developer<br>
• IBM AI Developer<br>
• IBM Full Stack Software Developer<br><br>
You can view the certificates from the Certifications section.
`,

    qwetrum: `
Abdullah is a Remote Intern at Qwetrum Technologies.<br>
Website: https://www.qwetrumtechnologies.tech/
`,

    contact: `
Contact Abdullah:<br>
Email: abdullahmshafiq098@gmail.com<br>
WhatsApp: +968 92287421<br>
GitHub: github.com/GMAC1231<br>
LinkedIn: Abdullah Muhammad
`,

    github: `
GitHub:<br>
https://github.com/GMAC1231
`,

    cv: `
You can download Abdullah's CV using the Download CV button on this portfolio.
`,

    ai: `
This assistant is a portfolio AI helper. It can answer visitor questions about Abdullah's skills, projects, certificates, and contact details.
`
  };

  function addAIMessage(message, sender = "bot") {
    if (!aiChatMessages) return;

    const messageElement = document.createElement("div");
    messageElement.className = `ai-message ${sender}`;
    messageElement.innerHTML = message.trim();

    aiChatMessages.appendChild(messageElement);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }

  function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();

    if (message.includes("help")) return aiAnswers.help;
    if (message.includes("skill") || message.includes("technology")) return aiAnswers.skills;
    if (message.includes("project") || message.includes("work")) return aiAnswers.projects;
    if (message.includes("smartfix") || message.includes("smart fix")) return aiAnswers.smartfixoman;
    if (message.includes("certificate") || message.includes("cert")) return aiAnswers.certificates;
    if (message.includes("qwetrum") || message.includes("intern")) return aiAnswers.qwetrum;
    if (message.includes("contact") || message.includes("email") || message.includes("whatsapp")) return aiAnswers.contact;
    if (message.includes("github")) return aiAnswers.github;
    if (message.includes("cv") || message.includes("resume")) return aiAnswers.cv;
    if (message.includes("ai") || message.includes("assistant")) return aiAnswers.ai;
    if (message.includes("abdullah") || message.includes("who are you")) return aiAnswers.abdullah;

    return `
I can answer questions about Abdullah's skills, projects, certificates, SmartFixOman, Qwetrum, CV, GitHub, and contact details.<br><br>
Type <strong>help</strong> to see examples.
`;
  }

  if (aiFloatingBtn && aiChatBox) {
    aiFloatingBtn.addEventListener("click", () => {
      aiChatBox.classList.toggle("active");

      if (aiChatBox.classList.contains("active") && aiChatInput) {
        setTimeout(() => aiChatInput.focus(), 200);
      }
    });
  }

  if (aiCloseBtn && aiChatBox) {
    aiCloseBtn.addEventListener("click", () => {
      aiChatBox.classList.remove("active");
    });
  }

  if (aiChatForm && aiChatInput) {
    aiChatForm.addEventListener("submit", event => {
      event.preventDefault();

      const userMessage = aiChatInput.value.trim();

      if (!userMessage) return;

      addAIMessage(userMessage, "user");
      aiChatInput.value = "";

      setTimeout(() => {
        const response = getAIResponse(userMessage);
        addAIMessage(response, "bot");
      }, 400);
    });
  }
});

/* =========================================================
   GLOBAL PDF POPUP FUNCTIONS
   These stay outside DOMContentLoaded because HTML onclick uses them.
========================================================= */

function openPDF(pdfFile, title) {
  const modal = document.getElementById("pdfModal");
  const viewer = document.getElementById("pdfViewer");
  const pdfTitle = document.getElementById("pdfTitle");
  const pdfDownload = document.getElementById("pdfDownload");

  if (!modal || !viewer || !pdfTitle || !pdfDownload) {
    console.warn("PDF modal elements are missing from HTML.");
    return;
  }

  viewer.src = pdfFile;
  pdfTitle.textContent = title || "Certificate Preview";
  pdfDownload.href = pdfFile;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePDF() {
  const modal = document.getElementById("pdfModal");
  const viewer = document.getElementById("pdfViewer");

  if (!modal || !viewer) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  viewer.src = "";
  document.body.style.overflow = "";
}

/* =========================
   CLOSE PDF WITH ESC OR OUTSIDE CLICK
========================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePDF();

    const aiChatBox = document.getElementById("aiChatBox");
    if (aiChatBox) {
      aiChatBox.classList.remove("active");
    }
  }
});

document.addEventListener("click", event => {
  const pdfModal = document.getElementById("pdfModal");

  if (pdfModal && event.target === pdfModal) {
    closePDF();
  }
});
