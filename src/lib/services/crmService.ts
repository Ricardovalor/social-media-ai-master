// Serviço CRM simplificado - dados em memória para desenvolvimento
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
