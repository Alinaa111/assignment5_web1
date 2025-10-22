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
  duration: document.getElementById("duration"),
  daysLeftText: document.getElementById("daysLeftText"),
  addDaysButton: document.getElementById("addDaysButton"),

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
      elements.duration.textContent = "12 months";
      elements.daysLeftText.textContent = "364 days left";
      elements.addDaysButton.textContent = "+30 days"; // English

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
      elements.duration.textContent = "12 месяцев";
      elements.daysLeftText.textContent = "Осталось 364 дня";
      elements.addDaysButton.textContent = "+30 дней"; // Russian

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
      elements.duration.textContent = "12 ай";
      elements.daysLeftText.textContent = "364 күн қалды";
      elements.addDaysButton.textContent = "+30 күн"; // Kazakh

      break;
  }
});
