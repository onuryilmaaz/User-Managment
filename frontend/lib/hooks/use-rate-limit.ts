"use client";

import { useState, useCallback } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

interface RateLimitState {
  attempts: number;
  lastAttempt: number;
  isBlocked: boolean;
  blockUntil: number;
}

export function useRateLimit(key: string, config: RateLimitConfig) {
  const [state, setState] = useState<RateLimitState>(() => {
    const stored = localStorage.getItem(`rate-limit-${key}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = Date.now();
      
      // Blok süresi dolmuşsa sıfırla
      if (parsed.isBlocked && now > parsed.blockUntil) {
        return { attempts: 0, lastAttempt: 0, isBlocked: false, blockUntil: 0 };
      }
      
      // Pencere süresi dolmuşsa sıfırla
      if (now - parsed.lastAttempt > config.windowMs) {
        return { attempts: 0, lastAttempt: 0, isBlocked: false, blockUntil: 0 };
      }
      
      return parsed;
    }
    return { attempts: 0, lastAttempt: 0, isBlocked: false, blockUntil: 0 };
  });

  const checkLimit = useCallback(() => {
    const now = Date.now();
    
    // Bloklu durumda mı?
    if (state.isBlocked && now < state.blockUntil) {
      const remainingMs = state.blockUntil - now;
      const remainingSeconds = Math.ceil(remainingMs / 1000);
      throw new Error(`Çok fazla deneme. ${remainingSeconds} saniye sonra tekrar deneyin.`);
    }
    
    // Pencere süresi dolmuşsa sıfırla
    if (now - state.lastAttempt > config.windowMs) {
      const newState = { attempts: 1, lastAttempt: now, isBlocked: false, blockUntil: 0 };
      setState(newState);
      localStorage.setItem(`rate-limit-${key}`, JSON.stringify(newState));
      return;
    }
    
    // Deneme sayısını artır
    const newAttempts = state.attempts + 1;
    
    if (newAttempts >= config.maxAttempts) {
      // Blokla
      const newState = {
        attempts: newAttempts,
        lastAttempt: now,
        isBlocked: true,
        blockUntil: now + config.blockDurationMs
      };
      setState(newState);
      localStorage.setItem(`rate-limit-${key}`, JSON.stringify(newState));
      
      const blockSeconds = Math.ceil(config.blockDurationMs / 1000);
      throw new Error(`Çok fazla deneme. ${blockSeconds} saniye boyunca bloklandınız.`);
    }
    
    // Sadece deneme sayısını güncelle
    const newState = {
      ...state,
      attempts: newAttempts,
      lastAttempt: now
    };
    setState(newState);
    localStorage.setItem(`rate-limit-${key}`, JSON.stringify(newState));
  }, [state, config, key]);

  const reset = useCallback(() => {
    const newState = { attempts: 0, lastAttempt: 0, isBlocked: false, blockUntil: 0 };
    setState(newState);
    localStorage.removeItem(`rate-limit-${key}`);
  }, [key]);

  return {
    attempts: state.attempts,
    isBlocked: state.isBlocked,
    remainingAttempts: Math.max(0, config.maxAttempts - state.attempts),
    checkLimit,
    reset
  };
}