import React, { useState } from 'react';
import { 
  Printer, 
  FileText, 
  Check, 
  Sliders, 
  Eye, 
  Calendar, 
  PenTool, 
  FileDown, 
  Sparkles 
} from 'lucide-react';
import { Property, Transaction, BudgetCategory, ProductionRecord, InsumoStock, DefensivoApplication } from '../types';
import { Logo } from './Logo';

interface FormulariosImpressaoProps {
  property: Property;
  transactions: Transaction[];
  budgets: BudgetCategory[];
  productions: ProductionRecord[];
  insumos: InsumoStock[];
  applications: DefensivoApplication[];
}

export type FormSheetType = 
  | 'financeiro-diario' 
  | 'orcamento-mensal' 
  | 'producao-leite' 
  | 'aplicacao-defensivos' 
  | 'estoque-almoxarifado';

export const FormulariosImpressao: React.FC<FormulariosImpressaoProps> = ({
  property,
  transactions,
  budgets,
  productions,
  insumos,
  applications
}) => {
  const [selectedSheet, setSelectedSheet] = useState<FormSheetType>('financeiro-diario');
  const [mode, setMode] = useState<'em-branco' | 'com-dados'>('em-branco');
  const [rowsCount, setRowsCount] = useState<number>(14);

  const handlePrint = () => {
    window.print();
  };

  const getSheetTitle = () => {
    switch (selectedSheet) {
      case 'financeiro-diario': return 'FICHA DE CONTROLE FINANCEIRO DIÁRIO DE CAMPO';
      case 'orcamento-mensal': return 'PLANILHA DE PLANEJAMENTO & ORÇAMENTO MENSAL';
      case 'producao-leite': return 'FICHA DIÁRIA DE PRODUÇÃO, ORDENHA E COLHEITAS';
      case 'aplicacao-defensivos': return 'REGISTRO DE APLICAÇÃO DE DEFENSIVOS & CARÊNCIA';
      case 'estoque-almoxarifado': return 'FICHA DE MOVIMENTAÇÃO DE ESTOQUE E ALMOXARIFADO';
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-150">
      {/* Top Banner (hidden on print) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo variant="badge" size="xs" theme="light" />
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                Formulários Otimizados para Impressão A4
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Fichas profissionais com tipografia limpa, linhas espaçosas para prancheta e anotação manual direta na lida diária do campo.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#0a2e23] hover:bg-[#062118] text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:shadow-lg shrink-0"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Imprimir Ficha (A4)</span>
          </button>
        </div>

        {/* Form Selector and Print Mode Controls */}
        <div className="pt-4 flex flex-col gap-4">
          {/* Models tabs with touch scroll */}
          <div>
            <div className="flex items-center justify-between pb-1 sm:hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Selecione o Modelo:</span>
              <span className="text-[10px] text-emerald-700 font-medium">← Deslize para ver todos →</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-0.5 -mx-1 px-1 scrollbar-thin">
              <button
                onClick={() => setSelectedSheet('financeiro-diario')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedSheet === 'financeiro-diario'
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                1. Financeiro Diário
              </button>
              <button
                onClick={() => setSelectedSheet('orcamento-mensal')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedSheet === 'orcamento-mensal'
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                2. Planejamento Mensal
              </button>
              <button
                onClick={() => setSelectedSheet('producao-leite')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedSheet === 'producao-leite'
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                3. Produção & Leite
              </button>
              <button
                onClick={() => setSelectedSheet('aplicacao-defensivos')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedSheet === 'aplicacao-defensivos'
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4. Aplicação Defensivos
              </button>
              <button
                onClick={() => setSelectedSheet('estoque-almoxarifado')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedSheet === 'estoque-almoxarifado'
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                5. Estoque Almoxarifado
              </button>
            </div>
          </div>

          {/* Toggle between Blank Lines for Manual Writing vs With System Seed Data */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-700 font-bold">Modo de Preenchimento:</span>
            <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl gap-1 w-full sm:w-auto">
              <button
                onClick={() => setMode('em-branco')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  mode === 'em-branco' ? 'bg-white text-emerald-950 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Em Branco (Prancheta)</span>
              </button>
              <button
                onClick={() => setMode('com-dados')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  mode === 'com-dados' ? 'bg-white text-emerald-950 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Preenchido com Dados</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile helper notice for sheet scrolling */}
      <div className="block sm:hidden text-center text-[11px] text-gray-500 py-1.5 px-3 bg-gray-100/80 rounded-xl no-print">
        ↔ Dica: deslize a folha abaixo lateralmente para ver todas as colunas
      </div>

      {/* ========================================================================= */}
      {/* THE PRINTABLE SHEET CANVAS (OPTIMIZED FOR A4) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-10 border border-gray-300 shadow-lg max-w-[960px] mx-auto print-page font-sans text-black overflow-x-auto print:overflow-visible">
        {/* Document Header matching official rural agronomy standards */}
        <div className="border-b-2 border-black pb-4 mb-4 min-w-[560px] print:min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Logo variant="print" className="shrink-0" />
              <div className="border-l-2 border-gray-300 pl-3">
                <h1 className="text-lg md:text-xl font-black uppercase tracking-tight text-black">
                  {property.name}
                </h1>
                <p className="text-xs font-medium text-black">
                  CAR: {property.car} · IE: {property.ie} · Município: {property.location}
                </p>
                <p className="text-[11px] text-gray-700 italic">
                  Atividade: {property.mainActivity} · Área Total: {property.areaHa} ha
                </p>
              </div>
            </div>

            <div className="text-right border border-black p-2 rounded-md bg-gray-50 min-w-44 shrink-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-black">
                SISTEMA SAFRA
              </span>
              <span className="block text-xs font-extrabold text-black">
                {getSheetTitle().slice(0, 32)}
              </span>
              <span className="block text-[10px] text-gray-700">
                Folha Oficial de Campo
              </span>
            </div>
          </div>

          {/* Metadata Fillable Strip */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-dashed border-gray-400 text-xs">
            <div>
              <span className="font-bold">Data de Referência:</span> ___________________
            </div>
            <div>
              <span className="font-bold">Responsável / Operador:</span> ___________________
            </div>
            <div className="text-right">
              <span className="font-bold">Visto / Assinatura:</span> ___________________
            </div>
          </div>
        </div>

        {/* SHEET 1: CONTROLE FINANCEIRO DIÁRIO */}
        {selectedSheet === 'financeiro-diario' && (
          <div className="space-y-4 min-w-[660px] print:min-w-0">
            <div className="flex items-center justify-between text-xs font-bold border-b border-gray-400 pb-1">
              <span>LIVRO CAIXA & APONTAMENTO DIÁRIO DE ENTRADAS E SAÍDAS</span>
              <span>MOEDA: REAL (R$)</span>
            </div>

            <table className="w-full text-left border-collapse text-xs border border-black">
              <thead>
                <tr className="bg-gray-100 border-b border-black font-black text-[11px]">
                  <th className="py-2 px-2 border-r border-black w-20">Data</th>
                  <th className="py-2 px-2 border-r border-black">Descrição do Lançamento / Favorecido</th>
                  <th className="py-2 px-2 border-r border-black w-28">Categoria</th>
                  <th className="py-2 px-2 border-r border-black w-24 text-right">Entrada (+)</th>
                  <th className="py-2 px-2 border-r border-black w-24 text-right">Saída (-)</th>
                  <th className="py-2 px-2 border-r border-black w-24">Forma Pgto</th>
                  <th className="py-2 px-2 w-28">Observações</th>
                </tr>
              </thead>
              <tbody>
                {mode === 'com-dados' ? (
                  transactions.slice(0, 14).map((tx, idx) => (
                    <tr key={idx} className="border-b border-gray-300">
                      <td className="py-2 px-2 border-r border-black font-mono">{tx.date}</td>
                      <td className="py-2 px-2 border-r border-black font-medium">{tx.description}</td>
                      <td className="py-2 px-2 border-r border-black">{tx.category}</td>
                      <td className="py-2 px-2 border-r border-black text-right font-bold">
                        {tx.type === 'receita' ? tx.amount.toFixed(2) : '-'}
                      </td>
                      <td className="py-2 px-2 border-r border-black text-right font-bold">
                        {tx.type === 'despesa' ? tx.amount.toFixed(2) : '-'}
                      </td>
                      <td className="py-2 px-2 border-r border-black">{tx.paymentMethod}</td>
                      <td className="py-2 px-2 text-[10px]">{tx.notes || '-'}</td>
                    </tr>
                  ))
                ) : (
                  Array.from({ length: rowsCount }).map((_, idx) => (
                    <tr key={idx} className="border-b border-dashed border-gray-300 h-9">
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td></td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold border-t-2 border-black">
                  <td colSpan={3} className="py-2 px-2 border-r border-black text-right">TOTAIS DO PERÍODO:</td>
                  <td className="py-2 px-2 border-r border-black text-right">R$ _________</td>
                  <td className="py-2 px-2 border-r border-black text-right">R$ _________</td>
                  <td colSpan={2} className="py-2 px-2">SALDO: R$ _____________</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* SHEET 2: PLANEJAMENTO E ORÇAMENTO MENSAL */}
        {selectedSheet === 'orcamento-mensal' && (
          <div className="space-y-4 min-w-[660px] print:min-w-0">
            <div className="flex items-center justify-between text-xs font-bold border-b border-gray-400 pb-1">
              <span>CONTROLE ORÇAMENTÁRIO: PLANEJADO X REALIZADO</span>
              <span>SAFRA 2024/2025</span>
            </div>

            <table className="w-full text-left border-collapse text-xs border border-black">
              <thead>
                <tr className="bg-gray-100 border-b border-black font-black text-[11px]">
                  <th className="py-2 px-2 border-r border-black">Categoria de Despesa</th>
                  <th className="py-2 px-2 border-r border-black w-32 text-right">Planejado (R$)</th>
                  <th className="py-2 px-2 border-r border-black w-32 text-right">Realizado (R$)</th>
                  <th className="py-2 px-2 border-r border-black w-32 text-right">Diferença (R$)</th>
                  <th className="py-2 px-2 w-44">Parecer do Gestor / Justificativa</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((b, idx) => (
                  <tr key={idx} className="border-b border-gray-300 h-9">
                    <td className="py-2 px-2 border-r border-black font-bold">{b.category}</td>
                    <td className="py-2 px-2 border-r border-black text-right font-mono">
                      {mode === 'com-dados' ? b.planned.toFixed(2) : ''}
                    </td>
                    <td className="py-2 px-2 border-r border-black text-right font-mono font-bold">
                      {mode === 'com-dados' ? b.realized.toFixed(2) : ''}
                    </td>
                    <td className="py-2 px-2 border-r border-black text-right font-mono">
                      {mode === 'com-dados' ? (b.planned - b.realized).toFixed(2) : ''}
                    </td>
                    <td className="py-2 px-2 text-[10px]">
                      {mode === 'com-dados' && b.realized > b.planned ? 'Estouro autorizado de emergência' : ''}
                    </td>
                  </tr>
                ))}
                {Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={`extra-${idx}`} className="border-b border-dashed border-gray-300 h-9">
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SHEET 3: CONTROLE DE PRODUÇÃO E LEITE */}
        {selectedSheet === 'producao-leite' && (
          <div className="space-y-4 min-w-[660px] print:min-w-0">
            <div className="flex items-center justify-between text-xs font-bold border-b border-gray-400 pb-1">
              <span>CONTROLE DIÁRIO DE ORDENHA, PESAGEM E PRODUÇÃO AGROPECUÁRIA</span>
              <span>MEDIDAS: LITROS (L) / SACAS (SC)</span>
            </div>

            <table className="w-full text-left border-collapse text-xs border border-black">
              <thead>
                <tr className="bg-gray-100 border-b border-black font-black text-[11px]">
                  <th className="py-2 px-2 border-r border-black w-24">Data / Hora</th>
                  <th className="py-2 px-2 border-r border-black">Lote / Animal / Talhão</th>
                  <th className="py-2 px-2 border-r border-black w-24 text-right">Ordenha 1</th>
                  <th className="py-2 px-2 border-r border-black w-24 text-right">Ordenha 2</th>
                  <th className="py-2 px-2 border-r border-black w-28 text-right">Total Diário</th>
                  <th className="py-2 px-2 border-r border-black w-28 text-right">Média / Vaca</th>
                  <th className="py-2 px-2 w-36">Assinatura / Visto</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 14 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-dashed border-gray-300 h-9">
                    <td className="border-r border-black font-mono">
                      {mode === 'com-dados' && idx < 5 ? `2026-09-0${idx + 1}` : ''}
                    </td>
                    <td className="border-r border-black">
                      {mode === 'com-dados' && idx < 5 ? 'Lote 01 (Vacas Alta Produção)' : ''}
                    </td>
                    <td className="border-r border-black text-right font-mono">
                      {mode === 'com-dados' && idx < 5 ? '420 L' : ''}
                    </td>
                    <td className="border-r border-black text-right font-mono">
                      {mode === 'com-dados' && idx < 5 ? '385 L' : ''}
                    </td>
                    <td className="border-r border-black text-right font-bold font-mono">
                      {mode === 'com-dados' && idx < 5 ? '805 L' : ''}
                    </td>
                    <td className="border-r border-black text-right font-mono">
                      {mode === 'com-dados' && idx < 5 ? '20,1 L' : ''}
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SHEET 4: APLICAÇÃO DE DEFENSIVOS */}
        {selectedSheet === 'aplicacao-defensivos' && (
          <div className="space-y-4 min-w-[660px] print:min-w-0">
            <div className="flex items-center justify-between text-xs font-bold border-b border-gray-400 pb-1">
              <span>FICHA OFICIAL DE RECEITUÁRIO AGRONÔMICO E APLICAÇÃO DE AGROTÓXICOS</span>
              <span>LEGISLAÇÃO AGROPECUÁRIA</span>
            </div>

            <table className="w-full text-left border-collapse text-xs border border-black">
              <thead>
                <tr className="bg-gray-100 border-b border-black font-black text-[11px]">
                  <th className="py-2 px-2 border-r border-black w-20">Data</th>
                  <th className="py-2 px-2 border-r border-black w-24">Cultura / Alvo</th>
                  <th className="py-2 px-2 border-r border-black w-24">Talhão / Área</th>
                  <th className="py-2 px-2 border-r border-black">Produto Comercial & Princípio</th>
                  <th className="py-2 px-2 border-r border-black w-24 text-right">Dosagem/ha</th>
                  <th className="py-2 px-2 border-r border-black w-24 text-center">Carência</th>
                  <th className="py-2 px-2 w-32">Operador / EPI</th>
                </tr>
              </thead>
              <tbody>
                {mode === 'com-dados' ? (
                  applications.map((app, idx) => (
                    <tr key={idx} className="border-b border-gray-300 h-9">
                      <td className="py-2 px-2 border-r border-black font-mono">{app.date}</td>
                      <td className="py-2 px-2 border-r border-black">{app.crop}</td>
                      <td className="py-2 px-2 border-r border-black font-bold">{app.plot}</td>
                      <td className="py-2 px-2 border-r border-black">{app.productName}</td>
                      <td className="py-2 px-2 border-r border-black text-right font-mono">{app.dosePerHa}</td>
                      <td className="py-2 px-2 border-r border-black text-center font-bold">{app.gracePeriodDays} dias</td>
                      <td className="py-2 px-2 text-[10px]">{app.responsible}</td>
                    </tr>
                  ))
                ) : (
                  Array.from({ length: 13 }).map((_, idx) => (
                    <tr key={idx} className="border-b border-dashed border-gray-300 h-9">
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* SHEET 5: ESTOQUE E ALMOXARIFADO */}
        {selectedSheet === 'estoque-almoxarifado' && (
          <div className="space-y-4 min-w-[660px] print:min-w-0">
            <div className="flex items-center justify-between text-xs font-bold border-b border-gray-400 pb-1">
              <span>FICHA DE CONTROLE FÍSICO DE ESTOQUE E ALMOXARIFADO RURAL</span>
              <span>DEPÓSITO GERAL</span>
            </div>

            <table className="w-full text-left border-collapse text-xs border border-black">
              <thead>
                <tr className="bg-gray-100 border-b border-black font-black text-[11px]">
                  <th className="py-2 px-2 border-r border-black">Item / Produto</th>
                  <th className="py-2 px-2 border-r border-black w-24">Lote / Fab.</th>
                  <th className="py-2 px-2 border-r border-black w-20 text-right">Entrada</th>
                  <th className="py-2 px-2 border-r border-black w-20 text-right">Saída</th>
                  <th className="py-2 px-2 border-r border-black w-24 text-right">Saldo Físico</th>
                  <th className="py-2 px-2 border-r border-black w-24 text-center">Validade</th>
                  <th className="py-2 px-2 w-32">Conferido Por</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 14 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-dashed border-gray-300 h-9">
                    <td className="border-r border-black font-medium">
                      {mode === 'com-dados' && insumos[idx] ? insumos[idx].name : ''}
                    </td>
                    <td className="border-r border-black font-mono">
                      {mode === 'com-dados' && insumos[idx] ? insumos[idx].batchNumber : ''}
                    </td>
                    <td className="border-r border-black text-right"></td>
                    <td className="border-r border-black text-right"></td>
                    <td className="border-r border-black text-right font-bold font-mono">
                      {mode === 'com-dados' && insumos[idx] ? `${insumos[idx].currentStock} ${insumos[idx].unit}` : ''}
                    </td>
                    <td className="border-r border-black text-center font-mono">
                      {mode === 'com-dados' && insumos[idx] ? insumos[idx].expirationDate : ''}
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer with Signatures for Audit & Field Compliance */}
        <div className="mt-8 pt-4 border-t-2 border-black grid grid-cols-2 gap-8 text-xs text-center min-w-[560px] print:min-w-0">
          <div>
            <div className="border-b border-black w-3/4 mx-auto mb-1 h-8"></div>
            <p className="font-bold">Responsável Técnico / Agrônomo</p>
            <p className="text-[10px] text-gray-600">CREA / Matrícula</p>
          </div>
          <div>
            <div className="border-b border-black w-3/4 mx-auto mb-1 h-8"></div>
            <p className="font-bold">Proprietário / Gerente de Operações</p>
            <p className="text-[10px] text-gray-600">{property.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
