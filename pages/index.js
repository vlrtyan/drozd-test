import flagUS from "../images/lang-us.svg";
import flagNL from "../images/lang-nl.svg";
import flagBY from "../images/lang-by.svg";
import flagRU from "../images/lang-ru.svg";
import flagKZ from "../images/lang-kz.svg";
import flagTR from "../images/lang-tr.svg";

const config = {
  burgerButton: document.querySelector(".burger-button"),
  closeButton: document.querySelector(".popup__close-button"),
  popup: document.querySelector(".popup"),

  // language switcher
  langButton: document.querySelector(".lang-switcher__button"),
  langButtonName: document.querySelector(".lang-switcher__lang-name"),
  langButtonFlag: document.querySelector(".lang-switcher__lang-flag"),
  langList: document.querySelector(".lang-switcher__container"),

  //menu
  menu: document.querySelector(".menu"),
  menuItems: [...document.querySelectorAll(".menu__item")],

  // submenu
  submenu: document.querySelector(".submenu"),
  submenuItems: [...document.querySelectorAll(".submenu__item")],
  submenuTitle: document.querySelector(".submenu__title"),
  submenuBackButton: document.querySelector(".submenu__back-button"),

  // results
  results: document.querySelector(".results"),
  resultsTitle: document.querySelector(".results__title"),
  resultsBackButton: document.querySelector(".results__back-button"),
};
const languages = [
  {
    id: "US",
    country: "United States",
    flag: flagUS,
    default: false,
  },
  {
    id: "NL",
    country: "Netherlands",
    flag: flagNL,
    default: false,
  },
  {
    id: "BY",
    country: "Беларусь",
    flag: flagBY,
    default: false,
  },
  { id: "RU", country: "Россия", flag: flagRU, default: true },
  {
    id: "KZ",
    country: "Казахстан",
    flag: flagKZ,
    default: false,
  },
  { id: "TR", country: "Türkiye", flag: flagTR, default: false },
];

const openLanguageList = () => {
  config.langList.classList.toggle("lang-switcher__container_shown");
  config.langButton.classList.toggle("lang-switcher__button_clicked");
};

const closeLanguageList = () => {
  config.langList.classList.remove("lang-switcher__container_shown");
  config.langButton.classList.remove("lang-switcher__button_clicked");
};

const changeLanguage = (newLanguage) => {
  const currentLanguage = document.querySelector(".lang_chosen");
  if (currentLanguage) {
    currentLanguage.classList.remove("lang_chosen");
  }
  newLanguage.classList.add("lang_chosen");
  config.langButtonFlag.src = newLanguage.querySelector(".lang__flag").src;
  config.langButtonFlag.alt = newLanguage.querySelector(".lang__flag").alt;
  config.langButtonName.innerText = newLanguage.id;
  closeLanguageList();
};

const hideAllSections = () => {
  config.menu.classList.add("hidden");
  config.submenu.classList.add("hidden");
  config.results.classList.add("hidden");
};

const openSection = (section) => {
  hideAllSections();
  section.classList.remove("hidden");
};

const openPopup = () => {
  config.popup.classList.add("popup_opened");
};

const closePopup = () => {
  config.popup.classList.remove("popup_opened");
  hideAllSections();
  openSection(config.menu);
};

const getLanguageListItem = (id, country, flag, defaultLang) => {
  const langTemplate = document
    .querySelector("#templateLang")
    .content.querySelector(".lang")
    .cloneNode(true);
  langTemplate.id = id;
  langTemplate.querySelector(".lang__name").innerText = country;
  langTemplate.querySelector(".lang__flag").src = flag;
  langTemplate.querySelector(".lang__flag").alt = country;
  defaultLang && changeLanguage(langTemplate);
  return langTemplate;
};

// adapt viewport height for mobile browsers
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.onload = () => {
  // popup
  config.burgerButton.addEventListener("click", openPopup);
  config.closeButton.addEventListener("click", closePopup);

  // change language
  languages.map((lang) => {
    const item = getLanguageListItem(
      lang.id,
      lang.country,
      lang.flag,
      lang.default
    );
    document.querySelector(".lang-switcher__list").append(item);
    item.addEventListener("click", (e) => changeLanguage(e.currentTarget));
  });
  config.langButton.addEventListener("click", openLanguageList);
  config.popup.addEventListener("touchstart", (e) => {
    if (!e.target.closest(".lang-switcher")) {
      closeLanguageList();
    }
  });

  // menu navigation
  config.menuItems.map((item) =>
    item.addEventListener("click", (e) => {
      config.submenuTitle.innerText = e.currentTarget.innerText;
      openSection(config.submenu);
    })
  );
  config.submenuItems.map((item) =>
    item.addEventListener("click", (e) => {
      config.resultsTitle.innerText = e.currentTarget.innerText;
      openSection(config.results);
    })
  );
  config.submenuBackButton.addEventListener("click", () => {
    openSection(config.menu);
  });
  config.resultsBackButton.addEventListener("click", () => {
    openSection(config.submenu);
  });
};
