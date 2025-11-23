const fs = require('fs');
const path = require('path');

// Conteúdo completo do Navigation.tsx
const navigationContent = `'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart3,
  DollarSign,
  Bot,
  Zap,
  Coins,
  Users
} from 'lucide-react';

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
            className={\`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors \${
              isActive
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            }\`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
`;

// Conteúdo completo do CrmService.ts
const crmServiceContent = `// Serviço CRM simplificado - dados em memória para desenvolvimento
export class CrmService {
  private leads: any[] = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      company: "Tech Corp",
      status: "lead",
      value: 5000,
      workspaceId: 1,
      createdById: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@startup.com",
      company: "Startup XYZ",
      status: "prospect",
      value: 15000,
      workspaceId: 1,
      createdById: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Pedro Oliveira",
      email: "pedro@consultoria.com",
      company: "Consultoria ABC",
      status: "qualified",
      value: 30000,
      workspaceId: 1,
      createdById: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  async getLeads(workspaceId: number) {
    return this.leads.filter(lead => lead.workspaceId === workspaceId);
  }

  async createLead(data: any) {
    const newLead = {
      id: this.leads.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.leads.push(newLead);
    return newLead;
  }

  async calculatePipelineMetrics(workspaceId: number) {
    const leads = await this.getLeads(workspaceId);
    
    const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
    const wonValue = leads
      .filter(lead => lead.status === 'won')
      .reduce((sum, lead) => sum + (lead.value || 0), 0);
    
    const conversionRate = leads.length > 0 
      ? (leads.filter(lead => lead.status === 'won').length / leads.length) * 100 
      : 0;

    return {
      totalLeads: leads.length,
      totalValue,
      wonValue,
      conversionRate: Math.round(conversionRate * 100) / 100
    };
  }

  async createSalesPipeline(workspaceId: number) {
    return {
      stages: [
        { id: 1, name: 'Lead', probability: 10 },
        { id: 2, name: 'Prospect', probability: 30 },
        { id: 3, name: 'Qualified', probability: 60 },
        { id: 4, name: 'Negotiation', probability: 80 },
        { id: 5, name: 'Won', probability: 100 }
      ]
    };
  }
}
`;

// Conteúdo completo da API route
const apiRouteContent = `import { NextRequest, NextResponse } from 'next/server';
import { CrmService } from '@/lib/services/crmService';

const crmService = new CrmService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = Number(searchParams.get('workspaceId')) || 1;
    
    const leads = await crmService.getLeads(workspaceId);
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = await crmService.createLead(body);
    
    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao criar lead' },
      { status: 500 }
    );
  }
}
`;

// Conteúdo completo da página CRM
const crmPageContent = `'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: number;
  name: string;
  email?: string;
  company?: string;
  status: string;
  value?: number;
}

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [newLead, setNewLead] = useState({ name: '', email: '', company: '' });

  const loadLeads = async () => {
    try {
      const response = await fetch('/api/crm/leads?workspaceId=1');
      const data = await response.json();
      if (data.success) setLeads(data.data);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    }
  };

  const createLead = async () => {
    if (!newLead.name) return;
    
    try {
      await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...newLead, 
          workspaceId: 1, 
          createdById: 1,
          status: 'lead',
          value: 0
        })
      });
      setNewLead({ name: '', email: '', company: '' });
      loadLeads();
    } catch (error) {
      console.error('Erro ao criar lead:', error);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">CRM - Pipeline de Vendas</h1>
      
      {/* Formulário simples */}
      <div className="mb-6 p-4 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Lead</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nome do lead"
            value={newLead.name}
            onChange={(e) => setNewLead({...newLead, name: e.target.value})}
            className="border p-2 rounded flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newLead.email}
            onChange={(e) => setNewLead({...newLead, email: e.target.value})}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={createLead}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Adicionar Lead
          </button>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-gray-600">Total de Leads</h3>
          <p className="text-2xl font-bold">{leads.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-gray-600">Valor em Pipeline</h3>
          <p className="text-2xl font-bold">
            R$ {leads.reduce((sum, lead) => sum + (lead.value || 0), 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-gray-600">Leads por Status</h3>
          <p className="text-lg">
            {leads.filter(l => l.status === 'lead').length} Lead • 
            {leads.filter(l => l.status === 'prospect').length} Prospect • 
            {leads.filter(l => l.status === 'qualified').length} Qualified
          </p>
        </div>
      </div>

      {/* Lista de leads */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Leads do Pipeline</h2>
        </div>
        <div className="divide-y">
          {leads.map((lead) => (
            <div key={lead.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{lead.name}</h3>
                  <p className="text-gray-600">{lead.email} • {lead.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {lead.value?.toLocaleString() || '0'}</p>
                  <span className={\`px-2 py-1 rounded text-sm \${
                    lead.status === 'won' ? 'bg-green-100 text-green-800' :
                    lead.status === 'negotiation' ? 'bg-yellow-100 text-yellow-800' :
                    lead.status === 'qualified' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'prospect' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }\`}>
                    {lead.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {leads.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Nenhum lead cadastrado. Adicione seu primeiro lead acima.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;

// Criar diretórios se não existirem
const dirs = [
  'src/components/layout',
  'src/lib/services',
  'src/app/api/crm/leads',
  'src/app/crm'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(\`Diretório criado: \${dir}\`);
  }
});

// Escrever arquivos
fs.writeFileSync('src/components/layout/Navigation.tsx', navigationContent);
console.log('✅ Navigation.tsx criado com sucesso!');

fs.writeFileSync('src/lib/services/crmService.ts', crmServiceContent);
console.log('✅ CrmService.ts criado com sucesso!');

fs.writeFileSync('src/app/api/crm/leads/route.ts', apiRouteContent);
console.log('✅ API Route criada com sucesso!');

fs.writeFileSync('src/app/crm/page.tsx', crmPageContent);
console.log('✅ Página CRM criada com sucesso!');

console.log('🎉 Todos os arquivos do CRM foram criados! Agora execute: npm run build');
