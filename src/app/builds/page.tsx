import dbConnect from '@/lib/db';
import { Build } from '@/models';
import Link from 'next/link';

async function getBuilds() {
    await dbConnect();
    const builds = await Build.find({}).sort({ createdAt: -1 }).limit(50);
    return JSON.parse(JSON.stringify(builds));
}

export default async function SharedBuildsPage() {
    const builds = await getBuilds();

    return (
        <main className="min-h-screen bg-[#FDFDFD] text-black font-sans">
            <nav className="px-12 py-6 flex justify-between items-center border-b border-neutral-100 bg-white sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black italic">BH</div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">Binary Horizon</h1>
                        <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Shared Gallery • India</p>
                    </div>
                </div>

                <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
                    <a href="/" className="text-neutral-400 hover:text-black transition-colors">Builder</a>
                    <a href="/parts" className="text-neutral-400 hover:text-black transition-colors">Database</a>
                    <a href="/builds" className="text-black border-b-2 border-black pb-1">Shared Builds</a>
                    <a href="/about" className="text-neutral-400 hover:text-black transition-colors">About</a>
                </div>
            </nav>

            <div className="p-12 max-w-7xl mx-auto">
                <header className="mb-16">
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] text-neutral-400 mb-4">Community Expo</h2>
                    <h3 className="text-6xl font-black tracking-tighter leading-none italic">
                        Recently Forged <span className="text-neutral-200">/ Machines</span>
                    </h3>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {builds.map((build: any) => (
                        <Link
                            key={build._id}
                            href={`/builds/${build._id}`}
                            className="group block bg-white p-10 rounded-[40px] border border-neutral-100 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg">B</div>
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-50 px-3 py-1 rounded-full">
                                    {new Date(build.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <h4 className="text-2xl font-black mb-2 group-hover:text-neutral-600 transition-colors uppercase italic tracking-tighter">{build.name}</h4>
                            <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-8">Custom Configuration</p>

                            <div className="flex items-end justify-between border-t border-neutral-50 pt-8">
                                <div>
                                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total Valuation</p>
                                    <p className="text-3xl font-mono font-black italic">₹{build.totalPrice.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {builds.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-neutral-50 rounded-[40px] border border-dashed border-neutral-200">
                            <p className="text-neutral-400 font-bold uppercase tracking-widest">No shared builds yet. Be the first to forge one!</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
