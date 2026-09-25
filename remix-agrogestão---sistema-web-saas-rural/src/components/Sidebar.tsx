import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  BarChart3, 
  Printer, 
  Settings, 
  ShieldCheck, 
  MoreHorizontal, 
  X,
  LogOut,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { NavTab, GestaoSubTab, UserProfile } from '../types';
import { Logo } from './Logo';

interface SidebarProps {
  currentTab: NavTab;
  currentSubTab: GestaoSubTab;
  onSelectTab: (tab: NavTab, subTab?: GestaoSubTab) => void;
  user: UserProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenAuth: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  isOpenMobile,
  onCloseMobile,
  onOpenAuth
}) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0a2e23] text-emerald-100 flex flex-col justify-between transition-transform duration-200 ease-in-out
        md:translate-x-0 md:static md:h-screen md:shrink-0
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full invisible md:visible pointer-events-none md:pointer-events-auto'}
      `}>
        {/* Top Header / Logo */}
        <div>
          <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-emerald-900/50">
            <Logo
              variant="compact"
              theme="dark"
              size="md"
              onClick={() => {
                onSelectTab('dashboard');
                onCloseMobile();
              }}
              className="cursor-pointer"
            />

            {/* Mobile close button */}
            <button 
              onClick={onCloseMobile}
              className="p-2 text-emerald-300 hover:text-white rounded-xl hover:bg-emerald-800/40 md:hidden"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Simple Navigation Menu (No complex subsections) */}
          <div className="px-4 py-6 space-y-3 overflow-y-auto max-h-[calc(100vh-220px)]">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-emerald-300/60 mb-2">
              Menu Principal
            </p>

            {/* 1. Dashboard (Início) */}
            <button
              onClick={() => {
                onSelectTab('dashboard');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-bold transition-all text-left ${
                currentTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                  : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 shrink-0 ${currentTab === 'dashboard' ? 'text-white' : 'text-emerald-400'}`} />
              <div>
                <span className="block leading-snug">Início</span>
                <span className="block text-xs font-normal opacity-80">Resumo da Fazenda</span>
              </div>
            </button>

            {/* 2. LEVANTAMENTO (Substitui toda a sessão Gestão) */}
            <button
              onClick={() => {
                onSelectTab('levantamento');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-bold transition-all text-left ${
                currentTab === 'levantamento'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                  : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
              }`}
            >
              <ClipboardList className={`w-5 h-5 shrink-0 ${currentTab === 'levantamento' ? 'text-white' : 'text-emerald-400'}`} />
              <div>
                <span className="block leading-snug">Levantamento</span>
                <span className="block text-xs font-normal opacity-80">
                  Dinheiro, Lavouras, Insumos e Bens
                </span>
              </div>
            </button>

            {/* 3. Relatórios */}
            <button
              onClick={() => {
                onSelectTab('relatorios');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-bold transition-all text-left ${
                currentTab === 'relatorios'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                  : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
              }`}
            >
              <BarChart3 className={`w-5 h-5 shrink-0 ${currentTab === 'relatorios' ? 'text-white' : 'text-emerald-400'}`} />
              <div>
                <span className="block leading-snug">Relatórios</span>
                <span className="block text-xs font-normal opacity-80">Resultados e Lucro</span>
              </div>
            </button>

            {/* 4. Formulários para Impressão */}
            <button
              onClick={() => {
                onSelectTab('impressoes');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-bold transition-all text-left ${
                currentTab === 'impressoes'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                  : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
              }`}
            >
              <Printer className={`w-5 h-5 shrink-0 ${currentTab === 'impressoes' ? 'text-white' : 'text-emerald-400'}`} />
              <div>
                <span className="block leading-snug">Imprimir Folhas</span>
                <span className="block text-xs font-normal opacity-80">Fichas para Prancheta A4</span>
              </div>
            </button>

            {/* 5. Configurações */}
            <button
              onClick={() => {
                onSelectTab('configuracoes');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-bold transition-all text-left ${
                currentTab === 'configuracoes'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                  : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
              }`}
            >
              <Settings className={`w-5 h-5 shrink-0 ${currentTab === 'configuracoes' ? 'text-white' : 'text-emerald-400'}`} />
              <div>
                <span className="block leading-snug">Configurações</span>
                <span className="block text-xs font-normal opacity-80">Dados da Fazenda</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Area: Simple reassurance badge + User Profile */}
        <div className="p-4 border-t border-emerald-900/50 space-y-3">
          {/* Status badge: very clear and reassuring */}
          <div className="bg-emerald-900/60 border border-emerald-700/50 rounded-2xl p-3 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                Seus dados estão salvos
              </p>
              <p className="text-[11px] text-emerald-300/80">
                Tudo seguro e protegido
              </p>
            </div>
          </div>

          {/* User profile row */}
          <div className="relative">
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/40">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-emerald-400 text-emerald-950 font-black text-sm flex items-center justify-center shrink-0">
                  {user.avatarInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate leading-snug">
                    {user.name}
                  </p>
                  <p className="text-xs text-emerald-300/80 truncate">
                    {user.farm}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-1.5 text-emerald-300 hover:text-white hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer"
                title="Opções"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#063024] border border-emerald-700 rounded-2xl p-2 shadow-2xl text-xs space-y-1 z-50">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-emerald-100 hover:bg-emerald-800 hover:text-white rounded-xl transition-colors font-medium text-left"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Trocar de Usuário / Entrar</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-rose-300 hover:bg-rose-950/50 hover:text-rose-200 rounded-xl transition-colors font-medium text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair do Aplicativo</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
