  const buyBtn = document.getElementById('buyText').parentElement;
  buyBtn.addEventListener('click', (e) => {
    e.preventDefault(); // чтобы не перезагружалась страница
    window.location.href = 'buymembership.html'; // переход на новую страницу
  });

