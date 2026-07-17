import { initializeApp, getApps, getApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if Firebase env credentials are present
export const isFirebaseEnabled = !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

let app: any;
let auth: any;
let db: any;

if (isFirebaseEnabled) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
}

// ----------------------------------------------------
// Mock System if Firebase Credentials are not present
// ----------------------------------------------------
export interface MockUser {
    email: string;
    displayName: string;
    photoURL?: string;
}

class MockAuthService {
    private listeners: ((user: MockUser | null) => void)[] = [];
    private currentUserObj: MockUser | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            initializeDefaultMockData();
            const stored = localStorage.getItem('kalki_mock_user');
            if (stored) {
                try {
                    this.currentUserObj = JSON.parse(stored);
                } catch {
                    this.currentUserObj = null;
                }
            }
        }
    }

    get currentUser(): MockUser | null {
        return this.currentUserObj;
    }

    onAuthStateChanged(callback: (user: MockUser | null) => void) {
        this.listeners.push(callback);
        // Call immediately with current state
        callback(this.currentUserObj);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    signInWithGoogleMock(email: string, name: string = 'Manas Sety') {
        const user: MockUser = {
            email,
            displayName: name,
            photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        };
        this.currentUserObj = user;
        localStorage.setItem('kalki_mock_user', JSON.stringify(user));
        this.listeners.forEach(l => l(user));
        return user;
    }

    signOut() {
        this.currentUserObj = null;
        localStorage.removeItem('kalki_mock_user');
        this.listeners.forEach(l => l(null));
        return Promise.resolve();
    }
}

export const mockAuth = new MockAuthService();

// Helper to check Auth
export function getCurrentUser(callback: (user: any | null) => void) {
    if (isFirebaseEnabled) {
        return onAuthStateChanged(auth, callback);
    } else {
        return mockAuth.onAuthStateChanged(callback);
    }
}

export async function loginWithGoogle() {
    if (isFirebaseEnabled) {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } else {
        // Fallback custom prompt in case env variables are not declared yet
        if (typeof window !== 'undefined') {
            const email = window.prompt("Enter Google Account Email for Simulation (Authorized: setymanas4@gmail.com):", "setymanas4@gmail.com");
            if (email) {
                return mockAuth.signInWithGoogleMock(email.trim());
            }
        }
        throw new Error('Google Sign-In canceled or simulated failed.');
    }
}

export async function logoutUser() {
    if (isFirebaseEnabled) {
        await signOut(auth);
    } else {
        await mockAuth.signOut();
    }
}

// ----------------------------------------------------
// Firestore Collections Helper with LocalStorage Fallback
// ----------------------------------------------------
export async function getCollectionData(collectionName: string): Promise<any[]> {
    if (isFirebaseEnabled) {
        try {
            const q = query(collection(db, collectionName));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {
            console.error(`Firebase error getting collection ${collectionName}, falling back...`, e);
        }
    }
    // Fallback to local storage matching Firestore collections
    if (typeof window === 'undefined') return [];
    const localData = localStorage.getItem(`kalki_firestore_${collectionName}`);
    if (localData) {
        try {
            return JSON.parse(localData);
        } catch {
            return [];
        }
    }
    return [];
}

export async function setDocument(collectionName: string, docId: string, data: any): Promise<void> {
    if (isFirebaseEnabled) {
        try {
            await setDoc(doc(db, collectionName, docId), data, { merge: true });
            return;
        } catch (e) {
            console.error(`Firebase error writing document in ${collectionName}/${docId}:`, e);
        }
    }
    if (typeof window !== 'undefined') {
        const items = await getCollectionData(collectionName);
        const idx = items.findIndex(item => item.id === docId);
        const updatedItem = { ...data, id: docId };
        if (idx >= 0) {
            items[idx] = updatedItem;
        } else {
            items.push(updatedItem);
        }
        localStorage.setItem(`kalki_firestore_${collectionName}`, JSON.stringify(items));
    }
}

export async function addDocument(collectionName: string, data: any): Promise<string> {
    if (isFirebaseEnabled) {
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: new Date().toISOString()
            });
            return docRef.id;
        } catch (e) {
            console.error(`Firebase error adding document to ${collectionName}:`, e);
        }
    }
    const docId = 'doc_' + Math.random().toString(36).substr(2, 9);
    if (typeof window !== 'undefined') {
        const items = await getCollectionData(collectionName);
        items.push({
            ...data,
            id: docId,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem(`kalki_firestore_${collectionName}`, JSON.stringify(items));
    }
    return docId;
}

export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
    if (isFirebaseEnabled) {
        try {
            await deleteDoc(doc(db, collectionName, docId));
            return;
        } catch (e) {
            console.error(`Firebase error deleting document ${collectionName}/${docId}:`, e);
        }
    }
    if (typeof window !== 'undefined') {
        const items = await getCollectionData(collectionName);
        const filtered = items.filter(item => item.id !== docId);
        localStorage.setItem(`kalki_firestore_${collectionName}`, JSON.stringify(filtered));
    }
}

// Storage Simulated/Real helper
// Firestore does not require separate media storage if we store base64 or paths, but for full compatibility:
export async function uploadFileToStorage(file: File, folderName: string): Promise<string> {
    // If real firebase storage is config, we can implement uploadBytes + getDownloadURL, but mock as DataURL or fallback object storage
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string); // base64 string works perfectly as simulated URL in browser!
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function initializeDefaultMockData() {
    if (typeof window === 'undefined') return;

    // 1. Settings
    if (!localStorage.getItem('kalki_firestore_settings')) {
        const defaultSettings = [
            {
                id: 'global',
                companyName: 'KALKI Dynamics',
                logo: '',
                phone: '+91 80 5090 4210',
                email: 'operations@kalkidynamics.com',
                website: 'https://kalkidynamics.com',
                address: 'Level 8, Crimson Research Tower, Silicon Layout, Bengaluru, KA 560001, India',
                googleMapsUrl: '12.9716° N, 77.5946° E',
                socialLinks: { facebook: 'https://facebook.com', twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', github: 'https://github.com' },
                footer: 'Copyright © 2026 KALKI Dynamics. All rights reserved.',
                theme: 'dark',
                seo: { metaTitle: 'KALKI Dynamics - Powering the Next Era', metaDescription: 'Computer vision and defense hardware robotics automation.' }
            }
        ];
        localStorage.setItem('kalki_firestore_settings', JSON.stringify(defaultSettings));
    }

    // 2. Products
    if (!localStorage.getItem('kalki_firestore_products')) {
        const defaultProducts = [
            {
                id: 'prod_1',
                name: 'Kalki Sentinel X',
                shortDescription: 'Advanced Edge AI tactical smart surveillance platform.',
                description: 'Kalki Sentinel is a next-generation AI security nodes deployment. Featuring military-grade computer vision chips running target detection locally on high-capacity solar setups.',
                features: 'Edge AI Detection, solar-powered grid, PTZ auto-vector tracking, thermal optic modes',
                specifications: 'SOC: Kalki-1 Core, Battery: 200Wh Solar LiFePO4, Camera: 4K 60FPS Low-Light',
                category: 'Surveillance Hardware',
                price: 185000,
                stock: 12,
                status: 'published',
                featured: true,
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
                brochureUrl: '',
                videoUrl: '',
                seoTitle: 'Kalki Sentinel - Edge Security Platform',
                seoDescription: 'High-performance AI security node for sovereign border and tactical enclosure monitoring.'
            },
            {
                id: 'prod_2',
                name: 'Smart Safety Locket',
                shortDescription: 'Biometric integration wearable monitoring and emergency beacon.',
                description: 'Integrated directly into the Raksha AI network. This discrete wearable monitors acceleration, heart-rate delta, and voice distress signatures to trigger coordinate broadcasts.',
                features: 'Voice stress trigger, low power RF mesh, haptic responses',
                specifications: 'Battery: 7 days active, Weight: 12 grams, Radios: LoRa/BLE/GPS',
                category: 'Tactical Wearables',
                price: 4999,
                stock: 110,
                status: 'published',
                featured: true,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
                brochureUrl: '',
                videoUrl: '',
                seoTitle: 'Smart Safety Locket - Raksha Wearables',
                seoDescription: 'Smart safety emergency response wearable linked with active response arrays.'
            }
        ];
        localStorage.setItem('kalki_firestore_products', JSON.stringify(defaultProducts));
    }

    // 3. Orders
    if (!localStorage.getItem('kalki_firestore_orders')) {
        const defaultOrders = [
            {
                id: 'ORD-7811',
                customer: 'John Doe',
                phone: '+1 650 555 0122',
                email: 'john@defense.gov',
                product: 'Kalki Sentinel X',
                quantity: 2,
                amount: 370000,
                paymentMethod: 'Wire Transfer',
                orderStatus: 'Processing',
                date: '2026-07-10'
            },
            {
                id: 'ORD-2994',
                customer: 'Sarah Connor',
                phone: '+1 415 555 9011',
                email: 'sarah@cyberdyne.io',
                product: 'Smart Safety Locket',
                quantity: 5,
                amount: 24995,
                paymentMethod: 'Credit Card',
                orderStatus: 'Completed',
                date: '2026-07-12'
            },
            {
                id: 'ORD-9022',
                customer: 'Aarav Sharma',
                phone: '+91 98888 77777',
                email: 'aarav@techbangalore.in',
                product: 'Kalki Sentinel X',
                quantity: 1,
                amount: 185000,
                paymentMethod: 'UPI',
                orderStatus: 'Shipped',
                date: '2026-07-15'
            }
        ];
        localStorage.setItem('kalki_firestore_orders', JSON.stringify(defaultOrders));
    }

    // 4. Customers
    if (!localStorage.getItem('kalki_firestore_customers')) {
        const defaultCustomers = [
            {
                id: 'cust_1',
                name: 'John Doe',
                email: 'john@defense.gov',
                phone: '+1 650 555 0122',
                dateJoined: '2026-06-01',
                ordersCount: 1,
                totalSpent: 370000,
                activity: [
                    { date: '2026-07-10 10:30', description: 'Placed order ORD-7811' },
                    { date: '2026-07-10 10:15', description: 'Added Kalki Sentinel X to purchase inquiry' }
                ]
            },
            {
                id: 'cust_2',
                name: 'Sarah Connor',
                email: 'sarah@cyberdyne.io',
                phone: '+1 415 555 9011',
                dateJoined: '2026-07-02',
                ordersCount: 1,
                totalSpent: 24995,
                activity: [
                    { date: '2026-07-12 14:22', description: 'Order ORD-2994 completed successfully' },
                    { date: '2026-07-12 14:10', description: 'Authenticated via Google OpenID' }
                ]
            },
            {
                id: 'cust_3',
                name: 'Aarav Sharma',
                email: 'aarav@techbangalore.in',
                phone: '+91 98888 77777',
                dateJoined: '2026-07-14',
                ordersCount: 1,
                totalSpent: 185000,
                activity: [
                    { date: '2026-07-15 09:44', description: 'Placed order ORD-9022' }
                ]
            }
        ];
        localStorage.setItem('kalki_firestore_customers', JSON.stringify(defaultCustomers));
    }

    // 5. Messages
    if (!localStorage.getItem('kalki_firestore_messages')) {
        const defaultMessages = [
            {
                id: 'msg_1',
                name: 'Marcus Vance',
                email: 'm.vance@defense.gov',
                phone: '+1 650 555 0122',
                message: 'Requesting schematic specs for the Sentinel X Lite drone and hardware pricing tier arrays.',
                date: '2026-07-14 11:20',
                role: 'Sovereign Partner (Distributor)',
                status: 'Unread'
            },
            {
                id: 'msg_2',
                name: 'Dr. Sarah Lin',
                email: 's.lin@cognitive.edu',
                phone: '+91 80 4433 2211',
                message: 'Interested in collaborative academic options regarding edge neuromorphic custom SoC instruction sets.',
                date: '2026-07-15 16:30',
                role: 'Academic Collaboration Partner',
                status: 'Read'
            }
        ];
        localStorage.setItem('kalki_firestore_messages', JSON.stringify(defaultMessages));
    }

    // 6. Analytics
    if (!localStorage.getItem('kalki_firestore_analytics')) {
        const defaultAnalytics = [
            {
                id: 'summary',
                totalOrders: 3,
                revenue: 579995,
                visitors: 1845,
                products: 2,
                customers: 3,
                salesLog: [
                    { date: '2026-07-11', value: 0 },
                    { date: '2026-07-12', value: 24995 },
                    { date: '2026-07-13', value: 24995 },
                    { date: '2026-07-14', value: 24995 },
                    { date: '2026-07-15', value: 209995 }
                ],
                trafficSources: [
                    { source: 'Sovereign Networks', percentage: 45 },
                    { source: 'Organic search', percentage: 30 },
                    { source: 'Direct secure link', percentage: 25 }
                ],
                visitorChart: [
                    { date: '2026-07-11', count: 180 },
                    { date: '2026-07-12', count: 320 },
                    { date: '2026-07-13', count: 210 },
                    { date: '2026-07-14', count: 480 },
                    { date: '2026-07-15', count: 655 }
                ]
            }
        ];
        localStorage.setItem('kalki_firestore_analytics', JSON.stringify(defaultAnalytics));
    }
}
