/* ============================================================
   GRIPP — site engine
   Reads window.GRIPP (data/content.js) and renders everything.
   You should never need to edit this file to change content.
   ============================================================ */
(function () {
  "use strict";

  var AUDIENCES = ["teacher", "parent", "student"];

  /* Per-audience copy for the fixed UI chrome */
  var COPY = {
    hint: {
      teacher: "Classroom-ready resources, lesson ideas and teaching tools.",
      parent: "Support learning at home — no jargon, no pressure.",
      student: "Games and activities made just for you! 🎉"
    },
    sections: {
      resources: {
        teacher: ["Resources", "Downloadable, classroom-ready materials."],
        parent: ["Resources", "Printables and materials you can use at home."],
        student: ["Cool stuff 📦", "Things to print and play with."]
      },
      activities: {
        teacher: ["Activities", "Interactive, in-browser activities to use in lessons or set as practice."],
        parent: ["Activities", "Quick interactive games your child can play right here."],
        student: ["Let's play! 🎮", "Tap a game to start. You've got this!"]
      },
      ideas: {
        teacher: ["Lesson ideas", "Teaching approaches and starting points, grounded in how children actually learn."],
        parent: ["How to help at home", "Small, easy things that genuinely make a difference."],
        student: ["Let's learn! ⭐", "Fun things to try today."]
      },
      products: {
        teacher: ["Recommended for the classroom", "Books, manipulatives and subscriptions worth your budget. Links may be affiliate links."],
        parent: ["Great for home", "Tried-and-tested books, games and tools. Links may be affiliate links, which support this site at no cost to you."]
        /* no student key — products never render in student view */
      }
    }
  };

  /* Section keys (plural) → entry types (singular) */
  var TYPE_OF = {
    resources: "resource",
    activities: "activity",
    ideas: "idea",
    products: "product"
  };

  /* ---------- audience state ---------- */
  function getAudience() {
    try {
      var saved = localStorage.getItem("gripp-audience");
      if (AUDIENCES.indexOf(saved) !== -1) return saved;
    } catch (e) { /* storage unavailable — default below */ }
    return "teacher";
  }
  function setAudience(a) {
    try { localStorage.setItem("gripp-audience", a); } catch (e) { /* ignore */ }
    document.documentElement.setAttribute("data-audience", a);
    syncToggle(a);
    renderAll();
  }
  function syncToggle(a) {
    var toggle = document.querySelector(".audience-toggle");
    if (!toggle) return;
    toggle.setAttribute("data-pos", String(AUDIENCES.indexOf(a)));
    toggle.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.audience === a));
    });
    var hint = document.querySelector(".audience-hint");
    if (hint) hint.textContent = COPY.hint[a];
  }

  /* ---------- year filter state ---------- */
  var currentYear = "KS1"; // "KS1" acts as "show everything in the key stage"

  function matchesYear(entry) {
    if (currentYear === "KS1") return true;
    return entry.years.indexOf(currentYear) !== -1 || entry.years.indexOf("KS1") !== -1;
  }
  function matchesAudience(entry, audience) {
    return entry.audience.indexOf("all") !== -1 || entry.audience.indexOf(audience) !== -1;
  }

  /* ---------- rendering ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function tagRow(entry) {
    var row = el("div", "tags");
    entry.years.forEach(function (y) { row.appendChild(el("span", "tag year", y)); });
    row.appendChild(el("span", "tag", entry.subject));
    return row;
  }

  function renderCard(entry, audience) {
    var card = el("article", "card");
    card.appendChild(el("h3", null, entry.title));

    if (entry.type === "idea") {
      var text = entry.text && entry.text[audience];
      if (!text) return null; // no variant for this audience → hide
      card.appendChild(el("p", null, text));
    } else if (entry.description) {
      card.appendChild(el("p", null, entry.description));
    }

    if (entry.type === "product") {
      if (audience === "student") return null; // hard rule: never in student view
      if (entry.framing && entry.framing[audience]) {
        card.appendChild(el("div", "framing", entry.framing[audience]));
      }
      var link = entry.affiliateUrl && entry.affiliateUrl.indexOf("#REPLACE") !== 0
        ? entry.affiliateUrl
        : (entry.affiliateUrl || entry.url);
      var a = el("a", "btn", audience === "teacher" ? "View resource" : "Take a look");
      a.href = link || "#";
      a.target = "_blank";
      a.rel = "noopener sponsored";
      card.appendChild(a);
      card.appendChild(el("div", "affiliate-note", "May contain an affiliate link."));
    }

    if (entry.type === "resource") {
      var d = el("a", "btn ghost", "Download");
      d.href = entry.downloadUrl || "#";
      card.appendChild(d);
    }

    if (entry.type === "activity") {
      if (entry.quiz) {
        var play = el("button", "btn", audience === "student" ? "Play! ▶" : "Play activity");
        play.addEventListener("click", function () { openQuiz(entry); });
        card.appendChild(play);
      } else if (entry.url) {
        var go = el("a", "btn", audience === "student" ? "Let's go! ▶" : "Open activity");
        go.href = entry.url;
        go.target = "_blank";
        go.rel = "noopener";
        card.appendChild(go);
      }
    }

    card.appendChild(tagRow(entry));
    return card;
  }

  function renderSection(container, type, subject, audience) {
    var grid = container.querySelector(".cards");
    grid.innerHTML = "";

    var meta = COPY.sections[type][audience];
    if (!meta) { container.style.display = "none"; return; }
    container.style.display = "";

    container.querySelector("h2").textContent = meta[0];
    container.querySelector(".section-sub").textContent = meta[1];

    var entryType = TYPE_OF[type];
    var entries = window.GRIPP.entries.filter(function (e) {
      return e.type === entryType && e.subject === subject &&
        matchesAudience(e, audience) && matchesYear(e);
    });

    var rendered = 0;
    entries.forEach(function (e) {
      var card = renderCard(e, audience);
      if (card) { grid.appendChild(card); rendered++; }
    });

    if (rendered === 0) {
      var empty = el("div", "empty", "Nothing here yet for this view — content coming soon.");
      grid.appendChild(empty);
    }
  }

  function renderSubjectPage(subject, audience) {
    var strap = document.querySelector("[data-strap]");
    if (strap) strap.textContent = window.GRIPP.subjects[subject].strap[audience];

    var order = audience === "student"
      ? ["activities", "ideas", "resources", "products"]
      : ["resources", "activities", "ideas", "products"];

    var main = document.querySelector("main");
    order.forEach(function (type) {
      var section = document.querySelector('[data-section="' + type + '"]');
      if (!section) return;
      main.appendChild(section); // re-order in DOM: activities first for students
      renderSection(section, type, subject, audience);
    });
  }

  function renderHub(audience) {
    document.querySelectorAll(".tile").forEach(function (tile) {
      var subject = tile.dataset.subject;
      var p = tile.querySelector("p");
      if (p) p.textContent = window.GRIPP.subjects[subject].strap[audience];
    });
  }

  function renderAll() {
    var audience = getAudience();
    var subject = document.body.dataset.subject;
    if (subject) renderSubjectPage(subject, audience);
    else renderHub(audience);
  }

  /* ---------- quiz engine ---------- */
  function openQuiz(entry) {
    var overlay = el("div", "quiz-overlay");
    var box = el("div", "quiz-box");
    overlay.appendChild(box);

    var i = 0, score = 0;
    var quiz = entry.quiz;

    function showQuestion() {
      box.innerHTML = "";
      box.appendChild(el("h3", null, entry.title));
      var q = quiz.questions[i];
      box.appendChild(el("div", "quiz-q", q.q));
      var opts = el("div", "quiz-options");
      var feedback = el("div", "quiz-feedback");

      q.options.forEach(function (opt) {
        var b = el("button", null, opt);
        b.addEventListener("click", function () {
          opts.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
          if (opt === q.answer) {
            b.classList.add("correct");
            feedback.textContent = ["Brilliant! 🌟", "Yes! 🎉", "Super! ⭐", "You got it! 👏"][score % 4];
            score++;
          } else {
            b.classList.add("wrong");
            feedback.textContent = "Good try! The answer is " + q.answer + ".";
          }
          setTimeout(function () {
            i++;
            if (i < quiz.questions.length) showQuestion();
            else showResult();
          }, 1100);
        });
        opts.appendChild(b);
      });

      box.appendChild(opts);
      box.appendChild(feedback);
      box.appendChild(el("div", "quiz-meta",
        "Question " + (i + 1) + " of " + quiz.questions.length));
    }

    function showResult() {
      box.innerHTML = "";
      box.appendChild(el("h3", null, "All done! 🎉"));
      box.appendChild(el("div", "quiz-q",
        "You got " + score + " out of " + quiz.questions.length + "!"));
      box.appendChild(el("p", null,
        score === quiz.questions.length ? "Perfect score — amazing work!" : "Great trying — play again to beat your score!"));
      var again = el("button", "btn quiz-close", "Play again");
      again.addEventListener("click", function () { i = 0; score = 0; showQuestion(); });
      var close = el("button", "btn ghost quiz-close", "Finish");
      close.style.marginLeft = "8px";
      close.addEventListener("click", function () { overlay.remove(); });
      box.appendChild(again);
      box.appendChild(close);
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.remove();
    });

    // intro screen
    box.appendChild(el("h3", null, entry.title));
    box.appendChild(el("div", "quiz-q", quiz.intro || "Ready?"));
    var start = el("button", "btn", "Start ▶");
    start.addEventListener("click", showQuestion);
    box.appendChild(start);

    document.body.appendChild(overlay);
    start.focus();
  }

  /* ---------- year filter ---------- */
  function buildYearFilter() {
    var holder = document.querySelector(".year-filter");
    if (!holder) return;
    window.GRIPP.YEAR_GROUPS.forEach(function (y) {
      var b = el("button", null, y === "KS1" ? "All KS1" : y);
      b.setAttribute("aria-pressed", String(y === currentYear));
      b.addEventListener("click", function () {
        currentYear = y;
        holder.querySelectorAll("button").forEach(function (x) {
          x.setAttribute("aria-pressed", "false");
        });
        b.setAttribute("aria-pressed", "true");
        renderAll();
      });
      holder.appendChild(b);
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".audience-toggle");
    if (toggle) {
      toggle.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () { setAudience(b.dataset.audience); });
      });
    }
    buildYearFilter();
    setAudience(getAudience());
  });
})();
