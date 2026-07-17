export interface ProductSpec {
    name: string;
    value: string;
}

export interface Product {
    id: string;
    name: string;
    tagline: string;
    price: string;
    shortDesc: string;
    description: string;
    specs: ProductSpec[];
    applications: string[];
    components: string[];
    industrialAims: string[];
    category?: string;
    stock?: number;
    isFeatured?: boolean;
    isHidden?: boolean;
    imageUrl?: string;
    brochureUrl?: string;
    videoUrl?: string;
}

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    role: string;
    message: string;
    date: string;
    status: 'Unread' | 'Reviewed' | 'Archived';
}

export interface FounderInfo {
    name: string;
    role: string;
    description: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface ContactDetails {
    phone: string;
    email: string;
    website: string;
    address: string;
    googleMapsUrl: string;
    businessHours: string;
}

export interface HomepageContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    aboutTitle: string;
    aboutText: string;
    statUnits: number;
    statAllies: number;
    statAccuracy: number;
    statIntegrity: number;
    statCompiler: number;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export const INITIAL_PRODUCTS: Product[] = [
    {
        id: 'kalki-sentinel-x-lite',
        name: 'KALKI Sentinel X Lite',
        tagline: 'Edge Target Acquisition & Reconnaissance Unit',
        price: '₹14,999',
        shortDesc: 'Micro-tactical reconnaissance drone optimized for dense urban mapping and localized computer vision streaming.',
        description: 'The Sentinel X Lite is a man-portable autonomous scanning system equipped with onboard neural hardware. Designed for scouting missions, high-density optical surveillance, and thermal path mapping, it provides defense forces with dynamic real-time vision processing at the extreme tactical edge.',
        specs: [
            { name: 'AI Compute Matrix', value: '12 TOps Edge Tensor Core' },
            { name: 'Sensor Telemetry', value: '4K NightVision + Dual Band InfraRed' },
            { name: 'Operational Radius', value: '6.4 Kilometers Geo-Encrypted' },
            { name: 'Flight Duration', value: '55 Minutes Continuous Loiter' },
            { name: 'Weight Profile', value: '1.4 Kilograms Light Shell' },
        ],
        applications: [
            'Tactical scout deployment',
            'Urban search and identification metrics',
            'Remote pipeline network surveillance',
            'Border monitoring coordinates scanning'
        ],
        components: [
            'Graphenite structural wings',
            'Aero-carbon micro motors',
            'Dual optical optical cluster',
            'X-Lite Cryo Edge SOC chip'
        ],
        industrialAims: [
            'National Defense forces',
            'Private security sectors',
            'Disaster search teams'
        ],
        category: 'Robotics',
        stock: 45,
        isFeatured: true,
        isHidden: false
    },
    {
        id: 'kalki-sentinel-x-pro',
        name: 'KALKI Sentinel X Pro',
        tagline: 'Autonomous Perimeter Shield & Ground Rig',
        price: '₹24,999',
        shortDesc: 'Medium-weight perimeter defense robot with multi-spectral LIDAR array, acoustic localization, and dynamic threat response.',
        description: 'Setting a new benchmark for corporate security and defense logistics, the Sentinel X Pro is an autonomous ground unit loaded with micro-radars and sensory rigs. Powered by our core neural interface, it classifies threats within milliseconds and activates perimeter protocols without human latency.',
        specs: [
            { name: 'AI Compute Matrix', value: '64 TOps Dedicated Neural Processor' },
            { name: 'Sensor Telemetry', value: '3D LIDAR Hub + Sonic Acoustic Vectoring' },
            { name: 'Operational Radius', value: '15 Kilometers Central Node Sync' },
            { name: 'Operational Battery', value: '12 Hours Autonomous Patrol' },
            { name: 'Weight Profile', value: '38 Kilograms Reinforced Steel Chassis' },
        ],
        applications: [
            'Compound defense loops',
            'Automated threat suppression triggers',
            'Harsh climate monitoring arrays',
            'High-risk infrastructure security patrols'
        ],
        components: [
            'Reinforced graphene track plates',
            'All-terrain motor joints',
            'Pulsing LIDAR scanning array',
            'Neural Sentinel PRO computing rig'
        ],
        industrialAims: [
            'Deep Mining sites',
            'Naval asset hangars',
            'Government border points'
        ],
        category: 'Defense Technology',
        stock: 12,
        isFeatured: true,
        isHidden: false
    },
    {
        id: 'kalki-sentinel-x-enterprise',
        name: 'KALKI Sentinel X Enterprise',
        tagline: 'Global Counter-Swarm Command Array',
        price: '₹39,999+',
        shortDesc: 'Supreme multi-sector command grid combining drone swarms, satellite telemetry, and absolute tactical control.',
        description: 'The absolute pinnacle of KALKI technology. The Sentinel X Enterprise creates a virtual defensive canopy. Built for military and sovereign clients, it merges AI swarm intelligence, thermal satellite channels, and active counter-swarm defense mechanisms into a single holographic command deck.',
        specs: [
            { name: 'AI Compute Matrix', value: '1,024 TOps Cryogenic Liquid Subsystem' },
            { name: 'Sensor Telemetry', value: 'Satellite Quantum Telemetry + Active Radar Array' },
            { name: 'Operational Radius', value: 'Global Orthogonal Secure Mesh' },
            { name: 'Active Nodes Swarm', value: 'Up to 240 Autonomous Drones Sync' },
            { name: 'Deploy Time', value: 'Under 180 Seconds Rapid Boot' },
        ],
        applications: [
            'Sovereignty air-shield canopy',
            'Multi-domain command operations',
            'Instant counter-agent swarm launching',
            'Quantum encrypted tactical relays'
        ],
        components: [
            'Enterprise satellite relay antenna',
            'Holographic Command Deck projector',
            'Ultra-spectral scanning payload',
            'Kalki Cryo-Titanium processing core'
        ],
        industrialAims: [
            'National Sovereignty clusters',
            'Mega-city automated operations',
            'Oceanic asset defense grids'
        ],
        category: 'Defense Technology',
        stock: 5,
        isFeatured: true,
        isHidden: false
    }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
    {
        id: 'inq-1002',
        name: 'Director Marcus Vance',
        email: 'm.vance@defense.gov',
        role: 'Government Partner',
        message: 'Requesting specifications package for Sentinel X Enterprise counter-swarm canopy. Need payload options list.',
        date: '2026-07-10',
        status: 'Unread',
    }
];

export const INITIAL_FOUNDER_INFO: FounderInfo[] = [
    {
        name: 'Manas Sety(Kalki)',
        role: 'Founder & CEO',
        description: 'Visionary entrepreneur leading KALKI Dynamics in AI, Robotics, Smart Surveillance, and Future Technologies.'
    }
];

export const INITIAL_CONTACT_DETAILS: ContactDetails = {
    phone: '+91 80 5090 4210',
    email: 'operations@kalkidynamics.com',
    website: 'https://kalkidynamics.com',
    address: 'Level 8, Crimson Research Tower, Silicon Layout, Bengaluru, KA 560001, India',
    googleMapsUrl: '12.9716° N, 77.5946° E',
    businessHours: '09:00 — 18:00 IST | Monday — Friday'
};

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
    { id: '1', name: 'Dr. Kabir Malik', role: 'Head of Drone Swarms' },
    { id: '2', name: 'Commander Rohan Dev', role: 'Aerospace Integrations Director' },
    { id: '3', name: 'Srinivas Murthy', role: 'Lead Compiler Engineer' }
];

export const INITIAL_FAQS: FAQ[] = [
    { id: 'faq-1', question: 'Can this drone execute tactical patrols completely offline?', answer: 'Yes. The entire Sentinel X computing cluster operates locally. Models boot directly from onboard memory, removing vulnerability to satellite jamming and telemetry drops.' },
    { id: 'faq-2', question: 'What is the Bill of Materials payload compliance standard?', answer: 'All chassis wings, mounts, and computing housings are machined from carbon-reinforced graphene and titanium alloys, meeting MIL-STD-810H environmental guidelines.' },
    { id: 'faq-3', question: 'What fail-safes are integrated for drone swarm coordinate overrides?', answer: 'If a swarm connection is lost, individual sentinel units fallback to local optical recognition scanning loops and initiate an autonomous return-to-base protocol.' }
];

export const INITIAL_HOMEPAGE_CONTENT: HomepageContent = {
    heroTitle: 'KALKI DYNAMICS',
    heroSubtitle: 'POWERING THE NEXT ERA.',
    heroDescription: 'Architecting sovereign-grade artificial intelligence, cybernetic ground robotics, computer vision models, and autonomous counter-swarm layers for the next epoch of national security.',
    aboutTitle: 'WHO WE ARE',
    aboutText: 'KALKI Dynamics is a high-performance computer vision and defense hardware robotics manufacturer, setting the standard for offline Edge automation.',
    statUnits: 1420,
    statAllies: 48,
    statAccuracy: 99.92,
    statIntegrity: 99,
    statCompiler: 1620
};
