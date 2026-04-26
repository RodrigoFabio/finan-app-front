'use client';

import { useState, useId } from 'react';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';

// ─── Schemas de validação ─────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

const registerSchema = z
  .object({
    name: z.string().min(2, 'Nome muito curto'),
    email: z.string(),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

type Mode = 'login' | 'register';
type FormErrors = Record<string, string | undefined>;

// ─── SVG da tela — chart + area fill ────────────────────────────────────────

function ChartSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 480 360"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="area1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="area2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {[80, 160, 240, 320].map((y) => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="white" strokeOpacity="0.04" />
      ))}
      {[120, 240, 360].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="360" stroke="white" strokeOpacity="0.02" />
      ))}

      {/* Area fills */}
      <polygon
        points="0,260 70,210 140,230 200,155 270,170 340,105 400,120 480,80 480,360 0,360"
        fill="url(#area1)"
      />
      <polygon
        points="0,300 90,260 180,210 250,195 320,155 390,130 480,115 480,360 0,360"
        fill="url(#area2)"
      />

      {/* Primary line — indigo */}
      <polyline
        points="0,260 70,210 140,230 200,155 270,170 340,105 400,120 480,80"
        fill="none"
        stroke="#6366f1"
        strokeWidth="2"
        strokeOpacity="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        style={{
          strokeDasharray: 900,
          strokeDashoffset: 900,
          animation: 'auth-draw 1.4s ease-out 0.3s forwards',
        }}
      />

      {/* Secondary line — emerald */}
      <polyline
        points="0,300 90,260 180,210 250,195 320,155 390,130 480,115"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 900,
          strokeDashoffset: 900,
          animation: 'auth-draw 1.6s ease-out 0.6s forwards',
        }}
      />

      {/* Dot markers on primary line */}
      {[
        [200, 155],
        [340, 105],
        [480, 80],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#6366f1"
          fillOpacity="0.9"
          filter="url(#glow)"
          style={{ animation: 'auth-fade 0.4s ease-out 1.6s both' }}
        />
      ))}
    </svg>
  );
}

// ─── Números flutuantes ───────────────────────────────────────────────────────

const FLOATING_NUMBERS = [
  { text: '+12.4%', left: '12%', top: '22%', delay: '0s',   dur: '9s'  },
  { text: 'R$ 4.821', left: '58%', top: '38%', delay: '3s', dur: '12s' },
  { text: '↑ 3.2k',  left: '28%', top: '58%', delay: '6s', dur: '10s' },
  { text: '92.1%',   left: '72%', top: '18%', delay: '1.5s', dur: '13s' },
  { text: '−R$ 320', left: '45%', top: '70%', delay: '4.5s', dur: '11s' },
];

// ─── Input com underline ──────────────────────────────────────────────────────

interface UnderlineInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}

function UnderlineInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}: UnderlineInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-neutral-400 uppercase tracking-widest font-mono"
        style={{ fontSize: '10px' }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          'bg-transparent border-0 outline-none pb-2 pt-0.5 text-sm font-mono',
          'text-neutral-800 placeholder:text-neutral-300',
          'border-b transition-colors duration-150',
          error
            ? 'border-error-400 focus:border-error-500'
            : 'border-neutral-200 focus:border-primary-500',
        ].join(' ')}
      />
      {error && (
        <p className="text-error-500 font-mono" style={{ fontSize: '11px' }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function LoginPage() {
  const { login, register } = useAuth();
  const uid = useId();

  const [mode, setMode] = useState<Mode>('login');
  const [switching, setSwitching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Campos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function switchMode(next: Mode) {
    if (next === mode || switching) return;
    setSwitching(true);
    setErrors({});
    setApiError('');
    setTimeout(() => {
      setMode(next);
      setSwitching(false);
    }, 180);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setApiError('');

    if (mode === 'login') {
      const result = loginSchema.safeParse({ email, password });
      if (!result.success) {
        const errs: FormErrors = {};
        result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
        setErrors(errs);
        return;
      }
      setIsLoading(true);
      try {
        await login({ email, password });
      } catch (err: unknown) {
        setApiError((err as Error)?.message || 'Credenciais inválidas. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    } else {
      const result = registerSchema.safeParse({ name, email, password, confirmPassword });
      if (!result.success) {
        const errs: FormErrors = {};
        result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
        setErrors(errs);
        return;
      }
      setIsLoading(true);
      try {
        await register({ name, email, password });
      } catch (err: unknown) {
        setApiError((err as Error)?.message || 'Erro ao criar conta. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {/* Keyframes isolados da auth page */}
      <style>{`
        @keyframes auth-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes auth-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes auth-float {
          0%   { transform: translateY(0px);   opacity: 0;    }
          15%  { opacity: 0.14; }
          85%  { opacity: 0.09; }
          100% { transform: translateY(-64px); opacity: 0;    }
        }
        @keyframes auth-card {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes auth-field {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes auth-headline {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .auth-card   { animation: auth-card  0.4s ease-out both; }
        .auth-field  { animation: auth-field 0.2s ease-out both; }
        .auth-headline { animation: auth-headline 0.25s ease-out both; }
      `}</style>

      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      <div className="min-h-screen bg-[#07091280] flex items-center justify-center p-4 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #060912 0%, #0D1020 100%)' }}>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
               backgroundSize: '200px 200px',
             }}
        />

        {/* ── Card central ─────────────────────────────────────────────── */}
        <div className="auth-card w-full max-w-5xl flex rounded-2xl overflow-hidden"
             style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)', minHeight: 620 }}>

          {/* ══ PAINEL ESQUERDO ════════════════════════════════════════ */}
          <div className="hidden md:flex w-[44%] relative overflow-hidden flex-col justify-end p-10"
               style={{ background: 'linear-gradient(160deg, #0E1222 0%, #080B18 100%)' }}>

            {/* Linha de brilho na borda direita */}
            <div className="absolute right-0 top-0 bottom-0 w-px"
                 style={{ background: 'linear-gradient(to bottom, transparent, #6366f140, #6366f160, #6366f140, transparent)' }} />

            {/* SVG de gráficos */}
            <ChartSVG />

            {/* Números flutuantes */}
            {FLOATING_NUMBERS.map(({ text, left, top, delay, dur }) => (
              <span
                key={text}
                aria-hidden="true"
                className="absolute font-mono text-white pointer-events-none select-none"
                style={{
                  left, top,
                  fontSize: '11px',
                  opacity: 0,
                  animation: `auth-float ${dur} ${delay} infinite`,
                  letterSpacing: '0.05em',
                }}
              >
                {text}
              </span>
            ))}

            {/* Linhas horizontais de grade */}
            {[25, 50, 75].map((pct) => (
              <div
                key={pct}
                aria-hidden="true"
                className="absolute left-0 right-0 pointer-events-none"
                style={{ top: `${pct}%`, borderTop: '1px solid rgba(255,255,255,0.03)' }}
              />
            ))}

            {/* Logo + tagline no rodapé */}
            <div className="relative z-10">
              <p className="text-white mb-2 font-display font-semibold tracking-tight"
                 style={{ fontSize: '26px', letterSpacing: '-0.02em' }}>
                finan<span className="text-primary-400">·</span>app
              </p>
              <div className="w-8 mb-3" style={{ borderTop: '1px solid rgba(99,102,241,0.5)' }} />
              <p className="font-mono uppercase text-primary-300/50 leading-relaxed"
                 style={{ fontSize: '10px', letterSpacing: '0.18em' }}>
                Controle total<br />sobre seu dinheiro
              </p>
            </div>
          </div>

          {/* ══ PAINEL DIREITO ═════════════════════════════════════════ */}
          <div className="flex-1 bg-white flex flex-col justify-center px-10 py-12">

            {/* Logo mobile */}
            <p className="md:hidden font-display font-semibold text-neutral-900 mb-8 text-2xl">
              finan<span className="text-primary-500">·</span>app
            </p>

            {/* ── Tab toggle ──────────────────────────────────────────── */}
            <div className="bg-neutral-100 rounded-full p-1 flex w-fit mb-9"
                 role="tablist"
                 aria-label="Modo de autenticação">
              {(['login', 'register'] as Mode[]).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => switchMode(m)}
                  className={[
                    'px-5 py-1.5 rounded-full font-mono uppercase transition-all duration-250 cursor-pointer',
                    mode === m
                      ? 'bg-white shadow-sm text-neutral-900'
                      : 'text-neutral-400 hover:text-neutral-600',
                  ].join(' ')}
                  style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                >
                  {m === 'login' ? 'Entrar' : 'Criar conta'}
                </button>
              ))}
            </div>

            {/* ── Headline ────────────────────────────────────────────── */}
            <div key={mode} className={switching ? 'opacity-0' : 'auth-headline'}>
              <h1 className="font-display font-semibold text-neutral-900 leading-tight mb-1"
                  style={{ fontSize: '28px', letterSpacing: '-0.02em' }}>
                {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
              </h1>
              <p className="font-mono text-neutral-400 mb-8" style={{ fontSize: '12px' }}>
                {mode === 'login'
                  ? 'Acesse seu painel financeiro'
                  : 'Comece a organizar suas finanças hoje'}
              </p>
            </div>

            {/* ── Formulário ──────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

              {/* Nome (só no cadastro) */}
              {mode === 'register' && (
                <div className="auth-field">
                  <UnderlineInput
                    id={`${uid}-name`}
                    label="Nome completo"
                    value={name}
                    onChange={setName}
                    error={errors.name?.toString() || ""}
                    placeholder="Seu nome"
                    autoComplete="name"
                  />
                </div>
              )}

              {/* E-mail */}
              <UnderlineInput
                id={`email`}
                label="E-mail"
                type="string"
                value={email}
                onChange={setEmail}
                error={errors.email?.toString() || ""}
                placeholder="voce@email.com"
                
              />

              {/* Senha */}
              <UnderlineInput
                id="password"
                label="Senha"
                type="password"
                value={password}
                onChange={setPassword}
                error={errors.password?.toString() || ""}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />

              {/* Confirmar senha (só no cadastro) */}
              {mode === 'register' && (
                <div className="auth-field" style={{ animationDelay: '60ms' }}>
                  <UnderlineInput
                    id={`${uid}-confirm`}
                    label="Confirmar senha"
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    error={errors.confirmPassword?.toString() || ""}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {/* Esqueceu a senha (só no login) */}
              {mode === 'login' && (
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    className="font-mono text-primary-500 hover:text-primary-600 transition-colors"
                    style={{ fontSize: '11px' }}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              {/* Erro de API */}
              {apiError && (
                <div className="bg-error-50 border border-error-100 rounded-lg px-4 py-3">
                  <p className="font-mono text-error-600" style={{ fontSize: '12px' }}>
                    {apiError}
                  </p>
                </div>
              )}

              {/* Botão CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className={[
                  'w-full py-3.5 rounded-lg text-white font-mono uppercase',
                  'transition-all duration-200 active:scale-[0.99]',
                  isLoading
                    ? 'bg-neutral-400 cursor-not-allowed'
                    : 'bg-[#0A0E1A] hover:bg-primary-600 cursor-pointer',
                ].join(' ')}
                style={{ fontSize: '12px', letterSpacing: '0.12em' }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    Processando...
                  </span>
                ) : mode === 'login' ? (
                  'Entrar'
                ) : (
                  'Criar conta'
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-neutral-100" />
                <span className="font-mono text-neutral-300" style={{ fontSize: '10px' }}>
                  ou continue com
                </span>
                <div className="flex-1 h-px bg-neutral-100" />
              </div>

              {/* Botões sociais */}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 border border-neutral-200 rounded-lg py-2.5 flex items-center
                             justify-center gap-2 text-neutral-600 hover:border-neutral-300
                             hover:bg-neutral-50 transition-all duration-150 cursor-pointer"
                >
                  {/* Google icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-mono" style={{ fontSize: '12px' }}>Google</span>
                </button>

                <button
                  type="button"
                  className="flex-1 border border-neutral-200 rounded-lg py-2.5 flex items-center
                             justify-center gap-2 text-neutral-600 hover:border-neutral-300
                             hover:bg-neutral-50 transition-all duration-150 cursor-pointer"
                >
                  {/* Apple icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="font-mono" style={{ fontSize: '12px' }}>Apple</span>
                </button>
              </div>

            </form>

            {/* Link de alternância mobile */}
            <p className="mt-6 text-center font-mono text-neutral-400" style={{ fontSize: '12px' }}>
              {mode === 'login' ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
              <button
                type="button"
                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                className="text-primary-500 hover:text-primary-600 transition-colors cursor-pointer"
              >
                {mode === 'login' ? 'Criar conta' : 'Entrar'}
              </button>
            </p>
          </div>
          {/* ══ FIM PAINEL DIREITO ════════════════════════════════════ */}

        </div>
      </div>
    </>
  );
}
