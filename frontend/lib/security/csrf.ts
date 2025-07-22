// CSRF Token Yönetimi
export class CSRFProtection {
  private static token: string | null = null;

  static async getToken(): Promise<string> {
    if (!this.token) {
      try {
        const response = await fetch('/api/csrf-token');
        const data = await response.json();
        this.token = data.token;
      } catch (error) {
        console.error('CSRF token alınamadı:', error);
        throw new Error('Güvenlik token alınamadı');
      }
    }
    return this.token!; // Non-null assertion operator kullanıyoruz
  }

  static clearToken(): void {
    this.token = null;
  }

  static async addToHeaders(headers: Record<string, string> = {}): Promise<Record<string, string>> {
    const token = await this.getToken();
    return {
      ...headers,
      'X-CSRF-Token': token,
    };
  }
}