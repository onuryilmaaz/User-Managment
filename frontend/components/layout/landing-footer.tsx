import Link from "next/link";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">AuthFlow</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Modern uygulamalar için güvenli ve ölçeklenebilir kimlik doğrulama
              çözümü.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Ürün</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Özellikler
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Fiyatlandırma
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Entegrasyonlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Şirket</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Kariyer
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Destek</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Dokümantasyon
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Durum Sayfası
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Güvenlik
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} AuthFlow. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Kullanım Şartları
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Çerezler
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
