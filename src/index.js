let _version = 2;
Reactor({
  App: "[main]",
  defaultView: "home",
  authView: "auth",
  init: function () {
    watch["globals.Settings.Theme"] = function () {
      Theme();
    };
  },
  tick: function () {},
  auth: function () {},
});

function Active(ev, el) {
  el.closest(".all-nav").addClass("actv");
  el.addClass("actv");
  var dropdown = el.children(".dropdown");
  if (dropdown.length) {
    dropdown.addClass("actv");
  }
}
function DisActive(ev, el) {
  el.closest(".all-nav").removeClass("actv");
  el.removeClass("actv");
  var dropdown = el.children(".dropdown");
  if (dropdown.length) {
    dropdown.removeClass("actv");
  }
}

function Move(ev, el) {
  const cursorDiv = el.find(".par");
  const cursorParDivTop = cursorDiv.parent().offset().top;
  const cursorParDivLeft = cursorDiv.parent().offset().left;
  const x = ev.clientX - cursorParDivLeft;
  const y = scrollY + ev.clientY - cursorParDivTop;
  cursorDiv
    .stop()
    .animate({ top: `${y}px`, left: `${x}px` }, { duration: 100 });
}
var cloud = {
  mainColor: "purple",
  service: globals.services.cloud,
  mainDescription:
    "Our cloud hosting platform guarantees lightning-fast site loading speeds, excellent reliability, and rock-solid security for your websites.",
  secondDescription:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rerum vero praesentium itaque autem quibusdam, voluptas deserunt doloribus sint, unde aut.",
  plans: globals.plans.cloud,
  review: {
    reviewTitle: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    reviewSubTitle:
      "DTT needed a digital trading system that allowed users to manage their investment portfolios digitally and provided 24-hour access to stocks and the financial market.",
    reviewCaller: "Bassem Zawdeh",
    callerPosition: "Head Of IT",
    callerWebsite: "bassamzawdeh.png",
  },
  getPlanURL: "",
};
var pro = {
  mainColor: "green",
  service: globals.services.pro,
  mainDescription:
    "Our cloud hosting platform guarantees lightning-fast site loading speeds, excellent reliability, and rock-solid security for your websites.",
  secondDescription:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rerum vero praesentium itaque autem quibusdam, voluptas deserunt doloribus sint, unde aut.",
  plansURL: "pickPlan",
  plans: globals.plans.pro,
  review: {
    reviewTitle: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    reviewSubTitle:
      "DTT needed a digital trading system that allowed users to manage their investment portfolios digitally and provided 24-hour access to stocks and the financial market.",
    reviewCaller: "Bassem Zawdeh",
    callerPosition: "Head Of IT",
    callerWebsite: "bassamzawdeh.png",
  },
  getPlanURL: "",
};
var emails = {
  mainColor: "main",
  service: globals.services.emails,
  mainDescription:
    "Our cloud hosting platform guarantees lightning-fast site loading speeds, excellent reliability, and rock-solid security for your websites.",
  secondDescription:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rerum vero praesentium itaque autem quibusdam, voluptas deserunt doloribus sint, unde aut.",
  plansURL: "pickPlan",
  plans: globals.plans.emails,
  review: {
    reviewTitle: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    reviewSubTitle:
      "DTT needed a digital trading system that allowed users to manage their investment portfolios digitally and provided 24-hour access to stocks and the financial market.",
    reviewCaller: "Bassem Zawdeh",
    callerPosition: "Head Of IT",
    callerWebsite: "bassamzawdeh.png",
  },
  getPlanURL: "",
};
var domains = {
  mainColor: "pink",
  service: globals.services.domains,
  mainDescription:
    "Our cloud hosting platform guarantees lightning-fast site loading speeds, excellent reliability, and rock-solid security for your websites.",
  secondDescription:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rerum vero praesentium itaque autem quibusdam, voluptas deserunt doloribus sint, unde aut.",
  plansURL: "pickPlan",
  plans: globals.plans.domains,
  review: {
    reviewTitle: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    reviewSubTitle:
      "DTT needed a digital trading system that allowed users to manage their investment portfolios digitally and provided 24-hour access to stocks and the financial market.",
    reviewCaller: "Bassem Zawdeh",
    callerPosition: "Head Of IT",
    callerWebsite: "bassamzawdeh.png",
  },
  getPlanURL: "",
};

function ChangeTheme(ev, el) {
  if (el.hasClass("is-checked")) {
    globals.Settings.Theme = "light";
  } else {
    globals.Settings.Theme = "dark";
  }
}
function Theme() {
  if (globals.Settings.Theme == "light") {
    document.documentElement.setAttribute("data-theme", "light");
    $("body").addClass("light-theme");
    $("body").removeClass("dark-theme");
    $(".theme-icon").attr("data-icon", "line-md:sun-rising-loop");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    $("body").addClass("dark-theme");
    $("body").removeClass("light-theme");
    $(".theme-icon").attr("data-icon", "line-md:moon-loop");
  }
}
