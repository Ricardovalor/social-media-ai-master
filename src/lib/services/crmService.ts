export class CrmService {
  private leads = [
    { id: 1, name: "Lead 1", email: "email1@test.com", company: "Company 1", status: "lead", value: 1000 }
  ];

  async getLeads() {
    return this.leads;
  }

  async createLead(data) {
    const newLead = { id: this.leads.length + 1, ...data };
    this.leads.push(newLead);
    return newLead;
  }
}
