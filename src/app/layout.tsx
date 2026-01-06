import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BuildProvider } from "@/context/BuildContext";
import LoadingScreen from "@/components/LoadingScreen";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Binary Horizon | High-Fidelity PC Builder",
    description: "A next-generation PC building platform with real-time market indexing.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <BuildProvider>
                    <LoadingScreen />
                    {children}
                </BuildProvider>
            </body>
        </html>
    );
}
