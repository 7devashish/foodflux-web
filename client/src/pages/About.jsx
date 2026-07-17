import React from 'react';
import { Globe, HeartHandshake, Leaf } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';

export function About() {
  return (
    <div className="w-full min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="pt-10 mb-20">
          <SectionHeading 
            badge="Our Mission" 
            title={<>Bridging the Gap <br className="hidden md:block"/> Between Waste & Want.</>}
            description="FoodFlux is a real-time platform connecting caterers, restaurants, and event organizers with local NGOs. We ensure perfectly good surplus food reaches those who need it most, rather than ending up in a landfill."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard delay={0.1} className="card-white text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
              <Globe size={32} />
            </div>
            <h3 className="text-2xl font-extrabold mb-4">Reduce Waste</h3>
            <p className="text-gray-600 leading-relaxed">
              Millions of tons of food are wasted annually. We provide a seamless way for event organizers to redirect surplus food instantly.
            </p>
          </GlassCard>

          <GlassCard delay={0.2} className="card-warm bg-orange-50/40 border-orange-200/50 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-orange-500 mb-6 shadow-sm">
              <HeartHandshake size={32} />
            </div>
            <h3 className="text-2xl font-extrabold mb-4">Feed Communities</h3>
            <p className="text-gray-600 leading-relaxed">
              By giving NGOs a live feed of available food, we help them spend less time sourcing meals and more time supporting people.
            </p>
          </GlassCard>

          <GlassCard delay={0.3} className="card-white text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6 shadow-sm">
              <Leaf size={32} />
            </div>
            <h3 className="text-2xl font-extrabold mb-4">Sustain the Future</h3>
            <p className="text-gray-600 leading-relaxed">
              Every meal shared through FoodFlux reduces greenhouse gas emissions from landfills, creating a greener planet for tomorrow.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
