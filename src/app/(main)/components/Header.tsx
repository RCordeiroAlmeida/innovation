"use client"

import logo from '@/assets/innovation-logo.png'
import Image from 'next/image'

import { Mail, Phone} from 'lucide-react';
import { UserProfile } from '@/app/components/UserProfile';

export default function Header() {
    return (
        <header className="bg-lime-500 text-white fixed min-w-full z-[9999]">
            
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                
                <div className="shrink-0">
                    <Image src={logo} alt="Logo Innovation Brindes" width={100} />
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Mail className="w-8 h-8" />
                        <span className="absolute -top-1 -right-2 bg-white text-[#82C000] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">11</span>
                    </div>

                    <div className="relative">
                        <Phone className="w-8 h-8" />
                        <span className="absolute -top-1 -right-2 bg-white text-[#82C000] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">11</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <UserProfile />
                    </div>
                </div>

            </div>
        </header>
    )
}