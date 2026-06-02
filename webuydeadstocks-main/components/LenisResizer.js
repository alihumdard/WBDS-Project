'use client';

import { useLenis } from "lenis/react";
import { useEffect } from "react";

export default function LenisResizer() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        const observer = new ResizeObserver(() => {
            lenis.resize();
        });


        observer.observe(document.body);

        return () => {
            observer.disconnect();
        };
    }, [lenis]);

    return null;
}
