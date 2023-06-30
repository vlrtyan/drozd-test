const config = {
  burgerButton: document.querySelector(".burger-button"),
  closeButton: document.querySelector(".popup__close-button"),
  popup: document.querySelector(".popup"),

  // language switcher
  langButton: document.querySelector(".lang-switcher__button"),
  langButtonName: document.querySelector(".lang-switcher__lang-name"),
  langButtonFlag: document.querySelector(".lang-switcher__lang-flag"),
  langList: document.querySelector(".lang-switcher__container"),
  languages: [...document.querySelectorAll(".lang")],

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

const openPopup = () => {
  config.popup.classList.add("popup_opened");
};

const closePopup = () => {
  config.popup.classList.remove("popup_opened");
  hideAllSections();
  openSection(config.menu);
};

const openLanguageList = () => {
  config.langList.classList.toggle("lang-switcher__container_shown");
  config.langButton.classList.toggle("lang-switcher__button_clicked");
};

const closeLanguageList = () => {
  config.langList.classList.remove("lang-switcher__container_shown");
  config.langButton.classList.remove("lang-switcher__button_clicked");
};

const chooseLanguage = (e) => {
  const currentLanguage = document.querySelector(".lang_chosen");
  const newLanguage = e.currentTarget;
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
  config.menu.classList.remove("shown");
  config.submenu.classList.remove("shown");
  config.results.classList.remove("shown");
};

const openSection = (section) => {
  hideAllSections();
  section.classList.add("shown");
};

const clickMenuItem = (e) => {
  config.submenuTitle.innerText = e.currentTarget.innerText;
  openSection(config.submenu);
};

const clickSubmenuItem = (e) => {
  config.resultsTitle.innerText = e.currentTarget.innerText;
  openSection(config.results);
};

// adapt viewport height for mobile browsers
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

config.burgerButton.addEventListener("click", openPopup);
config.closeButton.addEventListener("click", closePopup);
config.langButton.addEventListener("click", openLanguageList);
config.popup.addEventListener("touchstart", (e) => {
  if (!e.target.closest(".lang-switcher")) {
    closeLanguageList();
  }
});
config.submenuBackButton.addEventListener("click", () => {
  openSection(config.menu);
});
config.resultsBackButton.addEventListener("click", () => {
  openSection(config.submenu);
});
config.menuItems.map((item) => item.addEventListener("click", clickMenuItem));
config.submenuItems.map((item) =>
  item.addEventListener("click", clickSubmenuItem)
);
config.languages.map((lang) => lang.addEventListener("click", chooseLanguage));
