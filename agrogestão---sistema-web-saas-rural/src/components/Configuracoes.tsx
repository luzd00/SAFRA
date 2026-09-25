import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  Users, 
  Sliders, 
  Save, 
  CheckCircle, 
  ShieldCheck, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { Property, UserProfile } from '../types';

interface ConfiguracoesProps {
  property: Property;
  onUpdateProperty: (prop: Property) => void;
  user: UserProfile;
  onUpdateUser: (u: UserProfile) => void;
}

export const Configuracoes: React.FC<ConfiguracoesProps> = ({
  property,
  onUpdateProperty,
  user,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<'propriedade' | 'equipe' | 'preferencias'>('propriedade');

  // Farm Form State
  const [farmName, setFarmName] = useState(property.name);
  const [farmLocation, setFarmLocation] = useState(property.location);
  const [farmArea, setFarmArea] = useState(property.areaHa.toString());
  const [farmCar, setFarmCar] = useState(property.car);
  const [farmIe, setFarmIe] = useState(property.ie);
  const [farmActivity, setFarmActivity] = useState(property.mainActivity);

  // Team Mock List
  const [team, setTeam] = useState([
    { id: '1', name: 'João Silva', role: 'Administrador Geral', email: 'joao.silva@boaesperanca.agro.br', access: 'Total' },
    { id: '2', name: 'Dr. Marcelo Costa', role: 'Agrônomo Responsável (CREA 4892)', email: 'marcelo.agro@consultoria.com', access: 'Técnico / Manejo' },
    { id: '3', name: 'Ana Paula Rezende', role: 'Gerente Financeira', email: 'ana.financeiro@boaesperanca.agro.br', access: 'Financeiro' },
    { id: '4', name: 'Claudinei Ribeiro', role: 'Operador Chefe de Máquinas', email: 'claudinei.campo@gmail.com', access: 'Apontamento Campo' },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProperty({
      ...property,
      name: farmName,
      location: farmLocation,
      areaHa: parseFloat(farmArea) || property.areaHa,
      car: farmCar,
      ie: farmIe,
      mainActivity: farmActivity
    });

    setToastMessage('Dados da propriedade rural atualizados com sucesso!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#0a2e23] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
            <Settings className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
              Configurações & Governança Rural
            </h2>
            <p className="text-xs text-gray-500">
              Gerencie cadastros ambientais (CAR), inscrições estaduais, acessos da equipe de campo e preferências do sistema.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="pt-4 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('propriedade')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'propriedade'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Dados da Fazenda</span>
          </button>

          <button
            onClick={() => setActiveTab('equipe')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'equipe'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Equipe & Permissões</span>
          </button>

          <button
            onClick={() => setActiveTab('preferencias')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'preferencias'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Unidades & Parâmetros</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DADOS DA PROPRIEDADE */}
      {activeTab === 'propriedade' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs">
          <h3 className="text-base font-bold text-gray-900 mb-1">Identificação Cadastral do Imóvel Rural</h3>
          <p className="text-xs text-gray-500 mb-6">Estes dados são replicados automaticamente no cabeçalho das fichas de impressão e relatórios contábeis.</p>

          <form onSubmit={handleSaveProperty} className="space-y-4 max-w-2xl text-xs md:text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nome da Propriedade Rural *</label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Município e UF *</label>
                <input
                  type="text"
                  required
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Área Total Registrada (Hectares) *</label>
                <input
                  type="number"
                  required
                  value={farmArea}
                  onChange={(e) => setFarmArea(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Atividade Produtiva Principal</label>
                <input
                  type="text"
                  value={farmActivity}
                  onChange={(e) => setFarmActivity(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Número do CAR (Cadastro Ambiental Rural)</label>
                <input
                  type="text"
                  value={farmCar}
                  onChange={(e) => setFarmCar(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Inscrição Estadual do Produtor (IE)</label>
                <input
                  type="text"
                  value={farmIe}
                  onChange={(e) => setFarmIe(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: EQUIPE & PERMISSÕES */}
      {activeTab === 'equipe' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Membros da Propriedade e Acessos</h3>
              <p className="text-xs text-gray-500">Controle quem pode lançar despesas, registrar colheitas ou visualizar dados sigilosos.</p>
            </div>
            <button className="px-3.5 py-1.5 bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Convidar Usuário</span>
            </button>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {team.map((member) => (
              <div key={member.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                  <p className="text-gray-500">{member.role} · {member.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md font-semibold text-[11px]">
                    {member.access}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: UNIDADES & PARÂMETROS */}
      {activeTab === 'preferencias' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs space-y-4 max-w-2xl text-xs md:text-sm">
          <h3 className="text-base font-bold text-gray-900">Padrões Agronômicos</h3>
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Unidade Padrão de Grãos</label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                <option value="sc">Sacas de 60 kg (Padrão Brasil)</option>
                <option value="ton">Toneladas Métricas (t)</option>
                <option value="kg">Quilogramas (kg)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Unidade Padrão de Pecuária</label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                <option value="arroba">Arroba (@ = 15 kg carcaça)</option>
                <option value="kg_vivo">Quilo Vivo (kg)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Medida de Área Rural</label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                <option value="ha">Hectares (ha = 10.000 m²)</option>
                <option value="alq_sp">Alqueire Paulista (2,42 ha)</option>
                <option value="alq_mg">Alqueire Mineiro / Goiano (4,84 ha)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
