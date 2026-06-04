export const downloadResume = async (url?: string, filename?: string) => {
  if (!url) return; // no-op when no PDF URL provided

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch resume: ${res.status}`);
    const blob = await res.blob();
    const inferredName = filename || (() => {
      try {
        return new URL(url).pathname.split('/').pop() || 'Faisal_Kabir_Resume.pdf';
      } catch {
        return 'Faisal_Kabir_Resume.pdf';
      }
    })();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', inferredName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    // If fetch fails, silently fail (button will do nothing)
    // eslint-disable-next-line no-console
    console.error('downloadResume failed:', err);
  }
};
