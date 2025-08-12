export function stripHtml(html: string) {
  let text = html.replace(/<[^>]*>?/gm, "").trim();
  text = text.replace(/&nbsp;/g, " ");
  return text;
}



export function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}

export function formatDateToDDMMYYYY(datetimeString: string): string {
  const date = new Date(datetimeString);
  if (isNaN(date.getTime())) return ""; // Correct invalid date check

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/v=([^&?]+)/);
  if (!match) return null;
  const videoId = match[1];
  const params = url.split('?')[1]?.replace(/^v=[^&]+&?/, '') || '';
  return `https://www.youtube.com/embed/${videoId}${params ? `?${params}` : ''}`;
}