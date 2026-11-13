
// =========================================
// KINETIX — INTERACTIVE FEATURES
// Author: Stephen Oyugi
// =========================================

// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}


// =========================================
// MULTI-LANGUAGE CODE EXAMPLES
// =========================================

const codeExamples = {
  curl: {
    file: "request.sh",
    code: `curl https://api.kinetix.dev/v1/compute \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "kinetix-core",
    "input": "Hello, world!"
  }'`
  },

  python: {
    file: "main.py",
    code: `import requests

url = "https://api.kinetix.dev/v1/compute"

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "model": "kinetix-core",
    "input": "Hello, world!"
}

response = requests.post(
    url,
    headers=headers,
    json=payload
)

print(response.json())`
  },

  node: {
    file: "index.js",
    code: `const response = await fetch(
  "https://api.kinetix.dev/v1/compute",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "kinetix-core",
      input: "Hello, world!"
    })
  }
);

const data = await response.json();
console.log(data);`
  }
};

const codeTabs = document.querySelectorAll(".code-tab");
const codeExample = document.querySelector("#code-example");
const codeFile = document.querySelector("#code-file");
const copyButton = document.querySelector("#copy-code");

let activeLanguage = "curl";

codeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const language = tab.dataset.language;
    const example = codeExamples[language];

    if (!example) return;

    activeLanguage = language;

    codeTabs.forEach((item) => {
      const isActive = item === tab;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    codeExample.textContent = example.code;
    codeFile.textContent = example.file;

    copyButton.querySelector("span").textContent = "Copy code";
  });
});


// =========================================
// COPY CODE TO CLIPBOARD
// =========================================

if (copyButton && codeExample) {
  copyButton.addEventListener("click", async () => {
    const text = codeExamples[activeLanguage].code;
    const label = copyButton.querySelector("span");

    try {
      await navigator.clipboard.writeText(text);
      label.textContent = "Copied!";

      window.setTimeout(() => {
        label.textContent = "Copy code";
      }, 1800);
    } catch (error) {
      // Fallback for browsers that block clipboard access.
      const temporaryTextArea = document.createElement("textarea");

      temporaryTextArea.value = text;
      temporaryTextArea.style.position = "fixed";
      temporaryTextArea.style.opacity = "0";

      document.body.appendChild(temporaryTextArea);
      temporaryTextArea.select();

      const copied = document.execCommand("copy");
      temporaryTextArea.remove();

      label.textContent = copied ? "Copied!" : "Select code to copy";

      window.setTimeout(() => {
        label.textContent = "Copy code";
      }, 1800);
    }
  });
}


// =========================================
// ANIMATED NETWORK COUNTERS
// =========================================

const counters = document.querySelectorAll("[data-count]");

const animateCounter = (element) => {
  const target = Number(element.dataset.count);
  const decimals = Number(element.dataset.decimals || 0);
  const suffix = element.dataset.suffix || "";
  const duration = 1500;
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min(
      (currentTime - startTime) / duration,
      1
    );

    // Ease-out effect
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * easedProgress;

    element.textContent =
      currentValue.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
} else {
  counters.forEach(animateCounter);
}


// =========================================
// FOOTER YEAR
// =========================================

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
