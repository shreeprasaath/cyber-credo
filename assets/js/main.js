// Nav mobile toggle
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

// Blog tag filtering
const filters = document.querySelectorAll('.tag-filter');
const cards = document.querySelectorAll('#posts-grid .post-card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tag = btn.dataset.tag;
    cards.forEach(card => {
      if (tag === 'all' || card.dataset.tags.includes(tag)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Activate AdSense ads (uncomment when AdSense is set up)
// document.querySelectorAll('.adsbygoogle').forEach(() => {
//   (adsbygoogle = window.adsbygoogle || []).push({});
// });
