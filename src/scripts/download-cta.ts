const primaryDownloads = document.querySelectorAll('[data-primary-download]');

if (primaryDownloads.length > 0 && 'IntersectionObserver' in window) {
  const visible = new Map<Element, boolean>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        visible.set(
          entry.target,
          entry.isIntersecting && entry.intersectionRatio === 1,
        );
      }
      document.body.dataset.downloadCtaVisible = String(
        [...visible.values()].some(Boolean),
      );
    },
    { threshold: 1 },
  );
  primaryDownloads.forEach((download) => observer.observe(download));
}
