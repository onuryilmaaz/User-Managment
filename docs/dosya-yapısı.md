.
├── /app/                               # Next.js App Router Ana Dizini
│   ├── (auth)/                         # Auth Sayfaları Grubu (URL'i etkilemez)
│   │   ├── layout.tsx                  # Auth sayfaları için ortak layout
│   │   ├── login/
│   │   │   └── page.tsx                # /login sayfası
│   │   ├── register/
│   │   │   └── page.tsx                # /register sayfası
│   │   ├── verify-code/
│   │   │   └── page.tsx                # /verify-code (6 haneli kod doğrulama)
│   │   ├── forgot-password/
│   │   │   └── page.tsx                # /forgot-password sayfası
│   │   └── reset-password/
│   │       └── [token]/
│   │           └── page.tsx            # /reset-password/[token] dinamik sayfası
│   │
│   ├── (dashboard)/                    # Korumalı Sayfalar Grubu
│   │   ├── layout.tsx                  # Dashboard, Ayarlar vb. için ana layout (Sidebar, Header içerir)
│   │   ├── dashboard/
│   │   │   └── page.tsx                # /dashboard ana sayfası
│   │   ├── profile/
│   │   │   └── page.tsx                # /profile kullanıcı profili
│   │   ├── settings/
│   │   │   └── page.tsx                # /settings kullanıcı ayarları
│   │   └── admin/                      # Sadece Admin ve Moderatörlerin görebileceği sayfalar
│   │       ├── layout.tsx              # Admin sayfaları için özel layout
│   │       └── users/
│   │           └── page.tsx            # /admin/users kullanıcı listesi
│   │
│   ├── layout.tsx                      # Ana (Root) Layout
│   ├── page.tsx                        # Ana sayfa (isteğe bağlı, landing page olabilir)
│   └── globals.css                     # Global Stiller
│
├── /components/                        # Yeniden Kullanılabilir Bileşenler
│   ├── /ui/                            # Genel UI Bileşenleri (shadcn/ui'dan gelenler burada olacak)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx                  # Modallar / Pop-up'lar için
│   │   ├── toast.tsx
│   │   └── toaster.tsx                 # Toast mesajlarını göstermek için
│   │
│   ├── /auth/                          # Kimlik Doğrulama ile ilgili bileşenler
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── verify-code-form.tsx
│   │
│   ├── /layout/                        # Sayfa düzeni ile ilgili bileşenler
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── theme-toggle.tsx            # Dark/Light mod değiştirme butonu
│   │   └── user-nav.tsx                # Sağ üstteki kullanıcı menüsü (Profil, Ayarlar, Çıkış)
│   │
│   ├── /dashboard/                     # Dashboard'a özel bileşenler
│   │   └── stats-card.tsx
│   │
│   ├── /profile/                       # Profile özel bileşenler
│   │   └── update-profile-form.tsx
│   │
│   └── /admin/                         # Admin paneline özel bileşenler
│       ├── user-table.tsx              # Kullanıcıları listeleyen tablo
│       ├── user-actions.tsx            # (Sil, Rol Değiştir vb. butonları içeren menü)
│       └── role-change-dialog.tsx      # Rol değiştirme modalı
│
├── /lib/                               # Yardımcı Fonksiyonlar, API Servisleri
│   ├── /services/                      # API endpoint'lerine karşılık gelen servisler
│   │   ├── auth.service.ts             # Swagger'daki "Authentication" endpoint'leri
│   │   ├── user.service.ts             # Swagger'daki "User Management" endpoint'leri
│   │   └── admin.service.ts            # Swagger'daki "Admin/Moderator" endpoint'leri
│   │
│   ├── /validators/                    # Zod ile form doğrulama şemaları
│   │   └── auth.schema.ts
│   │
│   ├── /hooks/                         # Özel React Hook'ları
│   │   └── use-auth.ts                 # Oturum bilgilerini yöneten hook
│   │
│   ├── api.ts                          # Merkezi API client (Axios veya Fetch instance)
│   ├── utils.ts                        # Genel yardımcı fonksiyonlar (örn: cn, formatDate)
│   └── types.ts                        # Global TypeScript tipleri
│
├── /providers/                         # React Context Provider'ları
│   ├── theme-provider.tsx              # Dark/Light mod yönetimi için
│   └── auth-provider.tsx               # Kullanıcı oturumunu global olarak yönetmek için
│
├── /public/                            # Statik Dosyalar (resimler, fontlar, ikonlar)
│
├── .env.local                          # Ortam Değişkenleri (API Base URL vb.)
├── tailwind.config.ts                  # Tailwind CSS Konfigürasyonu
└── tsconfig.json                       # TypeScript Konfigürasyonu



Harika bir proje fikri! Sağladığınız swagger.json dosyası, kullanıcı kimlik doğrulama ve yönetimi üzerine kurulu, rol bazlı yetkilendirmelere sahip (Admin, Moderator, User) kapsamlı bir backend'i tanımlıyor. Bu backend'e uygun, modern, premium ve kullanışlı bir frontend arayüzü için Next.js 15 ve Tailwind CSS 4.1 ile nasıl bir dosya yapısı kurabileceğimize bakalım.

Bu yapı, projenizin büyümesine olanak tanıyacak şekilde ölçeklenebilir, yönetimi kolay ve modern geliştirme standartlarına uygun olarak tasarlanmıştır.

Önerilen Teknolojiler
Framework: Next.js 15 (App Router ile)

Styling: Tailwind CSS 4.1

UI Bileşenleri: shadcn/ui - Tailwind üzerine kurulu, kopyala-yapıştır ile projenize ekleyebileceğiniz, tamamen özelleştirilebilir, modern bileşenler (Modal, Toast, Button, Input vb. için mükemmel bir seçim).

Form Yönetimi: React Hook Form

Şema Doğrulama: Zod (Swagger'daki payload'larınızla birebir uyumlu şemalar oluşturmak için ideal)

State Management: Zustand veya React Context (Özellikle kimlik doğrulama durumu ve tema yönetimi için)

API İstekleri: Axios veya Fetch

Detaylı Dosya ve Klasör Yapısı
İşte projenizin temel iskeleti. Her dosya ve klasörün ne işe yaradığı aşağıda açıklanmıştır.

Plaintext

.
├── /app/                               # Next.js App Router Ana Dizini
│   ├── (auth)/                         # Auth Sayfaları Grubu (URL'i etkilemez)
│   │   ├── layout.tsx                  # Auth sayfaları için ortak layout
│   │   ├── login/
│   │   │   └── page.tsx                # /login sayfası
│   │   ├── register/
│   │   │   └── page.tsx                # /register sayfası
│   │   ├── verify-code/
│   │   │   └── page.tsx                # /verify-code (6 haneli kod doğrulama)
│   │   ├── forgot-password/
│   │   │   └── page.tsx                # /forgot-password sayfası
│   │   └── reset-password/
│   │       └── [token]/
│   │           └── page.tsx            # /reset-password/[token] dinamik sayfası
│   │
│   ├── (dashboard)/                    # Korumalı Sayfalar Grubu
│   │   ├── layout.tsx                  # Dashboard, Ayarlar vb. için ana layout (Sidebar, Header içerir)
│   │   ├── dashboard/
│   │   │   └── page.tsx                # /dashboard ana sayfası
│   │   ├── profile/
│   │   │   └── page.tsx                # /profile kullanıcı profili
│   │   ├── settings/
│   │   │   └── page.tsx                # /settings kullanıcı ayarları
│   │   └── admin/                      # Sadece Admin ve Moderatörlerin görebileceği sayfalar
│   │       ├── layout.tsx              # Admin sayfaları için özel layout
│   │       └── users/
│   │           └── page.tsx            # /admin/users kullanıcı listesi
│   │
│   ├── layout.tsx                      # Ana (Root) Layout
│   ├── page.tsx                        # Ana sayfa (isteğe bağlı, landing page olabilir)
│   └── globals.css                     # Global Stiller
│
├── /components/                        # Yeniden Kullanılabilir Bileşenler
│   ├── /ui/                            # Genel UI Bileşenleri (shadcn/ui'dan gelenler burada olacak)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx                  # Modallar / Pop-up'lar için
│   │   ├── toast.tsx
│   │   └── toaster.tsx                 # Toast mesajlarını göstermek için
│   │
│   ├── /auth/                          # Kimlik Doğrulama ile ilgili bileşenler
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── verify-code-form.tsx
│   │
│   ├── /layout/                        # Sayfa düzeni ile ilgili bileşenler
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── theme-toggle.tsx            # Dark/Light mod değiştirme butonu
│   │   └── user-nav.tsx                # Sağ üstteki kullanıcı menüsü (Profil, Ayarlar, Çıkış)
│   │
│   ├── /dashboard/                     # Dashboard'a özel bileşenler
│   │   └── stats-card.tsx
│   │
│   ├── /profile/                       # Profile özel bileşenler
│   │   └── update-profile-form.tsx
│   │
│   └── /admin/                         # Admin paneline özel bileşenler
│       ├── user-table.tsx              # Kullanıcıları listeleyen tablo
│       ├── user-actions.tsx            # (Sil, Rol Değiştir vb. butonları içeren menü)
│       └── role-change-dialog.tsx      # Rol değiştirme modalı
│
├── /lib/                               # Yardımcı Fonksiyonlar, API Servisleri
│   ├── /services/                      # API endpoint'lerine karşılık gelen servisler
│   │   ├── auth.service.ts             # Swagger'daki "Authentication" endpoint'leri
│   │   ├── user.service.ts             # Swagger'daki "User Management" endpoint'leri
│   │   └── admin.service.ts            # Swagger'daki "Admin/Moderator" endpoint'leri
│   │
│   ├── /validators/                    # Zod ile form doğrulama şemaları
│   │   └── auth.schema.ts
│   │
│   ├── /hooks/                         # Özel React Hook'ları
│   │   └── use-auth.ts                 # Oturum bilgilerini yöneten hook
│   │
│   ├── api.ts                          # Merkezi API client (Axios veya Fetch instance)
│   ├── utils.ts                        # Genel yardımcı fonksiyonlar (örn: cn, formatDate)
│   └── types.ts                        # Global TypeScript tipleri
│
├── /providers/                         # React Context Provider'ları
│   ├── theme-provider.tsx              # Dark/Light mod yönetimi için
│   └── auth-provider.tsx               # Kullanıcı oturumunu global olarak yönetmek için
│
├── /public/                            # Statik Dosyalar (resimler, fontlar, ikonlar)
│
├── .env.local                          # Ortam Değişkenleri (API Base URL vb.)
├── tailwind.config.ts                  # Tailwind CSS Konfigürasyonu
└── tsconfig.json                       # TypeScript Konfigürasyonu



Yapının Açıklaması
/app Dizini ve Route Grupları (): Next.js'in App Router'ı dosya sistemi tabanlı yönlendirme kullanır. (auth) ve (dashboard) gibi parantezli klasörler, URL'de görünmeden sayfalarınızı gruplamanızı ve onlara farklı layout.tsx dosyaları atamanızı sağlar.

(auth): Kullanıcı giriş yapmamışken göreceği sayfalar burada toplanır. Genellikle ortalanmış basit bir tasarıma sahip olurlar.

(dashboard): Kullanıcı giriş yaptıktan sonra erişebileceği, ortak bir Header ve Sidebar'a sahip sayfalar burada yer alır. Bu grubun layout.tsx dosyası, kullanıcının giriş yapıp yapmadığını kontrol ederek sayfaları korur (Protected Routes).

/components Dizini:

/ui: Projenin her yerinde kullanacağınız temel yapı taşlarıdır (Düğme, Kart, Giriş Alanı vb.). shadcn/ui kullanarak bu klasörü kolayca doldurabilirsiniz. Bu, tasarım tutarlılığı sağlar.

Diğer klasörler (/auth, /layout vb.), bileşenleri ait oldukları özelliklere göre gruplayarak projeyi daha organize hale getirir.

/lib Dizini: Burası projenizin beynidir.

/services: Backend ile olan tüm iletişimi burada yönetiriz. Swagger dosyanızdaki her bir "tag" (Authentication, User Management) için ayrı bir servis dosyası oluşturmak, kodun okunabilirliğini ve bakımını çok kolaylaştırır.

api.ts: API istekleri için merkezi bir yapılandırma dosyası. Örneğin, axios kullanıyorsanız, baseURL (http://localhost:3001) ve istek başlıklarına otomatik olarak accessToken ekleyen interceptor'lar burada tanımlanır.

/validators: Zod kullanarak formlarınız için doğrulama kuralları tanımlarsınız. Bu kurallar, Swagger'daki schemas (UserRegisterPayload vb.) ile eşleşmelidir. Bu sayede frontend'de backend'in beklediği veri yapısını garanti altına almış olursunuz.

/providers Dizini: Uygulama genelinde paylaşılması gereken durumlar (state) burada yönetilir.

ThemeProvider: Dark/Light modu ve temanın tüm uygulamada tutarlı çalışmasını sağlar.

AuthProvider: Kullanıcının giriş yapıp yapmadığı, kullanıcı bilgileri, token gibi verileri tüm bileşenlerin kolayca erişebileceği bir yerde tutar.

İlk Adımlar ve Uygulama Akışı
Kurulum: Next.js projesini oluşturun ve Tailwind CSS'i kurun. Ardından shadcn/ui CLI'ını kullanarak button, input, dialog, toast gibi temel bileşenleri projenize ekleyin.

Yapıyı Oluşturma: Yukarıdaki klasör ve dosya yapısını projenizde oluşturun.

Çevre Değişkenleri: .env.local dosyasına backend API adresinizi ekleyin: NEXT_PUBLIC_API_BASE_URL=http://localhost:3001.

Kimlik Doğrulama Akışı (Authentication Flow):

Kayıt Ol (/register): RegisterForm bileşenini ve Zod ile auth.schema.ts dosyasını oluşturun. auth.service.ts içindeki register fonksiyonunu çağırın. Başarılı olursa kullanıcıyı 6 haneli kodu girmesi için /verify-code?email=... sayfasına yönlendirin ve bir toast mesajı (Hesap oluşturuldu! E-postanıza gelen kodu girin.) gösterin.

Kod Doğrulama (/verify-code): VerifyCodeForm bileşenini oluşturun. auth.service.ts'teki verifyCode fonksiyonunu çağırın. Başarılı olursa backend size accessToken ve kullanıcı bilgilerini dönecektir. Bu bilgileri AuthProvider context'ine kaydedin ve kullanıcıyı /dashboard sayfasına yönlendirin.

Giriş Yap (/login): LoginForm bileşenini oluşturun ve auth.service.ts'teki login fonksiyonunu kullanın. Başarılı olduğunda token'ları ve kullanıcı verisini saklayıp dashboard'a yönlendirin.