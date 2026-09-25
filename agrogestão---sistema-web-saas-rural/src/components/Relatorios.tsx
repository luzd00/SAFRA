import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Printer, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  FileSpreadsheet, 
  CheckCircle, 
  PieChart, 
  SlidersHorizontal 
} from 'lucide-react';
import { Property, Transaction, ProductionRecord, BudgetCategory } from '../types';

interface RelatoriosProps {
  property: Property;
  transactions: Transaction[];
  productions: ProductionRecord[];
  budgets: BudgetCategory[];
}

export const Relatorios: React.FC<RelatoriosProps> = ({
  property,
  transactions,
  productions,
  budgets
}) => {
  const [selectedReport, setSelectedReport] = useState<'dre' | 'rentabilidade' | 'insumos' | 'patrimonio'>('dre');
  const [selectedSafra, setSelectedSafra] = useState('Safra 2024/2025');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Data,Descricao,Categoria,Tipo,Valor\n" + 
      transactions.map(e => `${e.date},"${e.description}","${e.category}",${e.type},${e.amount}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `relatorio_safra_${property.name.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Planilha CSV exportada com sucesso!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculations for DRE
  const receitaBruta = transactions
    .filter(t => t.type === 'receita')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const deducoes = receitaBruta * 0.015; // Funrural 1.5%
  const receitaLiquida = receitaBruta - deducoes;

  const insumosCustos = transactions
    .filter(t => t.type === 'despesa' && (t.category === 'Defensivos' || t.category === 'Alimentação animal'))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const combustivelCustos = transactions
    .filter(t => t.type === 'despesa' && t.category === 'Combustível')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const custosVariaveis = insumosCustos + combustivelCustos;
  const margemBruta = receitaLiquida - custosVariaveis;

  const despesasOperacionais = transactions
    .filter(t => t.type === 'despesa' && (t.category === 'Manutenção' || t.category === 'Outros' || t.category === 'Mão de Obra'))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const ebitda = margemBruta - despesasOperacionais;
  const depreciacao = 6500;
  const lucroLiquidoRural = ebitda - depreciacao;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#0a2e23] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner and Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                Central de Relatórios Analíticos
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Demonstrativos contábeis rurais, DRE gerencial, margem de contribuição por talhão e relatórios para crédito agrícola e bancos.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>Exportar Planilha (CSV)</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#0a2e23] hover:bg-[#062118] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Imprimir / Gerar PDF</span>
            </button>
          </div>
        </div>

        {/* Report Selector Tabs & Period Filter */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedReport('dre')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedReport === 'dre'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              1. DRE Rural Gerencial
            </button>
            <button
              onClick={() => setSelectedReport('rentabilidade')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedReport === 'rentabilidade'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              2. Rentabilidade por Cultura
            </button>
            <button
              onClick={() => setSelectedReport('insumos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedReport === 'insumos'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              3. Eficiência de Insumos
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Período:</span>
            <select
              value={selectedSafra}
              onChange={(e) => setSelectedSafra(e.target.value)}
              className="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
            >
              <option value="Safra 2024/2025">Ano Agrícola 2024/2025</option>
              <option value="Safra 2023/2024">Ano Agrícola 2023/2024</option>
              <option value="Mês Atual">Setembro / 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* REPORT CONTENT 1: DRE RURAL */}
      {selectedReport === 'dre' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Demonstrativo de Resultado do Exercício (DRE Rural)
              </h3>
              <p className="text-xs text-gray-500">
                Propriedade: {property.name} · Município: {property.location} · {selectedSafra}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase font-bold">Margem Líquida</span>
              <p className="text-lg font-extrabold text-emerald-700">
                {Math.round((lucroLiquidoRural / (receitaBruta || 1)) * 100)}%
              </p>
            </div>
          </div>

          {/* DRE Structure Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <tbody className="divide-y divide-gray-100">
                {/* 1. Receita Bruta */}
                <tr className="bg-emerald-50/50 font-bold text-gray-900">
                  <td className="py-2.5 px-4">1. RECEITA BRUTA DA ATIVIDADE RURAL</td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-emerald-800">
                    {formatBRL(receitaBruta)}
                  </td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-gray-400">100,0%</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-1.5 px-6 pl-8">· Venda de Grãos e Café (Contratos & Mercado Físico)</td>
                  <td className="py-1.5 px-4 text-right tabular-nums">{formatBRL(54000)}</td>
                  <td className="py-1.5 px-4 text-right text-gray-400">68,8%</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-1.5 px-6 pl-8">· Produção de Leite e Derivados Entregues</td>
                  <td className="py-1.5 px-4 text-right tabular-nums">{formatBRL(18950)}</td>
                  <td className="py-1.5 px-4 text-right text-gray-400">24,1%</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-1.5 px-6 pl-8">· Venda de Animais / Descarte</td>
                  <td className="py-1.5 px-4 text-right tabular-nums">{formatBRL(5470)}</td>
                  <td className="py-1.5 px-4 text-right text-gray-400">7,1%</td>
                </tr>

                {/* 2. Deduções */}
                <tr className="text-gray-700">
                  <td className="py-2 px-4 font-semibold text-rose-800">(-) DEDUÇÕES DA RECEITA BRUTA (Funrural 1,5% e Fretes)</td>
                  <td className="py-2 px-4 text-right tabular-nums text-rose-600 font-semibold">
                    - {formatBRL(deducoes)}
                  </td>
                  <td className="py-2 px-4 text-right text-gray-400">-1,5%</td>
                </tr>

                {/* 3. Receita Líquida */}
                <tr className="bg-gray-50/80 font-bold text-gray-900 border-t border-b border-gray-200">
                  <td className="py-2.5 px-4">(=) RECEITA OPERACIONAL LÍQUIDA</td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-emerald-900 font-extrabold">
                    {formatBRL(receitaLiquida)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-gray-500">98,5%</td>
                </tr>

                {/* 4. Custos Variáveis */}
                <tr className="text-gray-700">
                  <td className="py-2.5 px-4 font-semibold text-rose-800">(-) CUSTOS VARIÁVEIS DIRETOS DA PRODUÇÃO</td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-rose-600 font-semibold">
                    - {formatBRL(custosVariaveis)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-gray-400">
                    -{Math.round((custosVariaveis / receitaBruta) * 100)}%
                  </td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-1.5 px-6 pl-8">· Defensivos, Insumos Químicos e Fertilizantes</td>
                  <td className="py-1.5 px-4 text-right tabular-nums">{formatBRL(8510.40)}</td>
                  <td className="py-1.5 px-4 text-right text-gray-400">10,8%</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-1.5 px-6 pl-8">· Alimentação do Rebanho, Silagem e Concentrados</td>
                  <td className="py-1.5 px-4 text-right tabular-nums">{formatBRL(15129.60)}</td>
                  <td className="py-1.5 px-4 text-right text-gray-400">19,3%</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-1.5 px-6 pl-8">· Óleo Diesel S10 e Combustíveis de Máquinas</td>
                  <td className="py-1.5 px-4 text-right tabular-nums">{formatBRL(11347.20)}</td>
                  <td className="py-1.5 px-4 text-right text-gray-400">14,4%</td>
                </tr>

                {/* 5. Margem Bruta */}
                <tr className="bg-emerald-50/30 font-bold text-gray-900 border-t border-b border-emerald-100">
                  <td className="py-2.5 px-4">(=) MARGEM BRUTA DO PRODUTOR</td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-emerald-800 font-extrabold">
                    {formatBRL(margemBruta)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-700 font-bold">
                    {Math.round((margemBruta / receitaBruta) * 100)}%
                  </td>
                </tr>

                {/* 6. Despesas Operacionais */}
                <tr className="text-gray-700">
                  <td className="py-2.5 px-4 font-semibold text-rose-800">(-) DESPESAS FIXAS E OPERACIONAIS</td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-rose-600 font-semibold">
                    - {formatBRL(despesasOperacionais)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-gray-400">
                    -{Math.round((despesasOperacionais / receitaBruta) * 100)}%
                  </td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-1.5 px-6 pl-8">· Manutenção de Maquinários, Implementos e Oficina</td>
                  <td className="py-1.5 px-4 text-right tabular-nums">{formatBRL(6619.20)}</td>
                  <td className="py-1.5 px-4 text-right text-gray-400">8,4%</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-1.5 px-6 pl-8">· Energia Elétrica Rural, Internet e Outros</td>
                  <td className="py-1.5 px-4 text-right tabular-nums">{formatBRL(5673.60)}</td>
                  <td className="py-1.5 px-4 text-right text-gray-400">7,2%</td>
                </tr>

                {/* 7. EBITDA Rural */}
                <tr className="bg-gray-100 font-bold text-gray-900 border-t border-b border-gray-300">
                  <td className="py-2.5 px-4">(=) RESULTADO ANTES DA DEPRECIAÇÃO (EBITDA RURAL)</td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-gray-900 font-extrabold">
                    {formatBRL(ebitda)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-gray-700 font-bold">
                    {Math.round((ebitda / receitaBruta) * 100)}%
                  </td>
                </tr>

                {/* 8. Depreciação */}
                <tr className="text-gray-600">
                  <td className="py-2 px-4">(-) Provisão de Depreciação de Frota e Silos</td>
                  <td className="py-2 px-4 text-right tabular-nums text-rose-600">- {formatBRL(depreciacao)}</td>
                  <td className="py-2 px-4 text-right text-gray-400">-8,3%</td>
                </tr>

                {/* 9. Lucro Líquido Final */}
                <tr className="bg-[#0a2e23] font-bold text-white text-base">
                  <td className="py-3.5 px-4">(=) LUCRO LÍQUIDO FINAL DO PRODUTOR</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-emerald-300 font-black text-lg">
                    {formatBRL(lucroLiquidoRural)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">
                    {Math.round((lucroLiquidoRural / receitaBruta) * 100)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT CONTENT 2: RENTABILIDADE POR CULTURA */}
      {selectedReport === 'rentabilidade' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Margem e Rentabilidade por Atividade Agrícola</h3>
          <p className="text-xs text-gray-500">Comparativo de margem de contribuição por hectare e unidade produzida</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-gray-200 bg-emerald-50/40">
              <span className="text-xs font-bold text-emerald-900">Soja Safra 24/25</span>
              <p className="text-xl font-extrabold text-gray-900 mt-1">R$ 2.450 / ha</p>
              <p className="text-xs text-emerald-700 mt-1">Margem Líquida estimada: 42%</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-emerald-50/40">
              <span className="text-xs font-bold text-emerald-900">Milho Safrinha</span>
              <p className="text-xl font-extrabold text-gray-900 mt-1">R$ 1.680 / ha</p>
              <p className="text-xs text-emerald-700 mt-1">Margem Líquida realizada: 36%</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-emerald-50/40">
              <span className="text-xs font-bold text-emerald-900">Pecuária de Leite</span>
              <p className="text-xl font-extrabold text-gray-900 mt-1">R$ 0,72 / Litro</p>
              <p className="text-xs text-emerald-700 mt-1">Custo operacional efetivo: R$ 1,78/L</p>
            </div>
          </div>
        </div>
      )}

      {/* REPORT CONTENT 3: EFICIÊNCIA DE INSUMOS */}
      {selectedReport === 'insumos' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Consumo de Insumos e Eficiência Operacional</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 font-medium">Consumo Médio de Diesel por Trator</p>
              <p className="text-xl font-extrabold text-gray-900 mt-1">14,2 L / hora trabalhada</p>
              <p className="text-xs text-amber-600 mt-1">Alvo recomendado: 12,5 L/h</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 font-medium">Custo Médio de Defensivos por Hectare</p>
              <p className="text-xl font-extrabold text-gray-900 mt-1">R$ 185,00 / ha</p>
              <p className="text-xs text-emerald-600 mt-1">Dentro da meta safra 24/25</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
