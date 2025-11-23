import { NextRequest, NextResponse } from 'next/server';
import { CrmService } from '@/lib/services/crmService';

const crmService = new CrmService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = Number(searchParams.get('workspaceId')) || 1;
    
    const metrics = await crmService.calculatePipelineMetrics(workspaceId);
    const pipeline = await crmService.createSalesPipeline(workspaceId);
    
    return NextResponse.json({ 
      success: true, 
      data: {
        metrics,
        pipeline
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar métricas' },
      { status: 500 }
    );
  }
}
