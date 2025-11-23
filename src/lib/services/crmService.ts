export class CrmService {
  private leads = [
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
}
