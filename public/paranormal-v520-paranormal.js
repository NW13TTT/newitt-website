const tiktokPreview = document.querySelector('.tiktok-preview');
tiktokPreview.addEventListener('toggle', () => {
    if (!tiktokPreview.open || tiktokPreview.dataset.loaded) return;
    const embed = document.createElement('script');
    embed.src = 'https://www.tiktok.com/embed.js';
    embed.async = true;
    document.head.append(embed);
    tiktokPreview.dataset.loaded = 'true';
});
