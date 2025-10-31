export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.split('/')[1] || null;
    }
    // youtube.com/watch?v=<id>
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    // youtube.com/embed/<id>
    const parts = u.pathname.split('/');
    const idx = parts.indexOf('embed');
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    return null;
  } catch {
    return null;
  }
}

export function youtubeThumbnail(url: string, quality: 'hq' | 'mq' | 'sd' = 'hq'): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  const q = quality === 'hq' ? 'hqdefault' : quality === 'mq' ? 'mqdefault' : 'sddefault';
  return `https://img.youtube.com/vi/${id}/${q}.jpg`;
}

export function youtubeEmbedUrl(url: string): string {
  const id = extractYouTubeId(url);
  if (!id) return url;
  return `https://www.youtube.com/embed/${id}`;
}
