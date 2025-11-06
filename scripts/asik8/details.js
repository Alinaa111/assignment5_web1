document.querySelectorAll('.details-btn').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');

    // Скрываем кнопку details
    btn.style.display = 'none';

    // Убираем старый блок, если уже есть
    const existing = card.querySelector('.membership-details');
    if (existing) existing.remove();

    // Создаём новое описание
    const details = document.createElement('div');
    details.className = 'membership-details';

    let text = '';
    if (index === 0) {
      text = `
       access: 'Full access to the gym, all fitness studios, and group classes',
    guestPasses: '5 guest passes per month',
    perks: 'Flexible short-term membership, ideal for trying out different classes'
      `;
    } else if (index === 1) {
      text = `
        access: 'All club areas including premium studios',
    guestPasses: '8 guest passes per month',
    perks: 'Perfect for regular gym-goers, includes special workshops'
      `;
    } else if (index === 2) {
      text = `
        access: 'Unlimited access to all facilities, priority booking',
    guestPasses: '12 guest passes per month',
    perks: 'Best value annual plan, includes exclusive events and discounts'
      `;
    }

    details.innerHTML = `
      <p>${text}</p>
      <div class="details-buttons">
        <button class="copy-details">Copy Info</button>
        <button class="close-details">Close</button>
      </div>
    `;
    card.appendChild(details);

    // Закрытие
    details.querySelector('.close-details').addEventListener('click', () => {
      details.remove();
      btn.style.display = 'inline-block'; // показываем кнопку снова
    });

    // Копирование информации
    details.querySelector('.copy-details').addEventListener('click', () => {
      const copyBtn = details.querySelector('.copy-details');
      navigator.clipboard.writeText(text.trim())
        .then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          copyBtn.disabled = true;
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.disabled = false;
          }, 2000);
        })
        .catch(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = 'Failed!';
          copyBtn.disabled = true;
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.disabled = false;
          }, 2000);
        });
    });
  });
});
