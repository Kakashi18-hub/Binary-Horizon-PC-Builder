import dbConnect from '@/lib/db';
import { Build } from '@/models';
import { notFound } from 'next/navigation';
import ImportBuildButton from '@/components/ImportBuildButton';

async function getBuild(id: string) {
    await dbConnect();
    const build = await Build.findById(id).populate('parts.cpu parts.gpu parts.motherboard parts.ram parts.storage parts.psu parts.case');
    if (!build) return null;
    return JSON.parse(JSON.stringify(build));
}

export default async function BuildDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const build = await getBuild(id);

    if (!build) notFound();

    return (
        <main className="min-h-screen bg-[#FDFDFD] text-black font-sans">
            <nav className="px-12 py-6 flex justify-between items-center border-b border-neutral-100 bg-white sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black italic">BH</div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">Binary Horizon</h1>
                        <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Build Specs // Forge</p>
                    </div>
                </div>

                <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
                    <a href="/" className="text-neutral-400 hover:text-black transition-colors">Builder</a>
                    <a href="/parts" className="text-neutral-400 hover:text-black transition-colors">Database</a>
                    <a href="/builds" className="text-neutral-400 hover:text-black transition-colors">Shared Builds</a>
                    <a href="/about" className="text-neutral-400 hover:text-black transition-colors">About</a>
                </div>
            </nav>

            <div className="p-12 max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-4">Final Configuration</h2>
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase">{build.name}</h1>
                </header>

                <div className="bg-white rounded-[40px] p-12 border border-neutral-100 shadow-soft">
                    <div className="space-y-6">
                        {Object.entries(build.parts).map(([key, part]: any) => (
                            part && (
                                <div key={key} className="flex justify-between items-center py-6 border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 px-4 rounded-2xl transition-colors">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1">{key}</p>
                                        <p className="text-xl font-bold tracking-tight">{part.name}</p>
                                        <p className="text-xs text-neutral-500 font-medium uppercase tracking-tighter">{part.brand}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono font-black italic text-2xl">₹{part.price.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    <div className="mt-12 flex justify-between items-end border-t-4 border-black pt-12">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-neutral-400 block mb-2">Total Combined Valuation</span>
                            <span className="text-6xl font-mono font-black italic tracking-tighter">₹{build.totalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="bg-neutral-900 text-white p-4 rounded-2xl font-black italic text-xl shadow-xl">
                            CERTIFIED
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center gap-6">
                    <p className="text-neutral-400 text-sm font-medium italic">Want to tinker with this machine or forge your own?</p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <ImportBuildButton build={build} />
                        <a href="/" className="px-12 py-5 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-black/20 text-center">
                            New Build
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
