(() => {
  "use strict";

  const STORAGE_KEYS = { lang: "scrs.lang", theme: "scrs.theme", role: "scrs.role" };

  const translations = {
    en: {
      "brand.name": "SCRS",
      "brand.tagline": "Student Course Registration Portal",
      "brand.point1": "Browse available courses and details",
      "brand.point2": "Register or drop courses with a capacity check",
      "brand.point3": "View your weekly schedule in one place",
      "auth.signInAs": "Sign in as",
      "auth.student": "Student",
      "auth.admin": "Administrator",
      "auth.email": "University email",
      "auth.emailPlaceholder": "name@university.edu.eg",
      "auth.password": "Password",
      "auth.show": "Show",
      "auth.hide": "Hide",
      "auth.remember": "Remember me",
      "auth.forgot": "Lost access?",
      "auth.signIn": "Sign in",
      "auth.signingIn": "Signing in…",
      "auth.note": "Prototype only: no real authentication or server is used.",
      "ui.darkMode": "Dark mode",
      "ui.langButton": "العربية",
      "err.emailRequired": "Please enter your university email.",
      "err.emailInvalid": "Please enter a valid email address.",
      "err.passwordRequired": "Please enter your password.",
      "err.passwordShort": "Password must be at least 6 characters.",
      "msg.success": "Signed in successfully (prototype). Redirecting…",
      "msg.forgot": "Password recovery is not available in this prototype."
    },
    ar: {
      "brand.name": "SCRS",
      "brand.tagline": "بوابة تسجيل المقررات للطلاب",
      "brand.point1": "تصفّح المقررات المتاحة وتفاصيلها",
      "brand.point2": "سجّل أو احذف المقررات مع التحقق من السعة",
      "brand.point3": "اعرض جدولك الأسبوعي في مكان واحد",
      "auth.signInAs": "تسجيل الدخول كـ",
      "auth.student": "طالب",
      "auth.admin": "مسؤول",
      "auth.email": "البريد الإلكتروني الجامعي",
      "auth.emailPlaceholder": "name@university.edu.eg",
      "auth.password": "كلمة المرور",
      "auth.show": "إظهار",
      "auth.hide": "إخفاء",
      "auth.remember": "تذكّرني",
      "auth.forgot": "نسيت كلمة المرور؟",
      "auth.signIn": "تسجيل الدخول",
      "auth.signingIn": "جارٍ تسجيل الدخول…",
      "auth.note": "نموذج تجريبي فقط: لا يوجد تحقق حقيقي ولا خادم.",
      "ui.darkMode": "الوضع الداكن",
      "ui.langButton": "English",
      "err.emailRequired": "من فضلك أدخل بريدك الجامعي.",
      "err.emailInvalid": "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.",
      "err.passwordRequired": "من فضلك أدخل كلمة المرور.",
      "err.passwordShort": "يجب ألا تقل كلمة المرور عن 6 أحرف.",
      "msg.success": "تم تسجيل الدخول بنجاح (نموذج تجريبي). جارٍ التحويل…",
      "msg.forgot": "استعادة كلمة المرور غير متاحة في هذا النموذج التجريبي."
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const store = {
    get(key, fallback) {
      try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
    }
  };

  const state = {
    lang: store.get(STORAGE_KEYS.lang, "en"),
    theme: store.get(STORAGE_KEYS.theme, "light"),
    role: store.get(STORAGE_KEYS.role, "student")
  };

  const t = (key) => translations[state.lang][key] ?? key;

  /* ---------- Language ---------- */
  function applyLanguage() {
    const html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === "ar" ? "rtl" : "ltr";

    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });

    $("#lang-toggle-label").textContent = t("ui.langButton");
    $("#lang-toggle").setAttribute("aria-label", state.lang === "ar" ? "Switch to English" : "التبديل إلى العربية");
    updatePasswordToggleLabel();
    document.title = state.lang === "ar"
      ? "تسجيل الدخول | نظام تسجيل مقررات الطلاب"
      : "Sign in | Student Course Registration System";
    clearErrors();
  }

  /* ---------- Theme ---------- */
  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    $("#theme-toggle").setAttribute("aria-checked", String(state.theme === "dark"));
  }

  /* ---------- Role ---------- */
  function applyRole() {
    $$("#role-switch .segmented__option").forEach((btn) => {
      btn.setAttribute("aria-checked", String(btn.dataset.role === state.role));
    });
  }

  /* ---------- Password visibility ---------- */
  function updatePasswordToggleLabel() {
    const isHidden = $("#password").type === "password";
    $("#password-toggle").textContent = t(isHidden ? "auth.show" : "auth.hide");
  }

  /* ---------- Validation ---------- */
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(inputId, messageKey) {
    const field = $(`#${inputId}`).closest(".field");
    $(`#${inputId}-error`).textContent = messageKey ? t(messageKey) : "";
    field.classList.toggle("has-error", Boolean(messageKey));
    $(`#${inputId}`).setAttribute("aria-invalid", String(Boolean(messageKey)));
  }

  function clearErrors() {
    setError("email", "");
    setError("password", "");
    $("#form-message").innerHTML = "";
  }

  function validate() {
    const email = $("#email").value.trim();
    const password = $("#password").value;
    let firstInvalid = null;

    let emailError = "";
    if (!email) emailError = "err.emailRequired";
    else if (!EMAIL_PATTERN.test(email)) emailError = "err.emailInvalid";

    let passwordError = "";
    if (!password) passwordError = "err.passwordRequired";
    else if (password.length < 6) passwordError = "err.passwordShort";

    setError("email", emailError);
    setError("password", passwordError);

    if (emailError) firstInvalid = $("#email");
    else if (passwordError) firstInvalid = $("#password");
    firstInvalid?.focus();

    return !emailError && !passwordError;
  }

  function showMessage(type, messageKey) {
    const box = $("#form-message");
    box.innerHTML = "";
    const alert = document.createElement("div");
    alert.className = `alert alert--${type}`;
    alert.textContent = t(messageKey);
    box.appendChild(alert);
  }

  /* ---------- Events ---------- */
  function bindEvents() {
    $("#lang-toggle").addEventListener("click", () => {
      state.lang = state.lang === "en" ? "ar" : "en";
      store.set(STORAGE_KEYS.lang, state.lang);
      applyLanguage();
    });

    $("#theme-toggle").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      store.set(STORAGE_KEYS.theme, state.theme);
      applyTheme();
    });

    $("#role-switch").addEventListener("click", (event) => {
      const btn = event.target.closest("[data-role]");
      if (!btn) return;
      state.role = btn.dataset.role;
      store.set(STORAGE_KEYS.role, state.role);
      applyRole();
    });

    $("#password-toggle").addEventListener("click", () => {
      const input = $("#password");
      input.type = input.type === "password" ? "text" : "password";
      updatePasswordToggleLabel();
    });

    $("#forgot-link").addEventListener("click", (event) => {
      event.preventDefault();
      showMessage("error", "msg.forgot");
    });

    ["email", "password"].forEach((id) => {
      $(`#${id}`).addEventListener("input", () => setError(id, ""));
    });

    $("#login-form").addEventListener("submit", (event) => {
      event.preventDefault();
      $("#form-message").innerHTML = "";
      if (!validate()) return;

      const button = $("#submit-btn");
      button.disabled = true;
      button.textContent = t("auth.signingIn");

      // Prototype only: simulate a request, no real authentication.
      setTimeout(() => {
        showMessage("success", "msg.success");
        button.disabled = false;
        button.textContent = t("auth.signIn");
        // TODO: redirect to the Home/Dashboard page once it exists.
      }, 900);
    });
  }

  function init() {
    applyTheme();
    applyRole();
    applyLanguage();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();