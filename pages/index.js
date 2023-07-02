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
    flag: "images/lang-us.svg",
    isDefault: false,
  },
  {
    id: "NL",
    country: "Netherlands",
    flag: "images/lang-nl.svg",
    isDefault: false,
  },
  {
    id: "BY",
    country: "Беларусь",
    flag: "images/lang-by.svg",
    isDefault: false,
  },
  { id: "RU", country: "Россия", flag: "images/lang-ru.svg", isDefault: true },
  {
    id: "KZ",
    country: "Казахстан",
    flag: "images/lang-kz.svg",
    isDefault: false,
  },
  {
    id: "TR",
    country: "Türkiye",
    flag: "images/lang-tr.svg",
    isDefault: false,
  },
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
  if (currentLanguage !== newLanguage) {
    currentLanguage && currentLanguage.classList.remove("lang_chosen");
    newLanguage.classList.add("lang_chosen");
    config.langButtonFlag.src = newLanguage.querySelector(".lang__flag").src;
    config.langButtonFlag.alt = newLanguage.querySelector(".lang__flag").alt;
    config.langButtonName.innerText = newLanguage.id;
    closeLanguageList();
  }
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
  closeLanguageList();
  openSection(config.menu);
};

const getLanguageListItem = (lang) => {
  const { id, country, flag, isDefault } = lang;
  const langTemplate = document
    .querySelector("#templateLang")
    .content.querySelector(".lang")
    .cloneNode(true);
  langTemplate.id = id;
  langTemplate.querySelector(".lang__name").innerText = country;
  langTemplate.querySelector(".lang__flag").src = flag;
  langTemplate.querySelector(".lang__flag").alt = country;
  isDefault && changeLanguage(langTemplate);
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
  for (let lang of languages) {
    const item = getLanguageListItem(lang);
    item.addEventListener("click", (e) => changeLanguage(e.currentTarget));
    document.querySelector(".lang-switcher__list").append(item);
  }

  config.langButton.addEventListener("click", openLanguageList);
  config.popup.addEventListener("touchstart", (e) => {
    if (!e.target.closest(".lang-switcher")) {
      closeLanguageList();
    }
  });

  // menu navigation
  for (let item of config.menuItems) {
    item.addEventListener("click", (e) => {
      config.submenuTitle.innerText = e.currentTarget.innerText;
      openSection(config.submenu);
    });
  }

  for (let item of config.submenuItems) {
    item.addEventListener("click", (e) => {
      config.resultsTitle.innerText = e.currentTarget.innerText;
      openSection(config.results);
    });
  }

  config.submenuBackButton.addEventListener("click", () => {
    openSection(config.menu);
  });
  config.resultsBackButton.addEventListener("click", () => {
    openSection(config.submenu);
  });
};
