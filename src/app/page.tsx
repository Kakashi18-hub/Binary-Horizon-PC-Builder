'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import PartSlot from '@/components/PartSlot';
import DraggablePart from '@/components/DraggablePart';
import BuildSummary from '@/components/BuildSummary';
import CompatibilityWarnings from '@/components/CompatibilityWarnings';
import PerformanceStats from '@/components/PerformanceStats';
import { IPart } from '@/models';
import { useBuild } from '@/context/BuildContext';
import { Search, Package, ShoppingBag, Info } from 'lucide-react';
import Link from 'next/link';
import { ToastContainer, ToastType } from '@/components/Toast';

const PART_TYPES = [
  { id: 'cpu', label: 'Processor' },
  { id: 'motherboard', label: 'Motherboard' },
  { id: 'gpu', label: 'Graphics Card' },
  { id: 'ram', label: 'Memory' },
  { id: 'storage', label: 'Storage' },
  { id: 'psu', label: 'Power Supply' },
  { id: 'case', label: 'Chassis' },
];

export default function BuilderPage() {
  const { selectedParts, setSelectedParts, totalPrice } = useBuild();

  const [inventory, setInventory] = useState<IPart[]>([]);
  const [activeCategory, setActiveCategory] = useState('cpu');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDragPart, setActiveDragPart] = useState<IPart | null>(null);
  const [overSlot, setOverSlot] = useState<string | null>(null);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  useEffect(() => {
    fetch(`/api/parts/${activeCategory}`)
      .then(res => res.json())
      .then(data => {
        setInventory(data);
        setSearchQuery(''); // Reset search when category changes
      });
  }, [activeCategory]);

  const filteredInventory = inventory.filter(part =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragPart(event.active.data.current as IPart);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverSlot(event.over ? (event.over.id as string) : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragPart(null);
    setOverSlot(null);

    if (over && over.id === active.data.current?.type) {
      const part = active.data.current as IPart;

      // Basic Compatibility Check
      const error = checkCompatibility(part, selectedParts);
      if (!error) {
        setSelectedParts(prev => ({ ...prev, [part.type]: part }));
        addToast(`Integrated ${part.name} into configuration.`, 'success');
      } else {
        addToast(error, 'error');
      }
    }
  };

  const checkCompatibility = (newPart: IPart, currentParts: Record<string, IPart | null>): string | null => {
    if (newPart.type === 'cpu' && currentParts.motherboard) {
      if (newPart.compatibility.socket !== currentParts.motherboard.compatibility.socket) {
        return `Socket Mismatch: ${newPart.name} needs ${newPart.compatibility.socket}`;
      }
    }
    if (newPart.type === 'motherboard' && currentParts.cpu) {
      if (newPart.compatibility.socket !== currentParts.cpu.compatibility.socket) {
        return `Socket Mismatch: ${newPart.name} uses ${newPart.compatibility.socket}`;
      }
    }
    return null;
  };


  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="min-h-screen bg-[#FDFDFD] text-black font-sans">
        {/* Header */}
        <nav className="px-12 py-6 flex justify-between items-center border-b border-neutral-100 bg-white sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 relative overflow-hidden rounded-xl bg-black flex items-center justify-center">
                <img src="/Binary-Horizon.png" alt="Binary Horizon" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">Binary Horizon</h1>
                <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Master PC Builder • India</p>
              </div>
            </Link>
          </div>

          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="/" className="text-black border-b-2 border-black pb-1">Builder</a>
            <a href="/parts" className="text-neutral-400 hover:text-black transition-colors">Database</a>
            <a href="/builds" className="text-neutral-400 hover:text-black transition-colors">Shared Builds</a>
            <a href="/about" className="text-neutral-400 hover:text-black transition-colors">About</a>
          </div>
        </nav>

        <div className="grid grid-cols-12 min-h-[calc(100-88px)]">
          {/* Left: Inventory / Drawer */}
          <aside className="col-span-3 border-r border-neutral-100 bg-white p-6 overflow-y-auto max-h-[calc(100vh-88px)] sticky top-[88px]">
            <div className="mb-8">
              <h2 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <Package size={20} /> Parts Inventory
              </h2>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Filter parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-neutral-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {PART_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveCategory(t.id)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === t.id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                    }`}
                >
                  {t.id}s
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((part) => (
                  <DraggablePart key={(part as any)._id} part={part} />
                ))
              ) : (
                <p className="text-center text-xs text-neutral-400 py-8 italic">No parts found</p>
              )}
            </div>
          </aside>

          {/* Center: The Canvas (PC Assembly) */}
          <section className="col-span-6 p-12 bg-[#F9F9F9]">
            <div className="max-w-xl mx-auto">
              <header className="mb-12 text-center">
                <h2 className="text-3xl font-black mb-2 tracking-tight">Magnetic Assembly</h2>
                <p className="text-neutral-500 text-sm">Drag parts from the left and snap them into the motherboard slots below.</p>
              </header>

              <div className="bg-white p-12 rounded-[40px] shadow-soft border border-neutral-100 relative">
                {/* Visual Connector Lines (Stylized) */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden rounded-[40px]">
                  <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black"></div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black"></div>
                </div>

                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div className="col-span-2">
                    <PartSlot
                      id="motherboard"
                      label="Motherboard"
                      part={selectedParts.motherboard}
                      onRemove={() => setSelectedParts(p => ({ ...p, motherboard: null }))}
                      isOver={overSlot === 'motherboard'}
                      activePart={activeDragPart}
                      compatibilityError={activeDragPart?.type === 'motherboard' ? checkCompatibility(activeDragPart, selectedParts) : null}
                    />
                  </div>

                  <PartSlot
                    id="cpu"
                    label="CPU"
                    part={selectedParts.cpu}
                    onRemove={() => setSelectedParts(p => ({ ...p, cpu: null }))}
                    isOver={overSlot === 'cpu'}
                    activePart={activeDragPart}
                    compatibilityError={activeDragPart?.type === 'cpu' ? checkCompatibility(activeDragPart, selectedParts) : null}
                  />

                  <PartSlot
                    id="ram"
                    label="Memory"
                    part={selectedParts.ram}
                    onRemove={() => setSelectedParts(p => ({ ...p, ram: null }))}
                    isOver={overSlot === 'ram'}
                    activePart={activeDragPart}
                  />

                  <div className="col-span-2">
                    <PartSlot
                      id="gpu"
                      label="GPU"
                      part={selectedParts.gpu}
                      onRemove={() => setSelectedParts(p => ({ ...p, gpu: null }))}
                      isOver={overSlot === 'gpu'}
                      activePart={activeDragPart}
                    />
                  </div>

                  <PartSlot
                    id="storage"
                    label="Drive"
                    part={selectedParts.storage}
                    onRemove={() => setSelectedParts(p => ({ ...p, storage: null }))}
                    isOver={overSlot === 'storage'}
                    activePart={activeDragPart}
                  />

                  <PartSlot
                    id="psu"
                    label="Power"
                    part={selectedParts.psu}
                    onRemove={() => setSelectedParts(p => ({ ...p, psu: null }))}
                    isOver={overSlot === 'psu'}
                    activePart={activeDragPart}
                  />

                  <div className="col-span-2">
                    <PartSlot
                      id="case"
                      label="Chassis"
                      part={selectedParts.case}
                      onRemove={() => setSelectedParts(p => ({ ...p, case: null }))}
                      isOver={overSlot === 'case'}
                      activePart={activeDragPart}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-neutral-900 text-white p-6 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Current Estimate</p>
                    <p className="text-2xl font-mono font-black italic">₹{totalPrice.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <Link href="/checkout" className="bg-white text-black px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </section>

          {/* Right: Summary / Warnings */}
          <aside className="col-span-3 bg-white p-8 border-l border-neutral-100 overflow-y-auto max-h-[calc(100vh-88px)] sticky top-[88px]">
            <div className="space-y-8">
              <CompatibilityWarnings selectedParts={selectedParts} />

              <PerformanceStats
                cpu={selectedParts.cpu}
                gpu={selectedParts.gpu}
              />

              <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Info size={16} /> Efficiency Tip
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Always ensure your PSU wattage is at least 150W higher than the estimated draw for long-term stability and peak performance.
                </p>
              </div>

              <BuildSummary selectedParts={selectedParts} totalPrice={totalPrice} />
            </div>
          </aside>
        </div>

        <DragOverlay>
          {activeDragPart ? (
            <div className="scale-105 rotate-2 shadow-2xl opacity-90">
              <DraggablePart part={activeDragPart} />
            </div>
          ) : null}
        </DragOverlay>
      </main>

      <footer className="w-full border-t border-neutral-100 bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="max-w-sm">
              <h2 className="text-2xl font-black tracking-tighter uppercase italic mb-6">Binary Horizon</h2>
              <p className="text-[13px] text-neutral-400 font-medium leading-relaxed">
                A high-fidelity hardware comparison tool for the modern PC builder. Built with a focus on real-time market indexing and architecture verification.
              </p>
            </div>

            <div className="flex flex-wrap gap-16 md:gap-24">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-black border-b border-black/5 pb-2">Developer</h4>
                <ul className="space-y-4 text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
                  <li>
                    <a href="https://www.linkedin.com/in/ujjwal-bachhav-26b98824b" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                      Ujjwal Bachhav
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Kakashi18-hub/Binary-Horizon-PC-Builder" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                      Source Code
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-black border-b border-black/5 pb-2">Navigation</h4>
                <ul className="space-y-4 text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
                  <li><Link href="/about" className="hover:text-black transition-colors">How it Works</Link></li>
                  <li><Link href="/parts" className="hover:text-black transition-colors">Components</Link></li>
                  <li><Link href="/checkout" className="hover:text-black transition-colors">Checkout</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-8">
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
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </DndContext>
  );
}
