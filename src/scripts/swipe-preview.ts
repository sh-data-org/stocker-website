function preparePreview(video: HTMLVideoElement) {
  const source = video.dataset.source;
  if (!source) return;

  const button = video.closest<HTMLButtonElement>('[data-swipe-control]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const shouldLoop = video.hasAttribute('data-loop-preview');
  let pausedByUser = false;
  let inView = false;

  const load = () => {
    if (video.hasAttribute('src')) return;
    video.preload = 'auto';
    video.src = source;
  };

  const play = async () => {
    load();
    if (video.ended) video.currentTime = 0;
    try {
      await video.play();
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === 'NotAllowedError' || error.name === 'AbortError')
      )
        return;
      console.warn('Stocker app preview could not play.', error);
    }
  };

  const syncPlayback = () => {
    video.loop = shouldLoop && !reducedMotion.matches;
    if (!inView || document.hidden || reducedMotion.matches) {
      if (!video.paused) video.pause();
      return;
    }
    if (!pausedByUser && video.paused && !video.ended) void play();
  };

  button?.addEventListener('click', () => {
    pausedByUser = !video.paused && !video.ended;
    if (pausedByUser) video.pause();
    else void play();
  });
  const updatePlaybackControl = () => {
    if (!button) return;
    const playing = !video.paused && !video.ended;
    const action = playing ? 'Pause' : video.ended ? 'Replay' : 'Play';
    button.toggleAttribute('data-swipe-playing', playing);
    button.setAttribute('aria-label', `${action} Stocker swipe demo`);
  };
  video.addEventListener('play', updatePlaybackControl);
  video.addEventListener('pause', updatePlaybackControl);
  video.addEventListener('ended', updatePlaybackControl);
  reducedMotion.addEventListener('change', syncPlayback);
  document.addEventListener('visibilitychange', syncPlayback);

  syncPlayback();
  if (!('IntersectionObserver' in window)) return;
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

  const threshold = button ? 0.6 : 0.35;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      if (!entry.isIntersecting) inView = false;
      else if (entry.intersectionRatio >= threshold) inView = true;
      syncPlayback();
    },
    { threshold: [0, threshold] },
  );
  observer.observe(button ?? video);
}

document
  .querySelectorAll<HTMLVideoElement>('.swipe-preview video[data-source]')
  .forEach(preparePreview);
