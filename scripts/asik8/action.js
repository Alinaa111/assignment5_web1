document.querySelectorAll('.action-item').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    // Удаляем старые описания
    const existing = btn.parentElement.querySelector('.action-description');
    if (existing) existing.remove();

    // Текст в зависимости от кнопки
    let text = '';
    if (btn.querySelector('#giftText')) {
      text = 'You have 12 invites for friends';
    } else if (btn.querySelector('#promoText')) {
      text = 'Share your personal promo code and earn bonus days when friends join.';
    } else if (btn.querySelector('#buyText')) {
      text = 'Choose the membership plan that suits you best and enjoy full access.';
    } else if (btn.querySelector('#activateText')) {
      text = 'Enter your promo code to activate exclusive discounts or extra days.';
    }

    // Создаем описание
    const desc = document.createElement('div');
    desc.className = 'action-description';
    desc.textContent = text;

    // Добавляем под кнопку
    btn.insertAdjacentElement('afterend', desc);

    // Убираем через 4 секунды (по желанию)
    setTimeout(() => desc.remove(), 7000);
    document.getElementById('shareNotice').addEventListener('click', () => {
  alert("This membership is for personal use only.");
});
// Клик на стрелку "Buy a membership"
document.getElementById('buyArrow').addEventListener('click', () => {
  window.location.href = 'buymembership.html'; // переход на другую страницу
});

// Клик на стрелку "Activate promo code"
document.getElementById('promoArrow').addEventListener('click', () => {
  alert('Promo code feature coming soon!');
});

  });
});
