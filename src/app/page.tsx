'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, ShieldAlert, Cpu, Eye, Anchor, HardDrive,
  Radio, Cloud, Shield, Lightbulb, Compass, Award,
  Activity, Zap, Target, Database, Layers
} from 'lucide-react';
import ThreeDView from '@/components/ThreeDView';
import { getStoredProducts, getStoredHomepageContent } from '@/utils/storage';
import { Product, HomepageContent } from '@/data/products';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stats Section Ref for in-view counter activation
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Custom ticking numbers
  const [deployments, setDeployments] = useState(0);
  const [countries, setCountries] = useState(0);
  const [accuracy, setAccuracy] = useState(90.0);
  const [satisfaction, setSatisfaction] = useState(92);
  const [speed, setSpeed] = useState(200);

  useEffect(() => {
    // Read local/live products list
    setProducts(getStoredProducts().filter(p => !p.isHidden).slice(0, 3));
    setHomepage(getStoredHomepageContent());
  }, []);

  // Animate counter stats
  useEffect(() => {
    if (statsInView && homepage) {
      // Animate counting numbers
      const duration = 2000;
      const steps = 50;
      const stepTime = duration / steps;
      let stepCount = 0;

      const targetUnits = homepage.statUnits;
      const targetAllies = homepage.statAllies;
      const targetAccuracy = homepage.statAccuracy;
      const targetSatisfaction = homepage.statIntegrity;
      const targetSpeed = homepage.statCompiler;

      const timer = setInterval(() => {
        stepCount++;
        setDeployments(Math.floor((targetUnits / steps) * stepCount));
        setCountries(Math.floor((targetAllies / steps) * stepCount));
        setAccuracy(parseFloat((targetAccuracy - 10 + (10 / steps) * stepCount).toFixed(2)));
        setSatisfaction(Math.floor((targetSatisfaction - 8 + (8 / steps) * stepCount)));
        setSpeed(Math.floor((200 + ((targetSpeed - 200) / steps) * stepCount)));

        if (stepCount >= steps) {
          setDeployments(targetUnits);
          setCountries(targetAllies);
          setAccuracy(targetAccuracy);
          setSatisfaction(targetSatisfaction);
          setSpeed(targetSpeed);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [statsInView, homepage]);

  // Handle scroll trigger parallax for hero elements
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <div ref={containerRef} className="w-full bg-[#000000] relative">

      {/* SECTION 1: HERO CONTAINER */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden custom-grid">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center relative z-10 py-12"
        >
          {/* Telemetry coordinate HUD (Left) */}
          <div className="hidden xl:flex flex-col gap-6 absolute left-6 top-1/4 font-mono text-[9px] text-[#444] tracking-widest pointer-events-none">
            <div>
              [ ORBITAL POSITION ]<br />
              LAT: 35.6762° N | LON: 139.6503° E<br />
              ALT: 520KM GRID_SCAN
            </div>
            <div>
              [ EDGE SYSTEMS ]<br />
              NODES ONLINE: 8,421<br />
              PING TIME: 4.8MS [ACTIVE]
            </div>
            <div className="flex items-center gap-1 text-[#ea0614] pulse-red rounded-full px-2 py-0.5 border border-[#ea0614]/30 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea0614] duration-75 animate-ping" />
              SECURE BEACON UP
            </div>
          </div>

          {/* Center Info Panel (Left-Center Grid) */}
          <div className="lg:col-span-6 xl:pl-36 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-[1px] w-8 bg-[#ea0614]" />
              <span className="font-mono text-xs text-[#ea0614] font-bold tracking-[0.4em] uppercase">
                SECURE ACCESS GRANTED
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 font-orbitron text-white leading-tight uppercase"
              style={{ viewTransitionName: 'hero-title' } as React.CSSProperties}
            >
              {homepage?.heroTitle ? (
                <>
                  {homepage.heroTitle.split(' ')[0]} <span className="text-radial-glow">{homepage.heroTitle.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <>
                  KALKI <span className="text-radial-glow">DYNAMICS</span>
                </>
              )}
              <span className="block text-[#ea0614] text-xl sm:text-2xl mt-3 tracking-[0.5em] font-mono font-medium">
                {homepage?.heroSubtitle || 'POWERING THE NEXT ERA.'}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base text-[#c0c0c0] mb-8 max-w-lg leading-relaxed font-light"
            >
              {homepage?.heroDescription || 'Architecting sovereign-grade artificial intelligence, cybernetic ground robotics, computer vision models, and autonomous counter-swarm layers for the next epoch of national security.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/services"
                className="px-8 py-3.5 bg-[#ea0614] hover:bg-[#ff0015] text-white text-xs font-mono font-bold tracking-[0.2em] rounded-sm transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(234,6,20,0.3)] hover:shadow-[0_0_30px_rgba(234,6,20,0.5)] cursor-target"
              >
                EXPLORE SERVICES
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-transparent border border-white/10 hover:border-[#ea0614] hover:bg-[#ea0614]/5 text-[#c0c0c0] hover:text-white text-xs font-mono font-bold tracking-[0.2em] rounded-sm transition-all cursor-target"
              >
                BECOME PARTNER
              </Link>
            </motion.div>
          </div>

          {/* R3F Interactive Model Panel (Right Grid) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="lg:col-span-6 w-full h-[400px] lg:h-[550px] relative border border-[#ea0614]/10 rounded-sm bg-[#121212]/30 backdrop-blur-xl flex items-center justify-center p-2"
          >
            {/* Corner Bracket Graphics */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ea0614]/30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ea0614]/30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ea0614]/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ea0614]/30" />

            <ThreeDView />
          </motion.div>
        </motion.div>

        {/* Diagonal glowing separator */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-right from-transparent via-[#ea0614]/20 to-transparent" />
      </section>

      {/* SECTION 2: WHO WE ARE (Timeline Timeline) */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-b border-[#ea0614]/10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#ea0614] tracking-[0.4em] font-bold uppercase mb-2 block">
            PHILOSOPHY & TIMELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase font-orbitron text-white">
            WHO WE ARE
          </h2>
          <div className="w-16 h-[2px] bg-[#ea0614] mx-auto mt-4" />
        </div>

        {/* Timeline block */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { id: '01', title: 'VISION', quote: 'Absolute Autonomy', desc: 'Engineering reliable edge compute hardware to protect sovereign borders without human latencies or connection drops.' },
            { id: '02', title: 'MISSION', quote: 'Sovereign Integration', desc: 'Empowering friendly coalition forces with microcomputers capable of advanced spatial threat calculations and acoustic sensing.' },
            { id: '03', title: 'INNOVATION', quote: 'Intelligent Silicon', desc: 'Deploying neural processors directly into field machinery for isolated operations, eliminating reliance on vulnerable satellites.' },
            { id: '04', title: 'ENGINEERING', quote: 'Sovereign Integrity', desc: 'Each sentinel shell is certified for operation in extreme temperatures ranging from -40°C arctic fronts to 85°C desert sands.' },
            { id: '05', title: 'FUTURE', quote: 'Cognitive Swarms', desc: 'Linking drone forces through dynamic swarm matrices, allowing coordinate relays and coverage adjustments on-the-fly.' },
          ].map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-node p-8 rounded-sm hover:border-[#ea0614]/40 flex flex-col justify-between min-h-[300px] transition-all duration-300 relative group glow-border"
            >
              {/* Card numbers */}
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-3xl font-extrabold text-[#ea0614]/20 group-hover:text-[#ea0614] transition-colors duration-500">
                  {step.id}
                </span>
                <span className="text-[9px] font-mono text-[#555] tracking-widest uppercase">
                  MODULE_LOCK
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-mono tracking-wider text-white mb-2 uppercase group-hover:text-[#ea0614] transition-colors">
                  {step.title}
                </h3>
                <h4 className="text-[10px] font-mono text-[#ea0614] tracking-widest mb-4 uppercase">
                  // {step.quote}
                </h4>
                <p className="text-xs text-[#88888b] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TECHNOLOGIES (Interactive grid) */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-b border-[#ea0614]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 text-left">
            <span className="font-mono text-xs text-[#ea0614] tracking-[0.4em] font-bold uppercase mb-2 block animate-pulse">
              CORE DOMAINS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase font-orbitron text-white leading-tight">
              ONBOARD CYBERNETICS
            </h2>
            <div className="w-16 h-[2px] bg-[#ea0614] my-4" />
            <p className="text-xs text-[#88888b] leading-relaxed max-w-md">
              KALKI Dynamics builds custom silicon, high-frame-rate sensors, and hardware matrices for real-time edge awareness. Browse our integrated disciplines.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-wrap gap-3 justify-end text-xs font-mono">
            <span className="px-4 py-2 border border-white/5 bg-[#121212] text-white">#INTELLIGENCE</span>
            <span className="px-4 py-2 border border-white/5 bg-[#121212] text-white">#COGNITION</span>
            <span className="px-4 py-2 border border-white/5 bg-[#121212] text-[#ea0614] font-bold">#AUTONOMY</span>
            <span className="px-4 py-2 border border-white/5 bg-[#121212] text-white">#TACTICAL_LITE</span>
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Cpu, name: 'Artificial Intelligence', desc: 'Embedding neural compiler acceleration cores directly into processing chips. Operates offline without external cloud dependencies.' },
            { icon: Eye, name: 'Computer Vision', desc: 'Dynamic focal identification. Classifies threat assets, coordinates path trajectories, and maps terrain under visual interference.' },
            { icon: Anchor, name: 'Tactical Robotics', desc: 'Carbon-reinforced frames. Micro joint mechanisms engineered to operate in environments with electromagnetic interference.' },
            { icon: HardDrive, name: 'Edge AI Systems', desc: 'Direct-to-drive sensory data ingestion. Processes telemetry grids locally within milliseconds for instant perimeter control.' },
            { icon: Radio, name: 'Holographic Comms', desc: 'Secure mesh networking. Shares spatial coords across defense nodes to coordinate swarm canopy shielding.' },
            { icon: Shield, name: 'Defense Technology', desc: 'Sovereign command networks. Real-time tactical integration dashboards secure assets against drone threats.' },
          ].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-node p-8 rounded-sm border border-white/5 hover:border-[#ea0614]/40 flex gap-6 hover:translate-y-[-4px] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-sm bg-[#ea0614]/10 border border-[#ea0614]/25 flex items-center justify-center text-[#ea0614] flex-shrink-0 group-hover:bg-[#ea0614] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide mb-2 uppercase group-hover:text-[#ea0614] transition-colors font-mono">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-[#88888b] leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: ACTIVE PROJECTS SHOWCASE */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-b border-[#ea0614]/10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#ea0614] tracking-[0.4em] font-bold uppercase mb-2 block">
            LABORATORY STATUS OVERVIEW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase font-orbitron text-white">
            ACTIVE SYSTEMS & PRODUCTS
          </h2>
          <div className="w-16 h-[2px] bg-[#ea0614] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              id: 'raksha-ai',
              name: 'Raksha AI',
              tagline: 'Sovereign Surveillance warning Mesh',
              description: 'An independent emergency response surveillance network using low-latency optical vision compilers and warning triggers.',
              image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
              techStack: ['Python Core Model', 'YOLO Object-Detect', 'Neural API'],
              status: 'ACTIVE FIELD STAGE'
            },
            {
              id: 'skillora',
              name: 'Skillora',
              tagline: 'Decentralized Cognitive Allocation',
              description: 'Deep tech automation framework mapping and routing operational tasks and mechanical logs to edge computing hubs.',
              image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
              techStack: ['React Native', 'FastAPI Relays', 'MongoDB cluster'],
              status: 'STABLE INTERNAL DEPLOY'
            },
            {
              id: 'cura-ai',
              name: 'Cura AI',
              tagline: 'Clinical Telemetry Diagnostics Platform',
              description: 'A dynamic, high-integrity medical tracking suite designed for local device performance mapping and remote triage diagnostics compiling.',
              image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
              techStack: ['Expo Sensors', 'NextJS Frontend', 'WebRTC Video'],
              status: 'BETA INTEGRATION V2'
            }
          ].map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-node relative rounded-sm border border-white/5 p-8 flex flex-col justify-between hover:border-[#ea0614]/40 transition-all duration-300 group"
              style={{ viewTransitionName: `project-card-${proj.id}` } as React.CSSProperties}
            >
              {/* Indicator */}
              <div className="absolute top-4 right-4 font-mono text-[8px] text-[#444] tracking-widest">
                // SYSTEM_NODE_0{idx + 1}
              </div>

              <div>
                {/* Visual placeholder box */}
                <div
                  className="w-full h-48 mb-6 relative rounded-sm border border-white/5 overflow-hidden flex items-center justify-center bg-[#0a0a0a]"
                >
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 filter brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Glowing sensor dot */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 font-mono text-[8px] text-[#ea0614]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea0614] pulse-red" />
                    {proj.status}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-orbitron text-white mb-1 uppercase group-hover:text-[#ea0614] transition-colors">
                  {proj.name}
                </h3>
                <span className="text-[#ea0614] font-mono text-[9px] tracking-[0.25em] font-semibold uppercase block mb-4">
                  {proj.tagline}
                </span>

                <p className="text-xs text-[#88888b] leading-relaxed mb-6 font-light">
                  {proj.description}
                </p>

                {/* Tech pills */}
                <div className="border-t border-white/5 pt-4 mb-6 flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-[#121212] border border-white/5 font-mono text-[8px] text-zinc-400 rounded-sm tracking-wide lowercase"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/projects"
                  className="w-full text-center py-3 bg-[#ea0614]/10 hover:bg-[#ea0614] text-white text-[10px] font-mono font-bold tracking-[0.2em] rounded-sm transition-all border border-[#ea0614]/30"
                >
                  VIEW BLUEPRINTS
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE KALKI (Statistics Section) */}
      <section
        ref={statsRef}
        className="py-24 bg-[#0a0a0a] relative z-10 border-b border-[#ea0614]/10 scanline"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-center">

          <div className="flex flex-col items-center justify-center p-6 border border-white/5 bg-black/40 rounded-sm">
            <Activity className="w-7 h-7 text-[#ea0614] mb-3" />
            <span className="text-4xl font-extrabold font-orbitron text-white mb-2">
              {deployments}+
            </span>
            <span className="font-mono text-[10px] text-[#c0c0c0] tracking-[0.35em] uppercase">
              TACTICAL UNITS
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-6 border border-white/5 bg-black/40 rounded-sm">
            <Shield className="w-7 h-7 text-[#ea0614] mb-3" />
            <span className="text-4xl font-extrabold font-orbitron text-white mb-2">
              {countries}
            </span>
            <span className="font-mono text-[10px] text-[#c0c0c0] tracking-[0.35em] uppercase">
              COALITION ALLIES
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-6 border border-white/5 bg-black/40 rounded-sm">
            <Target className="w-7 h-7 text-[#ea0614] mb-3" />
            <span className="text-4xl font-extrabold font-orbitron text-white mb-2">
              {accuracy}%
            </span>
            <span className="font-mono text-[10px] text-[#c0c0c0] tracking-[0.35em] uppercase">
              CLASSIFICATION ACCURACY
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-6 border border-white/5 bg-black/40 rounded-sm">
            <Layers className="w-7 h-7 text-[#ea0614] mb-3" />
            <span className="text-4xl font-extrabold font-orbitron text-white mb-2">
              {satisfaction}%
            </span>
            <span className="font-mono text-[10px] text-[#c0c0c0] tracking-[0.35em] uppercase">
              MISSION INTEGRITY
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-6 border border-white/5 bg-black/40 rounded-sm">
            <Zap className="w-7 h-7 text-[#ea0614] mb-3" />
            <span className="text-4xl font-extrabold font-orbitron text-white mb-2">
              {speed} FPS
            </span>
            <span className="font-mono text-[10px] text-[#c0c0c0] tracking-[0.35em] uppercase">
              VISION COMPILER FRAME
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 6: FUTURE VISION */}
      <section className="py-32 max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        {/* Holographic earth design wrapper */}
        <div className="relative max-w-3xl w-full p-8 flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-[#ea0614]/5 rounded-full filter blur-[80px] translate-x-[-50%] translate-y-[-50%] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-16 h-16 rounded-full border border-[#ea0614]/40 flex items-center justify-center mb-8 bg-[#0a0a0a]"
          >
            <Radio className="w-6 h-6 text-[#ea0614] animate-pulse" />
          </motion.div>

          <span className="font-mono text-xs text-[#ea0614] tracking-[0.4em] font-bold uppercase mb-4 block">
            ESTABLISHING ORBITAL DENSITY canopy
          </span>

          <blockquote className="text-xl sm:text-3xl font-extralight tracking-wide leading-relaxed text-white mb-10 font-outfit">
            "To secure sovereign frontiers, autonomous systems must run offline, encrypt locally, and compute in milliseconds. KALKI Dynamics guarantees this canopy."
          </blockquote>

          <p className="text-[10px] font-mono text-[#555] tracking-[0.3em] uppercase">
            — BOARD OF DIRECTORS, KALKI DYNAMICS DEFENSE DIVISION
          </p>

          <div className="h-[50px] w-[1px] bg-gradient-to-bottom from-[#ea0614] to-transparent my-10" />

          {/* Gateway buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#ea0614] hover:bg-[#ff0015] text-white text-xs font-mono font-bold tracking-[0.2em] rounded-sm transition-all"
            >
              COMMENCE CONSOLE ACCESS
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 bg-transparent border border-white/10 hover:border-white text-white text-xs font-mono font-bold tracking-[0.2em] rounded-sm transition-all"
            >
              READ CORPORATE CHARTER
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
