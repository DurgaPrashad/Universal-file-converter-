// Map of file extensions to their compatible output formats
const formatCompatibility: Record<string, string[]> = {
  // Documents
  pdf: ["docx", "ppt", "txt", "html"],
  docx: ["pdf", "txt", "html"],
  ppt: ["pdf", "pptx"],
  pptx: ["pdf", "ppt"],
  txt: ["pdf", "docx", "html"],
  html: ["pdf", "docx", "txt", "md"],
  md: ["html", "pdf", "docx"],

  // Spreadsheets
  xlsx: ["csv", "pdf", "json"],
  csv: ["xlsx", "json", "xml"],
  json: ["csv", "xml", "yaml"],
  xml: ["json", "csv", "yaml"],
  yaml: ["json", "xml"],

  // Images
  jpg: ["png", "webp", "gif", "bmp"],
  jpeg: ["png", "webp", "gif", "bmp"],
  png: ["jpg", "webp", "gif", "bmp"],
  webp: ["jpg", "png", "gif"],
  gif: ["jpg", "png", "webp"],
  svg: ["png", "jpg"],
  bmp: ["jpg", "png"],

  // Audio & Video
  mp4: ["mp3", "wav", "avi", "mov"],
  mp3: ["wav", "ogg", "flac"],
  wav: ["mp3", "ogg", "flac"],
  avi: ["mp4", "mov"],
  mov: ["mp4", "avi"],
  ogg: ["mp3", "wav"],
  flac: ["mp3", "wav"],
}

/**
 * Get the file extension from a filename
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || ""
}

/**
 * Get compatible output formats for a given file
 */
export function getCompatibleFormats(filename: string): string[] {
  const extension = getFileExtension(filename)
  return formatCompatibility[extension] || []
}

/**
 * Check if a conversion is supported
 */
export function isConversionSupported(inputFormat: string, outputFormat: string): boolean {
  const compatibleFormats = formatCompatibility[inputFormat.toLowerCase()]
  return compatibleFormats?.includes(outputFormat.toLowerCase()) || false
}

/**
 * Get a human-readable file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

