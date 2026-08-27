const LOTBRIEF_EMAIL = "hello@lotbrief.com.au";

const form = document.getElementById("brief-request");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const alertEl = document.getElementById("form-alert");
    const statusEl = document.getElementById("form-status");
    const businessName = form.businessName.value.trim();
    const email = form.email.value.trim();
    const suburbs = form.suburbs.value.trim();
    const companies = [1, 2, 3, 4, 5]
      .map((index) => form[`company${index}`].value.trim())
      .filter(Boolean);

    if (alertEl) alertEl.hidden = true;
    if (statusEl) statusEl.hidden = true;

    if (!businessName || !email || !suburbs) {
      if (alertEl) {
        alertEl.textContent =
          "Add your business name, email, and suburbs so we can reply.";
        alertEl.hidden = false;
      }
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (alertEl) {
        alertEl.textContent = "Use a working email address.";
        alertEl.hidden = false;
      }
      return;
    }

    const companyBlock =
      companies.length > 0
        ? companies.map((name, index) => `${index + 1}. ${name}`).join("\n")
        : "(none listed)";
    const body = [
      "Starter brief request\n",
      `Business name: ${businessName}`,
      `Email: ${email}`,
      `Suburbs: ${suburbs}`,
      "\nCompany names (up to five):",
      companyBlock,
    ].join("\n");
    const subject = `Starter brief request: ${businessName}`;

    window.location.href = `mailto:${LOTBRIEF_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (statusEl) {
      statusEl.textContent = `Your mail app should open with the request filled in. If it does not, email ${LOTBRIEF_EMAIL} with the same details.`;
      statusEl.hidden = false;
    }
  });
}
