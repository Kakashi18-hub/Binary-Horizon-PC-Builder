import mongoose from 'mongoose';
import { Part } from '../src/models/index';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI not found');
    process.exit(1);
}

const parts = [
    // CPUs
    { name: 'Intel Core i9-14900K', type: 'cpu', brand: 'Intel', price: 54500, specs: { cores: 24, clock: '3.2 GHz' }, compatibility: { socket: 'LGA1700', wattage: 125 } },
    { name: 'AMD Ryzen 7 7800X3D', type: 'cpu', brand: 'AMD', price: 38900, specs: { cores: 8, clock: '4.2 GHz' }, compatibility: { socket: 'AM5', wattage: 120 } },
    { name: 'Intel Core i5-13600K', type: 'cpu', brand: 'Intel', price: 28500, specs: { cores: 14, clock: '3.5 GHz' }, compatibility: { socket: 'LGA1700', wattage: 125 } },
    { name: 'AMD Ryzen 5 7600X', type: 'cpu', brand: 'AMD', price: 19800, specs: { cores: 6, clock: '4.7 GHz' }, compatibility: { socket: 'AM5', wattage: 105 } },
    { name: 'Intel Core i3-12100F', type: 'cpu', brand: 'Intel', price: 8500, specs: { cores: 4, clock: '3.3 GHz' }, compatibility: { socket: 'LGA1700', wattage: 58 } },

    // GPUs
    { name: 'NVIDIA GeForce RTX 4090', type: 'gpu', brand: 'ASUS ROG', price: 185000, specs: { vram: '24 GB' }, compatibility: { wattage: 450 } },
    { name: 'NVIDIA GeForce RTX 4070 Ti', type: 'gpu', brand: 'MSI', price: 78000, specs: { vram: '12 GB' }, compatibility: { wattage: 285 } },
    { name: 'NVIDIA GeForce RTX 4060', type: 'gpu', brand: 'Gigabyte', price: 29500, specs: { vram: '8 GB' }, compatibility: { wattage: 115 } },
    { name: 'AMD Radeon RX 7900 XTX', type: 'gpu', brand: 'PowerColor', price: 95000, specs: { vram: '24 GB' }, compatibility: { wattage: 355 } },
    { name: 'AMD Radeon RX 6600', type: 'gpu', brand: 'ASRock', price: 19500, specs: { vram: '8 GB' }, compatibility: { wattage: 132 } },

    // Motherboards
    { name: 'ASUS ROG Strix Z790-E', type: 'motherboard', brand: 'ASUS', price: 45000, specs: { chipset: 'Z790' }, compatibility: { socket: 'LGA1700', formFactor: 'ATX' } },
    { name: 'MSI MAG B650 Tomahawk', type: 'motherboard', brand: 'MSI', price: 22500, specs: { chipset: 'B650' }, compatibility: { socket: 'AM5', formFactor: 'ATX' } },
    { name: 'Gigabyte B760M DS3H', type: 'motherboard', brand: 'Gigabyte', price: 11000, specs: { chipset: 'B760' }, compatibility: { socket: 'LGA1700', formFactor: 'mATX' } },

    // RAM
    { name: 'G.Skill Trident Z5 32GB', type: 'ram', brand: 'G.Skill', price: 11500, specs: { speed: '6000MHz' }, compatibility: { slots: 2 } },
    { name: 'Corsair Vengeance 16GB', type: 'ram', brand: 'Corsair', price: 4200, specs: { speed: '5200MHz' }, compatibility: { slots: 1 } },
    { name: 'Crucial 8GB DDR4', type: 'ram', brand: 'Crucial', price: 1800, specs: { speed: '3200MHz' }, compatibility: { slots: 1 } },

    // Storage
    { name: 'Samsung 990 Pro 1TB', type: 'storage', brand: 'Samsung', price: 9200, specs: { type: 'NVMe Gen4' }, compatibility: {} },
    { name: 'Western Digital Blue 1TB SSD', type: 'storage', brand: 'WD', price: 6500, specs: { type: 'SATA' }, compatibility: {} },
    { name: 'Crucial P3 500GB', type: 'storage', brand: 'Crucial', price: 3200, specs: { type: 'NVMe Gen3' }, compatibility: {} },

    // PSU
    { name: 'Corsair RM850e', type: 'psu', brand: 'Corsair', price: 10500, specs: { wattage: '850W' }, compatibility: { wattage: 850 } },
    { name: 'Deepcool PK550D', type: 'psu', brand: 'Deepcool', price: 3800, specs: { wattage: '550W' }, compatibility: { wattage: 550 } },
    { name: 'Cooler Master MWE 750 Gold', type: 'psu', brand: 'Cooler Master', price: 8500, specs: { wattage: '750W' }, compatibility: { wattage: 750 } },

    // Case
    { name: 'NZXT H9 Flow', type: 'case', brand: 'NZXT', price: 14500, specs: { color: 'White' }, compatibility: { formFactor: 'ATX' } },
    { name: 'Lian Li Lancool 216', type: 'case', brand: 'Lian Li', price: 8500, specs: { color: 'Black' }, compatibility: { formFactor: 'ATX' } },
    { name: 'Ant Esports ICE-112', type: 'case', brand: 'Ant Esports', price: 3500, specs: { color: 'Black' }, compatibility: { formFactor: 'ATX' } },
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');
        await Part.deleteMany({});
        await Part.insertMany(parts);
        console.log('Successfully seeded database with Indian pricing and expanded catalog');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
