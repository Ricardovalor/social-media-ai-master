'use client';
import { useState, useEffect } from 'react';

export default function CRMPage() {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: '', email: '' });

  const loadLeads = async () => {
    const response = await fetch('/api/crm/leads');
    const data = await response.json();
    if (data.success) setLeads(data.data);
  };

  const createLead = async () => {
    await fetch('/api/crm/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    });
    setNewLead({ name: '', email: '' });
    loadLeads();
  };

  useEffect(() => { loadLeads(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">CRM</h1>
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Nome" 
          value={newLead.name} 
          onChange={(e) => setNewLead({...newLead, name: e.target.value})} 
          className="border p-2 mr-2" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={newLead.email} 
          onChange={(e) => setNewLead({...newLead, email: e.target.value})} 
          className="border p-2 mr-2" 
        />
        <button onClick={createLead} className="bg-blue-500 text-white p-2">
          Adicionar
        </button>
      </div>
      <div>
        {leads.map(lead => (
          <div key={lead.id} className="p-4 border-b">
            <h3 className="font-semibold">{lead.name}</h3>
            <p>{lead.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
