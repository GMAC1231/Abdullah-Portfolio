/* =========================================================
   ABDULLAH MUHAMMAD PORTFOLIO — FULL SCRIPT
   Navbar + Reveal Animation + PDF Popup + Git Bash Terminal
========================================================= */

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
   MOBILE MENU TOGGLE
========================= */

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", event => {
    event.stopPropagation();

    navLinks.classList.toggle("show");
    menuBtn.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
  });
}

/* =========================
   CLOSE MOBILE MENU AFTER LINK CLICK
========================= */

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("show");
    }

    if (menuBtn) {
      menuBtn.textContent = "☰";
    }
  });
});

/* =========================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================= */

document.addEventListener("click", event => {
  if (
    navLinks &&
    menuBtn &&
    !navLinks.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    navLinks.classList.remove("show");
    menuBtn.textContent = "☰";
  }
});

/* =========================
   REVEAL ANIMATION ON SCROLL
========================= */

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

/* =========================
   ACTIVE NAVBAR HIGHLIGHT
========================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
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
});

/* =========================
   HEADER SHADOW ON SCROLL
========================= */

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }
});

/* =========================
   PAUSE ANIMATED BANNER ON HOVER
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
   PDF POPUP MODAL
========================= */

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
  pdfTitle.textContent = title;
  pdfDownload.href = pdfFile;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePDF() {
  const modal = document.getElementById("pdfModal");
  const viewer = document.getElementById("pdfViewer");

  if (!modal || !viewer) return;

  modal.classList.remove("active");
  viewer.src = "";
  document.body.style.overflow = "auto";
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePDF();
  }
});

const pdfModal = document.getElementById("pdfModal");

if (pdfModal) {
  pdfModal.addEventListener("click", event => {
    if (event.target === pdfModal) {
      closePDF();
    }
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
  help         Show all commands
  about        Show developer introduction
  skills       Show technical skills
  projects     Show portfolio projects
  certs        Show IBM certificates
  contact      Show contact details
  qwetrum      Open Qwetrum Technologies website
  github       Open GitHub profile
  linkedin     Open LinkedIn profile
  whatsapp     Open WhatsApp chat
  cv           Open CV PDF
  date         Show current date and time
  whoami       Show visitor identity
  clear        Clear terminal
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

  if (command === "github") {
    openPortfolioLink("github");
    return;
  }

  if (command === "linkedin") {
    openPortfolioLink("linkedin");
    return;
  }

  if (command === "whatsapp") {
    openPortfolioLink("whatsapp");
    return;
  }

  if (command === "qwetrum") {
    openPortfolioLink("qwetrum");
    return;
  }

  if (command === "cv") {
    openPortfolioLink("cv");
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
