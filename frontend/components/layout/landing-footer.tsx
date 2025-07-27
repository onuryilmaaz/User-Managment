"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Star,
  Shield,
  Award,
  Zap,
  Heart,
  Sparkles,
  Crown,
  Rocket,
  Users,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const footerLinks = {
  product: [
    { name: "Özellikler", href: "/features" },
    { name: "Fiyatlandırma", href: "/pricing" },
    { name: "API Dokümantasyonu", href: "/docs" },
    { name: "Entegrasyonlar", href: "/integrations" },
    { name: "Güvenlik", href: "/security" },
  ],
  company: [
    { name: "Hakkımızda", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Kariyer", href: "/careers" },
    { name: "Basın Kiti", href: "/press" },
    { name: "İletişim", href: "/contact" },
  ],
  resources: [
    { name: "Yardım Merkezi", href: "/help" },
    { name: "Topluluk", href: "/community" },
    { name: "Webinarlar", href: "/webinars" },
    { name: "Durum Sayfası", href: "/status" },
    { name: "Changelog", href: "/changelog" },
  ],
  legal: [
    { name: "Gizlilik Politikası", href: "/privacy" },
    { name: "Kullanım Şartları", href: "/terms" },
    { name: "Çerez Politikası", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
    { name: "Güvenlik", href: "/security" },
  ],
  developers: [
    { name: "API Referansı", href: "/api" },
    { name: "SDK'lar", href: "/sdks" },
    { name: "Webhooks", href: "/webhooks" },
    { name: "Örnekler", href: "/examples" },
    { name: "GitHub", href: "https://github.com" },
  ],
};

const trustBadges = [
  { icon: Shield, text: "SOC 2 Type II", color: "text-emerald-500" },
  { icon: Award, text: "ISO 27001", color: "text-blue-500" },
  { icon: Star, text: "GDPR Ready", color: "text-purple-500" },
  { icon: Zap, text: "99.9% Uptime", color: "text-yellow-500" },
];

export function LandingFooter() {
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-100/50 via-slate-50/30 to-white dark:from-slate-800/50 dark:via-slate-900/30 dark:to-slate-950 overflow-hidden">
      {/* Smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-100/50 via-slate-50/30 to-transparent dark:from-slate-800/50 dark:via-slate-900/30 dark:to-transparent"></div>

      {/* Premium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/8 to-pink-600/8 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Interactive mouse follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400/3 to-green-400/3 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-pink-400/30 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Premium Newsletter Section */}
        <div className="py-16 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <Badge className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white px-6 py-3 text-sm font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 border-0">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Mail className="w-4 h-4 animate-pulse" />
                  <span>Newsletter</span>
                  <Sparkles className="w-4 h-4 animate-bounce" />
                </div>
              </Badge>
            </div>

            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                Güncellemelerden
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                Haberdar Olun
              </span>
            </h3>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Yeni özellikler, güvenlik güncellemeleri ve özel tekliflerden ilk
              siz haberdar olun.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Email adresinizi girin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-6 text-base bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 focus:border-emerald-400 dark:focus:border-emerald-500 rounded-2xl shadow-lg"
                  required
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
              <Button
                type="submit"
                className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl border-0"
              >
                <div className="flex items-center gap-2">
                  <span>Abone Ol</span>
                  <Rocket className="w-5 h-5 animate-bounce" />
                </div>
              </Button>
            </form>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      AuthPro
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Premium Auth Solution
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Modern uygulamalar için tasarlanmış güvenli, ölçeklenebilir ve
                  kullanıcı dostu kimlik doğrulama çözümü.
                </p>

                {/* Premium Social Media */}
                <div className="flex items-center gap-4">
                  <Link
                    href="https://github.com"
                    className="group relative w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-slate-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Github className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200" />
                  </Link>

                  <Link
                    href="https://twitter.com"
                    className="group relative w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Twitter className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200" />
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    className="group relative w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200" />
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 bg-gradient-to-br from-current/10 to-current/20 rounded-xl ${badge.color}`}
                        >
                          <Icon className={`w-4 h-4 ${badge.color}`} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {badge.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-8">
              {/* Product */}
              <div
                className="group"
                onMouseEnter={() => setHoveredSection("product")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Rocket
                    className={`w-5 h-5 text-emerald-500 transition-all duration-300 ${
                      hoveredSection === "product" ? "animate-bounce" : ""
                    }`}
                  />
                  Ürün
                </h5>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 font-medium hover:translate-x-1 transform"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div
                className="group"
                onMouseEnter={() => setHoveredSection("company")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Users
                    className={`w-5 h-5 text-blue-500 transition-all duration-300 ${
                      hoveredSection === "company" ? "animate-bounce" : ""
                    }`}
                  />
                  Şirket
                </h5>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium hover:translate-x-1 transform"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div
                className="group"
                onMouseEnter={() => setHoveredSection("resources")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Globe
                    className={`w-5 h-5 text-purple-500 transition-all duration-300 ${
                      hoveredSection === "resources" ? "animate-bounce" : ""
                    }`}
                  />
                  Kaynaklar
                </h5>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium hover:translate-x-1 transform"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div
                className="group"
                onMouseEnter={() => setHoveredSection("legal")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Shield
                    className={`w-5 h-5 text-yellow-500 transition-all duration-300 ${
                      hoveredSection === "legal" ? "animate-bounce" : ""
                    }`}
                  />
                  Yasal
                </h5>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-200 font-medium hover:translate-x-1 transform"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Developers */}
              <div
                className="group"
                onMouseEnter={() => setHoveredSection("developers")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Crown
                    className={`w-5 h-5 text-pink-500 transition-all duration-300 ${
                      hoveredSection === "developers" ? "animate-bounce" : ""
                    }`}
                  />
                  Geliştiriciler
                </h5>
                <ul className="space-y-3">
                  {footerLinks.developers.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 font-medium hover:translate-x-1 transform"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span>© 2024 AuthPro.</span>
              <span>Tüm hakları saklıdır.</span>
              <span>Türkiye`de</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>ile yapıldı.</span>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>İstanbul, Türkiye</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+90 212 XXX XX XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500" />
                <span>hello@authpro.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles for premium effect */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="group relative">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl animate-float cursor-pointer hover:scale-110 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-200"></div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="group relative">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl animate-float-delayed cursor-pointer hover:scale-110 transition-transform duration-200">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-200"></div>
        </div>
      </div>
    </footer>
  );
}
