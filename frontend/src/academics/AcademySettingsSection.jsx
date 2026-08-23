import React from 'react';
import { Settings, Shield, Bell, Key } from 'lucide-react';

export default function AcademySettingsSection() {
  return (
    <div className="matchpoint-fade-in max-w-4xl mx-auto space-y-6 pb-16 font-['Inter',sans-serif]">
      {/* Title Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-black font-['Poppins',sans-serif] tracking-wider text-white uppercase flex items-center gap-2">
            ACCOUNT SETTINGS
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F2FF65]/20 text-[#F2FF65] font-mono font-bold tracking-normal uppercase">
              PREVIEW
            </span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage your academy preferences and security
          </p>
        </div>
      </div>

      {/* Settings Grid (Informational) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-6 space-y-3 opacity-70 hover:opacity-100 transition-opacity cursor-not-allowed">
          <div className="flex items-center gap-3 text-white">
            <Shield size={20} className="text-[#F2FF65]" />
            <h3 className="font-bold font-['Poppins',sans-serif]">Security & Privacy</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Manage password, two-factor authentication, and active login sessions. This feature will be enabled in a future update.
          </p>
        </div>

        <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-6 space-y-3 opacity-70 hover:opacity-100 transition-opacity cursor-not-allowed">
          <div className="flex items-center gap-3 text-white">
            <Bell size={20} className="text-[#F2FF65]" />
            <h3 className="font-bold font-['Poppins',sans-serif]">Notifications</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Configure email and platform alerts for new applications and engagement milestones. Coming soon.
          </p>
        </div>

        <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-6 space-y-3 opacity-70 hover:opacity-100 transition-opacity cursor-not-allowed md:col-span-2">
          <div className="flex items-center gap-3 text-white">
            <Key size={20} className="text-[#F2FF65]" />
            <h3 className="font-bold font-['Poppins',sans-serif]">API Integrations</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
            Generate API keys for integrating your academy's internal software with the Stride platform. Developer documentation and webhook settings will be available in V2.0.
          </p>
        </div>
      </div>
    </div>
  );
}