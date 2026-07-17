import React from 'react';
import { Car, Wallet, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';

export function GetInvolved() {
  return (
    <div className="w-full min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-[1000px] mx-auto pt-10">
        <SectionHeading 
          badge="Take Action" 
          title={<>Join Us In Making <br/> A Difference</>}
          description="Whether you have time, resources, or wheels, there is a place for you in the FoodFlux community."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <GlassCard className="card-warm bg-orange-50/40 border-orange-200/50 flex flex-col justify-between p-10 h-auto min-h-[400px]">
            <div>
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-orange-500 mb-6 shadow-sm">
                <Car size={32} />
              </div>
              <h3 className="text-3xl font-extrabold mb-4">Become a Driver</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Help bridge the gap! Join our fleet of volunteer drivers to transport surplus food from caterers directly to NGOs in your city.
              </p>
            </div>
            
            <div className="mt-12 flex items-center justify-between">
              <span className="font-bold text-orange-600 bg-orange-100 px-4 py-1.5 rounded-full text-sm">#VolunteerFleet</span>
              <button onClick={() => alert('Volunteer signup coming soon!')} className="w-12 h-12 rounded-full bg-primary-green flex items-center justify-center text-white hover:bg-primary-green-hover transition-colors shadow-lg">
                <ArrowRight size={24} />
              </button>
            </div>
          </GlassCard>

          <GlassCard className="card-white flex flex-col justify-between p-10 h-auto min-h-[400px]">
            <div>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-blue-500 mb-6 shadow-sm">
                <Wallet size={32} />
              </div>
              <h3 className="text-3xl font-extrabold mb-4">Fund The Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Contribute financially to help us maintain our servers, expand to new cities, and keep FoodFlux 100% free for local NGOs.
              </p>
            </div>
            
            <div className="mt-12 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="font-bold text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full text-sm border border-gray-200">GPay</span>
                <span className="font-bold text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full text-sm border border-gray-200">Card</span>
              </div>
              <button onClick={() => alert('Donation gateway coming soon!')} className="w-12 h-12 rounded-full bg-white border border-border-color flex items-center justify-center text-text-dark hover:bg-gray-50 transition-colors">
                <ArrowRight size={24} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
