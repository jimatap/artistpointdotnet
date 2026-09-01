(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  const submit = document.querySelector("[data-submit]");
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeNav = () => {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };

  toggle?.addEventListener("click", () => {
    const open = !nav?.classList.contains("is-open");
    nav?.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form || !status || !submit) return;

    const data = new FormData(form);
    submit.disabled = true;
    submit.textContent = "Sending…";
    status.hidden = true;
    status.classList.remove("is-success", "is-error");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Formspree rejected the submission");
      }

      form.reset();
      status.textContent = "Thank you. Your message is on its way.";
      status.classList.add("is-success");
    } catch {
      status.textContent = "Something went wrong. Please try again in a moment.";
      status.classList.add("is-error");
    } finally {
      status.hidden = false;
      submit.disabled = false;
      submit.textContent = "Send message";
    }
  });
})();
