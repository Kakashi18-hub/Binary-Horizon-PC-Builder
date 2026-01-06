'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import PartCard from '@/components/PartCard';
import ComparisonModal from '@/components/ComparisonModal';
import { IPart } from '@/models';
import { Search, SlidersHorizontal, ChevronDown, SortAsc, SortDesc, Filter, X, ArrowUpRight, Cpu, HardDrive, Square, Activity, Zap, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TYPES = [
    { id: 'cpu', label: 'Processor', icon: <Cpu size={14} /> },
    { id: 'gpu', label: 'Graphics', icon: <Activity size={14} /> },
    { id: 'motherboard', label: 'Circuit', icon: <Square size={14} /> },
    { id: 'ram', label: 'Memory', icon: <Layers size={14} /> },
    { id: 'storage', label: 'Storage', icon: <HardDrive size={14} /> },
    { id: 'psu', label: 'Power', icon: <Zap size={14} /> },
    { id: 'case', label: 'Chassis', icon: <Square size={14} /> },
];

export default function PartsPage() {
    const [parts, setParts] = useState<IPart[]>([]);
    const [filter, setFilter] = useState('cpu');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
    const [comparisonPart, setComparisonPart] = useState<IPart | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

    useEffect(() => {
        async function fetchParts() {
            try {
                const res = await fetch(`/api/parts/${filter}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setParts(data);
                    // Handle price range resetting or updating
                    if (data.length > 0) {
                        const maxVal = Math.max(...data.map((p: IPart) => p.price));
                        setPriceRange({ min: 0, max: maxVal });
                    }
                }
            } catch (err) {
                console.error("Failed to fetch parts:", err);
            }
        }
        fetchParts();
        setSelectedBrands(new Set()); // Reset brands when category changes
        setSearchQuery(''); // Reset search when category changes to prevent "no results" confusion
    }, [filter]);

    const brands = useMemo(() => {
        const b = new Set<string>();
        parts.forEach(p => b.add(p.brand));
        return Array.from(b).sort();
    }, [parts]);

    const filteredAndSortedParts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        let result = parts.filter(part => {
            const matchesSearch = query === '' ||
                part.name.toLowerCase().includes(query) ||
                part.brand.toLowerCase().includes(query) ||
                (part.specs && Object.values(part.specs).some(val =>
                    String(val).toLowerCase().includes(query)
                ));
            const matchesBrand = selectedBrands.size === 0 || selectedBrands.has(part.brand);
            const matchesPrice = part.price >= priceRange.min && part.price <= priceRange.max;
            return matchesSearch && matchesBrand && matchesPrice;
        });

        result.sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return 0;
        });

        return result;
    }, [parts, searchQuery, sortBy, selectedBrands, priceRange]);

    const toggleBrand = (brand: string) => {
        const newBrands = new Set(selectedBrands);
        if (newBrands.has(brand)) newBrands.delete(brand);
        else newBrands.add(brand);
        setSelectedBrands(newBrands);
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-sans pb-24 selection:bg-black selection:text-white transition-colors duration-500">
            {/* Header / Navigation Overlay */}
            <header className="bg-card/80 backdrop-blur-xl border-b border-card sticky top-0 z-50 w-full flex justify-center transition-colors duration-500">
                <nav className="max-w-7xl w-full px-6 md:px-12 py-5 md:py-6 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="w-12 h-12 relative overflow-hidden rounded-xl bg-black flex items-center justify-center">
                                <img src="/Binary-Horizon.png" alt="Binary Horizon" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">Binary Horizon</h1>
                                <p className="text-[9px] font-bold text-neutral-400 tracking-widest uppercase mt-0.5">Hardware Index // India</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest">
                        <Link href="/" className="text-neutral-400 hover:text-foreground transition-colors">Builder</Link>
                        <Link href="/parts" className="text-foreground border-b-2 border-foreground pb-1">Database</Link>
                        <Link href="/checkout" className="text-neutral-400 hover:text-foreground transition-colors">Checkout</Link>
                        <Link href="/about" className="text-neutral-400 hover:text-foreground transition-colors">About</Link>
                    </div>
                </nav>
            </header>

            {/* Hero / Discovery Title */}
            <section className="pt-16 md:pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Inventory Explorer</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85]">
                            Discover the<br />Platform Index.
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-3 max-w-sm">
                        <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest text-left md:text-right leading-relaxed">
                            A high-fidelity index of current hardware performance, indexed from major regional retailers.
                        </p>
                    </div>
                </div>

                {/* Modern Context Controls */}
                <div className="space-y-8">
                    {/* Category Selector */}
                    <div className="flex flex-wrap gap-3">
                        {TYPES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setFilter(t.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${filter === t.id
                                    ? 'bg-foreground text-background border-foreground shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] scale-105'
                                    : 'bg-card border-neutral-300 text-neutral-700 hover:border-foreground hover:text-foreground'
                                    }`}
                            >
                                {t.icon}
                                {t.label}s
                            </button>
                        ))}
                    </div>

                    {/* Search & Sort Bar */}
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full group">
                            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-foreground transition-colors" />
                            <input
                                type="text"
                                placeholder={`Search through index of ${filter.toUpperCase()} modules...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-14 py-5 bg-card border border-card rounded-[30px] text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-foreground focus:shadow-xl transition-all placeholder:text-neutral-600 text-foreground"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-50 rounded-full transition-colors"
                                >
                                    <X size={14} className="text-neutral-400" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 px-8 py-5 rounded-[30px] border text-[10px] font-black uppercase tracking-widest transition-all ${isFilterOpen ? 'bg-foreground text-background border-foreground' : 'bg-card border-card text-neutral-500 hover:border-foreground hover:text-foreground'}`}
                            >
                                <SlidersHorizontal size={14} />
                                {selectedBrands.size > 0 ? `Filters (${selectedBrands.size})` : 'Filters'}
                            </button>

                            <div className="relative group flex-1 lg:flex-none">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="w-full lg:w-auto appearance-none pl-8 pr-14 py-5 bg-card border border-card rounded-[30px] text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-foreground focus:shadow-xl transition-all cursor-pointer text-foreground"
                                >
                                    <option value="price-asc">Price Ascending</option>
                                    <option value="price-desc">Price Descending</option>
                                    <option value="name">Alphabetical</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                                {sortBy.includes('price') ? (
                                    sortBy === 'price-asc' ? <SortAsc size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" /> : <SortDesc size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Expandable Filter Panel */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-10 bg-neutral-50 rounded-[40px] border border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2 text-black">
                                            <Filter size={12} />
                                            Brand Aggregation
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {brands.map(brand => (
                                                <button
                                                    key={brand}
                                                    onClick={() => toggleBrand(brand)}
                                                    className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-tighter border transition-all ${selectedBrands.has(brand) ? 'bg-black text-white border-black' : 'bg-white border-neutral-100 text-neutral-400 hover:border-black hover:text-black'}`}
                                                >
                                                    {brand}
                                                </button>
                                            ))}
                                            {selectedBrands.size > 0 && (
                                                <button
                                                    onClick={() => setSelectedBrands(new Set())}
                                                    className="px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-tighter text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    Reset Brands
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2 text-black">
                                            <Zap size={12} />
                                            Economics / Price Range
                                        </h4>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 space-y-2">
                                                <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest pl-2">Minimum</p>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={priceRange.min}
                                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                                    className="w-full px-5 py-3 bg-white border border-neutral-100 rounded-xl text-[10px] font-mono font-black focus:border-black focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div className="w-4 h-px bg-neutral-200 mt-6" />
                                            <div className="flex-1 space-y-2">
                                                <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest pl-2">Maximum</p>
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={priceRange.max}
                                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                                    className="w-full px-5 py-3 bg-white border border-neutral-100 rounded-xl text-[10px] font-mono font-black focus:border-black focus:outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Grid Header / Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-16 mb-12">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-800">
                            Displaying <span className="text-foreground underline underline-offset-4 decoration-2">{filteredAndSortedParts.length}</span> Indexed Modules
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Region: India</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Currency: INR</span>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredAndSortedParts.length > 0 ? (
                            filteredAndSortedParts.map((part) => (
                                <motion.div
                                    layout
                                    key={(part as any)._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <PartCard
                                        part={part}
                                        isSelected={false}
                                        onSelect={() => setComparisonPart(part)}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className="col-span-full py-32 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="inline-flex flex-col items-center gap-6">
                                    <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300">
                                        <X size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-black">No modules found</h3>
                                        <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Adjust your search or filter parameters for results.</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedBrands(new Set());
                                        }}
                                        className="text-[10px] font-black uppercase tracking-[0.3em] underline underline-offset-8"
                                    >
                                        Global Reset
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="w-full border-t border-card bg-card py-24 mt-20 transition-colors duration-500">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
                        <div className="max-w-sm">
                            <h2 className="text-2xl font-black tracking-tighter uppercase italic mb-6 text-foreground">Binary Horizon</h2>
                            <p className="text-[13px] text-neutral-400 font-medium leading-relaxed">
                                A high-fidelity hardware comparison tool for the modern PC builder. Built with a focus on real-time market indexing and architecture verification.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-16 md:gap-24">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-foreground border-b border-card pb-2">Developer</h4>
                                <ul className="space-y-4 text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
                                    <li>
                                        <a href="https://www.linkedin.com/in/ujjwal-bachhav-26b98824b" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                                            Ujjwal Bachhav
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/Kakashi18-hub/Binary-Horizon-PC-Builder" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                                            Source Code
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-foreground border-b border-card pb-2">Navigation</h4>
                                <ul className="space-y-4 text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
                                    <li><Link href="/about" className="hover:text-foreground transition-colors">How it Works</Link></li>
                                    <li><Link href="/parts" className="hover:text-foreground transition-colors">Components</Link></li>
                                    <li><Link href="/checkout" className="hover:text-foreground transition-colors">Checkout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-card flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em]">
                            © 2026 BINARY HORIZON • MIT LICENSE
                        </p>
                        <div className="flex gap-10 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                Core: Operational
                            </span>
                            <span>v1.2.4-stable</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Comparison Modal Overlay */}
            <ComparisonModal
                part={comparisonPart}
                onClose={() => setComparisonPart(null)}
            />
        </main>
    );
}
