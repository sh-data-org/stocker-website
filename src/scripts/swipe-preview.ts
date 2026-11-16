function preparePreview(video: HTMLVideoElement) {
  const source = video.dataset.source;
  if (!source) return;

  const button = video.closest<HTMLButtonElement>('[data-swipe-control]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pausedByUser = false;
  let inView = false;

  const load = () => {
    if (video.hasAttribute('src')) return;
    video.preload = 'auto';
    video.src = source;
  };

  const pause = () => {
    video.pause();
    button?.setAttribute('aria-label', 'Play Stocker swipe demo');
  };

  const play = async () => {
    load();
    if (video.ended) video.currentTime = 0;
    try {
      await video.play();
      button?.setAttribute('aria-label', 'Pause Stocker swipe demo');
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

  const syncPlayback = () => {
    if (!inView || document.hidden || reducedMotion.matches) {
      if (!video.paused) pause();
      return;
    }
    if (!pausedByUser && video.paused && !video.ended) void play();
  };

  button?.addEventListener('click', () => {
    pausedByUser = !video.paused && !video.ended;
    if (pausedByUser) pause();
    else void play();
  });
  video.addEventListener('ended', () => {
    button?.setAttribute('aria-label', 'Replay Stocker swipe demo');
  });
  reducedMotion.addEventListener('change', syncPlayback);
  document.addEventListener('visibilitychange', syncPlayback);

  if (!('IntersectionObserver' in window)) return;
  if (!button) {
    const preloader = new IntersectionObserver(
      (entries) => {
        if (
          reducedMotion.matches ||
          !entries.some((entry) => entry.isIntersecting)
        )
          return;
        load();
        preloader.disconnect();
      },
      { rootMargin: '360px 0px' },
    );
    preloader.observe(video);
  }

  const threshold = button ? 0.6 : 0.35;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      inView = entry.intersectionRatio >= threshold;
      syncPlayback();
    },
    { threshold },
  );
  observer.observe(button ?? video);
}

document
  .querySelectorAll<HTMLVideoElement>('.swipe-preview video[data-source]')
  .forEach(preparePreview);
