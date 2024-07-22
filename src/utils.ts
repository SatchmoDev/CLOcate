export const cap = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

export const imager = (path: string | number) =>
  "https://3gzz76w9jlrqfkdq.public.blob.vercel-storage.com/" + path
