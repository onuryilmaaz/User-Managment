// XSS Koruması için Input Temizleme
export class InputSanitizer {
  // HTML etiketlerini temizle
  static sanitizeHTML(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // SQL Injection koruması
  static sanitizeSQL(input: string): string {
    return input
      .replace(/[';"\\]/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '');
  }

  // Genel temizleme
  static sanitizeInput(input: string): string {
    return this.sanitizeHTML(this.sanitizeSQL(input.trim()));
  }

  // E-posta temizleme
  static sanitizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  // Telefon numarası temizleme
  static sanitizePhone(phone: string): string {
    return phone.replace(/[^+\d\s()-]/g, '');
  }
}