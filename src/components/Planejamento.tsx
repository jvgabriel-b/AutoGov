// src/components/Planejamento.tsx
import { 
  Target, 
  TrendingUp, 
  PieChart, 
  Calendar, 
  Download, 
  Plus, 
  ArrowUpRight, 
  Wallet,
  Building2
} from 'lucide-react';

export function Planejamento() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Header da Página com Ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Visão Geral Estratégica</h2>
          <p className="text-sm text-slate-500">Exercício Fiscal 2024 - 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Exportar Relatório
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors shadow-sm hover:shadow">
            <Plus className="w-4 h-4" />
            Nova Captação
          </button>
        </div>
      </div>

      {/* 2. KPIs (Indicadores ) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <div className="text-slate-500 text-sm font-medium">Orçamento Executado</div>
          <div className="text-2xl font-bold text-slate-800">R$ 14.2 mi</div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="text-xs text-slate-400 mt-1">65% do total previsto</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-slate-500">Anual</span>
          </div>
          <div className="text-slate-500 text-sm font-medium">Recursos Captados</div>
          <div className="text-2xl font-bold text-slate-800">R$ 4.8 mi</div>
          <div className="text-xs text-slate-400 mt-1">Via Emendas e Convênios</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-orange-50 p-2 rounded-lg">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="text-slate-500 text-sm font-medium">Metas do PPA</div>
          <div className="text-2xl font-bold text-slate-800">8/12</div>
          <div className="text-xs text-slate-400 mt-1">Metas estratégicas atingidas</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-teal-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-teal-600" />
            </div>
          </div>
          <div className="text-slate-500 text-sm font-medium">Eficiência Fiscal</div>
          <div className="text-2xl font-bold text-slate-800">94.5%</div>
          <div className="text-xs text-slate-400 mt-1">Índice de aplicação correto</div>
        </div>
      </div>

      {/*  Gráficos e Listas  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Esquerda: Fontes de Recurso  */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-slate-400" />
            Distribuição de Fontes de Recurso
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Governo Federal (PAC/Minha Casa)', val: 'R$ 8.5 mi', percent: 60, color: 'bg-blue-500' },
              { label: 'Tesouro Municipal', val: 'R$ 3.2 mi', percent: 25, color: 'bg-teal-500' },
              { label: 'Financiamentos Externos', val: 'R$ 1.5 mi', percent: 10, color: 'bg-orange-400' },
              { label: 'Contrapartidas Privadas', val: 'R$ 1.0 mi', percent: 5, color: 'bg-slate-400' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-medium text-slate-800">{item.val}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Direita: Próximos Prazos */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            Prazos e Entregas
          </h3>
          <div className="space-y-0">
            {[
              { title: 'Prestação de Contas (SICONV)', date: '15 Out', status: 'Pendente', color: 'text-orange-600 bg-orange-50' },
              { title: 'Renovação Cadastral', date: '22 Out', status: 'Em andamento', color: 'text-blue-600 bg-blue-50' },
              { title: 'Reunião Conselho Municipal', date: '01 Nov', status: 'Agendado', color: 'text-slate-600 bg-slate-50' },
              { title: 'Envio do PPA 2025', date: '10 Nov', status: 'Atrasado', color: 'text-blue-600 bg-blue-50' },
            ].map((task, idx) => (
              <div key={idx} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                <div className="flex-col flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                  <span className="text-xs font-bold text-slate-800">{task.date.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{task.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{task.title}</p>
                  <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${task.color}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium">
            Ver Cronograma Completo
          </button>
        </div>

      </div>
    </div>
  );
}