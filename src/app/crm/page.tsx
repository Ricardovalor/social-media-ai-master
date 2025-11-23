'use client';

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
                  <span className={`px-2 py-1 rounded text-sm ${
                    lead.status === 'won' ? 'bg-green-100 text-green-800' :
                    lead.status === 'negotiation' ? 'bg-yellow-100 text-yellow-800' :
                    lead.status === 'qualified' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'prospect' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
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
