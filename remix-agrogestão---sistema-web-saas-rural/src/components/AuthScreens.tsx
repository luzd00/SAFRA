import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sprout, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import { UserProfile } from '../types';
import { Logo } from './Logo';

interface AuthScreensProps {
  onLoginSuccess: (user: UserProfile) => void;
  onClose: () => void;
}

export type AuthMode = 'login' | 'register' | 'forgot-password';

export const AuthScreens: React.FC<AuthScreensProps> = ({
  onLoginSuccess,
  onClose
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('joao.silva@boaesperanca.agro.br');
  const [loginPassword, setLoginPassword] = useState('senha1234');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regFarmName, setRegFarmName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');

  // Forgot password form
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: 'João Silva',
      email: loginEmail,
      role: 'Administrador',
      farm: 'Fazenda Boa Esperança',
      avatarInitials: 'JS'
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setRegError('As senhas não coincidem.');
      return;
    }

    const initials = regName
      ? regName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
      : 'AG';

    onLoginSuccess({
      name: regName || 'Produtor Rural',
      email: regEmail,
      role: 'Proprietário',
      farm: regFarmName || 'Minha Fazenda',
      avatarInitials: initials
    });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[560px] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Left Side: Editorial Agribusiness Brand Showcase */}
        <div className="md:w-5/12 relative bg-[#0a2e23] text-white p-8 flex flex-col justify-between overflow-hidden">
          {/* Background image with subtle dark overlay */}
          <img
            src="/src/assets/images/agro_auth_banner_1790301291614.jpg"
            alt="Fazenda Moderna SAFRA"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061d16] via-[#0a2e23]/80 to-transparent" />

          {/* Top: Logo */}
          <div className="relative z-10">
            <Logo
              variant="full"
              theme="dark"
              size="lg"
              showTagline={true}
            />
          </div>

          {/* Center / Bottom Quote & Social Proof */}
          <div className="relative z-10 space-y-4 my-8">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-50 leading-relaxed shadow-lg">
              <p className="italic">
                "Com o SAFRA reduzimos em 18% as perdas com defensivos e temos o controle da safra em tempo real no celular."
              </p>
              <div className="mt-3 flex items-center gap-2 pt-2 border-t border-white/10">
                <div className="w-6 h-6 rounded-full bg-emerald-400 text-emerald-950 font-bold flex items-center justify-center text-[10px]">
                  JS
                </div>
                <div>
                  <p className="font-bold text-[11px] text-white">João Silva</p>
                  <p className="text-[10px] text-emerald-300">Produtor Rural · 450 ha em Rio Verde - GO</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-emerald-200/90 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Dados criptografados
              </span>
              <span>·</span>
              <span>Total conformidade CAR</span>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="md:w-7/12 p-6 md:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Top Close / Demo link */}
            <div className="flex items-center justify-between mb-6">
              {mode !== 'login' ? (
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setForgotSuccess(false);
                    setRegError('');
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar para login</span>
                </button>
              ) : (
                <span className="text-xs text-gray-400 font-medium">Área Restrita do Produtor</span>
              )}

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors"
              >
                Acessar Demonstração &times;
              </button>
            </div>

            {/* Mobile-only brand header: visible when dark panel is stacked or hidden */}
            <div className="block md:hidden pb-4 mb-4 border-b border-gray-100">
              <Logo
                variant="compact"
                size="md"
                theme="light"
                showTagline={true}
                taglineText="Sistema de Acompanhamento Fácil de Rotinas Agrícolas"
              />
            </div>

            {/* FORM 1: LOGIN */}
            {mode === 'login' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                    Bem-vindo de volta!
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Entre com suas credenciais para gerenciar sua fazenda.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      E-mail Profissional
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="seu.email@fazenda.com.br"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-700">
                        Senha de Acesso
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode('forgot-password')}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        Esqueceu sua senha?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Lembrar de mim neste dispositivo</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0a2e23] hover:bg-[#062118] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Entrar no SAFRA</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-gray-500">
                    Ainda não tem conta rural?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                    >
                      Cadastre sua propriedade
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* FORM 2: CADASTRO */}
            {mode === 'register' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                    Cadastrar Propriedade
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Crie sua conta para gerenciar colheitas, custos e máquinas.
                  </p>
                </div>

                {regError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                    {regError}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nome Completo *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: João Silva de Andrade"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">E-mail *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="joao@fazenda.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Nome da Fazenda *</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="Ex: Fazenda Boa Esperança"
                          value={regFarmName}
                          onChange={(e) => setRegFarmName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Senha *</label>
                      <input
                        type="password"
                        required
                        placeholder="Mínimo 6 dígitos"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Confirmar Senha *</label>
                      <input
                        type="password"
                        required
                        placeholder="Repita a senha"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Criar Conta e Acessar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="text-center pt-1">
                  <p className="text-xs text-gray-500">
                    Já possui acesso?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      Fazer Login
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* FORM 3: RECUPERAÇÃO DE SENHA */}
            {mode === 'forgot-password' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                    Recuperar Senha
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Digite seu e-mail para receber o link seguro de redefinição.
                  </p>
                </div>

                {forgotSuccess ? (
                  <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-emerald-950">E-mail Enviado!</h4>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Enviamos instruções detalhadas de recuperação para o e-mail informado. Verifique sua caixa de entrada.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl mt-2"
                    >
                      Voltar ao Login
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgot} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        E-mail Cadastrado
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="seu.email@fazenda.com.br"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0a2e23] hover:bg-[#062118] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Enviar Instruções de Recuperação</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Logo variant="icon" size="xs" theme="light" />
              <span>SAFRA v2.4</span>
            </div>
            <span>Suporte 24h: 0800 790 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
