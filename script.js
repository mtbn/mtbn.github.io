// ── Scroll reveal ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── Lightbox ──
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  let lbImages = [];
  let lbIndex = 0;

  function openLightbox(images, index) {
    lbImages = images;
    lbIndex = index;
    showLbImage();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showLbImage() {
    const item = lbImages[lbIndex];
    lbImg.src = item.src;
    lbImg.alt = item.caption;
    lbCaption.textContent = item.caption;
    document.getElementById('lb-prev').style.opacity = lbImages.length > 1 ? '1' : '0';
    document.getElementById('lb-next').style.opacity = lbImages.length > 1 ? '1' : '0';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.getElementById('lb-prev').addEventListener('click', e => {
    e.stopPropagation();
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    showLbImage();
  });
  document.getElementById('lb-next').addEventListener('click', e => {
    e.stopPropagation();
    lbIndex = (lbIndex + 1) % lbImages.length;
    showLbImage();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; showLbImage(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; showLbImage(); }
  });

  // Wire up gallery images to lightbox (groups images by gallery container)
  document.querySelectorAll('.gallery-item img').forEach(img => {
    const galleryEl = img.closest('[id^="gallery-"]');
    img.parentElement.addEventListener('click', () => {
      const galleryImgs = Array.from(galleryEl.querySelectorAll('.gallery-item img'))
        .map(i => ({ src: i.src, caption: i.dataset.caption || i.alt || '' }));
      const idx = galleryImgs.findIndex(g => g.src === img.src);
      openLightbox(galleryImgs, idx);
    });
  });
}
