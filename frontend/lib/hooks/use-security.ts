"use client";

import { useCallback } from 'react';
import { useRateLimit } from './use-rate-limit';
import { InputSanitizer } from '@/lib/security/sanitize';
import { toast } from 'sonner';

export function useSecurity() {
  // Login rate limiting
  const loginRateLimit = useRateLimit('login', {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 dakika
    blockDurationMs: 30 * 60 * 1000, // 30 dakika
  });

  // Password reset rate limiting
  const passwordResetRateLimit = useRateLimit('password-reset', {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 saat
    blockDurationMs: 2 * 60 * 60 * 1000, // 2 saat
  });

  // 2FA rate limiting
  const twoFactorRateLimit = useRateLimit('2fa', {
    maxAttempts: 5,
    windowMs: 10 * 60 * 1000, // 10 dakika
    blockDurationMs: 20 * 60 * 1000, // 20 dakika
  });

  const validateAndSanitizeInput = useCallback((input: string, type: 'text' | 'email' | 'phone' = 'text') => {
    try {
      switch (type) {
        case 'email':
          return InputSanitizer.sanitizeEmail(input);
        case 'phone':
          return InputSanitizer.sanitizePhone(input);
        default:
          return InputSanitizer.sanitizeInput(input);
      }
    } catch (error) {
      toast.error('Geçersiz giriş tespit edildi.');
      throw error;
    }
  }, []);

  const checkPasswordStrength = useCallback((password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    
    return {
      score,
      strength: score < 3 ? 'weak' : score < 5 ? 'medium' : 'strong',
      checks,
    };
  }, []);

  return {
    loginRateLimit,
    passwordResetRateLimit,
    twoFactorRateLimit,
    validateAndSanitizeInput,
    checkPasswordStrength,
  };
}