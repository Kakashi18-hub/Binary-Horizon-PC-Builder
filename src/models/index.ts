import mongoose, { Schema, model, models } from 'mongoose';

export interface IPart {
    name: string;
    type: 'cpu' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'psu' | 'case';
    brand: string;
    price: number;
    specs: Record<string, any>;
    image: string;
    compatibility: {
        socket?: string;
        formFactor?: string;
        wattage?: number;
        slots?: number;
    };
}

const PartSchema = new Schema<IPart>({
    name: { type: String, required: true },
    type: { type: String, required: true, index: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    specs: { type: Map, of: Schema.Types.Mixed },
    image: { type: String },
    compatibility: {
        socket: String,
        formFactor: String,
        wattage: Number,
        slots: Number,
    },
});

export const Part = models.Part || model<IPart>('Part', PartSchema);

export interface IBuild {
    name: string;
    parts: {
        cpu?: mongoose.Types.ObjectId;
        gpu?: mongoose.Types.ObjectId;
        motherboard?: mongoose.Types.ObjectId;
        ram?: mongoose.Types.ObjectId;
        storage?: mongoose.Types.ObjectId;
        psu?: mongoose.Types.ObjectId;
        case?: mongoose.Types.ObjectId;
    };
    totalPrice: number;
    createdAt: Date;
}

const BuildSchema = new Schema<IBuild>({
    name: { type: String, default: 'My Build' },
    parts: {
        cpu: { type: Schema.Types.ObjectId, ref: 'Part' },
        gpu: { type: Schema.Types.ObjectId, ref: 'Part' },
        motherboard: { type: Schema.Types.ObjectId, ref: 'Part' },
        ram: { type: Schema.Types.ObjectId, ref: 'Part' },
        storage: { type: Schema.Types.ObjectId, ref: 'Part' },
        psu: { type: Schema.Types.ObjectId, ref: 'Part' },
        case: { type: Schema.Types.ObjectId, ref: 'Part' },
    },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Build = models.Build || model<IBuild>('Build', BuildSchema);

export interface IFPSEstimate {
    gameName: string;
    configs: {
        cpuId: mongoose.Types.ObjectId;
        gpuId: mongoose.Types.ObjectId;
        resolution: string;
        settings: string;
        fps: number;
    }[];
}

const FPSEstimateSchema = new Schema<IFPSEstimate>({
    gameName: { type: String, required: true },
    configs: [{
        cpuId: { type: Schema.Types.ObjectId, ref: 'Part' },
        gpuId: { type: Schema.Types.ObjectId, ref: 'Part' },
        resolution: String,
        settings: String,
        fps: Number,
    }],
});

export const FPSEstimate = models.FPSEstimate || model<IFPSEstimate>('FPSEstimate', FPSEstimateSchema);
