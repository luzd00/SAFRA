import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  Bell, 
  Menu, 
  Check, 
  AlertTriangle, 
  ArrowRight,
  X
} from 'lucide-react';
import { Property, SystemAlert, UserProfile, NavTab, GestaoSubTab } from '../types';

interface HeaderProps {
  properties: Property[];
  currentProperty: Property;
  onSelectProperty: (prop: Property) => void;
  user: UserProfile;
  alerts: SystemAlert[];
  onOpenMobileSidebar: () => void;
  onOpenAuth: () => void;
  onNavigateToTab: (tab: NavTab, subTab?: GestaoSubTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  properties,
  currentProperty,
  onSelectProperty,
  user,
  alerts,
  onOpenMobileSidebar,
  onOpenAuth,
  onNavigateToTab
}) => {
  const [isPropDropdownOpen, setIsPropDropdownOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchItems = [
    { title: 'Controle de Diesel S10', cat: 'Dinheiro', tab: 'levantamento' as NavTab, sub: 'financeiro' as GestaoSubTab },
    { title: 'Lavouras de Soja Safra 24/25', cat: 'Produção', tab: 'levantamento' as NavTab, sub: 'producao' as GestaoSubTab },
    { title: 'Remédio Fox Xpro (Fungicida)', cat: 'Remédios e Adubos', tab: 'levantamento' as NavTab, sub: 'defensivos' as GestaoSubTab },
    { title: 'Trator John Deere 6110M', cat: 'Máquinas e Bens', tab: 'levantamento' as NavTab, sub: 'patrimonio' as GestaoSubTab },
    { title: 'Relatório de Lucro da Fazenda', cat: 'Relatórios', tab: 'relatorios' as NavTab },
    { title: 'Imprimir Folha A4 para o Campo', cat: 'Impressões', tab: 'impressoes' as NavTab },
  ].filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.cat.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="sticky top-0 z-30 bg-white border-b-2 border-gray-100 px-4 md:px-8 py-3 flex items-center justify-between shadow-2xs">
      {/* Left side: Hamburger + Property Switcher */}
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-2 text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100 md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
            Fazenda Selecionada
          </p>
          <button
            onClick={() => setIsPropDropdownOpen(!isPropDropdownOpen)}
            className="flex items-center gap-2 text-base md:text-lg font-black text-gray-900 hover:text-emerald-700 transition-colors focus:outline-hidden cursor-pointer"
          >
            <span>{currentProperty.name}</span>
            <ChevronDown className={`w-4 h-4 text-emerald-700 transition-transform ${isPropDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Property Selector Dropdown */}
          {isPropDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                Escolha a Fazenda:
              </div>
              <div className="py-1">
                {properties.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => {
                      onSelectProperty(prop);
                      setIsPropDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-start justify-between hover:bg-emerald-50 transition-colors ${
                      prop.id === currentProperty.id ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-extrabold">{prop.name}</p>
                      <p className="text-xs text-gray-500">{prop.location} · {prop.areaHa} ha</p>
                    </div>
                    {prop.id === currentProperty.id && (
                      <Check className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Search bar, Alerts Bell, User avatar */}
      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative hidden sm:block w-52 md:w-72">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar no SAFRA..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.length > 0);
              }}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Floating Results */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-2 z-50 max-h-72 overflow-y-auto">
              {searchItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigateToTab(item.tab, item.sub);
                    setShowSearchResults(false);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-3 py-2.5 hover:bg-emerald-50 rounded-xl flex items-center justify-between transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-900">{item.title}</p>
                    <p className="text-[10px] text-gray-500">{item.cat}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-700" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell with big badge */}
        <div className="relative">
          <button
            onClick={() => setIsBellOpen(!isBellOpen)}
            className="p-2.5 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors relative cursor-pointer"
            title="Avisos Importantes"
          >
            <Bell className="w-6 h-6" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-rose-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {isBellOpen && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border-2 border-gray-200 py-4 z-50">
              <div className="flex items-center justify-between px-5 pb-3 border-b border-gray-100">
                <span className="font-black text-sm text-gray-900">Avisos da Fazenda</span>
                <button 
                  onClick={() => setIsBellOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 px-3 py-1">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 hover:bg-gray-50 rounded-2xl transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 leading-snug">{alert.title}</p>
                        <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">{alert.description}</p>
                        {alert.targetTab && (
                          <button
                            onClick={() => {
                              onNavigateToTab('levantamento', alert.targetTab);
                              setIsBellOpen(false);
                            }}
                            className="mt-2 text-xs font-extrabold text-emerald-800 hover:underline flex items-center gap-1"
                          >
                            <span>Ver agora</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar button */}
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
            {user.avatarInitials}
          </div>
          <span className="hidden md:inline text-xs font-bold text-gray-800">
            {user.name.split(' ')[0]}
          </span>
        </button>
      </div>
    </header>
  );
};
