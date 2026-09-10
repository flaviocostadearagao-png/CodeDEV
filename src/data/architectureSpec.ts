export interface ArchitectureSection {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  diagramSvg?: string;
  keyPoints: { label: string; detail: string }[];
}

export const ARCHITECTURE_SPEC: ArchitectureSection[] = [
  {
    id: 'system-overview',
    title: '1. Visão Geral da Arquitetura do Sistema',
    subtitle: 'Arquitetura de Microsserviços Orientada a Eventos para Alta Disponibilidade',
    summary: 'Estrutura global do DevDoZero desenhada para desacoplar a navegação do usuário, a progressão gamificada e a carga computacional massiva de execução de código.',
    content: `### 1.1 Topologia Global e Decisões Arquiteturais

A plataforma **DevDoZero** adota uma **Arquitetura de Microsserviços Desacoplada e Orientada a Eventos (EDA)** com isolamento total entre o plano de controle (gerenciamento de alunos, trilhas, gamificação) e o plano de dados/execução (Code Execution Workers).

#### Camadas do Sistema:
1. **Edge & Content Delivery Network (Cloudflare / CloudFront)**:
   - Terminação SSL/TLS com proteção anti-DDoS e WAF.
   - Cache de ativos estáticos, lições públicas e binários WebAssembly pré-compilados.
2. **API Gateway & Reverse Proxy (Kong / Envoy)**:
   - Autenticação via JWT / OAuth2 (Google, GitHub).
   - Rate Limiting adaptativo por IP e por conta (prevenção de abuso de submissões).
   - Roteamento inteligente de tráfego para os microsserviços internos.
3. **Core Services (Plano de Negócio)**:
   - **User & Gamification Service**: Controle de perfis, cálculo de XP em tempo real, streak diário, ranking e emissão de badges/conquistas.
   - **Curriculum & Track Service**: Gestão do grafo de dependências das lições, desbloqueio de módulos e versionamento de desafios.
   - **Submission & Analytics Service**: Persistência do histórico de submissões, diffs de código, telemetria de aprendizado e identificação de bloqueios comuns dos alunos.
4. **Code Execution Cluster (Plano de Execução)**:
   - **Queue & Dispatcher Service**: Barramento de mensageria de alto rendimento (RabbitMQ / Redis Streams) para amortecer picos de submissões.
   - **Sandbox Worker Pool**: Nós de computação isolados (gVisor/Firecracker) orquestrados via Kubernetes com escalonamento automático acionado por fila (KEDA).

### 1.2 Especificação de Interface e Experiência do Usuário (UI/UX)
- **Dashboard do Usuário**:
  - Exibição de trilhas ativas com cards dinâmicos (Python, JS, TS, Java, C#).
  - Indicadores em tempo real: porcentagem de conclusão geral e por nível (Iniciante, Intermediário, Avançado), barra de XP com nível atual, badges desbloqueados e streak de estudos diário.
  - Botão de acesso rápido "Continuar onde parou" direto para a lição ativa.
- **Estrutura de Lição 3-Panel (Estilo LeetCode / FreeCodeCamp)**:
  - **Painel Esquerdo (Teoria e Desafio)**: Explicação teórica concisa, objetivos instrucionais em bullet points, requisitos práticos com exemplos de input/output e sistema de dicas progressivas.
  - **Painel Central (Editor de Código)**: Editor de código integrado de alto desempenho com syntax highlighting contextual, autocomplete inteligente, atalhos de produtividade e controle de versão de rascunho local.
  - **Painel Direito/Inferior (Console & Validador de Testes)**: Console interativo para stdout/stderr e painel de testes unitários com feedback visual imediato de aprovação/reprovação de cada caso de teste (inclusive casos de teste ocultos).`,
    keyPoints: [
      { label: 'Padrão Arquitetural', detail: 'Microsserviços desacoplados com fila assíncrona para isolamento de carga de compilação.' },
      { label: 'Layout da Lição', detail: '3 painéis sincronizados (Teoria/Desafio, Editor de Código, Console & Validador de Testes).' },
      { label: 'Resiliência', detail: 'Falhas na execução de código não afetam a navegação, dados do usuário ou progressão de outros alunos.' },
      { label: 'Gamificação em Tempo Real', detail: 'Cálculo de XP imediato, feedback de conquista desbloqueada e atualização instantânea de progresso.' },
    ],
  },
  {
    id: 'code-editor-and-validator',
    title: '2. Especificação do Editor e Validador de Testes',
    subtitle: 'Segurança Estrita, Isolamento de Processos e Validação Automatizada de Código',
    summary: 'Análise de viabilidade técnica para execução segura de código de alunos (WASM no browser vs Containers isolados no backend) e arquitetura do validador de testes unitários ocultos.',
    content: `### 2.1 Viabilidade Técnica do Editor no Frontend
Para o editor integrado, a arquitetura adota uma abordagem híbrida:
- **Monaco Editor / CodeMirror 6**:
  - **CodeMirror 6**: Recomendado como motor primário no ambiente web pela leveza (bundle inicial < 300KB), suporte modular nativo a Web Workers, excelente performance em dispositivos móveis e tablets e extensibilidade limpa via extensões funcionais.
  - **Monaco Editor**: Indicado para trilhas avançadas de TypeScript/Java/C# onde o LSP (Language Server Protocol) completo com IntelliSense profundo de tipagem é um diferencial pedagógico.
- **Features Fundamentais do Editor**:
  - Syntax Highlighting em tempo real via Tree-sitter / TextMate grammars em Web Workers.
  - Snippets de código e auto-completude contextuais da linguagem ativa.
  - Suporte a atalhos ergonômicos (ex: \`Ctrl + Enter\` para rodar código, \`Ctrl + S\` para salvar rascunho, \`Tab\` inteligente de 2 a 4 espaços).
  - Persistência contínua de rascunho em \`IndexedDB\` para que o aluno nunca perca seu trabalho ao recarregar a página.

### 2.2 Estratégia de Execução Segura: Híbrida (WASM Client-side + Sandbox Backend)
A execução de código submetido por alunos é um dos maiores vetores de risco em plataformas EdTech (ataques de Fork Bomb, consumo de CPU, vazamento de memória, mineração de criptomoedas e escape de container).

| Modalidade | Tecnologias | Linguagens Alvo | Vantagens | Desafios / Mitigações |
| :--- | :--- | :--- | :--- | :--- |
| **Client-Side (WASM)** | Pyodide (Python), QuickJS/V8 Isolates (JS/TS), Blazor WASM (C#) | Python, JavaScript, TypeScript | Custo de servidor ZERO; latência instantânea (< 50ms); isolamento nativo do sandbox do browser. | Download inicial do runtime WASM (cacheado via Service Workers); restrito a operações sem sockets diretos. |
| **Backend Sandboxing** | gVisor (runsc) / Firecracker MicroVMs / nsjail | Todas (Python, JS, TS, Java, C#) | Suporte a 100% das bibliotecas nativas, compilers pesados (javac, dotnet) e multithreading real. | Demanda infraestrutura de cluster e orquestração de pods efêmeros. |

#### Especificação do Sandbox Backend (Piston / Judge0 Enterprise):
1. **Isolamento de Kernel**:
   - Uso de **gVisor (Google runsc)** interceptando chamadas de sistema (syscalls) no espaço de usuário, bloqueando acesso direto ao kernel Linux do host.
   - Desativação de rede (\`--net=none\`): nenhuma requisição de rede de saída permitida para prevenir exfiltração de dados ou ataques de negação de serviço.
2. **Cgroups v2 e Restrições Rígidas de Recursos**:
   - **Timeout de Execução**: Limite estrito de 2.0 a 3.0 segundos (CPU Time Limit). Processos excedentes recebem \`SIGKILL\`.
   - **Limite de Memória (RAM)**: Teto de 128MB a 256MB por execução com flag \`oom_kill_disable=false\`.
   - **Limite de Processos (PID Limit)**: Máximo de 15 a 30 PIDs simultâneos para neutralizar completamente Fork Bombs.
   - **Sistema de Arquivos Efêmero (Read-only Root + tmpfs 10MB)**: O código roda em \`tmpfs\` descartável montado em memória RAM. Após a execução, todo o diretório é destruído.

### 2.3 Mecanismo de Validação Automatizada (Harness de Testes Ocultos)
Para garantir que o aluno realmente resolveu o problema e não apenas fez "hardcode" do retorno esperado para o primeiro teste visível:

1. **Injeção do Harness de Teste (Test Runner Wrapping)**:
   - O código do aluno é concatenado ou importado em um módulo de teste isolado gerado em runtime pelo backend.
   - O harness roda casos de teste públicos (exibidos no painel do aluno para depuração) e casos de teste privados/ocultos (com edge cases: números negativos, arrays vazios, strings nulas, dados gigantes para checar complexidade algorítmica).
2. **Coleta de Métricas e Relatório Estruturado**:
   - O harness captura \`stdout\`, \`stderr\`, tempo de execução em milissegundos e consumo de memória.
   - O resultado é emitido como um JSON estruturado:
\`\`\`json
{
  "status": "ACCEPTED", // ou "WRONG_ANSWER", "TIME_LIMIT_EXCEEDED", "RUNTIME_ERROR"
  "executionTimeMs": 48,
  "memoryKb": 14200,
  "tests": [
    { "id": "t1", "description": "calcularMedia(10, 20) -> 15", "passed": true },
    { "id": "t2_hidden", "description": "Casos de borda com valores negativos", "passed": true }
  ]
}
\`\`\`
3. **Liberação de Avanço**: Apenas se 100% dos testes (públicos e ocultos) passarem, a API emite o token assinado de conclusão de lição, incrementa o XP do usuário de forma atômica no banco de dados e desbloqueia a próxima lição na árvore.`,
    keyPoints: [
      { label: 'Editor Frontend', detail: 'Monaco / CodeMirror com Language Server Protocol e autocomplete em Web Workers.' },
      { label: 'Isolamento de Segurança', detail: 'gVisor sandbox com syscall filtering, cgroups v2 (CPU/RAM/PIDs limitados) e rede 100% bloqueada.' },
      { label: 'Validação Anti-Fraude', detail: 'Bateria de testes unitários ocultos avaliando casos de borda e integridade do algoritmo.' },
      { label: 'Execução Client-side WASM', detail: 'Offload de lições introdutórias de Python (Pyodide) e JS diretamente no navegador para escalabilidade infinita.' },
    ],
  },
  {
    id: 'curriculum-taxonomy',
    title: '3. Grade Curricular Padrão e Taxonomia',
    subtitle: 'Modelo Universal do Zero ao Avançado aplicável a Python, JS, TS, Java e C#',
    summary: 'Estrutura pedagógica massiva organizada em 3 grandes níveis e 12 módulos progressivos, com grafo de pré-requisitos e mastery-based learning.',
    content: `### 3.1 A Taxonomia "DevDoZero"
A plataforma utiliza uma matriz curricular unificada em 3 níveis (Iniciante, Intermediário e Avançado), dividida em 12 módulos canônicos. Essa estrutura aplica-se consistentemente às 5 linguagens-chave (**Python, JavaScript, TypeScript, Java e C#**), adaptando apenas as idiomaticidades de cada ecossistema.

\`\`\`
[NÍVEL 1: INICIANTE]
 ├── Módulo 1: Fundamentos, Sintaxe & Ambiente de Execução
 ├── Módulo 2: Tipos Primitivos, Variáveis & Operadores
 └── Módulo 3: Tomada de Decisão & Fluxos Condicionais (if/else, switch/pattern matching)

[NÍVEL 2: INTERMEDIÁRIO]
 ├── Módulo 4: Estruturas de Repetição & Iteradores (while, for, for-each)
 ├── Módulo 5: Funções, Parâmetros, Retornos & Escopo Léxico
 ├── Módulo 6: Coleções de Dados (Arrays, Listas, Dicionários, Maps & Sets)
 └── Módulo 7: Introdução à Programação Orientada a Objetos (Classes, Atributos & Métodos)

[NÍVEL 3: AVANÇADO]
 ├── Módulo 8: POO Avançada (Encapsulamento, Herança, Polimorfismo & Interfaces)
 ├── Módulo 9: Estruturas de Dados Complexas & Algoritmos (Pilhas, Filas, Árvores & Big-O)
 ├── Módulo 10: Concorrência, Assincronismo & I/O (Async/Await, Threads & Event Loop)
 ├── Módulo 11: Integração de APIs, Serialização & Tratamento Robusto de Exceções
 └── Módulo 12: Padrões de Projeto (Design Patterns) & Otimização de Código de Alta Performance
\`\`\`

---

### 3.2 Detalhamento dos Níveis Pedagógicos

#### 🟢 1. Nível Iniciante (Do Absoluto Zero aos Primeiros Programas)
- **Foco Instrucional**: Tirar o medo da tela preta. O aluno aprende a dar instruções computacionais sequenciais, armazenar dados temporários na memória e fazer o computador tomar decisões com base em condições lógicas.
- **Tópicos Detalhados**:
  - *Módulo 1*: O que é um programa, stdout (\`print\` / \`console.log\` / \`System.out.println\`), convenções de nomenclatura e sintaxe básica.
  - *Módulo 2*: Variáveis e constantes, tipos primitivos (inteiros, floats, booleanos, caracteres, strings), operadores aritméticos (\`+\`, \`-\`, \`*\`, \`/\`, \`%\`), operadores relacionais e lógicos (\`==\`, \`!=\`, \`>\`, \`<\`, \`AND\`, \`OR\`, \`NOT\`).
  - *Módulo 3*: Estruturas condicionais (\`if\`, \`else if\`, \`else\`), operadores ternários, tabelas-verdade aplicadas e cláusulas de guarda (\`early return\`).

#### 🟡 2. Nível Intermediário (Lógica Modular, Coleções & Primeiros Objetos)
- **Foco Instrucional**: Capacidade de automatizar tarefas repetitivas, modularizar o código em blocos reutilizáveis (funções/métodos) e estruturar informações relacionadas em coleções dinâmicas e entidades do mundo real.
- **Tópicos Detalhados**:
  - *Módulo 4*: Laços \`while\`, laços indexados (\`for\`), laços de iteração (\`for...of\`, \`foreach\`), controle de fluxo com \`break\` e \`continue\`.
  - *Módulo 5*: Funções puras, parâmetros opcionais e nomeados, escopo local vs global, pilha de chamadas (call stack) e introdução à recursão.
  - *Módulo 6*: Arrays unidimensionais e bidimensionais, métodos essenciais (\`push\`, \`pop\`, busca binária, ordenação), transformações funcionais (\`map\`, \`filter\`, \`reduce\`), tabelas hash / dicionários / maps.
  - *Módulo 7*: O paradigma Orientado a Objetos: o conceito de Classe vs Instância, métodos construtores, modificadores de visibilidade e estado interno.

#### 🔴 3. Nível Avançado (Engenharia de Software, Performance & Concorrência)
- **Foco Instrucional**: Formar engenheiros de software capazes de escrever código pronto para produção: tipagem estrita, alta tolerância a falhas, concorrência segura, manipulação de grandes volumes de dados e arquiteturas escaláveis.
- **Tópicos Detalhados**:
  - *Módulo 8*: Pilares da POO profunda: Classes Abstratas, Interfaces/Protocolos, Injeção de Dependências e Princípios SOLID fundamentais.
  - *Módulo 9*: Estruturas de dados clássicas implementadas do zero (Listas Ligadas, Pilhas, Filas, Árvores Binárias de Busca), análise de complexidade assintótica (Notação Big-O: O(1), O(n), O(n log n)).
  - *Módulo 10*: Modelo de concorrência de cada linguagem:
    - *JS/TS*: Event Loop, Microtasks, Promises e \`async/await\`.
    - *Python*: \`asyncio\`, corrotinas e threads vs multiprocessing (GIL).
    - *Java*: Threads, ThreadPools, \`CompletableFuture\` e Virtual Threads (Project Loom).
    - *C#*: \`Task Parallel Library (TPL)\`, \`async/await\`, canais e sincronização.
  - *Módulo 11*: Consumo e criação de APIs RESTful, parsing seguro de JSON, validação de esquemas e tratamento resiliente de erros com tipos Result / exceções customizadas.
  - *Módulo 12*: Design Patterns práticos (Singleton, Factory, Strategy, Observer, Repository), profiling de código, benchmark de CPU/memória e boas práticas de Clean Code.`,
    keyPoints: [
      { label: 'Progressão Contínua', detail: '3 níveis estritamente calibrados (Iniciante, Intermediário e Avançado) em 12 módulos progressivos.' },
      { label: '5 Linguagens Suportadas', detail: 'Trilhas dedicadas para Python, JavaScript, TypeScript, Java e C# (.NET).' },
      { label: 'Profundidade Real', detail: 'Do primeiro print e variáveis até concorrência com threads/async e complexidade algorítmica Big-O.' },
      { label: 'Gamificação & Desbloqueio', detail: 'Avanço por domínio comprovado via baterias de testes automatizados.' },
    ],
  },
  {
    id: 'tech-stack-and-scalability',
    title: '4. Stack Tecnológica e Escalabilidade',
    subtitle: 'Arquitetura de Nuvem Pronta para Milhares de Execuções Simultâneas',
    summary: 'Seleção técnica criteriosa das tecnologias de Frontend, Backend, Banco de Dados e Cluster de Execução, com estratégia de dimensionamento de carga.',
    content: `### 4.1 Stack Tecnológica Recomendada e Justificativas

| Camada | Tecnologia Escolhida | Alternativas Analisadas | Justificativa Técnica |
| :--- | :--- | :--- | :--- |
| **Frontend** | **Next.js 15 / React 19 + Tailwind CSS** | Vue 3, Svelte | Renderização mista (SSR/SSG para SEO das lições e SPA para o ambiente interativo do IDE). Ecosistema maduro com suporte a React Server Components e excelente performance. |
| **Editor de Código** | **Monaco Editor + CodeMirror 6** | Ace Editor | Monaco traz a experiência do VS Code nativa na web. CodeMirror 6 oferece inicialização ultra-rápida em conexões móveis. |
| **Backend Core** | **Go (Golang) + Node.js (NestJS)** | Python/Django, Ruby on Rails | **Go** para o orquestrador de execução e dispatch de jobs (baixíssimo consumo de memória por goroutine, concorrência extrema). **NestJS/Node** para o plano de negócios e APIs REST/GraphQL (produtividade e tipagem TS compartilhada com frontend). |
| **Mensageria & Filas** | **RabbitMQ + Redis Streams** | Apache Kafka, AWS SQS | **RabbitMQ** provê entrega confiável com prioridades de fila (ex: usuários VIP ou lições curtas têm prioridade). **Redis** atua como buffer de estado efêmero e pub/sub de console em tempo real. |
| **Banco de Dados Principal** | **PostgreSQL 16 (com Particionamento)** | MongoDB, MySQL | Confiabilidade ACID estrita para progresso do aluno, transações financeiras e controle de contas. Suporte avançado a campos JSONB para armazenar esquemas flexíveis de lições e testes. |
| **Cache & Leaderboards** | **Redis Cluster** | Memcached | Cache de sessões de alta velocidade, rate-limiting atômico com token bucket e ordenação de rankings em tempo real via Sorted Sets (\`ZADD\` / \`ZRANGE\`). |
| **Sandbox de Execução** | **gVisor (runsc) sobre Kubernetes + KEDA** | Docker cru, VMs completas | **gVisor** oferece isolamento de segurança a nível de kernel sem o overhead pesado de instanciar uma máquina virtual tradicional inteira para cada submissão. |

---

### 4.2 Estratégia de Escalabilidade para Milhares de Execuções Simultâneas

Executar 10.000 submissões de código por minuto impõe desafios graves de concorrência e exaustão de I/O de CPU. A arquitetura implementa 4 pilares de escala:

1. **Estratégia "Client-Side First" (Offloading para WASM)**:
   - Para lições de nível Iniciante em JavaScript, TypeScript e Python, a compilação e validação acontecem **no próprio browser do aluno** usando WebAssembly (V8 Isolates e Pyodide em Web Workers dedicados).
   - **Impacto**: Reduz em até 65% a carga de CPU nos servidores da plataforma, reservando os nós de execução backend para linguagens compiladas pesadas (Java/C#) e testes avançados.
2. **Pool de Workers Pré-Aquecidos (Pre-warmed Container Pool)**:
   - Iniciar um container do zero leva de 300ms a 1s. A plataforma mantém um pool quente de micro-containers em estado "pausado" ou com runtime pré-carregado.
   - Quando uma requisição chega, o código é injetado via memória compartilhada (\`tmpfs\`), executado e o container é reciclado em menos de **80ms**.
3. **Escalonamento Orientado a Fila com KEDA (Kubernetes Event-driven Autoscaling)**:
   - Os nós de execução de código escalam dinamicamente baseados no **tamanho da fila de mensagens (Queue Depth)** do RabbitMQ, e não apenas no consumo de CPU do nó.
   - Se a fila atinge mais de 500 mensagens pendentes, novos nós de computação spot são provisionados automaticamente.
4. **WebSocket / SSE para Retorno Assíncrono Sem Bloqueio**:
   - O aluno clica em "Executar Código": o frontend faz um \`POST /api/submissions\` e recebe um \`submission_id\` em 15ms.
   - A conexão WebSocket ou Server-Sent Events (SSE) estabelecida no IDE recebe o streaming de stdout e o relatório final de testes assim que o worker conclui, evitando conexões HTTP síncronas presas esperando a compilação.`,
    keyPoints: [
      { label: 'Stack de Alta Velocidade', detail: 'Next.js/React + Go (Golang) para o motor de orquestração + PostgreSQL com Redis Cluster.' },
      { label: 'Capacidade de Concorrência', detail: 'Buffer de mensageria com RabbitMQ e pool de containers pré-aquecidos para resposta em < 100ms.' },
      { label: 'Auto-Scaling Dinâmico', detail: 'Kubernetes com KEDA escalando workers baseado no tamanho da fila de submissões pendentes.' },
      { label: 'Economia de Custos de Cloud', detail: 'Execução client-side via WebAssembly desvia até 65% das submissões da nuvem.' },
    ],
  },
];
