export type NavTab = 
  | 'dashboard' 
  | 'levantamento'
  | 'relatorios' 
  | 'impressoes' 
  | 'configuracoes';

export type GestaoSubTab = 
  | 'financeiro' 
  | 'planejamento' 
  | 'producao' 
  | 'defensivos' 
  | 'patrimonio';

export interface Property {
  id: string;
  name: string;
  location: string;
  areaHa: number;
  car: string; // Cadastro Ambiental Rural
  ie: string;  // Inscrição Estadual
  mainActivity: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  farm: string;
  avatarInitials: string;
}

export type TransactionType = 'receita' | 'despesa';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: TransactionType;
  category: string;
  amount: number;
  paymentMethod: string;
  status: 'pago' | 'pendente' | 'agendado';
  cropOrSector?: string;
  notes?: string;
}

export interface BudgetCategory {
  id: string;
  category: string;
  planned: number;
  realized: number;
  iconName: string;
}

export interface ProductionRecord {
  id: string;
  cropName: string;
  variety: string;
  fieldPlot: string; // Talhão
  areaHa: number;
  expectedTotal: number;
  harvestedTotal: number;
  unit: string;
  productivity: string;
  status: 'Plantio' | 'Desenvolvimento' | 'Colheita' | 'Concluído';
  updatedAt: string;
}

export interface InsumoStock {
  id: string;
  name: string;
  activeIngredient: string;
  category: 'Fungicida' | 'Herbicida' | 'Inseticida' | 'Fertilizante' | 'Semente' | 'Adjuvante';
  currentStock: number;
  minStock: number;
  unit: string;
  batchNumber: string;
  expirationDate: string;
  daysToExpiration: number;
  costPerUnit: number;
  location: string;
}

export interface DefensivoApplication {
  id: string;
  date: string;
  crop: string;
  plot: string;
  productName: string;
  dosePerHa: string;
  totalAreaHa: number;
  responsible: string;
  gracePeriodDays: number; // Carência
  status: 'Concluído' | 'Agendado';
}

export interface AssetPatrimonio {
  id: string;
  name: string;
  category: 'Maquinário' | 'Veículo' | 'Terra' | 'Benfeitoria' | 'Implemento';
  modelOrYear: string;
  purchaseValue: number;
  currentValue: number;
  status: 'Operacional' | 'Em Manutenção' | 'Excelente' | 'Revisão Necessária';
  location: string;
  hourMeterOrKm?: string;
}

export interface SystemAlert {
  id: string;
  type: 'orcamento_estourado' | 'vencimento_proximo' | 'estoque_critico' | 'conta_vencendo';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  date: string;
  actionText?: string;
  targetTab?: GestaoSubTab;
}
