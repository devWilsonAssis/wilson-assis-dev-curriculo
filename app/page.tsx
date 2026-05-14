"use client";

import Image from "next/image";
import { Mail, ChevronDown, ExternalLink, Download, MapPin } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";

// --- TIPAGENS E CONFIGURAÇÕES ---
const EXPERIENCIAS = [
  {
    empresa: "TOTVS S/A",
    cargos: [
      { id: 1,
        cargo: "Analista de desenvolvimento de software sênior",
        periodo: "08/2023 – 04/2026",
        descricao: `Atuei como liderança técnica em projetos estratégicos, participando do levantamento e refinamento de requisitos
          junto às equipes de Framework, Compras e Precificação. Prestava apoio técnico, revisava código e garantia a qualidade, promovendo
          boas práticas e padronização, sendo responsável por uma equipe de 6 pessoas. Implementava funcionalidades de alta complexidade,
          atuando também na resolução de bugs críticos e na otimização de performance das aplicações. Utilizava diariamente metodologias
          ágeis, colaborando na gestão de backlog, priorização e planejamento de entregas.` },
      { id: 2,
        cargo: "Analista de desenvolvimento de software pleno",
        periodo: "08/2021 – 07/2023",
        descricao: `Atuei no desenvolvimento de funcionalidades de média a alta complexidade, participando do levantamento e refinamento
          de requisitos junto às equipes de Framework, Compras e Estrutural. Colaborava com a equipe na resolução de bugs e melhorias de
          performance, aplicando boas práticas de desenvolvimento e padrões definidos. Prestava apoio técnico a desenvolvedores menos
          experientes e participava de revisões de código. Utilizava metodologias ágeis no dia a dia, contribuindo na execução das
          demandas, organização do backlog e cumprimento das entregas.` },
      { id: 3,
        cargo: "Analista de desenvolvimento de software júnior",
        periodo: "02/2020 – 07/2021",
        descricao: `Atuei no desenvolvimento de funcionalidades de baixa a média complexidade, com acompanhamento da equipe Estrutural.
          Auxiliava na correção de bugs e melhorias nas aplicações internas, com foco em aprendizado das regras de negócio e dos padrões
          adotados. Participava de revisões de código e atividades de aprendizado técnico contínuo. Utilizava metodologias ágeis,
          contribuindo na execução das tarefas e no cumprimento das entregas.` },
    ]
  },
  {
    empresa: "Consinco S/A",
    cargos: [
      { id: 4,
        cargo: "Desenvolvedor júnior",
        periodo: "04/2019 – 01/2020",
        descricao: `Atuei no desenvolvimento de funcionalidades de baixa a média complexidade, com acompanhamento da equipe de
          Desenvolvimento Interno. Auxiliava na correção de bugs e pequenas melhorias nas aplicações, seguindo orientações e boas práticas
          de desenvolvimento. Participava de revisões de código e atividades de evolução técnica contínua. Utilizava metodologias ágeis,
          contribuindo na execução das tarefas e no fluxo de desenvolvimento do time.` },
      { id: 5,
        cargo: "Desenvolvedor trainee",
        periodo: "04/2018 – 03/2019",
        descricao: `Fui aprovado em processo seletivo com mais de 1.000 candidatos, após avaliação curricular e exame técnico. Atuei no
          desenvolvimento de funcionalidades de baixa complexidade, com foco em aprendizado e evolução técnica, junto à equipe de
          Desenvolvimento Interno. Auxiliava na correção de bugs simples e na manutenção das aplicações internas, seguindo orientações da
          equipe. Participava de atividades de treinamento, revisões de código e práticas de boas práticas de desenvolvimento. Tive
          contato com metodologias ágeis, acompanhando a execução das tarefas e o fluxo de desenvolvimento do time.` },
    ]
  },
  {
    empresa: "Atento S/A",
    cargos: [
      { id: 6,
        cargo: "Supervisor SAC",
        periodo: "02/2014 – 07/2016",
        descricao: `Era responsável pelo acompanhamento de desempenho de uma equipe de 20 pessoas e garantia da qualidade do atendimento.
          Monitorava indicadores operacionais, fomentava resultados comerciais e apoiava o time na condução de atendimentos. Atuava
          diretamente em tratativas de clientes críticos, buscando resolução eficiente e sua satisfação. Realizava análise e geração de
          relatórios, reportando os resultados à liderança e apoiando a tomada de decisões.` },
      { id: 7,
        cargo: "Operador SAC",
        periodo: "02/2013 – 01/2014",
        descricao: `Atuei no atendimento ao cliente, realizando suporte comercial e técnico. Efetuava vendas de produtos e serviços,
          alterações de planos e análise de cobranças. Prestava suporte técnico na identificação e resolução de problemas e realizava o
          agendamento de visitas técnicas. Contribuía para a qualidade do atendimento e cumprimento dos indicadores operacionais.` },
    ]
  },
  {
    empresa: "Instituto Brasileiro de Geografia e Estatística - IBGE",
    cargos: [
      { id: 8,
        cargo: "Agente censitário supervisor",
        periodo: "02/2014 – 07/2016",
        descricao: `Após aprovação em concurso público, atuei no Censo 2010, coordenando e acompanhando as atividades de recenseadores em
          campo. Participei do mapeamento e reconhecimento das regiões antes do início do recenseamento, contribuindo para o planejamento
          das áreas de atuação. Fui responsável pela orientação da equipe, distribuição de tarefas e garantia do cumprimento dos prazos e
          padrões estabelecidos. Monitorava a qualidade das informações coletadas, realizando validações e correções quando necessário.
          Atuava na resolução de problemas operacionais e no suporte à equipe, assegurando a eficiência do processo de coleta de dados.` },
    ]
  }
];

const EDUCACAO = [
  {
    grau: "Graduação Tecnológica em Análise e Desenvolvimento de Sistemas",
    instituicao: "Faculdade de Tecnologia de Ribeirão Preto - FATEC",
    periodo: "2018 – 2021",
    localidade: "Ribeirão Preto, SP",
    pdf: "/diploma.pdf"
  },
  {
    grau: "Bacharelado em Direito (incompleto)",
    instituicao: "Universidade Estadual Paulista - UNESP",
    periodo: "2008 – 2011",
    localidade: "Franca, SP"
  }
];

const CERTIFICACOES = [
  { nome: "Modelagem e Programação de Banco de Dados com SQL", pdf: "/database_design_programming_sql.pdf" },
  { nome: "Certificado profissional da Scrum Foundation", pdf: "/scrum_foundation.pdf" },
  { nome: "Python", pdf: "/python.pdf" },
  { nome: "Python para Ciência de Dados", pdf: "/python_data_science.pdf" },
  { nome: "C# e Orientação a Objetos", pdf: "/c_sharp_orientacao_objetos.pdf" },
  { nome: "Front-end", pdf: "/front_end.pdf" },
  { nome: "Gerente Ágil e Metodologia Agile", pdf: "/gerente_agil_metodologia_agile.pdf" },
  { nome: "Desenvolvimento Web com Acessibilidade", pdf: "/desenvolvimento_acessivel.pdf" },
  { nome: "Padrões de Design em Python", pdf: "/design_patterns.pdf" },
  { nome: "Estatística com Python", pdf: "/estatistica_python.pdf" },
  { nome: "Git e GitHub", pdf: "/git_github.pdf" },
  { nome: "Docker geral e focado em Python", pdf: "/docker.pdf" },
  { nome: "Linux", pdf: "/linux.pdf" },
  { nome: "Aprendizado de Máquina e Programação Neurolinguística", pdf: "/machine_learning_nlp.pdf" },
  { nome: "Python 2: sistemas legados", pdf: "/python_2.pdf" },
  { nome: "Testes Automatizados: TDD com Python", pdf: "/testes_automatizados_tdd_python.pdf" }
];

const PROJETOS = [
  {
    id: "curriculo",
    titulo: "Web Currículo Profissional",
    descricao: "Currículo web responsivo desenvolvido para apresentação profissional e portfólio técnico.",
    resumo: `Aplicação web desenvolvida com foco em apresentação profissional, centralização de informações curriculares e demonstração de
    competências técnicas. O projeto foi concebido para funcionar como um currículo digital moderno, responsivo e visualmente elegante,
    permitindo navegação intuitiva, exibição de certificados, experiências profissionais, competências, formação acadêmica e projetos
    técnicos.`,
    stack: ["Next.js", "Lucide React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Node.js", "React Hooks",
            "Visual Studio Code", "GitHub"]
  },
  {
    id: "crm-customizado",
    titulo: "CRM Customizado",
    descricao: "CRM para gestão completa de empresa de redes de proteção, customizado com os requisitos especifícos do negócio.",
    resumo: `Sistema de gestão voltado para empresas de instalação de redes de proteção. Centraliza o cadastro de clientes e endereços,
    com registro detalhado de cada ambiente — cômodos, aberturas, medidas e especificações de rede. A partir dessas informações, o
    sistema suporta a emissão de orçamentos, o acompanhamento das instalações desde o agendamento até a conclusão, e o controle de
    garantias e manutenções no pós-venda.`,
    stack: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui + Radix UI", "TanStack Query", "Wouter", "Node.js", "Express 5",
            "tsx", "Visual Studio Code", "PostgreSQL", "Drizzle ORM", "GitHub"]
  },
  {
    id: "modernizacao-erp",
    titulo: "Modernização de ERP Legado",
    descricao: "Liderança técnica na modernização visual de ERP legado com migração gradual.",
    resumo: `Projeto de modernização visual de ERP legado desenvolvido em tecnologia desktop de baixa adoção no mercado, utilizando
      recursos de skins XML disponibilizados em atualização recente do IDE. Atuei como liderança técnica de uma equipe de 6 pessoas,
      conduzindo a definição da solução, criação de componentes reutilizáveis aderentes à nova identidade visual e adaptações no
      framework para garantir compatibilidade entre módulos modernizados e legados durante a migração gradual do sistema. Desenvolvi
      scripts para automação de alterações em lote, reduzindo significativamente o esforço operacional do processo de migração.
      Também elaborei toda a documentação relacionada ao projeto, como um manual de instruções para orientar as equipes de
      desenvolvimento, um "de x para" dos artefatos, entre outros.`,
    stack: ["XML", "Gupta Centura", "OpenText Team Developer", "PowerShell", "Notepad++", "Regex", "Oracle PL/SQL", "Git", "Azure",
            "JIRA"]
  },
  {
    id: "atualizacao-ide",
    titulo: "Atualização de versão de IDE em ERP legado",
    descricao: "Liderança técnica na atualização de ERP legado entre versões críticas do IDE e validação em larga escala.",
    resumo: `Projeto de migração tecnológica de ERP legado entre versões críticas do Gupta Centura para OpenText Team Developer,
      envolvendo dezenas de módulos e milhares de aplicações. Atuei como liderança técnica de uma equipe composta por 5 especialistas e
      eu, conduzindo a estratégia de migração, definição técnica das soluções e estabilização do ambiente. Devido às incompatibilidades
      entre versões, a migração precisou ocorrer em múltiplas etapas, partindo do Gupta Centura 2.1 até o OpenText Team Developer 7.5,
      versão moderna e atualmente suportada pelo mercado. Durante o processo, foram realizados ajustes estruturais no framework para
      viabilizar a migração e estabilização dos recursos, além de um extenso processo de validação, identificação de bugs nativos da nova
      versão do IDE e tratativas técnicas junto ao fornecedor da ferramenta. Ao final do projeto, apresentei um webinar técnico ao vivo
      para mais de 300 clientes, demonstrando os ganhos obtidos com a modernização da plataforma.`,
    stack: ["Gupta Centura", "OpenText Team Developer", "Oracle PL/SQL", "Notepad++", "Regex", "Git", "JIRA"]
  },
  {
    id: "projeto-cangaco",
    titulo: "Projeto Cangaço: reconhecimento de misoginia na rede social Twitter",
    descricao: "Modelo de IA para identificação de misoginia em tweets utilizando NLP e aprendizado supervisionado.",
    resumo: `Desenvolvimento da “Maria Bonita (MB)”, uma inteligência artificial voltada à identificação automatizada de misoginia em
    publicações da antiga rede social Twitter. O projeto foi baseado em aprendizado de máquina supervisionado e técnicas de Processamento
    de Linguagem Natural (NLP), envolvendo captura automatizada de tweets via API oficial da plataforma, pré-processamento textual,
    estruturação e supervisão dos dados com apoio de especialistas da área jurídica. O treinamento do modelo foi realizado utilizando
    arquiteturas Word2Vec CBOW e Skip-gram, alcançando acurácia superior a 80% na identificação de conteúdos misóginos.`,
    stack: ["Python", "Word2Vec", "NLP", "Gensim", "Docker", "Git", "Jupyter Notebook", "Google Colab", "PyCharm", "Anaconda"]
  }
];

const EXTRACURRICULAR = [
  {
    instituicao: "Associação Atlética Acadêmica VI de Junho",
    atividades: [
      { 
        cargo: "Conselheiro Fiscal", 
        ano: "2011", 
        desc: `Responsável pela fiscalização contábil, auditoria de contas e garantia da transparência na aplicação dos recursos da
          entidade.` 
      },
      { 
        cargo: "Presidente", 
        ano: "2010", 
        desc: `Liderança executiva da associação, coordenação de equipes diretivas e representação institucional em eventos e competições.` 
      },
      { 
        cargo: "Tesoureiro", 
        ano: "2009", 
        desc: `Gestão do fluxo de caixa, controle de pagamentos, recebimentos e planejamento financeiro para eventos e materiais
          esportivos.` 
      }
    ]
  },
  {
    instituicao: "Jogos Jurídicos Estaduais",
    atividades: [
      { 
        cargo: "Secretário", 
        ano: "2010", 
        desc: `Apoio administrativo à mesa diretora, auxiliando na organização, registro e acompanhamento das atividades do evento.` 
      }
    ]
  },
];

const PALAVRAS_CHAVE = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "C#", ".NET", "SQL Server", "Oracle PL/SQL", "PostgreSQL", "Backend", "Frontend", 
  "Desktop", "Gupta Centura", "OpenText Team Developer", "PowerShell", "Arquitetura de Software", "Microsserviços", "REST APIs", "IA",
  "NLP", "Machine Learning", "Docker", "AWS", "Azure", "DevOps", "Git", "GitHub", "CI/CD", "Metodologias Ágeis", "Scrum", "Kanban", "TDD",
  "Clean Code", "Design Patterns", "Liderança Técnica",  "Gestão de Backlog", "Refinamento de Requisitos", "Sistemas Legados"
];

// --- COMPONENTES ATÔMICOS ---
const SkillLevel = ({ level }: { level: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
          i <= level ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.3)]" : "bg-slate-200"
        }`}
      />
    ))}
  </div>
);

const ContentSection = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <section className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-sm ${className}`}>
    <div className="flex items-center gap-3 mb-8">
      <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
    </div>
    {children}
  </section>
);

export default function Home() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [showPdf, setShowPdf] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const openPdfModal = (file: string) => {
    setSelectedPdf(file);
    setShowPdf(true);
  };

  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    return () => document.removeEventListener("contextmenu", disableContextMenu);
  }, []);

  const toggleItem = (id: number) => {
    setOpenItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  

  return (
    <main className="min-h-screen bg-[#fcfdfe] text-slate-900 antialiased pb-24">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
              <Image
                src="/foto-perfil.jpeg"
                alt="Wilson Assis"
                width={150}
                height={150}
                className="relative rounded-full border-2 border-white shadow-sm object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Wilson Assis</h1>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">Desenvolvedor</p>
              <div className="mt-4 md:mt-6 flex items-center gap-2 text-slate-400 text-sm font-medium">
                <MapPin size={16} className="text-blue-500" />
                Ribeirão Preto, São Paulo, Brasil
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <div className="flex items-center gap-4 border-b pb-4 sm:pb-0 sm:border-b-0 sm:border-r sm:pr-6 border-slate-200">
              <a href="https://wa.me/5516981673800?text=Olá,%20Wilson!%20Gostei%20do%20seu%20web%20currículo.%20Podemos%20conversar?" target="_blank" className="text-slate-400 hover:text-green-500 transition-colors"><FaWhatsapp size={22} /></a>
              <a href="mailto:wilsonassisdev@gmail.com" className="text-slate-400 hover:text-red-500 transition-colors"><Mail size={22} /></a>
              <a href="https://linkedin.com/in/wilson-assis-dev" target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors"><FaLinkedin size={22} /></a>
              <a href="https://github.com/devWilsonAssis" target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors"><FaGithub size={22} /></a>
            </div>
            
            <a 
              href="/curriculo.pdf" 
              download="Curriculo_Wilson_Assis.pdf"
              className="flex items-center justify-center gap-2 px-6 py-3 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-xl text-sm sm:text-xs hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 cursor-pointer no-underline w-full sm:w-auto"
            >
              <Download size={17} /> 
              Currículo PDF
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-12 space-y-10">
        
        {/* SOBRE */}
        <ContentSection title="Sobre">
          <p className="text-slate-600 leading-relaxed text-lg text-justify max-w-4xl">
            Possuo perfil proativo, comunicação clara e facilidade para assumir responsabilidades. Disponho de formação acadêmica e
            vivência de trabalho plurais, o que me torna um profissional versátil e potencializa minha aptidão para liderar pessoas e
            projetos. Valorizo o trabalho em equipe, sou movido por desafios e acredito que a persistência é a chave do sucesso na TI.
          </p>          
        </ContentSection>

        {/* EXPERIÊNCIA */}
        <ContentSection title="Experiência profissional">
          <div className="space-y-6">
            {EXPERIENCIAS.map((exp, idx) => (
              <div key={idx} className="group border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                <h3 className="text-xl font-extrabold text-slate-800 mb-4">{exp.empresa}</h3>
                <div className="space-y-4">
                  {exp.cargos.map((cargo) => (
                    <div key={cargo.id}>
                      <button 
                        onClick={() => toggleItem(cargo.id)}
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors group/btn cursor-pointer"
                      >
                        <div className="text-left">
                          <h4 className="font-bold text-slate-700 group-hover/btn:text-blue-700 transition-colors">{cargo.cargo}</h4>
                          <p className="text-xs text-slate-400 font-semibold uppercase mt-1 tracking-wider">{cargo.periodo}</p>
                        </div>
                        <div className={`transition-transform duration-300 ${openItems.includes(cargo.id) ? 'rotate-180 text-blue-600' : 'text-slate-300'}`}>
                          <ChevronDown size={20} />
                        </div>
                      </button>
                      {openItems.includes(cargo.id) && (
                        <div className="px-4 py-4 text-slate-600 text-[15px] leading-relaxed text-justify animate-in fade-in slide-in-from-top-2">
                          {cargo.descricao}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* COMPETÊNCIAS */}
        <ContentSection title="Competências">
          <div className="flex flex-col gap-12">
            
            {/* CATEGORIA: PRINCIPAIS */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">
                Principais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {[
                  ["Backend / APIs", 3], 
                  ["Front-end", 4],
                  ["Banco de dados (SQL / modelagem)", 5],
                  ["Programação desktop", 5],
                  ["Arquitetura de software", 4],
                  ["Microsserviços", 3],
                  ["Inteligência artificial", 3],
                  ["Ciência de dados", 3],
                  ["Cloud / DevOps", 3],
                  ["Testes automatizados", 4],
                  ["Metodologias ágeis", 4],
                  ["Liderança técnica", 5]
                ].map(([nome, level]) => (
                  <div key={nome as string} className="flex justify-between items-center py-2 px-2 group hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 md:border-0">
                    <span className="text-slate-700 font-semibold text-sm group-hover:text-blue-600 transition-colors">{nome}</span>
                    <SkillLevel level={level as number} />
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORIA: LINGUAGENS / FRAMEWORKS */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">
                Linguagens de programação / Frameworks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {[
                  ["SQL", 5],
                  ["HTML / JS / TS / CSS", 4],
                  ["Object Pascal / VBScript / Centura", 5],
                  ["C# / .NET / ASP.NET Core", 3],
                  ["Python / Django / Flask", 4],
                  ["Pandas / SciKit-Learn / Word2Vec", 3]
                ].map(([nome, level]) => (
                  <div key={nome as string} className="flex justify-between items-center py-2 px-2 group hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 md:border-0">
                    <span className="text-slate-700 font-semibold text-sm group-hover:text-blue-600 transition-colors">{nome}</span>
                    <SkillLevel level={level as number} />
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORIA: FERRAMENTAS */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">
                Ferramentas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {[
                  ["PL/SQL / PostgreSQL / SQL Server", 5],
                  ["Visual Studio Code", 4],
                  ["Delphi / VSH / Team Developer", 5],
                  ["Visual Studio Enterprise", 3],
                  ["PyCharm / Jupyter / Colab", 4],
                  ["Git / GitHub", 5],
                  ["AWS / Azure", 3],
                  ["Selenium / Cypress / JMeter", 3],
                  ["Docker", 3],
                  ["Linux", 3]
                ].map(([nome, level]) => (
                  <div key={nome as string} className="flex justify-between items-center py-2 px-2 group hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 md:border-0">
                    <span className="text-slate-700 font-semibold text-sm group-hover:text-blue-600 transition-colors">{nome}</span>
                    <SkillLevel level={level as number} />
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORIA: IDIOMAS */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">
                Idiomas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { nome: "Português", leitura: 5, conversacao: 5 },
                  { nome: "Inglês", leitura: 5, conversacao: 3 },
                  { nome: "Espanhol", leitura: 4, conversacao: 1 },
                ].map((idioma) => (
                  <div key={idioma.nome} className="p-3 rounded-xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:border-blue-200 transition-all">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {idioma.nome}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Leitura</span>
                        <SkillLevel level={idioma.leitura} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Conversação</span>
                        <SkillLevel level={idioma.conversacao} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </ContentSection>

        {/* FORMAÇÃO ACADÊMICA */}
        <ContentSection title="Formação acadêmica">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCACAO.map((edu, idx) => {
              const temPdf = edu.pdf && edu.pdf.trim() !== "";
              
              return (
                <div 
                  key={idx} 
                  onClick={() => temPdf && openPdfModal(edu.pdf)}
                  className={`p-5 rounded-2xl border transition-all group relative
                    ${temPdf 
                      ? "bg-slate-50 border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md cursor-pointer" 
                      : "bg-slate-50 border-slate-100 cursor-default opacity-90"
                    }`}
                >
                  {temPdf && (
                    <div className="absolute top-4 right-4 text-slate-200 group-hover:text-blue-400 transition-colors">
                      <ExternalLink size={16} />
                    </div>
                  )}

                  <h3 className={`font-bold mb-1 pr-6 transition-colors ${temPdf ? "text-slate-800 group-hover:text-blue-700" : "text-slate-800"}`}>
                    {edu.grau}
                  </h3>
                  
                  <p className="text-sm text-slate-500 font-medium">{edu.instituicao}</p>
                  <p className="text-xs text-slate-500 font-medium">{edu.localidade}</p>
                  
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-200/50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {edu.periodo}
                  </div>
                </div>
              );
            })}
          </div>
        </ContentSection>

        {/* CURSOS E CERTIFICAÇÕES */}
        <ContentSection title="Cursos e certificações">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {CERTIFICACOES.map((cert, idx) => {
              const hasPdf = cert.pdf && cert.pdf.trim() !== "";
              return (
                <button 
                  key={idx} 
                  onClick={() => hasPdf && openPdfModal(cert.pdf)}
                  disabled={!hasPdf}
                  className={`flex items-start gap-3 group text-left w-full ${hasPdf ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${hasPdf ? 'bg-blue-400 group-hover:scale-150 group-hover:bg-blue-600' : 'bg-slate-300'} transition-all`} />
                  <p className={`text-sm leading-relaxed transition-colors flex items-center gap-2 ${hasPdf ? 'text-slate-600 group-hover:text-blue-700' : 'text-slate-400'}`}>
                    {cert.nome}
                    {hasPdf && <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </p>
                </button>
              );
            })}
          </div>
        </ContentSection>

        {/* PROJETOS RELEVANTES */}
        <ContentSection title="Projetos relevantes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJETOS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj.id)}
                className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:border-blue-300 hover:bg-white hover:shadow-md transition-all relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-4 right-4 text-slate-200 group-hover:text-blue-400 transition-colors">
                  <ExternalLink size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors pr-6">{proj.titulo}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{proj.descricao}</p>
              </button>
            ))}
          </div>
        </ContentSection>

        {/* ATIVIDADES EXTRACURRICULARES*/}
        <ContentSection title="Atividades extracurriculares">
          <div className="space-y-6">
            {EXTRACURRICULAR.map((item, idx) => (
              <div key={idx} className="relative pl-6">
                <h3 className="text-lg font-black text-slate-800 mb-4">{item.instituicao}</h3>
                
                <div className="space-y-5">
                  {item.atividades.map((atv, i) => (
                    <div 
                      key={i} 
                      className="group relative flex flex-col transition-all duration-300"
                    >
                      <div className="absolute -left-[18px] mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:scale-150 group-hover:bg-blue-600 transition-all" />
                      
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-700 text-sm group-hover:text-blue-700 transition-colors">
                          {atv.cargo}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          • {atv.ano}
                        </span>
                      </div>
                      
                      <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-600 transition-colors">
                        {atv.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* PALAVRAS CHAVE */}
        <section className="pt-8 pb-12 border-t border-slate-200/60">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {PALAVRAS_CHAVE.map((tag, idx) => (
              <span 
                key={idx}
                className="text-[11px] font-medium text-slate-400 uppercase tracking-widest hover:text-blue-500 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

      </div>

      {/* MODAIS*/}

      {/* MODAL DE PROJETOS */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] relative shadow-2xl overflow-y-auto p-10">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 cursor-pointer"
            >
              ✕
            </button>

            {PROJETOS.filter(p => p.id === selectedProject).map(proj => (
              <div key={proj.id} className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900">{proj.titulo}</h2>
                
                <div>
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Resumo do projeto</h3>
                  <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                    {proj.resumo}
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Stack utilizada</h3>
                  <div className="flex flex-wrap gap-2">
                    {proj.stack.map(tech => (
                      <span key={tech} className="text-xs font-bold bg-white text-slate-700 px-3 py-1 rounded-lg border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL PDF */}
      {showPdf && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] relative shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <span className="font-medium text-slate-600 italic text-sm">Visualização de documento</span>
              <button 
                onClick={() => setShowPdf(false)} 
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <iframe 
              src={`${selectedPdf}#toolbar=0`} 
              className="flex-1 w-full border-none" 
            />
          </div>
        </div>
      )}
    </main>
  );
}