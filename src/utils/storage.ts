'use client';

import {
    Product, INITIAL_PRODUCTS,
    Inquiry, INITIAL_INQUIRIES,
    FounderInfo, INITIAL_FOUNDER_INFO,
    ContactDetails, INITIAL_CONTACT_DETAILS,
    TeamMember, INITIAL_TEAM_MEMBERS,
    FAQ, INITIAL_FAQS,
    HomepageContent, INITIAL_HOMEPAGE_CONTENT
} from '@/data/products';

// --- PRODUCTS ---
export function getStoredProducts(): Product[] {
    if (typeof window === 'undefined') return INITIAL_PRODUCTS;
    const stored = localStorage.getItem('kalki_dynamics_products');
    if (!stored) {
        localStorage.setItem('kalki_dynamics_products', JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
    }
    try {
        const parsed = JSON.parse(stored);
        // Ensure no USD symbols exist in existing stored products
        return parsed.map((p: Product) => ({
            ...p,
            price: p.price.replace('$', '₹')
        }));
    } catch {
        return INITIAL_PRODUCTS;
    }
}

export function saveStoredProducts(products: Product[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kalki_dynamics_products', JSON.stringify(products));
}

// --- INQUIRIES ---
export function getStoredInquiries(): Inquiry[] {
    if (typeof window === 'undefined') return INITIAL_INQUIRIES;
    const stored = localStorage.getItem('kalki_dynamics_inquiries');
    if (!stored) {
        localStorage.setItem('kalki_dynamics_inquiries', JSON.stringify(INITIAL_INQUIRIES));
        return INITIAL_INQUIRIES;
    }
    try {
        return JSON.parse(stored);
    } catch {
        return INITIAL_INQUIRIES;
    }
}

export function saveStoredInquiries(inquiries: Inquiry[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kalki_dynamics_inquiries', JSON.stringify(inquiries));
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Inquiry {
    const newInq: Inquiry = {
        ...inquiry,
        id: `inq-${Math.floor(Math.random() * 9000) + 1000}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Unread',
    };
    const list = getStoredInquiries();
    const updated = [newInq, ...list];
    saveStoredInquiries(updated);
    return newInq;
}

// --- FOUNDER INFO ---
export function getStoredFounderInfo(): FounderInfo[] {
    if (typeof window === 'undefined') return INITIAL_FOUNDER_INFO;
    const stored = localStorage.getItem('kalki_dynamics_founder');
    if (!stored) {
        localStorage.setItem('kalki_dynamics_founder', JSON.stringify(INITIAL_FOUNDER_INFO));
        return INITIAL_FOUNDER_INFO;
    }
    try {
        const parsed = JSON.parse(stored);
        if (parsed.length > 1 || (parsed[0] && parsed[0].name !== 'Manas Sety(Kalki)')) {
            localStorage.setItem('kalki_dynamics_founder', JSON.stringify(INITIAL_FOUNDER_INFO));
            return INITIAL_FOUNDER_INFO;
        }
        return parsed;
    } catch {
        return INITIAL_FOUNDER_INFO;
    }
}

export function saveStoredFounderInfo(info: FounderInfo[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kalki_dynamics_founder', JSON.stringify(info));
}

// --- CONTACT DETAILS ---
export function getStoredContactDetails(): ContactDetails {
    if (typeof window === 'undefined') return INITIAL_CONTACT_DETAILS;
    const stored = localStorage.getItem('kalki_dynamics_contact');
    if (!stored) {
        localStorage.setItem('kalki_dynamics_contact', JSON.stringify(INITIAL_CONTACT_DETAILS));
        return INITIAL_CONTACT_DETAILS;
    }
    try {
        return JSON.parse(stored);
    } catch {
        return INITIAL_CONTACT_DETAILS;
    }
}

export function saveStoredContactDetails(details: ContactDetails): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kalki_dynamics_contact', JSON.stringify(details));
}

// --- TEAM MEMBERS ---
export function getStoredTeamMembers(): TeamMember[] {
    if (typeof window === 'undefined') return INITIAL_TEAM_MEMBERS;
    const stored = localStorage.getItem('kalki_dynamics_team');
    if (!stored) {
        localStorage.setItem('kalki_dynamics_team', JSON.stringify(INITIAL_TEAM_MEMBERS));
        return INITIAL_TEAM_MEMBERS;
    }
    try {
        return JSON.parse(stored);
    } catch {
        return INITIAL_TEAM_MEMBERS;
    }
}

export function saveStoredTeamMembers(team: TeamMember[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kalki_dynamics_team', JSON.stringify(team));
}

// --- FAQS ---
export function getStoredFAQs(): FAQ[] {
    if (typeof window === 'undefined') return INITIAL_FAQS;
    const stored = localStorage.getItem('kalki_dynamics_faqs');
    if (!stored) {
        localStorage.setItem('kalki_dynamics_faqs', JSON.stringify(INITIAL_FAQS));
        return INITIAL_FAQS;
    }
    try {
        return JSON.parse(stored);
    } catch {
        return INITIAL_FAQS;
    }
}

export function saveStoredFAQs(faqs: FAQ[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kalki_dynamics_faqs', JSON.stringify(faqs));
}

// --- HOMEPAGE CONTENT ---
export function getStoredHomepageContent(): HomepageContent {
    if (typeof window === 'undefined') return INITIAL_HOMEPAGE_CONTENT;
    const stored = localStorage.getItem('kalki_dynamics_homepage');
    if (!stored) {
        localStorage.setItem('kalki_dynamics_homepage', JSON.stringify(INITIAL_HOMEPAGE_CONTENT));
        return INITIAL_HOMEPAGE_CONTENT;
    }
    try {
        return JSON.parse(stored);
    } catch {
        return INITIAL_HOMEPAGE_CONTENT;
    }
}

export function saveStoredHomepageContent(content: HomepageContent): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kalki_dynamics_homepage', JSON.stringify(content));
}

// --- AUTHENTICATION ---
export function isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('kalki_admin_logged_in') === 'true';
}

export function setAdminAuthenticated(status: boolean): void {
    if (typeof window === 'undefined') return;
    if (status) {
        sessionStorage.setItem('kalki_admin_logged_in', 'true');
    } else {
        sessionStorage.removeItem('kalki_admin_logged_in');
    }
}
