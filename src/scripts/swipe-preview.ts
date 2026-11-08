const previews = document.querySelectorAll<HTMLElement>('[data-swipe-preview]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting || !(entry.target instanceof HTMLElement))
        continue;
      entry.target.dataset.playing = 'true';
      observer.unobserve(entry.target);
    }
  });
  previews.forEach((preview) => observer.observe(preview));
}

document
  .querySelectorAll<HTMLButtonElement>('[data-replay-swipe]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const preview = button
        .closest('.swipe-preview')
        ?.querySelector('[data-swipe-preview]');
      if (!preview) return;
      for (const animation of preview.getAnimations({ subtree: true })) {
        animation.cancel();
        animation.play();
      }
    });
  });
