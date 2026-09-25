import React, { useState } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  Tractor, 
  CloudSun, 
  Droplets, 
  Plus, 
  AlertTriangle, 
  ArrowRight,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { 
  Transaction, 
  BudgetCategory, 
  ProductionRecord, 
  InsumoStock, 
  SystemAlert, 
  Property,
  NavTab,
  GestaoSubTab
} from '../types';
import { monthlyOverviewData, expenseCategoriesData } from '../data/mockData';

interface DashboardProps {
  property: Property;
  transactions: Transaction[];
  budgets: BudgetCategory[];
  productions: ProductionRecord[];
  insumos: InsumoStock[];
  alerts: SystemAlert[];
  onOpenQuickAction: (type: 'receita' | 'despesa' | 'producao' | 'aplicacao') => void;
  onNavigateToTab: (tab: NavTab, subTab?: GestaoSubTab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  property,
  transactions,
  budgets,
  productions,
  alerts,
  onOpenQuickAction,
  onNavigateToTab
}) => {
  const [selectedChartPeriod, setSelectedChartPeriod] = useState('Últimos 12 meses');
  const [hoveredMonth, setHoveredMonth] = useState<any | null>(null);

  // Live totals
  const totalReceitas = transactions
    .filter(t => t.type === 'receita')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalGastos = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const resultadoMes = totalReceitas - totalGastos;
  const patrimonioTotal = 2847000;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. Greeting & Weather Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Hoje: Domingo, 22 de setembro
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mt-2">
            Olá, João! Bom dia.
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Aqui está o resumo simples da <strong className="text-emerald-900">{property.name}</strong>.
          </p>
        </div>

        {/* Weather in the field */}
        <div className="flex items-center gap-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl px-4 py-3 shrink-0 self-start md:self-auto">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <CloudSun className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-gray-900">24°C</span>
              <span className="text-xs font-semibold text-gray-500">Parcialmente nublado</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-sky-700 font-semibold mt-0.5">
              <Droplets className="w-3.5 h-3.5" />
              <span>Umidade do ar em 68%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Actions Strip - Big Friendly Buttons */}
      <div className="bg-white p-5 rounded-3xl border-2 border-gray-200 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-black text-gray-900 uppercase tracking-wide">
            O que você quer anotar agora?
          </span>
          <span className="text-xs text-gray-400 font-normal">(Clique em um dos botões abaixo)</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onOpenQuickAction('receita')}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-sm font-extrabold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5 text-emerald-200" />
            <span>+ Anotar Dinheiro (Receita)</span>
          </button>

          <button
            onClick={() => onOpenQuickAction('despesa')}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#0a2e23] hover:bg-[#062118] text-white rounded-2xl text-sm font-extrabold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5 text-emerald-400" />
            <span>- Anotar Gasto (Despesa)</span>
          </button>

          <button
            onClick={() => onOpenQuickAction('producao')}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-2 border-emerald-300 rounded-2xl text-sm font-extrabold transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5 text-emerald-700" />
            <span>+ Anotar Colheita / Leite</span>
          </button>

          <button
            onClick={() => onOpenQuickAction('aplicacao')}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-2 border-emerald-300 rounded-2xl text-sm font-extrabold transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5 text-emerald-700" />
            <span>+ Anotar Veneno / Adubo</span>
          </button>
        </div>
      </div>

      {/* 3. Four Main KPI Cards - Simple Friendly Titles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Dinheiro que entrou */}
        <div className="bg-white rounded-3xl p-5 border-2 border-gray-200 shadow-xs hover:border-emerald-400 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ArrowUp className="w-6 h-6 stroke-[3]" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Dinheiro que Entrou</p>
            <h3 className="text-2xl md:text-3xl font-black text-emerald-800 tracking-tight mt-1 tabular-nums">
              {formatBRL(totalReceitas)}
            </h3>
            <p className="text-xs font-bold text-emerald-600 mt-1">
              +12,5% a mais que o mês passado
            </p>
          </div>
        </div>

        {/* Card 2: Dinheiro que saiu */}
        <div className="bg-white rounded-3xl p-5 border-2 border-gray-200 shadow-xs hover:border-rose-400 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <ArrowDown className="w-6 h-6 stroke-[3]" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Dinheiro que Saiu (Gastos)</p>
            <h3 className="text-2xl md:text-3xl font-black text-rose-800 tracking-tight mt-1 tabular-nums">
              {formatBRL(totalGastos)}
            </h3>
            <p className="text-xs font-bold text-amber-700 mt-1">
              Gastos do mês de setembro
            </p>
          </div>
        </div>

        {/* Card 3: Sobrou no Caixa */}
        <div className="bg-white rounded-3xl p-5 border-2 border-gray-200 shadow-xs hover:border-emerald-400 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 stroke-[3]" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Sobrou no Caixa (Lucro)</p>
            <h3 className="text-2xl md:text-3xl font-black text-emerald-800 tracking-tight mt-1 tabular-nums">
              {formatBRL(resultadoMes)}
            </h3>
            <p className="text-xs font-bold text-emerald-600 mt-1">
              Lucro líquido positivo
            </p>
          </div>
        </div>

        {/* Card 4: Valor de tudo na fazenda */}
        <div className="bg-white rounded-3xl p-5 border-2 border-gray-200 shadow-xs hover:border-teal-400 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
            <Tractor className="w-6 h-6 stroke-[3]" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Valor dos Bens da Fazenda</p>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mt-1 tabular-nums">
              R$ 2.847.000
            </h3>
            <p className="text-xs font-bold text-gray-500 mt-1">
              Terras, tratores e máquinas
            </p>
          </div>
        </div>
      </div>

      {/* 4. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Chart: Receitas e despesas */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-black text-gray-900">Entradas e Saídas ao Longo do Ano</h3>
              <p className="text-xs text-gray-500">Comparação dos últimos 12 meses</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-[#064E3B]">
                <span className="w-3 h-3 rounded-full bg-[#064E3B]" />
                <span>Entrou (Verde escuro)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-[#86EFAC]" />
                <span>Saiu (Verde claro)</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="pt-6">
            <div className="h-60 w-full flex flex-col justify-between">
              <div className="relative flex-1 flex items-end justify-between gap-2 px-2 pb-2">
                <div className="absolute inset-x-0 top-0 border-b border-gray-100 text-[10px] text-gray-400">R$ 80 mil</div>
                <div className="absolute inset-x-0 top-1/2 border-b border-gray-100 text-[10px] text-gray-400">R$ 40 mil</div>
                <div className="absolute inset-x-0 bottom-0 border-b border-gray-200 text-[10px] text-gray-400">R$ 0</div>

                {monthlyOverviewData.map((d, index) => {
                  const maxVal = 90000;
                  const recHeight = (d.receitas / maxVal) * 100;
                  const despHeight = (d.despesas / maxVal) * 100;

                  return (
                    <div 
                      key={index} 
                      className="relative z-10 flex-1 flex flex-col items-center justify-end h-full"
                      onMouseEnter={() => setHoveredMonth(d)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div
                          style={{ height: `${recHeight}%` }}
                          className="w-3 sm:w-4 bg-[#0a4835] rounded-t-sm"
                        />
                        <div
                          style={{ height: `${despHeight}%` }}
                          className="w-3 sm:w-4 bg-[#86EFAC] rounded-t-sm"
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600 mt-2">
                        {d.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Helper notice */}
            <div className="mt-3 p-3 bg-emerald-50 rounded-2xl text-xs text-emerald-900 font-medium">
              {hoveredMonth ? (
                <span>No mês de <strong>{hoveredMonth.month}</strong>: Entrou {formatBRL(hoveredMonth.receitas)} e Saiu {formatBRL(hoveredMonth.despesas)}.</span>
              ) : (
                <span>Passe o mouse ou toque nas barras para ver os valores de cada mês.</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Chart: Para onde foi o dinheiro */}
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-gray-900">Para Onde Foi o Dinheiro?</h3>
            <p className="text-xs text-gray-500">Divisão dos gastos no mês</p>
          </div>

          <div className="py-4 space-y-2.5">
            {expenseCategoriesData.map((cat, idx) => (
              <div key={idx} className="p-2.5 bg-gray-50 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="font-extrabold text-gray-800">{cat.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-gray-900">{cat.percentage}%</span>
                  <span className="text-[11px] text-gray-500 block">({formatBRL(cat.amount)})</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateToTab('levantamento', 'financeiro')}
            className="w-full py-2.5 text-center text-xs font-extrabold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200 rounded-xl transition-colors cursor-pointer"
          >
            Ver todos os detalhes no Levantamento &rarr;
          </button>
        </div>
      </div>

      {/* 5. Alertas & Avisos da Fazenda */}
      <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-black text-gray-900">
              Avisos Importantes para Ficar de Olho
            </h3>
            <p className="text-xs text-gray-500">
              Coisas que precisam da sua atenção na fazenda
            </p>
          </div>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 font-bold text-xs rounded-full">
            {alerts.length} Avisos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{alert.title}</span>
                </div>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed font-medium">
                  {alert.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-amber-200/60 flex justify-end">
                <button
                  onClick={() => onNavigateToTab('levantamento', alert.targetTab || 'financeiro')}
                  className="text-xs font-extrabold text-emerald-900 bg-white border border-gray-300 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-emerald-50 cursor-pointer"
                >
                  {alert.actionText || 'Ver no Levantamento'} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
