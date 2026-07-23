// ===== 导航栏：滚动后加毛玻璃背景 =====
const nav = document.getElementById("nav");
const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== 首屏元素：加载后依次入场 =====
window.addEventListener("load", () => {
  document.querySelectorAll(".reveal-load").forEach((el) => {
    el.classList.add("visible");
  });
});

// ===== 滚动渐显（IntersectionObserver）=====
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

// ===== Hero 光晕微视差 =====
const glow = document.querySelector(".hero-glow");
if (glow && !reduceMotion) {
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY * 0.25;
        glow.style.transform = `translateX(-50%) translateY(${y}px)`;
        ticking = false;
      });
    },
    { passive: true }
  );
}

// ===== FAQ：丝滑手风琴（details 原生展开是瞬间跳变，用 WAAPI 补间高度）=====
document.querySelectorAll(".faq-item").forEach((item) => {
  const summary = item.querySelector("summary");
  const body = item.querySelector(".faq-body");
  if (!summary || !body) return;

  let anim = null;
  let closing = false;
  let expanding = false;

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    if (reduceMotion) {
      item.open = !item.open;
      return;
    }
    item.style.overflow = "hidden";
    if (closing || !item.open) expand();
    else if (expanding || item.open) collapse();
  });

  const borderH = () => item.offsetHeight - item.clientHeight;

  function expand() {
    item.style.height = item.offsetHeight + "px";
    item.open = true;
    requestAnimationFrame(() => {
      expanding = true;
      const start = item.offsetHeight;
      const end = summary.offsetHeight + body.offsetHeight + borderH();
      body.classList.add("faq-body-in");
      run(start, end, true);
    });
  }

  function collapse() {
    closing = true;
    const start = item.offsetHeight;
    const end = summary.offsetHeight + borderH();
    body.classList.remove("faq-body-in");
    run(start, end, false);
  }

  function run(start, end, open) {
    if (anim) anim.cancel();
    anim = item.animate(
      { height: [start + "px", end + "px"] },
      { duration: 450, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );
    anim.onfinish = () => {
      item.open = open;
      anim = null;
      closing = expanding = false;
      item.style.height = item.style.overflow = "";
      if (!open) body.classList.remove("faq-body-in");
    };
    anim.oncancel = () => (open ? (expanding = false) : (closing = false));
  }
});

// ===== 顾客评价轮播 =====
const quotesTrack = document.getElementById("quotesTrack");
if (quotesTrack) {
  const pages = quotesTrack.children.length;
  const dotsBox = document.getElementById("qDots");
  let cur = 0;

  for (let i = 0; i < pages; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "第 " + (i + 1) + " 页");
    dot.addEventListener("click", () => go(i));
    dotsBox.appendChild(dot);
  }
  const dots = Array.from(dotsBox.children);

  function go(i) {
    cur = (i + pages) % pages;
    quotesTrack.style.transform = "translateX(-" + cur * 100 + "%)";
    dots.forEach((d, idx) => d.classList.toggle("active", idx === cur));
  }
  document.getElementById("qPrev").addEventListener("click", () => go(cur - 1));
  document.getElementById("qNext").addEventListener("click", () => go(cur + 1));
  go(0);
}

// ===== 订阅表单（暂存本地，后端接入前的占位逻辑）=====
const form = document.getElementById("notifyForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input").value.trim();
    if (!email) return;
    try {
      const list = JSON.parse(localStorage.getItem("sakura_subscribers") || "[]");
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("sakura_subscribers", JSON.stringify(list));
    } catch (_) {}
    form.style.display = "none";
    document.getElementById("notifyDone").classList.add("show");
  });
}
