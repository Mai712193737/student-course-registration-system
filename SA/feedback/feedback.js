const T = {
  en: {
    portal: "Student Course Registration Portal",
    about: "About us",
    signin: "Sign in",
    heroT: "We value your feedback.",
    heroP: "Please complete the following form and help us improve your registration experience.",
    rateT: "Rate us",
    c1: "Very Satisfied",
    c2: "Satisfied",
    c3: "Neutral",
    c4: "Unsatisfied",
    c5: "Very Unsatisfied",
    r1: "How satisfied are you with our portal?",
    r2: "How satisfied are you with the registration process?",
    r3: "How satisfied are you with our support team?",
    improveT: "Tell us how we can improve",
    repT: "Would you like a representative to contact you?",
    yes: "Yes",
    no: "No",
    send: "Send feedback",
    thanks: "Thank you! Your feedback was submitted successfully.",
    foot: "Prototype only: no real authentication or server is used.",
    improvePh: "Write your suggestions here...",
    title: "Feedback | Student Course Registration"
  },
  ar: {
    portal: "بوابة تسجيل مقررات الطلاب",
    about: "من نحن",
    signin: "تسجيل الدخول",
    heroT: "نقدّر ملاحظاتك.",
    heroP: "يرجى تعبئة النموذج التالي لمساعدتنا على تحسين تجربة التسجيل لديك.",
    rateT: "قيّمنا",
    c1: "راضٍ جداً",
    c2: "راضٍ",
    c3: "محايد",
    c4: "غير راضٍ",
    c5: "غير راضٍ إطلاقاً",
    r1: "ما مدى رضاك عن البوابة؟",
    r2: "ما مدى رضاك عن عملية التسجيل؟",
    r3: "ما مدى رضاك عن فريق الدعم؟",
    improveT: "أخبرنا كيف يمكننا التحسّن",
    repT: "هل تريد أن يتواصل معك أحد ممثلينا؟",
    yes: "نعم",
    no: "لا",
    send: "إرسال الملاحظات",
    thanks: "شكراً لك! تم إرسال ملاحظاتك بنجاح.",
    foot: "نموذج أولي فقط: لا توجد مصادقة حقيقية أو خادم.",
    improvePh: "اكتب اقتراحاتك هنا...",
    title: "الملاحظات | تسجيل المقررات"
  }
};

const root = document.documentElement;
const form = document.getElementById("feedbackForm");
const msg = document.getElementById("formMsg");
let lang = "en", theme = "light";
try { lang = localStorage.getItem("scrs-lang") || "en"; } catch (e) {}
try { theme = localStorage.getItem("scrs-theme") || "light"; } catch (e) {}

function applyLang() {
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = T[lang][el.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    el.placeholder = T[lang][el.dataset.i18nPh];
  });
  document.getElementById("langBtn").textContent = lang === "ar" ? "ENG" : "AR";
  document.title = T[lang].title;
  if (msg.textContent) msg.textContent = T[lang].thanks;
}
function applyTheme() { root.dataset.theme = theme; }

document.getElementById("langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "ar" : "en";
  try { localStorage.setItem("scrs-lang", lang); } catch (e) {}
  applyLang();
});
document.getElementById("themeBtn").addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("scrs-theme", theme); } catch (e) {}
  applyTheme();
});

// Submit (the browser already checked the required fields before this runs)
form.addEventListener("submit", e => {
  e.preventDefault();
  msg.textContent = T[lang].thanks;
  form.reset();
});

applyTheme();
applyLang();
