/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Levantamento } from './components/Levantamento';
import { Relatorios } from './components/Relatorios';
import { FormulariosImpressao } from './components/FormulariosImpressao';
import { Configuracoes } from './components/Configuracoes';
import { QuickActionModal, QuickActionType } from './components/QuickActionModal';
import { AuthScreens } from './components/AuthScreens';
import { 
  NavTab, 
  GestaoSubTab, 
  Property, 
  UserProfile, 
  Transaction, 
  BudgetCategory, 
  ProductionRecord, 
  InsumoStock, 
  DefensivoApplication, 
  AssetPatrimonio 
} from './types';
import { 
  initialProperties, 
  initialUser, 
  initialTransactions, 
  initialBudgetCategories, 
  initialProductions, 
  initialInsumos, 
  initialApplications, 
  initialPatrimonio, 
  initialAlerts 
} from './data/mockData';
import { LayoutDashboard, ClipboardList, BarChart3, Printer, Settings } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [currentSubTab, setCurrentSubTab] = useState<GestaoSubTab>('financeiro');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Auth State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(initialUser);

  // Property State
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [currentProperty, setCurrentProperty] = useState<Property>(initialProperties[0]);

  // Core Data State
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [budgets, setBudgets] = useState<BudgetCategory[]>(initialBudgetCategories);
  const [productions, setProductions] = useState<ProductionRecord[]>(initialProductions);
  const [insumos, setInsumos] = useState<InsumoStock[]>(initialInsumos);
  const [applications, setApplications] = useState<DefensivoApplication[]>(initialApplications);
  const [patrimonio, setPatrimonio] = useState<AssetPatrimonio[]>(initialPatrimonio);
  const [alerts, setAlerts] = useState(initialAlerts);

  // Quick Action Modal State
  const [quickActionType, setQuickActionType] = useState<QuickActionType>(null);

  // Tab Selection Handler
  const handleSelectTab = (tab: NavTab, subTab?: GestaoSubTab) => {
    setCurrentTab(tab);
    if (subTab) {
      setCurrentSubTab(subTab);
    }
  };

  // Add Transaction
  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const id = `tx-${Date.now()}`;
    const created: Transaction = { ...newTx, id };
    setTransactions([created, ...transactions]);

    // If expense, update budget category realized amount
    if (newTx.type === 'despesa') {
      setBudgets(prev => prev.map(b => {
        if (b.category.toLowerCase().includes(newTx.category.toLowerCase()) || 
            newTx.category.toLowerCase().includes(b.category.toLowerCase())) {
          return { ...b, realized: b.realized + newTx.amount };
        }
        return b;
      }));
    }
  };

  // Delete Transaction
  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Toggle Transaction Status (Pago / Pendente)
  const handleToggleTransactionStatus = (id: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'pago' ? 'pendente' : 'pago' };
      }
      return t;
    }));
  };

  // Add Production Record
  const handleAddProduction = (newProd: Omit<ProductionRecord, 'id' | 'updatedAt'>) => {
    const id = `prod-${Date.now()}`;
    const dateStr = new Date().toISOString().split('T')[0];
    const created: ProductionRecord = { ...newProd, id, updatedAt: dateStr };
    setProductions([created, ...productions]);
  };

  // Add Application
  const handleAddApplication = (newApp: Omit<DefensivoApplication, 'id'>) => {
    const id = `app-${Date.now()}`;
    const created: DefensivoApplication = { ...newApp, id };
    setApplications([created, ...applications]);
  };

  // Add Insumo
  const handleAddInsumo = (newInsumo: Omit<InsumoStock, 'id'>) => {
    const id = `ins-${Date.now()}`;
    const created: InsumoStock = { ...newInsumo, id };
    setInsumos([created, ...insumos]);
  };

  // Add Asset
  const handleAddAsset = (newAsset: Omit<AssetPatrimonio, 'id'>) => {
    const id = `pat-${Date.now()}`;
    const created: AssetPatrimonio = { ...newAsset, id };
    setPatrimonio([created, ...patrimonio]);
  };

  // Update Property Info
  const handleUpdateProperty = (updated: Property) => {
    setCurrentProperty(updated);
    setProperties(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F2937] flex flex-col md:flex-row antialiased">
      {/* 1. Left Sidebar (Fixed on Desktop, Drawer on Mobile) */}
      <Sidebar
        currentTab={currentTab}
        currentSubTab={currentSubTab}
        onSelectTab={handleSelectTab}
        user={user}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <Header
          properties={properties}
          currentProperty={currentProperty}
          onSelectProperty={setCurrentProperty}
          user={user}
          alerts={alerts}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onNavigateToTab={handleSelectTab}
        />

        {/* Content Body Area */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-12">
          {currentTab === 'dashboard' && (
            <Dashboard
              property={currentProperty}
              transactions={transactions}
              budgets={budgets}
              productions={productions}
              insumos={insumos}
              alerts={alerts}
              onOpenQuickAction={(type) => setQuickActionType(type)}
              onNavigateToTab={handleSelectTab}
            />
          )}

          {currentTab === 'levantamento' && (
            <Levantamento
              initialSubTab={currentSubTab}
              onSubTabChange={(sub) => setCurrentSubTab(sub)}
              transactions={transactions}
              budgets={budgets}
              productions={productions}
              insumos={insumos}
              applications={applications}
              patrimonio={patrimonio}
              onOpenQuickAction={(type) => setQuickActionType(type)}
              onDeleteTransaction={handleDeleteTransaction}
              onToggleTransactionStatus={handleToggleTransactionStatus}
              onAddInsumo={handleAddInsumo}
              onAddAsset={handleAddAsset}
            />
          )}

          {currentTab === 'relatorios' && (
            <Relatorios
              property={currentProperty}
              transactions={transactions}
              productions={productions}
              budgets={budgets}
            />
          )}

          {currentTab === 'impressoes' && (
            <FormulariosImpressao
              property={currentProperty}
              transactions={transactions}
              budgets={budgets}
              productions={productions}
              insumos={insumos}
              applications={applications}
            />
          )}

          {currentTab === 'configuracoes' && (
            <Configuracoes
              property={currentProperty}
              onUpdateProperty={handleUpdateProperty}
              user={user}
              onUpdateUser={setUser}
            />
          )}
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-3 py-2 flex items-center justify-around no-print shadow-lg">
        <button
          onClick={() => handleSelectTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            currentTab === 'dashboard' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Início</span>
        </button>

        <button
          onClick={() => handleSelectTab('levantamento', 'financeiro')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            currentTab === 'levantamento' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span>Levantamento</span>
        </button>

        <button
          onClick={() => handleSelectTab('relatorios')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            currentTab === 'relatorios' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Relatórios</span>
        </button>

        <button
          onClick={() => handleSelectTab('impressoes')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            currentTab === 'impressoes' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <Printer className="w-5 h-5" />
          <span>Imprimir</span>
        </button>

        <button
          onClick={() => handleSelectTab('configuracoes')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            currentTab === 'configuracoes' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Ajustes</span>
        </button>
      </nav>

      {/* 4. Quick Action Modal (+ Receita, + Gasto, + Produção, + Aplicação) */}
      <QuickActionModal
        type={quickActionType}
        onClose={() => setQuickActionType(null)}
        onAddTransaction={handleAddTransaction}
        onAddProduction={handleAddProduction}
        onAddApplication={handleAddApplication}
      />

      {/* 5. Complete Authentication Flow Modal */}
      {isAuthOpen && (
        <AuthScreens
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            setIsAuthOpen(false);
          }}
          onClose={() => setIsAuthOpen(false)}
        />
      )}
    </div>
  );
}
