"use client";

import { Hero } from "@/components/marketing/sections/Hero";
import { ProblemSolution } from "@/components/marketing/sections/ProblemSolution";
import { ValueProposition } from "@/components/marketing/sections/ValueProposition";
import { Features } from "@/components/marketing/sections/Features";
import { Developers } from "@/components/marketing/sections/Developers";
import { SocialProof } from "@/components/marketing/sections/SocialProof";
import { CTA } from "@/components/marketing/sections/CTA";

export default function MarketingHome() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <ProblemSolution />
            <ValueProposition />
            <Features />
            <Developers />
            <SocialProof />
            <CTA />
        </div>
    );
}
