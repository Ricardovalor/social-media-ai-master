import { AdvancedMonetization } from '@/components/monetization/AdvancedMonetization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Zap, Users } from 'lucide-react';

export default function AdvancedMonetizationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Monetização Avançada</h1>
        <p className="text-muted-foreground">
          Múltiplos fluxos de renda e automações inteligentes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 20K</p>
                <p className="text-sm text-muted-foreground">Receita Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">+187%</p>
                <p className="text-sm text-muted-foreground">Crescimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Automações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Fluxos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AdvancedMonetization />

      <Card>
        <CardHeader>
          <CardTitle>Estratégias de Monetização</CardTitle>
          <CardDescription>
            Táticas comprovadas para aumentar sua receita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'TikTok Shop', description: 'Venda produtos no TikTok', roi: 320 },
              { name: 'NFT Collections', description: 'Coleções digitais exclusivas', roi: 420 },
              { name: 'Affiliate Marketing', description: 'Programas de afiliados', roi: 280 },
              { name: 'Brand Partnerships', description: 'Parcerias com marcas', roi: 350 },
              { name: 'Online Courses', description: 'Cursos e treinamentos', roi: 480 },
              { name: 'Consulting Services', description: 'Consultoria especializada', roi: 520 }
            ].map((strategy, index) => (
              <div key={index} className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold">{strategy.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">ROI</span>
                  <span className="font-bold text-green-600">+{strategy.roi}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
