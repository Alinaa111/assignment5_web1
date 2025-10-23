// Task 6 - Full Page Language Switch
const languageSelect = document.getElementById("language");

const elements = {
  mainTitle: document.getElementById("mainTitle"),
  chooseLangLabel: document.getElementById("chooseLangLabel"),
  shareText: document.getElementById("shareText"),
  bonusTitle: document.getElementById("bonusTitle"),
  giftText: document.getElementById("giftText"),
  promoText: document.getElementById("promoText"),
  buyTitle: document.getElementById("buyTitle"),
  buyText: document.getElementById("buyText"),
  activateText: document.getElementById("activateText"),
  greeting: document.getElementById("greeting"),
  colorButton: document.getElementById("colorButton"),
  addDaysButton: document.getElementById("addDaysButton"),
  duration: document.getElementById("duration"),
  daysLeftText: document.getElementById("daysLeftText"),

  // NEW for second section
  chooseMembershipTitle: document.querySelector(".choose-membership h1"),
  chooseMembershipSubtitle: document.querySelector(".choose-membership .subtitle"),
  purchaseButtons: document.querySelectorAll(".choose-membership button"),
  monthLabels: document.querySelectorAll(".choose-membership h2"),
  perTexts: document.querySelectorAll(".choose-membership .per"),
  guestsLists: document.querySelectorAll(".choose-membership ul li:last-child"),
};

languageSelect.addEventListener("change", () => {
  const lang = languageSelect.value;

  switch (lang) {
    case "english":
      elements.mainTitle.textContent = "My membership";
      elements.chooseLangLabel.textContent = "Change Language:";
      elements.shareText.textContent = "Don't share your membership";
      elements.bonusTitle.textContent = "Earn bonus days";
      elements.giftText.textContent = "Gift a free trial";
      elements.promoText.textContent = "Share promo code";
      elements.buyTitle.textContent = "Buy membership and add-ons";
      elements.buyText.textContent = "Buy a membership";
      elements.activateText.textContent = "Activate promo code";
      elements.greeting.textContent = "Welcome to Membership Page!";
      elements.colorButton.textContent = "Change Background Color";
      elements.addDaysButton.textContent = "+30 days";
      elements.duration.textContent = "12 months";
      elements.daysLeftText.textContent = "364 days left";

      elements.chooseMembershipTitle.textContent = "Choose your membership";
      elements.chooseMembershipSubtitle.textContent =
        "There are free guests for friends in each membership";

      elements.monthLabels[0].textContent = "3 months";
      elements.monthLabels[1].textContent = "6 months";
      elements.monthLabels[2].textContent = "12 months";

      elements.perTexts.forEach((el) => (el.textContent = "per month"));
      elements.guestsLists[0].textContent = "5 guests";
      elements.guestsLists[1].textContent = "8 guests";
      elements.guestsLists[2].textContent = "12 guests";

      elements.purchaseButtons.forEach((btn) => (btn.textContent = "Purchase"));
      break;

    case "russian":
      elements.mainTitle.textContent = "Моё членство";
      elements.chooseLangLabel.textContent = "Изменить язык:";
      elements.shareText.textContent = "Не делитесь своим членством";
      elements.bonusTitle.textContent = "Заработайте бонусные дни";
      elements.giftText.textContent = "Подарить бесплатную пробу";
      elements.promoText.textContent = "Поделиться промокодом";
      elements.buyTitle.textContent = "Купить членство и дополнения";
      elements.buyText.textContent = "Купить членство";
      elements.activateText.textContent = "Активировать промокод";
      elements.greeting.textContent = "Добро пожаловать на страницу членства!";
      elements.colorButton.textContent = "Изменить цвет фона";
      elements.addDaysButton.textContent = "+30 дней";
      elements.duration.textContent = "12 месяцев";
      elements.daysLeftText.textContent = "Осталось 364 дня";

      elements.chooseMembershipTitle.textContent = "Выберите членство";
      elements.chooseMembershipSubtitle.textContent =
        "Для друзей предусмотрены бесплатные приглашения в каждом членстве";

      elements.monthLabels[0].textContent = "3 месяца";
      elements.monthLabels[1].textContent = "6 месяцев";
      elements.monthLabels[2].textContent = "12 месяцев";

      elements.perTexts.forEach((el) => (el.textContent = "в месяц"));
      elements.guestsLists[0].textContent = "5 гостей";
      elements.guestsLists[1].textContent = "8 гостей";
      elements.guestsLists[2].textContent = "12 гостей";

      elements.purchaseButtons.forEach((btn) => (btn.textContent = "Купить"));
      break;

    case "kazakh":
      elements.mainTitle.textContent = "Менің мүшелігім";
      elements.chooseLangLabel.textContent = "Тілді өзгерту:";
      elements.shareText.textContent = "Мүшелігіңізбен бөліспеңіз";
      elements.bonusTitle.textContent = "Бонустық күндерді табыңыз";
      elements.giftText.textContent = "Тегін сынақ сыйлау";
      elements.promoText.textContent = "Промокодпен бөлісу";
      elements.buyTitle.textContent = "Мүшелік пен қоспаларды сатып алу";
      elements.buyText.textContent = "Мүшелік сатып алу";
      elements.activateText.textContent = "Промокодты белсендіру";
      elements.greeting.textContent = "Мүшелік бетіне қош келдіңіз!";
      elements.colorButton.textContent = "Фонның түсін өзгерту";
      elements.addDaysButton.textContent = "+30 күн";
      elements.duration.textContent = "12 ай";
      elements.daysLeftText.textContent = "Қалғаны 364 күн";

      elements.chooseMembershipTitle.textContent = "Мүшелікті таңдаңыз";
      elements.chooseMembershipSubtitle.textContent =
        "Әр мүшелікте достар үшін тегін қонақтар бар";

      elements.monthLabels[0].textContent = "3 ай";
      elements.monthLabels[1].textContent = "6 ай";
      elements.monthLabels[2].textContent = "12 ай";

      elements.perTexts.forEach((el) => (el.textContent = "айына"));
      elements.guestsLists[0].textContent = "5 қонақ";
      elements.guestsLists[1].textContent = "8 қонақ";
      elements.guestsLists[2].textContent = "12 қонақ";

      elements.purchaseButtons.forEach((btn) => (btn.textContent = "Сатып алу"));
      break;
  }
});
