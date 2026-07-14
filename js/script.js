function openMobile() {
  document.getElementById("mobileNav").classList.add("open");
}
function closeMobile() {
  document.getElementById("mobileNav").classList.remove("open");
}

const affirmations = [
  "I am not alone on this journey.",
  "My body deserves patience and kindness.",
  "I honour every stage of my life.",
  "I am strong, capable and supported.",
  "I give myself permission to rest.",
  "Change does not diminish my worth."
];

let currentAff = 0;
const quote = document.getElementById("affQuote");
const dots = document.getElementById("affDots");
const prev = document.getElementById("affPrev");
const next = document.getElementById("affNext");

function renderDots() {
  if (!dots) return;
  dots.innerHTML = "";
  affirmations.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "aff-dot";
    if (i === currentAff) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentAff = i;
      updateAffirmation();
    });
    dots.appendChild(dot);
  });
}

function updateAffirmation() {
  if (!quote) return;
  quote.style.opacity = 0;
  setTimeout(() => {
    quote.textContent = `"${affirmations[currentAff]}"`;
    quote.style.opacity = 1;
    renderDots();
  }, 250);
}

if (prev) {
  prev.addEventListener("click", () => {
    currentAff--;
    if (currentAff < 0) {
      currentAff = affirmations.length - 1;
    }
    updateAffirmation();
  });
}

if (next) {
  next.addEventListener("click", () => {
    currentAff++;
    if (currentAff >= affirmations.length) {
      currentAff = 0;
    }
    updateAffirmation();
  });
}

if (quote) {
  renderDots();
  setInterval(() => {
    currentAff++;
    if (currentAff >= affirmations.length) {
      currentAff = 0;
    }
    updateAffirmation();
  }, 7000);
}
/* ── CONTACT FORM SUBMISSION ──
   Add this to js/script.js, or link it separately with:
   <script src="contact-form.js"></script>
   just before the closing </body> tag on contact.html.

   Requires a <form id="contactForm"> with fields named
   "name", "email", "message", and a hidden "honeypot" field,
   plus a <div id="formStatus"> for status messages. */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');

    status.className = 'form-status sending';
    status.textContent = 'Sending...';
    if (submitBtn) submitBtn.disabled = true;

    fetch('send-form.php', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function (res) { return res.text(); })
      .then(function (result) {
        if (result.trim() === 'success') {
          status.className = 'form-status success';
          status.textContent = 'Thank you! Your message has been sent.';
          form.reset();
        } else {
          status.className = 'form-status error';
          status.textContent = 'Something went wrong. Please try again or email us directly.';
        }
      })
      .catch(function () {
        status.className = 'form-status error';
        status.textContent = 'Something went wrong. Please try again or email us directly.';
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});