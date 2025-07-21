"use client";

import React, { useState, useEffect } from "react";

// Bu bileşen, içeriğinin sadece istemci tarafında render edilmesini sağlar.
// Bu, hidrasyon hatalarını önlemek için kullanılır.
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Bileşen henüz istemcide "mount" olmadıysa, hiçbir şey render etme.
  if (!hasMounted) {
    return null;
  }

  // Mount olduysa, içeriği (children) render et.
  return <>{children}</>;
}
