import { NextResponse } from 'next/server';
import { CrmService } from '@/lib/services/crmService';

const crmService = new CrmService();

export async function GET() {
  const leads = await crmService.getLeads();
  return NextResponse.json({ success: true, data: leads });
}

export async function POST(request) {
  const body = await request.json();
  const lead = await crmService.createLead(body);
  return NextResponse.json({ success: true, data: lead });
}
