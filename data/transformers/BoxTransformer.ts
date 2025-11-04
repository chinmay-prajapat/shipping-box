export class BoxTransformer {
  static toRgb(colorValue: string): string {
    // If already in RGB format (255, 255, 255), return as is
    if (/^\d+,\s*\d+,\s*\d+$/.test(colorValue.trim())) {
      return colorValue.trim();
    }

    // If hex color, convert to RGB
    if (colorValue.startsWith("#")) {
      const hex = colorValue.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }

    // Default: try to parse as RGB
    return colorValue;
  }

  static fromRgb(rgbString: string): string {
    // Convert "255, 255, 255" to hex format "#ffffff"
    if (!rgbString) return "#000000";
    const match = rgbString.match(/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      return `#${[r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")}`;
    }
    return "#000000";
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  }
}
