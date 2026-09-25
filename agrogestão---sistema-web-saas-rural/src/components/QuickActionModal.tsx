import React, { useState } from 'react';
import { X, CheckCircle, Plus } from 'lucide-react';
import { Transaction, ProductionRecord, DefensivoApplication } from '../types';

export type QuickActionType = 'receita' | 'despesa' | 'producao' | 'aplicacao' | null;

interface QuickActionModalProps {
  type: QuickActionType;
  onClose: () => void;
  onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
  onAddProduction: (p: Omit<ProductionRecord, 'id' | 'updatedAt'>) => void;
  onAddApplication: (a: Omit<DefensivoApplication, 'id'>) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  type,
  onClose,
  onAddTransaction,
  onAddProduction,
  onAddApplication,
}) => {
  if (!type) return null;

  // Receita / Despesa state
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transferência Bancária / PIX');
  const [status, setStatus] = useState<'pago' | 'pendente'>('pago');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cropOrSector, setCropOrSector] = useState('');
  const [notes, setNotes] = useState('');

  // Produção state
  const [cropName, setCropName] = useState('Soja Safra 24/25');
  const [variety, setVariety] = useState('TMG 7062 IPRO');
  const [fieldPlot, setFieldPlot] = useState('Talhão 01');
  const [areaHa, setAreaHa] = useState('50');
  const [harvestedTotal, setHarvestedTotal] = useState('');
  const [unit, setUnit] = useState('sc (60kg)');
  const [prodStatus, setProdStatus] = useState<'Plantio' | 'Desenvolvimento' | 'Colheita' | 'Concluído'>('Colheita');

  // Aplicação state
  const [productName, setProductName] = useState('Fox Xpro (Fungicida)');
  const [plot, setPlot] = useState('Talhão 02 (50 ha)');
  const [dosePerHa, setDosePerHa] = useState('0.50 L/ha');
  const [appTotalArea, setAppTotalArea] = useState('50');
  const [responsible, setResponsible] = useState('Claudinei Ribeiro');
  const [gracePeriod, setGracePeriod] = useState('14');

  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'receita' || type === 'despesa') {
      const parsedAmount = parseFloat(amount.replace(/[^\d.,]/g, '').replace(',', '.'));
      if (isNaN(parsedAmount) || parsedAmount <= 0) return;

      onAddTransaction({
        date,
        description: desc || (type === 'receita' ? 'Receita Agrícola' : 'Despesa Rural'),
        type,
        category: category || (type === 'receita' ? 'Venda de Produção' : 'Outros'),
        amount: parsedAmount,
        paymentMethod,
        status,
        cropOrSector: cropOrSector || 'Geral',
        notes
      });
    } else if (type === 'producao') {
      const parsedHarvested = parseFloat(harvestedTotal) || 0;
      const parsedArea = parseFloat(areaHa) || 1;
      const prodCalc = (parsedHarvested / parsedArea).toFixed(1);

      onAddProduction({
        cropName,
        variety,
        fieldPlot,
        areaHa: parsedArea,
        expectedTotal: parsedHarvested * 1.1,
        harvestedTotal: parsedHarvested,
        unit,
        productivity: `${prodCalc} ${unit}/ha`,
        status: prodStatus
      });
    } else if (type === 'aplicacao') {
      onAddApplication({
        date,
        crop: cropName,
        plot,
        productName,
        dosePerHa,
        totalAreaHa: parseFloat(appTotalArea) || 10,
        responsible,
        gracePeriodDays: parseInt(gracePeriod) || 14,
        status: 'Concluído'
      });
    }

    setFeedbackSuccess(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const getTitle = () => {
    switch (type) {
      case 'receita': return 'Registrar Nova Receita';
      case 'despesa': return 'Registrar Novo Gasto / Despesa';
      case 'producao': return 'Registrar Colheita / Produção';
      case 'aplicacao': return 'Registrar Aplicação de Insumo / Defensivo';
      default: return 'Novo Lançamento';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#0a2e23] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/80 flex items-center justify-center text-emerald-200">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">{getTitle()}</h3>
              <p className="text-xs text-emerald-300">Fazenda Boa Esperança</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {feedbackSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Registro Salvo com Sucesso!</h4>
              <p className="text-sm text-gray-500">Os dados foram atualizados nos relatórios e gráficos.</p>
            </div>
          ) : (
            <>
              {/* Type: RECEITA OU DESPESA */}
              {(type === 'receita' || type === 'despesa') && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Descrição do Lançamento *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={type === 'receita' ? 'Ex: Venda de 500 sacas de Soja' : 'Ex: Abastecimento Trator 6110M'}
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Valor (R$) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="0,00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Data *
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Categoria
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                      >
                        {type === 'receita' ? (
                          <>
                            <option value="Venda de Produção">Venda de Produção</option>
                            <option value="Contratos Futuros">Contratos Futuros</option>
                            <option value="Venda de Animais">Venda de Animais</option>
                            <option value="Aluguel de Pasto">Aluguel de Pasto</option>
                            <option value="Outros">Outros</option>
                          </>
                        ) : (
                          <>
                            <option value="Alimentação animal">Alimentação animal</option>
                            <option value="Combustível">Combustível</option>
                            <option value="Defensivos">Defensivos</option>
                            <option value="Manutenção">Manutenção</option>
                            <option value="Mão de Obra">Mão de Obra</option>
                            <option value="Outros">Outros</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Forma de Pagamento
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                      >
                        <option value="Transferência Bancária / PIX">PIX / Transferência</option>
                        <option value="Boleto Bancário">Boleto Bancário</option>
                        <option value="Cartão Corporativo">Cartão Corporativo</option>
                        <option value="À Vista em Dinheiro">À Vista em Dinheiro</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Cultura / Setor
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Soja Talhão 2"
                        value={cropOrSector}
                        onChange={(e) => setCropOrSector(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Status do Pagamento
                      </label>
                      <div className="flex gap-2 pt-1">
                        <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer">
                          <input
                            type="radio"
                            name="txStatus"
                            checked={status === 'pago'}
                            onChange={() => setStatus('pago')}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>Efetivado (Pago)</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer">
                          <input
                            type="radio"
                            name="txStatus"
                            checked={status === 'pendente'}
                            onChange={() => setStatus('pendente')}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>Pendente / A Pagar</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Observações Adicionais
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Informações adicionais do fornecedor ou contrato..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Type: PRODUÇÃO */}
              {type === 'producao' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Cultura ou Rebanho *
                      </label>
                      <select
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      >
                        <option value="Soja Safra 24/25">Soja Safra 24/25</option>
                        <option value="Milho Safrinha">Milho Safrinha</option>
                        <option value="Leite Ordenha B">Leite Ordenha B</option>
                        <option value="Café Arábica">Café Arábica</option>
                        <option value="Gado de Corte">Gado de Corte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Variedade / Linhagem
                      </label>
                      <input
                        type="text"
                        value={variety}
                        onChange={(e) => setVariety(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Talhão / Piquete
                      </label>
                      <input
                        type="text"
                        value={fieldPlot}
                        onChange={(e) => setFieldPlot(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Área (ha)
                      </label>
                      <input
                        type="number"
                        value={areaHa}
                        onChange={(e) => setAreaHa(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Volume Colhido / Produzido *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="Ex: 850"
                        value={harvestedTotal}
                        onChange={(e) => setHarvestedTotal(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Unidade de Medida
                      </label>
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      >
                        <option value="sc (60kg)">Sacas (60kg)</option>
                        <option value="Litros">Litros</option>
                        <option value="@ arrobas">Arrobas (@)</option>
                        <option value="Toneladas">Toneladas</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Status da Safra
                    </label>
                    <select
                      value={prodStatus}
                      onChange={(e) => setProdStatus(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                    >
                      <option value="Plantio">Plantio</option>
                      <option value="Desenvolvimento">Desenvolvimento</option>
                      <option value="Colheita">Colheita em Andamento</option>
                      <option value="Concluído">Colheita Concluída</option>
                    </select>
                  </div>
                </>
              )}

              {/* Type: APLICAÇÃO */}
              {type === 'aplicacao' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Produto Aplicado *
                    </label>
                    <input
                      type="text"
                      required
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Talhão / Área Aplicada
                      </label>
                      <input
                        type="text"
                        value={plot}
                        onChange={(e) => setPlot(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Área Total (Hectares)
                      </label>
                      <input
                        type="number"
                        value={appTotalArea}
                        onChange={(e) => setAppTotalArea(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Dosagem (por ha)
                      </label>
                      <input
                        type="text"
                        value={dosePerHa}
                        onChange={(e) => setDosePerHa(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Carência (Dias)
                      </label>
                      <input
                        type="number"
                        value={gracePeriod}
                        onChange={(e) => setGracePeriod(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Operador / Responsável Técnico
                    </label>
                    <input
                      type="text"
                      value={responsible}
                      onChange={(e) => setResponsible(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Actions buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
                >
                  Salvar Registro
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
