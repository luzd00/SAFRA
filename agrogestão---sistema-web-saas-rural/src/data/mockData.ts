import { 
  Property, 
  UserProfile, 
  Transaction, 
  BudgetCategory, 
  ProductionRecord, 
  InsumoStock, 
  DefensivoApplication, 
  AssetPatrimonio, 
  SystemAlert 
} from '../types';

export const initialProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Fazenda Boa Esperança',
    location: 'Rio Verde - GO',
    areaHa: 450,
    car: 'GO-5218805-4819.3491.5912',
    ie: '10.459.832-1',
    mainActivity: 'Soja, Milho Safrinha e Pecuária Leiteira'
  },
  {
    id: 'prop-2',
    name: 'Fazenda Santa Rita',
    location: 'Patrocínio - MG',
    areaHa: 280,
    car: 'MG-3148100-9921.8491.1002',
    ie: '06.128.749-0',
    mainActivity: 'Café Especial e Grãos'
  },
  {
    id: 'prop-3',
    name: 'Fazenda Três Barras',
    location: 'Campo Grande - MS',
    areaHa: 620,
    car: 'MS-5002704-1234.5678.9012',
    ie: '28.910.443-5',
    mainActivity: 'Pecuária de Corte (Ciclo Completo)'
  }
];

export const initialUser: UserProfile = {
  name: 'João Silva',
  email: 'joao.silva@boaesperanca.agro.br',
  role: 'Administrador',
  farm: 'Fazenda Boa Esperança',
  avatarInitials: 'JS'
};

export const monthlyOverviewData = [
  { month: 'Out', receitas: 55000, despesas: 34000 },
  { month: 'Nov', receitas: 61000, despesas: 38000 },
  { month: 'Dez', receitas: 51000, despesas: 37000 },
  { month: 'Jan', receitas: 68000, despesas: 44000 },
  { month: 'Fev', receitas: 73000, despesas: 49000 },
  { month: 'Mar', receitas: 65000, despesas: 41000 },
  { month: 'Abr', receitas: 79000, despesas: 54000 },
  { month: 'Mai', receitas: 71000, despesas: 48000 },
  { month: 'Jun', receitas: 83000, despesas: 50000 },
  { month: 'Jul', receitas: 76000, despesas: 47000 },
  { month: 'Ago', receitas: 70000, despesas: 41000 },
  { month: 'Set', receitas: 78420, despesas: 47280 },
];

export const expenseCategoriesData = [
  { name: 'Alimentação animal', percentage: 32, amount: 15129.60, color: '#064E3B' },
  { name: 'Combustível', percentage: 24, amount: 11347.20, color: '#047857' },
  { name: 'Defensivos', percentage: 18, amount: 8510.40, color: '#10B981' },
  { name: 'Manutenção', percentage: 14, amount: 6619.20, color: '#F59E0B' },
  { name: 'Outros', percentage: 12, amount: 5673.60, color: '#9CA3AF' },
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-101',
    date: '2026-09-22',
    description: 'Venda de Leite Tipo B (Laticínio Campestre)',
    type: 'receita',
    category: 'Venda de Produção',
    amount: 18950.00,
    paymentMethod: 'Transferência Bancária / PIX',
    status: 'pago',
    cropOrSector: 'Pecuária Leiteira',
    notes: 'Quinzena 1 referente a 7.580 litros entregues'
  },
  {
    id: 'tx-102',
    date: '2026-09-21',
    description: 'Adiantamento Venda Futura Soja Safra 24/25',
    type: 'receita',
    category: 'Contratos Futuros',
    amount: 54000.00,
    paymentMethod: 'TED Comercial',
    status: 'pago',
    cropOrSector: 'Soja',
    notes: 'Fixação de 400 sacas com a Cooperativa Comigo'
  },
  {
    id: 'tx-103',
    date: '2026-09-20',
    description: 'Óleo Diesel S10 - 2.000 Litros',
    type: 'despesa',
    category: 'Combustível',
    amount: 11800.00,
    paymentMethod: 'Boleto 30 Dias',
    status: 'pago',
    cropOrSector: 'Frota e Maquinário',
    notes: 'Abastecimento tanques principais para dessecação'
  },
  {
    id: 'tx-104',
    date: '2026-09-19',
    description: 'Ração Concentrada 22% Proteína (120 Sacos)',
    type: 'despesa',
    category: 'Alimentação animal',
    amount: 9840.00,
    paymentMethod: 'Boleto Bancário',
    status: 'pago',
    cropOrSector: 'Pecuária Leiteira',
    notes: 'Nutrição do rebanho em lactação'
  },
  {
    id: 'tx-105',
    date: '2026-09-18',
    description: 'Revisão Preventiva Trator John Deere 6110M',
    type: 'despesa',
    category: 'Manutenção',
    amount: 3450.00,
    paymentMethod: 'Cartão Corporativo',
    status: 'pago',
    cropOrSector: 'Maquinário',
    notes: 'Troca de filtros, fluidos e bicos injetores'
  },
  {
    id: 'tx-106',
    date: '2026-09-16',
    description: 'Herbicida Glifosato 480 SL (200 L)',
    type: 'despesa',
    category: 'Defensivos',
    amount: 6200.00,
    paymentMethod: 'Boleto 60 Dias',
    status: 'pago',
    cropOrSector: 'Talhões 1 a 4',
    notes: 'Manejo pré-plantio'
  },
  {
    id: 'tx-107',
    date: '2026-09-25',
    description: 'Sal Mineralizado com Ureia (50 Sacas)',
    type: 'despesa',
    category: 'Alimentação animal',
    amount: 5289.60,
    paymentMethod: 'Boleto Bancário',
    status: 'pendente',
    cropOrSector: 'Pecuária Leiteira',
    notes: 'Vencimento próximo'
  },
  {
    id: 'tx-108',
    date: '2026-09-28',
    description: 'Peças de Reposição Pulverizador Jacto',
    type: 'despesa',
    category: 'Manutenção',
    amount: 3169.20,
    paymentMethod: 'Boleto Bancário',
    status: 'pendente',
    cropOrSector: 'Maquinário',
    notes: 'Reparo barra de 28m'
  },
  {
    id: 'tx-109',
    date: '2026-09-15',
    description: 'Venda de Bezerras Desmamadas Holandês (4 cabeças)',
    type: 'receita',
    category: 'Venda de Animais',
    amount: 5470.00,
    paymentMethod: 'PIX',
    status: 'pago',
    cropOrSector: 'Pecuária Leiteira'
  },
  {
    id: 'tx-110',
    date: '2026-09-12',
    description: 'Tarifas e Energia Elétrica Trifásica (Enel Rural)',
    type: 'despesa',
    category: 'Outros',
    amount: 5673.60,
    paymentMethod: 'Débito Automático',
    status: 'pago',
    cropOrSector: 'Geral',
    notes: 'Consumo do resfriador e bombas do pivô central'
  }
];

export const initialBudgetCategories: BudgetCategory[] = [
  {
    id: 'bud-1',
    category: 'Alimentação animal',
    planned: 16000.00,
    realized: 15129.60,
    iconName: 'Wheat'
  },
  {
    id: 'bud-2',
    category: 'Combustível',
    planned: 9800.00,
    realized: 11347.20, // Estourado! (+15.8%)
    iconName: 'Fuel'
  },
  {
    id: 'bud-3',
    category: 'Defensivos e Insumos',
    planned: 12000.00,
    realized: 8510.40,
    iconName: 'ShieldAlert'
  },
  {
    id: 'bud-4',
    category: 'Manutenção e Peças',
    planned: 5500.00,
    realized: 6619.20, // Estourado! (+20.3%)
    iconName: 'Wrench'
  },
  {
    id: 'bud-5',
    category: 'Mão de Obra e Encargos',
    planned: 14000.00,
    realized: 13500.00,
    iconName: 'Users'
  },
  {
    id: 'bud-6',
    category: 'Energia, Água e Outros',
    planned: 6000.00,
    realized: 5673.60,
    iconName: 'Zap'
  }
];

export const initialProductions: ProductionRecord[] = [
  {
    id: 'prod-1',
    cropName: 'Soja Safra 24/25',
    variety: 'TMG 7062 IPRO',
    fieldPlot: 'Talhões 1, 2 e 3 (Gleba Norte)',
    areaHa: 260,
    expectedTotal: 18200,
    harvestedTotal: 4200,
    unit: 'sc (60kg)',
    productivity: '70,0 sc/ha (Estimada)',
    status: 'Desenvolvimento',
    updatedAt: '2026-09-20'
  },
  {
    id: 'prod-2',
    cropName: 'Milho Safrinha',
    variety: 'DKB 360 PRO3',
    fieldPlot: 'Talhões 4 e 5 (Pivô Sul)',
    areaHa: 120,
    expectedTotal: 12600,
    harvestedTotal: 12600,
    unit: 'sc (60kg)',
    productivity: '105 sc/ha',
    status: 'Concluído',
    updatedAt: '2026-08-28'
  },
  {
    id: 'prod-3',
    cropName: 'Leite Ordenha B',
    variety: 'Rebanho Girolando / Holandês',
    fieldPlot: 'Módulo Rotacionado Mombaça',
    areaHa: 45,
    expectedTotal: 25000,
    harvestedTotal: 18450,
    unit: 'Litros / mês',
    productivity: '19,5 L / vaca / dia',
    status: 'Colheita',
    updatedAt: '2026-09-22'
  },
  {
    id: 'prod-4',
    cropName: 'Café Arábica',
    variety: 'Catuaí Vermelho IAC 144',
    fieldPlot: 'Gleba da Encosta (Irrigado)',
    areaHa: 25,
    expectedTotal: 1100,
    harvestedTotal: 980,
    unit: 'sc (60kg)',
    productivity: '44 sc/ha',
    status: 'Colheita',
    updatedAt: '2026-09-18'
  }
];

export const initialInsumos: InsumoStock[] = [
  {
    id: 'ins-1',
    name: 'Fox Xpro (Fungicida Sistêmico)',
    activeIngredient: 'Trifloxistrobina + Protioconazol + Bixafem',
    category: 'Fungicida',
    currentStock: 12,
    minStock: 25,
    unit: 'Litros',
    batchNumber: 'FX-2024-B8',
    expirationDate: '2026-10-06',
    daysToExpiration: 14, // Vencimento próximo!
    costPerUnit: 285.00,
    location: 'Depósito Químico - Prateleira B1'
  },
  {
    id: 'ins-2',
    name: 'Adubo NPK 04-14-08 Granulado',
    activeIngredient: 'Nitrogênio, Fósforo e Potássio',
    category: 'Fertilizante',
    currentStock: 15,
    minStock: 60,
    unit: 'Sacos (50kg)',
    batchNumber: 'NPK-092-2025',
    expirationDate: '2027-05-15',
    daysToExpiration: 233,
    costPerUnit: 148.00,
    location: 'Galpão de Fertilizantes - Pallet 03'
  },
  {
    id: 'ins-3',
    name: 'Glifosato Roundup Transorb R',
    activeIngredient: 'Glifosato Sal Potássico 588 g/L',
    category: 'Herbicida',
    currentStock: 480,
    minStock: 200,
    unit: 'Litros',
    batchNumber: 'RU-7712',
    expirationDate: '2027-08-30',
    daysToExpiration: 340,
    costPerUnit: 34.50,
    location: 'Depósito Químico - Pallet A'
  },
  {
    id: 'ins-4',
    name: 'Premio SC (Inseticida Diamida)',
    activeIngredient: 'Clorantraniliprole 200 g/L',
    category: 'Inseticida',
    currentStock: 8,
    minStock: 15,
    unit: 'Litros',
    batchNumber: 'PRM-449',
    expirationDate: '2026-10-18',
    daysToExpiration: 24, // Vencimento próximo!
    costPerUnit: 410.00,
    location: 'Armário Seguro Aço - Chave 02'
  },
  {
    id: 'ins-5',
    name: 'Óleo Mineral Assist (Adjuvante)',
    activeIngredient: 'Hidrocarbonetos alifáticos',
    category: 'Adjuvante',
    currentStock: 160,
    minStock: 80,
    unit: 'Litros',
    batchNumber: 'AST-2025',
    expirationDate: '2028-01-20',
    daysToExpiration: 480,
    costPerUnit: 19.80,
    location: 'Depósito Químico - Prateleira C'
  },
  {
    id: 'ins-6',
    name: 'Semente Soja TMG 7062 Tratada',
    activeIngredient: 'TS Cruiser + Maxim Advanced',
    category: 'Semente',
    currentStock: 75,
    minStock: 70,
    unit: 'Big Bags (5M sementes)',
    batchNumber: 'SM-2026-GO',
    expirationDate: '2026-12-15',
    daysToExpiration: 82,
    costPerUnit: 2450.00,
    location: 'Barracão Climatizado Sementes'
  }
];

export const initialApplications: DefensivoApplication[] = [
  {
    id: 'app-1',
    date: '2026-09-20',
    crop: 'Soja Safra 24/25',
    plot: 'Talhão 01 e 02 (110 ha)',
    productName: 'Glifosato Roundup + Óleo Assist',
    dosePerHa: '2,5 L/ha + 0,5 L/ha',
    totalAreaHa: 110,
    responsible: 'Claudinei Ribeiro (Operador Pulverizador)',
    gracePeriodDays: 14,
    status: 'Concluído'
  },
  {
    id: 'app-2',
    date: '2026-09-17',
    crop: 'Milho Safrinha',
    plot: 'Talhão 05 (40 ha)',
    productName: 'Premio SC (Controle Lagarta Cartucho)',
    dosePerHa: '0,10 L/ha',
    totalAreaHa: 40,
    responsible: 'Claudinei Ribeiro',
    gracePeriodDays: 21,
    status: 'Concluído'
  },
  {
    id: 'app-3',
    date: '2026-09-26',
    crop: 'Soja Safra 24/25',
    plot: 'Talhão 03 (75 ha)',
    productName: 'Fox Xpro (Fungicida Prévia Fechamento Entrelinha)',
    dosePerHa: '0,50 L/ha',
    totalAreaHa: 75,
    responsible: 'Claudinei Ribeiro',
    gracePeriodDays: 30,
    status: 'Agendado'
  }
];

export const initialPatrimonio: AssetPatrimonio[] = [
  {
    id: 'pat-1',
    name: 'Trator Agrícola John Deere 6110M',
    category: 'Maquinário',
    modelOrYear: '2022 / 110 CV',
    purchaseValue: 460000.00,
    currentValue: 410000.00,
    status: 'Operacional',
    location: 'Galpão Principal',
    hourMeterOrKm: '1.420 horas'
  },
  {
    id: 'pat-2',
    name: 'Colheitadeira de Grãos Case IH 8250 Axial-Flow',
    category: 'Maquinário',
    modelOrYear: '2021 / Plataforma 35 pés',
    purchaseValue: 1250000.00,
    currentValue: 1080000.00,
    status: 'Operacional',
    location: 'Hangar de Máquinas',
    hourMeterOrKm: '980 horas'
  },
  {
    id: 'pat-3',
    name: 'Pulverizador Autopropelido Jacto Uniport 2530',
    category: 'Maquinário',
    modelOrYear: '2020 / Barras 30 metros',
    purchaseValue: 680000.00,
    currentValue: 560000.00,
    status: 'Revisão Necessária',
    location: 'Oficina da Sede',
    hourMeterOrKm: '2.150 horas'
  },
  {
    id: 'pat-4',
    name: 'Caminhonete Toyota Hilux SRX 4x4 Diesel',
    category: 'Veículo',
    modelOrYear: '2023 / 204 CV',
    purchaseValue: 320000.00,
    currentValue: 285000.00,
    status: 'Operacional',
    location: 'Garagem Sede',
    hourMeterOrKm: '42.800 km'
  },
  {
    id: 'pat-5',
    name: 'Área de Terras Agrícolas (Gleba Central 180 ha)',
    category: 'Terra',
    modelOrYear: 'Argila > 45% / Regularizada',
    purchaseValue: 350000.00,
    currentValue: 420000.00,
    status: 'Excelente',
    location: 'Gleba Sul'
  },
  {
    id: 'pat-6',
    name: 'Conjunto de Silos e Secador de Grãos Kepler Weber (15.000 sc)',
    category: 'Benfeitoria',
    modelOrYear: 'Instalação 2019',
    purchaseValue: 120000.00,
    currentValue: 92000.00,
    status: 'Operacional',
    location: 'Complexo de Armazenagem'
  }
];

export const initialAlerts: SystemAlert[] = [
  {
    id: 'alt-1',
    type: 'orcamento_estourado',
    title: 'Combustível acima do orçado (+15,8%)',
    description: 'Os gastos com Diesel S10 atingiram R$ 11.347,20 contra R$ 9.800,00 previstos no mês.',
    severity: 'high',
    date: 'Hoje, 09:15',
    actionText: 'Ver Planejamento',
    targetTab: 'planejamento'
  },
  {
    id: 'alt-2',
    type: 'vencimento_proximo',
    title: 'Defensivo próximo do vencimento (14 dias)',
    description: 'Fox Xpro (Lote FX-2024-B8) possui 12 litros que vencem em 06/10/2026.',
    severity: 'high',
    date: 'Hoje, 08:30',
    actionText: 'Agendar Aplicação',
    targetTab: 'defensivos'
  },
  {
    id: 'alt-3',
    type: 'estoque_critico',
    title: 'Estoque baixo de Adubo NPK 04-14-08',
    description: 'Restam apenas 15 sacos em estoque. Mínimo de segurança definido: 60 sacos.',
    severity: 'medium',
    date: 'Ontem',
    actionText: 'Repor Estoque',
    targetTab: 'defensivos'
  },
  {
    id: 'alt-4',
    type: 'conta_vencendo',
    title: 'Contas a pagar nesta semana: R$ 8.458,80',
    description: 'Boletos de Sal Mineralizado e Peças do Pulverizador vencem entre 25 e 28/09.',
    severity: 'medium',
    date: 'Ontem',
    actionText: 'Ver Financeiro',
    targetTab: 'financeiro'
  }
];
