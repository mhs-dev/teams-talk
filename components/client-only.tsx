"use client";

import { PropsWithChildren, useEffect, useState } from "react";

export default function ClientOnly({ children }: PropsWithChildren) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <>
          {children}
        </>
      )}
    </>
  )
}