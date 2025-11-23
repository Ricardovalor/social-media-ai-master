'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, DollarSign, Bot, Zap, Coins, Users } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Monetização', href: '/advanced-monetization', icon: DollarSign },
  { name: 'IA Multimodal', href: '/multimodal-generator', icon: Bot },
  { name: 'Automação', href: '/automation', icon: Zap },
  { name: 'Web3 Dashboard', href: '/web3-dashboard', icon: Coins },
  { name: 'CRM', href: '/crm', icon: Users },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
