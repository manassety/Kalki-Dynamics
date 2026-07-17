'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useTransition } from 'react';

const ViewTransitionsContext = createContext<{
    isPending: boolean;
    navigate: (href: string) => void;
} | null>(null);

export function useViewTransition() {
    const context = useContext(ViewTransitionsContext);
    if (!context) {
        throw new Error('useViewTransition must be used within a ViewTransitionsProvider');
    }
    return context;
}

export function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const resolveRef = useRef<(() => void) | null>(null);

    // Resolve transition promise when route path actually updates
    useEffect(() => {
        if (resolveRef.current) {
            resolveRef.current();
            resolveRef.current = null;
        }
    }, [pathname]);

    const navigate = (href: string) => {
        if (typeof window === 'undefined') {
            router.push(href);
            return;
        }

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                return new Promise<void>((resolve) => {
                    resolveRef.current = resolve;
                    startTransition(() => {
                        router.push(href);
                    });
                });
            });
        } else {
            router.push(href);
        }
    };

    useEffect(() => {
        // Intercept standard click events for navigation links
        const handleNativeLinkClick = (e: MouseEvent) => {
            let target = e.target as HTMLElement;
            while (target && target.tagName !== 'A') {
                target = target.parentElement as HTMLElement;
            }

            if (target && target.tagName === 'A') {
                const anchor = target as HTMLAnchorElement;
                const href = anchor.getAttribute('href');
                const targetAttr = anchor.getAttribute('target');

                // Only transition internal same-origin link routing
                if (
                    href &&
                    href.startsWith('/') &&
                    !href.startsWith('/#') &&
                    (!targetAttr || targetAttr === '_self') &&
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey &&
                    e.button === 0
                ) {
                    e.preventDefault();
                    navigate(href);
                }
            }
        };

        window.addEventListener('click', handleNativeLinkClick, { capture: true });
        return () => {
            window.removeEventListener('click', handleNativeLinkClick, { capture: true });
        };
    }, [router]);

    return (
        <ViewTransitionsContext.Provider value={{ isPending, navigate }}>
            {children}
        </ViewTransitionsContext.Provider>
    );
}
