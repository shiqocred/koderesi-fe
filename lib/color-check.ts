/**
 * Mengonversi warna hex menjadi nilai RGB
 * @param hex - warna hex dalam format #RRGGBB atau #RGB
 * @returns {r: number, g: number, b: number} - nilai RGB
 */
export const hexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  let sanitizedHex = hex.replace(/^#/, "");

  if (sanitizedHex.length === 3) {
    sanitizedHex = sanitizedHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const intValue = parseInt(sanitizedHex, 16);
  const r = (intValue >> 16) & 255;
  const g = (intValue >> 8) & 255;
  const b = intValue & 255;

  return { r, g, b };
};

/**
 * Menghitung luminance dari warna RGB
 * @param r - nilai red (0-255)
 * @param g - nilai green (0-255)
 * @param b - nilai blue (0-255)
 * @returns luminance (0-1)
 */
export const calculateLuminance = (r: number, g: number, b: number): number => {
  const [red, green, blue] = [r, g, b].map((v) => {
    const channel = v / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

/**
 * Mengecek apakah warna hex itu gelap atau terang
 * @param hex - warna hex dalam format #RRGGBB atau #RGB
 * @returns boolean - true jika gelap, false jika terang
 */
export const isDarkColor = (hex: string): boolean => {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    throw new Error("Invalid hex color");
  }

  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);
  return luminance < 0.5;
};

/**
 * Mengonversi nilai RGB menjadi warna hex
 * @param r - nilai red (0-255)
 * @param g - nilai green (0-255)
 * @param b - nilai blue (0-255)
 * @returns hex - warna hex dalam format #RRGGBB
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Menyesuaikan kecerahan warna hex
 * @param hex - warna hex dalam format #RRGGBB atau #RGB
 * @param amount - nilai penyesuaian kecerahan (-100 hingga 100)
 * @returns hex - warna hex yang disesuaikan
 */
export const adjustBrightness = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    throw new Error("Invalid hex color");
  }

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const r = clamp(rgb.r + amount, 0, 255);
  const g = clamp(rgb.g + amount, 0, 255);
  const b = clamp(rgb.b + amount, 0, 255);

  return rgbToHex(r, g, b);
};

/**
 * Membuat warna hex menjadi lebih terang
 * @param hex - warna hex dalam format #RRGGBB atau #RGB
 * @param percent - persentase kecerahan (0 hingga 100)
 * @returns hex - warna hex yang lebih terang
 */
export const lightenColor = (hex: string, percent: number): string => {
  const amount = Math.round((255 * percent) / 100);
  return adjustBrightness(hex, amount);
};

/**
 * Membuat warna hex menjadi lebih gelap
 * @param hex - warna hex dalam format #RRGGBB atau #RGB
 * @param percent - persentase kegelapan (0 hingga 100)
 * @returns hex - warna hex yang lebih gelap
 */
export const darkenColor = (hex: string, percent: number): string => {
  const amount = -Math.round((255 * percent) / 100);
  return adjustBrightness(hex, amount);
};

/**
 * Mengonversi warna hex menjadi nilai RGBA dengan transparansi
 * @param hex - warna hex dalam format #RRGGBB atau #RGB
 * @param alpha - nilai transparansi (0 hingga 1)
 * @returns rgba - warna dalam format rgba(r, g, b, a)
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    throw new Error("Invalid hex color");
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};
