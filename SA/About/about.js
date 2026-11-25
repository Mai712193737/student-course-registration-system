const T = {
  en: {
    portal: "Student Course Registration Portal",
    back: "Sign in",
    title: "About us",
    whoT: "Who we are",
    whoP: "We are a university portal that makes course registration simple for students and easy to manage for administrators.",
    whatT: "What we do",
    what1: "Show available courses and their details",
    what2: "Let students register or drop courses with a capacity check",
    what3: "Display each student’s weekly schedule in one place",
    what4: "Give administrators the tools to manage courses and seats",
    visT: "Our vision",
    visP: "A registration process that is clear, fair, and stress-free, so students can spend their time on learning instead of paperwork.",
    foot: "Prototype only: no real authentication or server is used."
  },
  ar: {
    portal: "بوابة تسجيل مقررات الطلاب",
    back: "تسجيل الدخول",
    title: "من نحن",
    whoT: "من نحن",
    whoP: "نحن بوابة جامعية تجعل تسجيل المقررات سهلاً للطلاب وسهل الإدارة للمسؤولين.",
    whatT: "ماذا نقدم",
    what1: "عرض المقررات المتاحة وتفاصيلها",
    what2: "تمكين الطلاب من تسجيل المقررات أو حذفها مع التحقق من السعة",
    what3: "عرض الجدول الأسبوعي لكل طالب في مكان واحد",
    what4: "منح المسؤولين أدوات إدارة المقررات والمقاعد",
    visT: "رؤيتنا",
    visP: "عملية تسجيل واضحة وعادلة وخالية من التوتر، ليتفرغ الطلاب للتعلم بدلاً من الأوراق.",
    foot: "نموذج أولي فقط: لا توجد مصادقة حقيقية أو خادم."
  }
};

const root = document.documentElement;
let lang = "en", theme = "light";
try { lang = localStorage.getItem("scrs-lang") || "en"; } catch (e) {}
try { theme = localStorage.getItem("scrs-theme") || "light"; } catch (e) {}

function applyLang() {
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = T[lang][el.dataset.i18n];
  });
  document.getElementById("langBtn").textContent = lang === "ar" ? "ENG" : "AR";
  document.title = lang === "ar" ? "من نحن | تسجيل المقررات" : "About us | Student Course Registration";
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

applyTheme();
applyLang();
