function preparePreview(button: HTMLButtonElement) {
  const video = button.querySelector('video');
  const source = video?.dataset.source;
  if (!video || !source) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pausedByUser = false;

  const pause = () => {
    video.pause();
    button.setAttribute('aria-label', 'Play Stocker swipe demo');
  };

  const play = async () => {
    if (!video.src) video.src = source;
    if (video.ended) video.currentTime = 0;
    try {
      await video.play();
      button.setAttribute('aria-label', 'Pause Stocker swipe demo');
    } catch (error) {
      pause();
      if (
        error instanceof DOMException &&
        (error.name === 'NotAllowedError' || error.name === 'AbortError')
      )
        return;
      console.warn('Stocker app preview could not play.', error);
    }
  };

  button.addEventListener('click', () => {
    pausedByUser = !video.paused && !video.ended;
    if (pausedByUser) pause();
    else void play();
  });
  video.addEventListener('ended', () => {
    button.setAttribute('aria-label', 'Replay Stocker swipe demo');
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) pause();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
  });

  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio < 0.6) pause();
        else if (!reducedMotion.matches && !pausedByUser && !video.ended)
          void play();
      }
    },
    { threshold: 0.6 },
  );
  observer.observe(button);
}

document
  .querySelectorAll<HTMLButtonElement>('[data-swipe-control]')
  .forEach(preparePreview);
