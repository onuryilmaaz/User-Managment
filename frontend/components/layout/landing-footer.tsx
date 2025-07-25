import Link from "next/link";
import { Zap } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl text-green-500">AuthFlow</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Modern ve güvenli kimlik doğrulama çözümü.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Ürün</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">Özellikler</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">Güvenlik</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Destek</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">Dokümantasyon</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">İletişim</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">Durum</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Şirket</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">Hakkımızda</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500">Kariyer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 AuthFlow. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
