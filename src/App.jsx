import { useEffect, useMemo, useRef, useState } from 'react'

const testimonials = [
  {
    author: 'César U.',
    role: 'Assessor de Investimentos',
    text: '"A masterclass virou uma chave na minha cabeça. Entendi que escalar minha base de clientes não é sobre trabalhar 14 horas por dia, mas sim aplicar o método institucional certo. Minha captação triplicou depois de implementar."',
  },
  {
    author: 'Pedro H.',
    role: 'Assessor Sênior',
    text: '"A Carreira em Escala me tirou da estagnação. Eu não conseguia passar dos R$ 50 milhões sob custódia e vivia apagando incêndios. Hoje, tenho previsibilidade de receita e recuperei minha qualidade de vida. O método do Samyr é transformador."',
  },
  {
    author: 'Eliel J.',
    role: 'Sócio-Diretor B2B',
    text: '"Eu estava quase desistindo do mercado financeiro pela falta de resultados consistentes e concorrência predatória. O passo a passo ensinado me deu a clareza institucional e a autonomia que eu precisava para finalmente decolar."',
  },
]

const workshopItems = [
  {
    lesson: 'Aula 01',
    icon: 'ph-trend-up',
    title: 'Os Segredos do\nTrader Sossegado',
    description: 'Aprenda a exata psicologia operacional de quem encara o mercado de forma institucional, com chances reais de resultados consistentes e zero stress emocional.',
  },
  {
    lesson: 'Aula 02',
    icon: 'ph-magnifying-glass',
    title: 'Simplificando o\nRuído do Gráfico',
    description: 'Você terá acesso a um indicador visualmente limpo, objetivo e de fácil interpretação para tomada de decisão. E o melhor: de forma 100% gratuita.',
  },
  {
    lesson: 'Aula 03',
    icon: 'ph-clock',
    title: 'Apenas 15 Minutos\npor Dia de Foco',
    description: 'Entenda como mapear e aproveitar janelas e condições diárias específicas do mercado para buscar ganhos constantes sem precisar ficar preso na tela.',
  },
  {
    lesson: 'Aula 04',
    icon: 'ph-brain',
    title: 'A Formação do\nProfissional Moderno',
    description: 'A síntese de um modelo simples para buscar lucro em day trade aliado a uma gestão de patrimônio e relacionamento que te devolve tempo e qualidade de vida.',
  },
]

const notForItems = [
  'Quem busca estabilidade acima de crescimento profissional',
  'Quem prefere seguir um modelo pronto, sem inovar',
  'Quem se acomodou com uma remuneração previsível (e limitada)',
  'Quem não quer assumir protagonismo na própria carreira',
]

const idealForItems = [
  'Quem busca crescimento proporcional ao próprio esforço',
  'Quem exige ter autonomia real na sua forma de atuação',
  'Quem entende que relacionamento gera patrimônio a longo prazo',
  'Profissionais que já atuam, mas sentem que precisam romper o teto de faturamento',
]

function useAnimatedCounter(target, start = false, duration = 2500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame = 0
    let startTime = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(easeProgress * target))
      if (progress < 1) {
        frame = window.requestAnimationFrame(step)
      }
    }

    frame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frame)
  }, [start, target, duration])

  return value
}

function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])

  return inView
}

function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-[70] p-3 md:hidden pointer-events-none">
      <div className="max-w-md mx-auto bg-dark-900/85 border border-white/10 backdrop-blur-2xl rounded-[24px] shadow-[0_-10px_30px_rgba(0,0,0,0.35)] p-2 pointer-events-auto">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white font-bold py-4 rounded-[18px] uppercase tracking-wide text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
        >
          Garantir Minha Vaga
          <i className="ph-bold ph-arrow-up-right"></i>
        </button>
      </div>
    </div>
  )
}

function AnnouncementBar() {
  return (
    <div className="w-full bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 py-2.5 text-center px-4 relative z-50">
      <p className="text-[11px] md:text-sm font-medium text-white tracking-wide">
        <span className="font-bold">Aviso:</span> As vagas para a nova turma são estritamente limitadas. Garanta seu acesso.
      </p>
    </div>
  )
}

function HeroForm() {
  const [formData, setFormData] = useState({ nome: '', email: '', whatsapp: '', ancord: 'sim' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.alert('Formulário enviado com sucesso!')
  }

  return (
    <form className="w-full max-w-md bg-white/[0.03] p-5 md:p-6 lg:p-8 rounded-[28px] md:rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl relative" onSubmit={handleSubmit}>
      <div className="absolute -top-3 right-5 md:right-6 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]">
        Vagas Limitadas
      </div>

      <div className="space-y-4 mb-7 md:mb-8">
        <div className="relative">
          <i className="ph-fill ph-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"></i>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" required className="glass-input w-full rounded-2xl md:rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 transition-all outline-none" />
        </div>
        <div className="relative">
          <i className="ph-fill ph-envelope-simple absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"></i>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail principal" required className="glass-input w-full rounded-2xl md:rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 transition-all outline-none" />
        </div>
        <div className="relative">
          <i className="ph-fill ph-whatsapp-logo absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"></i>
          <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp (com DDD)" required className="glass-input w-full rounded-2xl md:rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 transition-all outline-none" />
        </div>

        <div className="pt-2">
          <p className="text-sm text-gray-300 mb-3 font-medium">Você possui certificação Ancord?</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative w-full">
              <input type="radio" name="ancord" id="sim" value="sim" className="radio-input hidden" checked={formData.ancord === 'sim'} onChange={handleChange} />
              <label htmlFor="sim" className="radio-label block text-center bg-dark-900 text-gray-400 text-sm font-medium py-3.5 md:py-2.5 rounded-2xl md:rounded-lg hover:bg-white/5">Sim, possuo</label>
            </div>
            <div className="relative w-full">
              <input type="radio" name="ancord" id="nao" value="nao" className="radio-input hidden" checked={formData.ancord === 'nao'} onChange={handleChange} />
              <label htmlFor="nao" className="radio-label block text-center bg-dark-900 text-gray-400 text-sm font-medium py-3.5 md:py-2.5 rounded-2xl md:rounded-lg hover:bg-white/5">Ainda não</label>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="group w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white font-bold py-4 rounded-2xl md:rounded-lg hover:from-purple-600 hover:to-purple-400 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] uppercase tracking-wider text-sm flex items-center justify-center gap-2">
        Garantir Minha Vaga
        <i className="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
      </button>

      <p className="text-[11px] text-gray-500 text-center mt-5 flex items-center justify-center gap-1.5 opacity-80">
        <i className="ph-fill ph-shield-check text-purple-400 text-sm"></i> Suas informações estão seguras.
      </p>
    </form>
  )
}

function HeroSection() {
  return (
    <section className="relative pt-8 md:pt-10 pb-16 md:pb-20 lg:pt-16 lg:pb-32 overflow-hidden bg-dark-950 z-10 border-b border-white/5">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.03] mix-blend-screen pointer-events-none -z-20"></div>
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-hero-glow z-0 pointer-events-none -z-10"></div>
      <div id="home-broker-bg" className="absolute inset-0 overflow-hidden opacity-[0.08] font-mono text-[10px] sm:text-xs z-0 pointer-events-none flex flex-wrap gap-x-8 gap-y-3 p-4 content-start" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 90%)', maskImage: 'linear-gradient(to bottom, black 30%, transparent 90%)' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 mt-2 md:mt-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-12">
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left" data-aos="fade-right">
            <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-5 md:mb-6 backdrop-blur-md shadow-lg self-start">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              <p className="text-gray-200 font-semibold text-[11px] md:text-xs tracking-widest uppercase mt-0.5">Masterclass Exclusiva e Gratuita</p>
            </div>

            <h1 className="font-heading text-[2.15rem] sm:text-5xl md:text-5xl lg:text-7xl font-black leading-[1.02] tracking-tight mb-5 md:mb-6">
              CARREIRA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">EM ESCALA</span>
            </h1>

            <p className="text-[15px] md:text-lg text-gray-300 font-light mb-6 md:mb-8 max-w-lg leading-relaxed">
              A oportunidade definitiva para profissionais que buscam crescer com <strong className="text-white font-medium">autonomia, escala e receita recorrente</strong> no mercado financeiro de alto nível.
            </p>

            <div className="grid grid-cols-3 gap-2.5 md:flex md:flex-wrap md:items-center md:gap-5 text-[11px] md:text-sm text-gray-300 mb-7 md:mb-10 font-medium bg-white/[0.04] md:bg-dark-900/50 p-3 md:p-4 rounded-[24px] md:rounded-xl border border-white/5 backdrop-blur-sm w-full max-w-md shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5 text-center md:text-left"><i className="ph-fill ph-calendar-blank text-purple-400 text-lg md:text-xl"></i><span>15 DE MAIO</span></div>
              <div className="hidden md:block w-px h-6 bg-white/10"></div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5 text-center md:text-left"><i className="ph-fill ph-clock text-purple-400 text-lg md:text-xl"></i><span>20H</span></div>
              <div className="hidden md:block w-px h-6 bg-white/10"></div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5 text-center md:text-left"><i className="ph-fill ph-desktop text-purple-400 text-lg md:text-xl"></i><span>AO VIVO</span></div>
            </div>

            <HeroForm />
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-end relative min-h-[300px] sm:min-h-[360px] lg:min-h-[650px] mt-3 md:mt-8 lg:mt-0" data-aos="fade-left" data-aos-delay="100">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-purple-600/15 blur-[100px] rounded-full z-0 pointer-events-none"></div>
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[500px] mx-auto flex justify-center">
              <div className="absolute inset-x-6 top-3 bottom-0 rounded-[34px] bg-gradient-to-b from-white/10 to-transparent opacity-40 blur-md md:hidden"></div>
              <img
                src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'%3E%3Cpath fill='%234b5563' d='M400 200c-66.3 0-120 53.7-120 120s53.7 120 120 120 120-53.7 120-120-53.7-120-120-120zm0 280c-132.5 0-240 107.5-240 240v280h480V720c0-132.5-107.5-240-240-240z'/%3E%3C/svg%3E"
                alt="Samyr Castro"
                className="w-full object-cover transition-all duration-700 drop-shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfileSection() {
  return (
    <section className="py-20 md:py-24 relative bg-dark-900 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBWMEgwem0zOS0xdjFINHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz4KPC9zdmc+')] opacity-50 pointer-events-none -z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950 pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div id="candles-bg" className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-[0.4]" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center border border-purple-500/30 rounded-full px-5 py-1.5 mb-6 bg-purple-500/10 backdrop-blur-sm">
            <i className="ph-fill ph-scan text-purple-400 mr-2 text-sm"></i>
            <span className="text-purple-400 font-bold text-xs tracking-widest uppercase">Análise de Perfil Profissional</span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight uppercase">Isso <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">não é</span> para todo mundo</h2>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-base md:text-lg">O mercado financeiro de alto nível separa curiosos de profissionais. Identifique de qual lado você está operando hoje.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 relative">
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2"></div>

          <div className="space-y-5 md:space-y-6">
            <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-red-500/20 pb-4" data-aos="fade-right">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]"><i className="ph-bold ph-trend-down text-red-500 text-2xl"></i></div>
              <h3 className="text-2xl font-heading font-bold uppercase text-white tracking-tight">O método não serve para:</h3>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              {notForItems.map((item, index) => (
                <div key={item} className="bg-dark-950/90 border border-white/5 rounded-[24px] md:rounded-xl p-5 hover:border-red-500/30 transition-all duration-300 backdrop-blur-md group shadow-[0_8px_25px_rgba(0,0,0,0.16)]" data-aos="fade-right" data-aos-delay={100 * (index + 1)}>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-dark-800 group-hover:bg-red-500/20 flex items-center justify-center transition-colors"><i className="ph-bold ph-x text-gray-500 group-hover:text-red-500 text-xs transition-colors"></i></div>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 md:space-y-6 mt-2 lg:mt-0">
            <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-green-500/20 pb-4" data-aos="fade-left">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]"><i className="ph-bold ph-trend-up text-green-500 text-2xl"></i></div>
              <h3 className="text-2xl font-heading font-bold uppercase text-white tracking-tight">O método é ideal para:</h3>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              {idealForItems.map((item, index) => (
                <div key={item} className="bg-white/[0.04] border border-green-500/20 rounded-[24px] md:rounded-xl p-5 shadow-[0_8px_25px_rgba(0,0,0,0.16)] hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 backdrop-blur-md group" data-aos="fade-left" data-aos-delay={100 * (index + 1)}>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-green-500/20 group-hover:bg-green-500/30 flex items-center justify-center transition-colors"><i className="ph-bold ph-check text-green-400 text-xs"></i></div>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsGrid() {
  const statsRef = useRef(null)
  const inView = useInView(statsRef)
  const custody = useAnimatedCounter(30, inView)
  const clients = useAnimatedCounter(200, inView)
  const professionals = useAnimatedCounter(2000, inView)

  return (
    <div id="stats-container" ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full" data-aos="fade-up" data-aos-delay="200">
      <div className="rounded-[26px] md:rounded-2xl p-5 md:p-6 lg:p-8 flex items-center justify-center lg:justify-start gap-5 bg-gradient-to-r from-dark-900 to-dark-950 border border-white/5 shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-purple-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
        <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl md:rounded-xl text-purple-400 shrink-0 border border-white/10"><i className="ph-fill ph-chart-bar text-4xl"></i></div>
        <div className="relative z-10 text-left"><div className="font-heading font-black text-3xl md:text-4xl text-white">+R$ <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{custody.toLocaleString('pt-BR')}</span> BI</div><div className="text-[11px] lg:text-xs text-purple-400 uppercase tracking-[0.15em] font-bold mt-1">Sob Custódia</div></div>
      </div>
      <div className="rounded-[26px] md:rounded-2xl p-5 md:p-6 lg:p-8 flex items-center justify-center lg:justify-start gap-5 bg-gradient-to-r from-dark-900 to-dark-950 border border-white/5 shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-purple-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
        <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl md:rounded-xl text-purple-400 shrink-0 border border-white/10"><i className="ph-fill ph-users-three text-4xl"></i></div>
        <div className="relative z-10 text-left"><div className="font-heading font-black text-3xl md:text-4xl text-white">+<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{clients.toLocaleString('pt-BR')}</span> MIL</div><div className="text-[11px] lg:text-xs text-purple-400 uppercase tracking-[0.15em] font-bold mt-1">Clientes Ativos</div></div>
      </div>
      <div className="rounded-[26px] md:rounded-2xl p-5 md:p-6 lg:p-8 flex items-center justify-center lg:justify-start gap-5 bg-gradient-to-r from-dark-900 to-dark-950 border border-white/5 shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-purple-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
        <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl md:rounded-xl text-purple-400 shrink-0 border border-white/10"><i className="ph-fill ph-user-focus text-4xl"></i></div>
        <div className="relative z-10 text-left"><div className="font-heading font-black text-3xl md:text-4xl text-white">+<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{professionals.toLocaleString('pt-BR')}</span></div><div className="text-[11px] lg:text-xs text-purple-400 uppercase tracking-[0.15em] font-bold mt-1">Profissionais Liderados</div></div>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <section className="py-20 md:py-24 relative bg-dark-950 z-10 border-t border-white/5">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-fixed bg-center opacity-[0.04] mix-blend-luminosity pointer-events-none -z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-14 md:gap-16 lg:gap-20">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-20 items-center">
            <div className="relative w-[260px] sm:w-[300px] lg:w-[420px] h-[340px] sm:h-[380px] lg:h-[500px] shrink-0 mx-auto lg:mx-0" data-aos="zoom-in">
              <div className="absolute top-12 md:top-16 bottom-0 left-0 right-0 rounded-[2rem] p-[2px] bg-gradient-to-tr from-cyan-400/80 via-purple-500 to-purple-700 shadow-[0_0_40px_rgba(168,85,247,0.3)] z-0">
                <div className="w-full h-full bg-dark-950 rounded-[30px] border border-white/5"></div>
              </div>
              <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Cpath fill='%234b5563' d='M200 120c-38.6 0-70 31.4-70 70s31.4 70 70 70 70-31.4 70-70-31.4-70-70-70zm0 160c-77.3 0-140 62.7-140 140v160h280V420c0-77.3-62.7-140-140-140z'/%3E%3C/svg%3E" alt="Samyr Castro" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] h-[115%] object-cover object-bottom z-10 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:scale-105" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }} />
              <div className="absolute -right-2 md:-right-4 top-20 md:top-24 z-20 bg-dark-900/90 border border-purple-500/30 backdrop-blur-md px-4 py-3 rounded-2xl md:rounded-xl shadow-2xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center"><i className="ph-fill ph-buildings text-purple-400 text-xl"></i></div>
                  <div><p className="text-white font-bold text-sm">CEO & Fundador</p><p className="text-gray-400 text-xs">InvestSmart XP</p></div>
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left space-y-7 md:space-y-8" data-aos="fade-up" data-aos-delay="100">
              <div>
                <div className="inline-flex px-4 py-1.5 border border-purple-500/30 rounded-full bg-purple-500/10 mb-5"><p className="text-purple-400 text-xs tracking-widest uppercase font-bold">O Mentor do Workshop</p></div>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">Samyr <br className="hidden lg:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Castro</span></h2>
              </div>
              <div className="text-gray-300 space-y-5 md:space-y-6 font-light text-[15px] md:text-base lg:text-lg leading-relaxed border-l-0 lg:border-l-2 border-purple-500/30 pl-0 lg:pl-8 ml-0 bg-white/[0.03] lg:bg-transparent rounded-[24px] lg:rounded-none p-5 lg:p-0 border lg:border-0 border-white/5 shadow-[0_8px_25px_rgba(0,0,0,0.16)] lg:shadow-none">
                <p>Fundador e CEO da InvestSmart XP, consolidou um dos maiores ecossistemas de assessoria e distribuição financeira do Brasil, plenamente integrado ao grupo <strong className="text-white font-medium">XP Inc</strong>.</p>
                <p>Sua trajetória não começou no topo. Ele iniciou na ponta, atendendo diretamente clientes pessoa física. Foi essa vivência de trincheira que moldou uma visão analítica e implacável sobre como o mercado realmente opera e como se estrutura uma operação de sucesso.</p>
                <blockquote className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-[24px] md:rounded-r-2xl md:rounded-bl-2xl italic text-gray-200 shadow-inner mt-4 relative">
                  <span className="absolute top-2 left-2 text-purple-500/20 font-serif text-6xl leading-none">"</span>
                  <p className="relative z-10 pt-2"><strong className="text-white font-semibold text-purple-400 text-lg md:text-xl">Investir de forma consistente não depende da venda de um produto.</strong> Depende da construção de um método, alinhamento técnico e acompanhamento cirúrgico.</p>
                </blockquote>
              </div>
            </div>
          </div>

          <StatsGrid />
        </div>
      </div>
    </section>
  )
}

function WorkshopSection() {
  return (
    <section className="py-20 md:py-24 relative bg-dark-900 z-10 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none -z-10"></div>
      <div id="tape-bg" className="absolute inset-0 overflow-hidden opacity-[0.04] font-mono text-[10px] z-0 pointer-events-none flex flex-col justify-around py-10" style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)', maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <div className="inline-flex px-5 py-1.5 border border-purple-500/30 rounded-full bg-purple-500/10 mb-4"><p className="text-purple-400 text-xs tracking-widest uppercase font-bold">O Conteúdo</p></div>
          <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight">O mapa de execução que <br className="hidden md:block" />você vai <span className="text-purple-500">dominar</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {workshopItems.map((item, index) => (
            <div key={item.lesson} className="bg-dark-950 border border-white/5 rounded-[26px] md:rounded-2xl p-6 md:p-8 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_15px_30px_rgba(168,85,247,0.1)] transition-all duration-300 group relative overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.16)]" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-between mb-5 md:mb-6">
                <span className="text-white font-bold flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full md:rounded-md text-sm"><i className="ph-fill ph-play-circle text-purple-400 text-lg"></i> {item.lesson}</span>
                <div className="w-12 h-12 flex items-center justify-center bg-dark-900 border border-white/5 rounded-2xl md:rounded-xl text-gray-500 group-hover:bg-purple-500/20 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all duration-300"><i className={`ph-fill ${item.icon} text-2xl`}></i></div>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight text-gray-100">{item.title.split('\n').map((part) => <span key={part}>{part}<br /></span>)}</h3>
              <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(1)

  const getItemClass = (index) => {
    if (index === currentIndex) return 'active'
    if (window.innerWidth < 768) return index === currentIndex ? 'active' : 'hidden-item'
    if (index === currentIndex - 1 || (currentIndex === 0 && index === testimonials.length - 1)) return 'prev'
    if (index === currentIndex + 1 || (currentIndex === testimonials.length - 1 && index === 0)) return 'next'
    return 'hidden-item'
  }

  return (
    <section className="py-20 md:py-24 relative bg-dark-950 overflow-hidden border-t border-white/5 z-10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-fixed bg-center opacity-[0.03] mix-blend-luminosity pointer-events-none -z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_50%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center border border-purple-500/30 rounded-full px-5 py-1.5 mb-6 bg-purple-500/10 backdrop-blur-sm"><span className="text-purple-400 font-bold text-xs tracking-widest uppercase">Resultados Validados</span></div>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight uppercase">O que mudou na carreira de quem <br className="hidden md:block" />já participou da <span className="text-purple-500">imersão</span></h2>
        </div>

        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center min-h-[340px] md:min-h-[350px]" data-aos="fade-up" data-aos-delay="100">
          <button onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="absolute left-1 top-1/2 -translate-y-1/2 md:left-0 md:-left-12 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-dark-900/80 border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all shadow-lg backdrop-blur-xl" aria-label="Anterior"><i className="ph-bold ph-caret-left text-xl"></i></button>
          <button onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)} className="absolute right-1 top-1/2 -translate-y-1/2 md:right-0 md:-right-12 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-dark-900/80 border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all shadow-lg backdrop-blur-xl" aria-label="Próximo"><i className="ph-bold ph-caret-right text-xl"></i></button>

          <div className="relative w-full h-[340px] md:h-[350px] flex items-center justify-center px-8 md:px-0">
            {testimonials.map((item, index) => {
              const isActive = index === currentIndex
              return (
                <div key={item.author} className={`carousel-item absolute w-full md:w-[50%] text-center transition-all duration-500 ease-in-out px-3 md:px-6 ${getItemClass(index)}`}>
                  <div className="bg-white/[0.04] border border-white/8 rounded-[28px] md:bg-transparent md:border-0 md:rounded-none px-5 py-7 md:px-0 md:py-0 shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:shadow-none backdrop-blur-xl md:backdrop-blur-none">
                    <i className="ph-fill ph-quotes text-4xl text-purple-500/30 mb-4 inline-block"></i>
                    <p className="desc text-[15px] md:text-lg leading-relaxed mb-8 transition-colors duration-500">{item.text}</p>
                    <div className="author-block transition-all duration-500" style={{ opacity: isActive ? 1 : 0 }}>
                      <p className="author font-bold text-lg">{item.author}</p>
                      <p className="text-purple-400 text-sm mt-1">{item.role}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2.5 mt-2" data-aos="fade-up" data-aos-delay="200">
          {testimonials.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={index === currentIndex ? 'w-8 h-2.5 rounded-full bg-purple-500 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'w-2.5 h-2.5 rounded-full bg-white/20 transition-all duration-300 hover:bg-white/40'} aria-label={`Ir para depoimento ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="py-16 md:py-16 pb-28 md:pb-16 relative bg-dark-950 z-10 border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12),transparent_60%)] pointer-events-none -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 bg-white/[0.03] border border-white/5 rounded-[30px] md:rounded-3xl p-6 md:p-8 lg:p-12 backdrop-blur-md shadow-2xl">
          <div className="text-center lg:text-left flex-1" data-aos="fade-right">
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-gray-200 tracking-tight leading-snug">O mercado financeiro recompensa <br className="hidden md:block" />exclusivamente quem se posiciona.</h2>
            <h2 className="font-heading text-2xl md:text-3xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mt-2">A sua decisão de escala começa aqui.</h2>
          </div>

          <div className="hidden md:flex flex-col items-center lg:items-end w-full lg:w-auto" data-aos="fade-left" data-aos-delay="100">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group w-full lg:w-[380px] bg-gradient-to-r from-purple-700 to-purple-500 text-white font-bold py-4 lg:py-5 rounded-xl hover:from-purple-600 hover:to-purple-400 transition-all shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] uppercase tracking-wider text-sm flex items-center justify-center gap-2">
              Garantir Vaga Gratuita Agora
              <i className="ph-bold ph-arrow-up-right group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </button>
            <div className="flex items-center gap-4 mt-4 opacity-80">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium"><i className="ph-fill ph-lock-key text-purple-400 text-sm"></i> Ambiente Seguro</div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium"><i className="ph-fill ph-users text-purple-400 text-sm"></i> Vagas Limitadas</div>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16 text-center flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-gray-500 font-medium tracking-wide">&copy; {year} Carreira em Escala. Todos os direitos reservados.</p>
          <p className="text-[10px] text-gray-600 max-w-2xl">Este site não faz parte da rede XP Inc. O conteúdo aqui apresentado tem finalidade estritamente educacional voltada a profissionais de mercado.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ once: true, offset: 50, duration: 800, easing: 'ease-out-cubic' })
    }
  }, [])

  useEffect(() => {
    const bg = document.getElementById('home-broker-bg')
    if (!bg) return
    bg.innerHTML = ''
    const tickers = ['WINV24', 'WDOV24', 'PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'B3SA3', 'ABEV3', 'WEGE3', 'ELET3', 'RENT3', 'BBAS3', 'MGLU3', 'RADL3', 'VIVT3', 'SUZB3', 'EQTL3', 'CSNA3', 'USIM5', 'GGBR4']
    const numItems = 100
    const elements = []

    for (let i = 0; i < numItems; i++) {
      const ticker = tickers[Math.floor(Math.random() * tickers.length)]
      const price = (Math.random() * 100).toFixed(2)
      const el = document.createElement('div')
      el.className = 'flex items-center gap-1.5 text-gray-700 transition-colors duration-300'
      el.innerHTML = `<span class="font-bold opacity-30">${ticker}</span><span class="price opacity-50">${price}</span><span class="arrow text-[8px] opacity-0 transition-opacity">▲</span>`
      bg.appendChild(el)
      elements.push({ dom: el, priceSpan: el.querySelector('.price'), arrowSpan: el.querySelector('.arrow'), price: parseFloat(price) })
    }

    const interval = window.setInterval(() => {
      const numUpdates = Math.floor(Math.random() * 8) + 3
      for (let i = 0; i < numUpdates; i++) {
        const idx = Math.floor(Math.random() * elements.length)
        const item = elements[idx]
        const change = (Math.random() * 3) - 1.5
        item.price = Math.max(0.1, item.price + change)
        item.priceSpan.innerText = item.price.toFixed(2)

        if (change > 0) {
          item.dom.classList.add('text-green-500/50')
          item.dom.classList.remove('text-gray-700', 'text-red-500/50')
          item.arrowSpan.innerText = '▲'
          item.arrowSpan.classList.remove('opacity-0')
        } else {
          item.dom.classList.add('text-red-500/50')
          item.dom.classList.remove('text-gray-700', 'text-green-500/50')
          item.arrowSpan.innerText = '▼'
          item.arrowSpan.classList.remove('opacity-0')
        }

        window.setTimeout(() => {
          if (item.dom) {
            item.dom.classList.remove('text-green-500/50', 'text-red-500/50')
            item.dom.classList.add('text-gray-700')
            item.arrowSpan.classList.add('opacity-0')
          }
        }, 800)
      }
    }, 150)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const bg = document.getElementById('candles-bg')
    if (!bg) return
    bg.innerHTML = ''
    const numCandles = 20

    for (let i = 0; i < numCandles; i++) {
      const candle = document.createElement('div')
      const isBull = Math.random() > 0.5
      const bodyHeight = Math.random() * 40 + 10
      const wickHeight = bodyHeight + Math.random() * 30 + 10
      const topPos = Math.random() * 80 + 10
      const duration = Math.random() * 50 + 40
      const delay = Math.random() * -60

      candle.className = 'absolute flex justify-center items-center opacity-10 animate-slide-left'
      candle.style.height = `${wickHeight}px`
      candle.style.width = '4px'
      candle.style.top = `${topPos}%`
      candle.style.left = '100vw'
      candle.style.animationDuration = `${duration}s`
      candle.style.animationDelay = `${delay}s`

      const body = document.createElement('div')
      body.className = `w-full rounded-[1px] relative z-10 ${isBull ? 'bg-green-500' : 'bg-red-500'}`
      body.style.height = `${bodyHeight}px`
      body.style.marginTop = `${Math.random() * (wickHeight - bodyHeight)}px`

      const wick = document.createElement('div')
      wick.className = `absolute top-0 w-[1px] h-full ${isBull ? 'bg-green-500' : 'bg-red-500'}`

      candle.appendChild(wick)
      candle.appendChild(body)
      bg.appendChild(candle)
    }
  }, [])

  useEffect(() => {
    const bg = document.getElementById('tape-bg')
    if (!bg) return
    bg.innerHTML = ''
    const numRows = 6
    const ativos = ['WINV24', 'WDOV24', 'PETR4', 'VALE3', 'ITUB4', 'DOL', 'IND']
    const acoes = ['COMPRA', 'VENDA']

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement('div')
      const isReverse = i % 2 !== 0
      const duration = Math.random() * 80 + 80
      const delay = Math.random() * -80

      row.className = `flex whitespace-nowrap gap-20 text-gray-600 ${isReverse ? 'flex-row-reverse' : ''}`
      row.style.animation = `slide-left ${duration}s linear infinite`
      row.style.animationDelay = `${delay}s`
      if (isReverse) row.style.animationDirection = 'reverse'

      let rowContent = ''
      for (let j = 0; j < 20; j++) {
        const ativo = ativos[Math.floor(Math.random() * ativos.length)]
        const acao = acoes[Math.floor(Math.random() * acoes.length)]
        const qtd = Math.floor(Math.random() * 100) * 5 + 5
        const preco = (Math.random() * 100).toFixed(2)
        const corAcao = acao === 'COMPRA' ? 'text-green-500/40' : 'text-red-500/40'
        rowContent += `<div class="flex gap-4"><span>10:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}</span> <span class="font-bold text-gray-500">${ativo}</span> <span class="${corAcao}">${acao}</span> <span>${qtd}K @ ${preco}</span></div>`
      }

      row.innerHTML = rowContent
      bg.appendChild(row)
    }
  }, [])

  return (
    <>
      <AnnouncementBar />
      <HeroSection />
      <ProfileSection />
      <AboutSection />
      <WorkshopSection />
      <TestimonialsSection />
      <FooterSection />
      <MobileStickyCTA />
    </>
  )
}
