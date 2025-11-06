const promoItem = document.getElementById('promoItem');
const promoBox = document.getElementById('promoBox');

promoItem.addEventListener('click', (e) => {
  e.preventDefault();

  // Если уже открыт — скрываем
  if (promoBox.style.display === 'flex') {
    promoBox.style.display = 'none';
    promoBox.innerHTML = '';
    return;
  }

  // Создаем блок с кодом и кнопкой
  promoBox.innerHTML = `
    <span>FITNESS2025</span>
    <button class="copy-btn" id="copyPromo">Copy</button>
  `;
  promoBox.style.display = 'flex';

  // При клике на Copy
  const copyBtn = document.getElementById('copyPromo');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('FITNESS2025')
      .then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.disabled = true;
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.disabled = false;
        }, 1500);
      })
      .catch(() => {
        copyBtn.textContent = 'Failed';
      });
  });
});