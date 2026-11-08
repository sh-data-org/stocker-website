const sidebarDownload = document.querySelector('[data-sidebar-download]');

if (sidebarDownload && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      document.body.dataset.articleDownloadVisible = String(
        entry?.isIntersecting && entry.intersectionRatio === 1,
      );
    },
    { threshold: 1 },
  );
  observer.observe(sidebarDownload);
}
