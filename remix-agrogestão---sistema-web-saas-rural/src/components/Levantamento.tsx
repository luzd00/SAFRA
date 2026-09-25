import React, { useState } from 'react';
import { 
  Wallet, 
  CalendarDays, 
  Sprout, 
  FlaskConical, 
  Tractor, 
  Plus, 
  Search, 
  Trash2, 
  Check, 
  Clock, 
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { 
  GestaoSubTab, 
  Transaction, 
  BudgetCategory, 
  ProductionRecord, 
  InsumoStock, 
  DefensivoApplication, 
  AssetPatrimonio 
} from '../types';
import { Logo } from './Logo';

interface LevantamentoProps {
  initialSubTab: GestaoSubTab;
  onSubTabChange: (sub: GestaoSubTab) => void;
  transactions: Transaction[];
  budgets: BudgetCategory[];
  productions: ProductionRecord[];
  insumos: InsumoStock[];
  applications: DefensivoApplication[];
  patrimonio: AssetPatrimonio[];
  onOpenQuickAction: (type: 'receita' | 'despesa' | 'producao' | 'aplicacao') => void;
  onDeleteTransaction: (id: string) => void;
  onToggleTransactionStatus: (id: string) => void;
  onAddInsumo: (insumo: Omit<InsumoStock, 'id'>) => void;
  onAddAsset: (asset: Omit<AssetPatrimonio, 'id'>) => void;
}

export const Levantamento: React.FC<LevantamentoProps> = ({
  initialSubTab,
  onSubTabChange,
  transactions,
  budgets,
  productions,
  insumos,
  applications,
  patrimonio,
  onOpenQuickAction,
  onDeleteTransaction,
  onToggleTransactionStatus,
  onAddInsumo,
  onAddAsset
}) => {
  const currentSubTab = initialSubTab;
  const setCurrentSubTab = onSubTabChange;

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [financialFilter, setFinancialFilter] = useState<'todos' | 'entradas' | 'saidas' | 'pendentes'>('todos');

  // Simple modal states
  const [showInsumoModal, setShowInsumoModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);

  // New Insumo simplified state
  const [newInsumoName, setNewInsumoName] = useState('');
  const [newInsumoQty, setNewInsumoQty] = useState('');
  const [newInsumoUnit, setNewInsumoUnit] = useState('Litros');
  const [newInsumoExp, setNewInsumoExp] = useState('2027-12-31');

  // New Asset simplified state
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetVal, setNewAssetVal] = useState('');
  const [newAssetYear, setNewAssetYear] = useState('2023');

  // Currency helper
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Calculations
  const totalReceitas = transactions
    .filter(t => t.type === 'receita')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalDespesas = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSobra = totalReceitas - totalDespesas;

  // Filtered transactions with simple search
  const filteredTransactions = transactions.filter(t => {
    const matches = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matches) return false;
    if (financialFilter === 'entradas') return t.type === 'receita';
    if (financialFilter === 'saidas') return t.type === 'despesa';
    if (financialFilter === 'pendentes') return t.status === 'pendente';
    return true;
  });

  const handleSaveInsumo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInsumoName) return;

    onAddInsumo({
      name: newInsumoName,
      category: 'Fungicida',
      activeIngredient: 'Geral',
      currentStock: parseFloat(newInsumoQty) || 10,
      minStock: 5,
      unit: newInsumoUnit,
      batchNumber: `LT-${Math.floor(Math.random() * 9000 + 1000)}`,
      expirationDate: newInsumoExp,
      daysToExpiration: 180,
      costPerUnit: 150,
      location: 'Galpão'
    });

    setShowInsumoModal(false);
    setNewInsumoName('');
    setNewInsumoQty('');
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName) return;

    const val = parseFloat(newAssetVal) || 100000;
    onAddAsset({
      name: newAssetName,
      category: 'Maquinário',
      modelOrYear: newAssetYear,
      purchaseValue: val,
      currentValue: val,
      status: 'Operacional',
      location: 'Galpão Principal',
      hourMeterOrKm: '0'
    });

    setShowAssetModal(false);
    setNewAssetName('');
    setNewAssetVal('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* 1. Big Friendly Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Logo variant="badge" size="xs" theme="light" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Módulo Operacional
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>Levantamento da Fazenda</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-medium">
            Escolha abaixo o que você quer ver ou anotar hoje:
          </p>
        </div>

        {/* 2. Five Big Simple Choice Cards (Tabs for low digital literacy) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
          {/* Option 1: Financeiro */}
          <button
            onClick={() => setCurrentSubTab('financeiro')}
            className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
              currentSubTab === 'financeiro'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-4 ring-emerald-100'
                : 'bg-emerald-50/50 hover:bg-emerald-100/50 text-gray-800 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">💰</span>
              {currentSubTab === 'financeiro' && (
                <span className="text-xs bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                  Aberto
                </span>
              )}
            </div>
            <div className="mt-3">
              <span className="text-base font-extrabold block">1. Dinheiro</span>
              <span className={`text-xs block mt-0.5 ${currentSubTab === 'financeiro' ? 'text-emerald-100' : 'text-gray-500'}`}>
                Entradas e Gastos
              </span>
            </div>
          </button>

          {/* Option 2: Planejamento */}
          <button
            onClick={() => setCurrentSubTab('planejamento')}
            className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
              currentSubTab === 'planejamento'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-4 ring-emerald-100'
                : 'bg-emerald-50/50 hover:bg-emerald-100/50 text-gray-800 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">📊</span>
              {currentSubTab === 'planejamento' && (
                <span className="text-xs bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                  Aberto
                </span>
              )}
            </div>
            <div className="mt-3">
              <span className="text-base font-extrabold block">2. Planejamento</span>
              <span className={`text-xs block mt-0.5 ${currentSubTab === 'planejamento' ? 'text-emerald-100' : 'text-gray-500'}`}>
                Metas do Mês
              </span>
            </div>
          </button>

          {/* Option 3: Produção */}
          <button
            onClick={() => setCurrentSubTab('producao')}
            className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
              currentSubTab === 'producao'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-4 ring-emerald-100'
                : 'bg-emerald-50/50 hover:bg-emerald-100/50 text-gray-800 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🌾</span>
              {currentSubTab === 'producao' && (
                <span className="text-xs bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                  Aberto
                </span>
              )}
            </div>
            <div className="mt-3">
              <span className="text-base font-extrabold block">3. Produção</span>
              <span className={`text-xs block mt-0.5 ${currentSubTab === 'producao' ? 'text-emerald-100' : 'text-gray-500'}`}>
                Colheitas e Leite
              </span>
            </div>
          </button>

          {/* Option 4: Defensivos */}
          <button
            onClick={() => setCurrentSubTab('defensivos')}
            className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
              currentSubTab === 'defensivos'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-4 ring-emerald-100'
                : 'bg-emerald-50/50 hover:bg-emerald-100/50 text-gray-800 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🧪</span>
              {currentSubTab === 'defensivos' && (
                <span className="text-xs bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                  Aberto
                </span>
              )}
            </div>
            <div className="mt-3">
              <span className="text-base font-extrabold block">4. Remédios & Adubo</span>
              <span className={`text-xs block mt-0.5 ${currentSubTab === 'defensivos' ? 'text-emerald-100' : 'text-gray-500'}`}>
                Galpão de Insumos
              </span>
            </div>
          </button>

          {/* Option 5: Patrimônio */}
          <button
            onClick={() => setCurrentSubTab('patrimonio')}
            className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
              currentSubTab === 'patrimonio'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-4 ring-emerald-100'
                : 'bg-emerald-50/50 hover:bg-emerald-100/50 text-gray-800 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🚜</span>
              {currentSubTab === 'patrimonio' && (
                <span className="text-xs bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                  Aberto
                </span>
              )}
            </div>
            <div className="mt-3">
              <span className="text-base font-extrabold block">5. Máquinas & Terras</span>
              <span className={`text-xs block mt-0.5 ${currentSubTab === 'patrimonio' ? 'text-emerald-100' : 'text-gray-500'}`}>
                Tratores e Bens
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. FINANCEIRO (Dinheiro) */}
      {/* ========================================================================= */}
      {currentSubTab === 'financeiro' && (
        <div className="space-y-6">
          {/* Big Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <ArrowUp className="w-5 h-5 text-emerald-700" />
                <span>Dinheiro que Entrou (Vendas)</span>
              </div>
              <p className="text-3xl font-black text-emerald-900 mt-2 tabular-nums">
                {formatBRL(totalReceitas)}
              </p>
              <p className="text-xs text-emerald-700 mt-1">Total de receitas recebidas</p>
            </div>

            <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <ArrowDown className="w-5 h-5 text-rose-700" />
                <span>Dinheiro que Saiu (Gastos)</span>
              </div>
              <p className="text-3xl font-black text-rose-900 mt-2 tabular-nums">
                {formatBRL(totalDespesas)}
              </p>
              <p className="text-xs text-rose-700 mt-1">Total de despesas pagas</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                <span>💰</span>
                <span>Sobrou no Caixa</span>
              </div>
              <p className="text-3xl font-black text-emerald-800 mt-2 tabular-nums">
                {formatBRL(totalSobra)}
              </p>
              <p className="text-xs text-emerald-600 font-bold mt-1">Saldo positivo da fazenda</p>
            </div>
          </div>

          {/* Large Action Buttons */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Lançamentos de Dinheiro
                </h3>
                <p className="text-sm text-gray-600">
                  Clique nos botões verdes abaixo para anotar qualquer dinheiro que entrou ou saiu:
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenQuickAction('receita')}
                  className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  <span>+ Anotar Entrada (Receita)</span>
                </button>

                <button
                  onClick={() => onOpenQuickAction('despesa')}
                  className="px-5 py-3 bg-[#0a2e23] hover:bg-[#062118] text-white rounded-2xl text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-5 h-5 text-emerald-400" />
                  <span>- Anotar Gasto (Despesa)</span>
                </button>
              </div>
            </div>

            {/* Simple Search & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setFinancialFilter('todos')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    financialFilter === 'todos' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Ver Todos
                </button>
                <button
                  onClick={() => setFinancialFilter('entradas')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    financialFilter === 'entradas' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Só Entradas
                </button>
                <button
                  onClick={() => setFinancialFilter('saidas')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    financialFilter === 'saidas' ? 'bg-rose-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Só Gastos
                </button>
                <button
                  onClick={() => setFinancialFilter('pendentes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    financialFilter === 'pendentes' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Contas que Faltam Pagar
                </button>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Procurar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* List / Table of records */}
            <div className="space-y-3 pt-3">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                  <p className="text-base font-bold text-gray-600">Nenhum lançamento encontrado.</p>
                  <p className="text-xs text-gray-400 mt-1">Use os botões verdes acima para adicionar um novo registro.</p>
                </div>
              ) : (
                filteredTransactions.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="p-4 rounded-2xl border-2 border-gray-100 hover:border-emerald-300 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 mt-0.5 ${
                        tx.type === 'receita' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {tx.type === 'receita' ? '+' : '-'}
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-gray-900 leading-snug">
                          {tx.description}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                          <span className="font-semibold">{tx.category}</span>
                          <span>·</span>
                          <span>{tx.date}</span>
                          <span>·</span>
                          <span>{tx.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      {/* Status toggle badge */}
                      <button
                        onClick={() => onToggleTransactionStatus(tx.id)}
                        title="Clique para mudar o status"
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                          tx.status === 'pago' 
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        }`}
                      >
                        {tx.status === 'pago' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5" />}
                        <span>{tx.status === 'pago' ? 'Já foi Pago' : 'Falta Pagar'}</span>
                      </button>

                      {/* Amount */}
                      <span className={`text-lg md:text-xl font-black tabular-nums ${
                        tx.type === 'receita' ? 'text-emerald-700' : 'text-gray-900'
                      }`}>
                        {tx.type === 'receita' ? '+' : '-'} {formatBRL(tx.amount)}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteTransaction(tx.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Apagar lançamento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PLANEJAMENTO (Metas do Mês) */}
      {/* ========================================================================= */}
      {currentSubTab === 'planejamento' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-gray-900">
              Previsão de Gastos do Mês
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Veja aqui quanto foi planejado gastar e quanto já foi gasto de verdade. As barras em vermelho avisam se você passou da conta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map((b) => {
              const percent = Math.round((b.realized / b.planned) * 100);
              const isOver = percent > 100;

              return (
                <div 
                  key={b.id}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    isOver ? 'bg-rose-50/50 border-rose-300' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-gray-900">{b.category}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Meta planejada: <strong className="text-gray-800">{formatBRL(b.planned)}</strong>
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
                      isOver ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-950'
                    }`}>
                      {isOver ? 'Passou do limite!' : 'Dentro do esperado'}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-gray-600">Já gastou: {formatBRL(b.realized)}</span>
                      <span className={isOver ? 'text-rose-700' : 'text-emerald-800'}>{percent}%</span>
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${Math.min(percent, 100)}%` }}
                        className={`h-full rounded-full transition-all ${isOver ? 'bg-rose-600' : 'bg-emerald-600'}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PRODUÇÃO (Colheitas e Leite) */}
      {/* ========================================================================= */}
      {currentSubTab === 'producao' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-black text-gray-900">
                Colheitas, Lavouras e Rebanho
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Acompanhe o que está plantado na fazenda e a quantidade colhida.
              </p>
            </div>

            <button
              onClick={() => onOpenQuickAction('producao')}
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start"
            >
              <Plus className="w-5 h-5" />
              <span>+ Anotar Colheita / Ordenha</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {productions.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl border-2 border-emerald-100 bg-white shadow-2xs hover:border-emerald-300 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-black text-gray-900">{p.cropName}</h4>
                    <p className="text-xs text-gray-500">{p.variety} · {p.fieldPlot}</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-md">
                      {p.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-400">ÁREA</span>
                    <p className="text-lg font-black text-gray-900">{p.areaHa} hectares</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total Colhido:</p>
                    <p className="text-xl font-black text-emerald-800 tabular-nums">
                      {p.harvestedTotal.toLocaleString('pt-BR')} {p.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Média por Área:</p>
                    <p className="text-sm font-bold text-gray-800">{p.productivity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DEFENSIVOS & INSUMOS (Remédios e Adubos) */}
      {/* ========================================================================= */}
      {currentSubTab === 'defensivos' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-black text-gray-900">
                Remédios, Venenos e Adubos no Galpão
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Controle o que tem guardado para não estragar ou vencer no estoque.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowInsumoModal(true)}
                className="px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>+ Novo Produto</span>
              </button>
              <button
                onClick={() => onOpenQuickAction('aplicacao')}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Anotar Aplicação no Campo</span>
              </button>
            </div>
          </div>

          {/* Simple Card Grid of Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insumos.map((i) => {
              const isCloseToExpire = i.daysToExpiration <= 30;

              return (
                <div 
                  key={i.id} 
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isCloseToExpire ? 'bg-rose-50/60 border-rose-300' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase">{i.category}</span>
                      <h4 className="text-base font-extrabold text-gray-900 leading-snug">{i.name}</h4>
                    </div>
                    {isCloseToExpire && (
                      <span className="px-2 py-0.5 bg-rose-200 text-rose-900 font-bold text-[10px] rounded-md shrink-0">
                        Vencendo!
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-gray-500">Tem no galpão:</p>
                      <p className="text-lg font-black text-gray-900">{i.currentStock} {i.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500">Validade:</p>
                      <p className={`font-bold ${isCloseToExpire ? 'text-rose-700' : 'text-gray-700'}`}>
                        {i.expirationDate}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. PATRIMÔNIO (Tratores, Carros e Terras) */}
      {/* ========================================================================= */}
      {currentSubTab === 'patrimonio' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-black text-gray-900">
                Máquinas, Veículos e Terras da Fazenda
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Tudo o que pertence à sua propriedade rural.
              </p>
            </div>

            <button
              onClick={() => setShowAssetModal(true)}
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start"
            >
              <Plus className="w-5 h-5" />
              <span>+ Anotar Bem ou Trator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patrimonio.map((asset) => (
              <div key={asset.id} className="p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-emerald-400 transition-all">
                <span className="text-[11px] font-bold text-gray-500 uppercase">{asset.category}</span>
                <h4 className="text-base font-extrabold text-gray-900 mt-0.5">{asset.name}</h4>
                <p className="text-xs text-gray-500">{asset.modelOrYear} · {asset.location}</p>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Valor Estimado:</span>
                    <p className="text-lg font-black text-emerald-800 tabular-nums">
                      {formatBRL(asset.currentValue)}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl">
                    {asset.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Simple Insumo Modal */}
      {showInsumoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-gray-900">Anotar Remédio ou Adubo</h3>
            <form onSubmit={handleSaveInsumo} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Produto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Glifosato Roundup ou Adubo NPK"
                  value={newInsumoName}
                  onChange={(e) => setNewInsumoName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-2 border-gray-300 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Quantidade</label>
                  <input
                    type="number"
                    placeholder="Ex: 50"
                    value={newInsumoQty}
                    onChange={(e) => setNewInsumoQty(e.target.value)}
                    className="w-full px-3.5 py-2.5 border-2 border-gray-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Unidade</label>
                  <select
                    value={newInsumoUnit}
                    onChange={(e) => setNewInsumoUnit(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl text-sm"
                  >
                    <option value="Litros">Litros</option>
                    <option value="Sacos">Sacos</option>
                    <option value="Quilos (kg)">Quilos (kg)</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowInsumoModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 text-white font-extrabold rounded-xl shadow-xs"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple Asset Modal */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-gray-900">Anotar Trator ou Bem</h3>
            <form onSubmit={handleSaveAsset} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Equipamento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Trator Massey Ferguson 4292"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-2 border-gray-300 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Ano / Modelo</label>
                  <input
                    type="text"
                    placeholder="Ex: 2022"
                    value={newAssetYear}
                    onChange={(e) => setNewAssetYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 border-2 border-gray-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Valor Estimado (R$)</label>
                  <input
                    type="number"
                    placeholder="Ex: 250000"
                    value={newAssetVal}
                    onChange={(e) => setNewAssetVal(e.target.value)}
                    className="w-full px-3.5 py-2.5 border-2 border-gray-300 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAssetModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 text-white font-extrabold rounded-xl shadow-xs"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
