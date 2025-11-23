import { NextRequest, NextResponse } from 'next/server';
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
