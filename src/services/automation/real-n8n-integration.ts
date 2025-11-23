// Integração real com n8n - Workflows dinâmicos
export class AdvancedAutomation {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.N8N_BASE_URL || 'http://localhost:5678';
    this.apiKey = process.env.N8N_API_KEY || '';
  }

  // Listar todos os workflows
  async listWorkflows() {
    try {
      const response = await fetch(`${this.baseURL}/rest/workflows`, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error listing workflows:', error);
      return [];
    }
  }

  // Executar um workflow
  async executeWorkflow(workflowId: string, data: any) {
    try {
      const response = await fetch(
        `${this.baseURL}/rest/workflows/${workflowId}/execute`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': this.apiKey,
          },
          body: JSON.stringify(data),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Error executing workflow:', error);
      throw error;
    }
  }

  // Obter execuções de um workflow
  async getWorkflowExecutions(workflowId: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/rest/workflows/${workflowId}/executions`,
        {
          headers: {
            'X-N8N-API-KEY': this.apiKey,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching executions:', error);
      return [];
    }
  }

  // Criar um novo workflow
  async createWorkflow(workflowData: any) {
    try {
      const response = await fetch(`${this.baseURL}/rest/workflows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': this.apiKey,
        },
        body: JSON.stringify(workflowData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw error;
    }
  }

  // Atualizar um workflow
  async updateWorkflow(workflowId: string, workflowData: any) {
    try {
      const response = await fetch(`${this.baseURL}/rest/workflows/${workflowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': this.apiKey,
        },
        body: JSON.stringify(workflowData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating workflow:', error);
      throw error;
    }
  }

  // Deletar um workflow
  async deleteWorkflow(workflowId: string) {
    try {
      const response = await fetch(`${this.baseURL}/rest/workflows/${workflowId}`, {
        method: 'DELETE',
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting workflow:', error);
      throw error;
    }
  }
}

export const advancedAutomation = new AdvancedAutomation();
