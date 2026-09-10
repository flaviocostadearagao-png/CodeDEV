import { Track, Lesson, Badge } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'html',
    name: 'HTML5',
    iconName: 'Layout',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    accentColor: '#ea580c',
    tagline: 'A espinha dorsal semântica e estrutural da Web',
    description: 'Aprenda do zero: do DOCTYPE e tags semânticas até formulários acessíveis, multimídia e SEO.',
    totalLessons: 36,
    completedLessons: 0,
    inicianteCount: 12,
    intermediarioCount: 14,
    avancadoCount: 10,
  },
  {
    id: 'css',
    name: 'CSS3',
    iconName: 'Palette',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    accentColor: '#0284c7',
    tagline: 'Estilização moderna, Flexbox, Grid e responsividade',
    description: 'Domine o Box Model, alinhamento flexível, CSS Grid bidimensional e animações fluidas.',
    totalLessons: 42,
    completedLessons: 0,
    inicianteCount: 14,
    intermediarioCount: 16,
    avancadoCount: 12,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    iconName: 'Code',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    accentColor: '#f59e0b',
    tagline: 'A linguagem interativa e onipresente da Web moderna',
    description: 'Da lógica essencial aos métodos de array (map, filter, reduce), closures e assincronismo (async/await).',
    totalLessons: 50,
    completedLessons: 0,
    inicianteCount: 16,
    intermediarioCount: 20,
    avancadoCount: 14,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    iconName: 'FileCode2',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    accentColor: '#3b82f6',
    tagline: 'JavaScript tipado em escala enterprise',
    description: 'Eleve seu código com tipagem estática rigorosa, interfaces, generics e decorators.',
    totalLessons: 36,
    completedLessons: 0,
    inicianteCount: 12,
    intermediarioCount: 14,
    avancadoCount: 10,
  },
  {
    id: 'python',
    name: 'Python',
    iconName: 'Terminal',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    accentColor: '#10b981',
    tagline: 'Da sintaxe limpa a algoritmos avançados e IA',
    description: 'Aprenda a linguagem mais popular do mundo para automação, análise de dados e backend.',
    totalLessons: 40,
    completedLessons: 0,
    inicianteCount: 14,
    intermediarioCount: 16,
    avancadoCount: 10,
  },
  {
    id: 'java',
    name: 'Java',
    iconName: 'Cpu',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    accentColor: '#f43f5e',
    tagline: 'Robustez empresarial e POO pura na JVM',
    description: 'Construa aplicações de missão crítica com a robustez e maturidade do ecossistema Java.',
    totalLessons: 38,
    completedLessons: 0,
    inicianteCount: 12,
    intermediarioCount: 14,
    avancadoCount: 12,
  },
  {
    id: 'csharp',
    name: 'C# (.NET)',
    iconName: 'Layers',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    accentColor: '#a855f7',
    tagline: 'Alto desempenho para Cloud, Jogos e Web APIs',
    description: 'Explore o ecossistema .NET moderno para microserviços, jogos e computação em nuvem.',
    totalLessons: 36,
    completedLessons: 0,
    inicianteCount: 12,
    intermediarioCount: 14,
    avancadoCount: 10,
  },
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b1',
    title: 'Primeiro Hello World',
    description: 'Executou seu primeiro código com sucesso na plataforma.',
    icon: 'Sparkles',
    unlockedAt: undefined,
    category: 'progress',
  },
  {
    id: 'b2',
    title: 'Mestre do HTML & DOM',
    description: 'Construiu estruturas semânticas perfeitas de páginas web.',
    icon: 'Layout',
    unlockedAt: undefined,
    category: 'mastery',
  },
  {
    id: 'b3',
    title: 'Arquiteto de CSS & Flexbox',
    description: 'Alinhou layouts modernos responsivos sem quebrar o Box Model.',
    icon: 'Palette',
    unlockedAt: undefined,
    category: 'mastery',
  },
  {
    id: 'b4',
    title: 'Ninja do JavaScript',
    description: 'Dominou métodos funcionais e assincronismo com Promises.',
    icon: 'Zap',
    unlockedAt: undefined,
    category: 'mastery',
  },
  {
    id: 'b5',
    title: 'Streak de Fogo (7 Dias)',
    description: 'Praticou código por 7 dias consecutivos na plataforma.',
    icon: 'Flame',
    unlockedAt: undefined,
    category: 'streak',
  },
];

export const SAMPLE_LESSONS: Lesson[] = [
  // ==========================================
  // HTML5 - INICIANTE (MÓDULO 1)
  // ==========================================
  {
    id: 'html-101',
    trackId: 'html',
    title: 'O Primeiro Documento HTML5',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Estrutura & Semântica Essencial',
    order: 1,
    xpReward: 50,
    estimatedMinutes: 5,
    theory: `### 1.1 A Anatomia de uma Página Web HTML5

O **HTML** (HyperText Markup Language) é a linguagem de marcação que dá significado e estrutura a todo conteúdo da Web.

\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Título da Página</title>
  </head>
  <body>
    <h1>Olá, Mundo!</h1>
    <p>Meu primeiro parágrafo estruturado.</p>
  </body>
</html>
\`\`\`

- **\`<!DOCTYPE html>\`**: Declara ao navegador que o documento utiliza a especificação HTML5 moderna.
- **\`<html>\`**: O elemento raiz (root) de toda a árvore do DOM.
- **\`<head>\`**: Metadados invisíveis, títulos e links de folhas de estilo.
- **\`<body>\`**: Conteúdo visível diretamente pelo usuário.
`,
    objectives: [
      'Declarar a instrução <!DOCTYPE html> no topo do documento.',
      'Criar um título principal com a tag <h1> contendo seu título.',
      'Adicionar pelo menos um parágrafo com a tag <p>.',
    ],
    instructions: `Crie a estrutura básica de uma página HTML5. O documento deve conter a declaração **<!DOCTYPE html>**, uma tag **<h1>** com o texto "DevDoZero" e uma tag **<p>** com uma breve apresentação.`,
    hints: [
      'Inicie a primeira linha com <!DOCTYPE html>.',
      'Use <h1>DevDoZero</h1> dentro da tag <body>.',
      'Adicione <p>Aprenda programação do zero ao avançado.</p>.',
    ],
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>DevDoZero</title>
</head>
<body>
  <!-- Escreva seu código aqui -->

</body>
</html>
`,
    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>DevDoZero</title>
</head>
<body>
  <h1>DevDoZero</h1>
  <p>Aprenda programação do zero ao avançado de forma interativa.</p>
</body>
</html>
`,
    testCases: [
      {
        id: 't1',
        description: 'Contém declaração <!DOCTYPE html> no início',
        input: 'doctype:',
        expectedOutput: '<!DOCTYPE html> declarado',
      },
      {
        id: 't2',
        description: 'Possui título principal <h1> presente no corpo',
        input: 'selector:h1',
        expectedOutput: '<h1> encontrado',
      },
      {
        id: 't3',
        description: 'Possui parágrafo <p> com conteúdo de texto',
        input: 'selector:p',
        expectedOutput: '<p> encontrado',
      },
    ],
  },
  {
    id: 'html-102',
    trackId: 'html',
    title: 'Hierarquia de Títulos e Parágrafos',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Estrutura & Semântica Essencial',
    order: 2,
    xpReward: 50,
    estimatedMinutes: 6,
    theory: `### 1.2 Hierarquia de Cabeçalhos (h1 a h6) e Destaques

Motores de busca (Google) e leitores de tela para pessoas com deficiência dependem de uma hierarquia estrita:

\`\`\`html
<h1>Guia Completo de Programação</h1>
<h2>Fundamentos</h2>
<p>Texto com <strong>destaque importante</strong> e <em>ênfase</em>.</p>
<h3>Variáveis e Constantes</h3>
\`\`\`

- **\`<h1>\`**: Apenas UM por página representando o assunto principal.
- **\`<h2>\`** e **\`<h3>\`**: Seções e subseções lógicas.
- **\`<strong>\`**: Importância semântica (negrito).
- **\`<em>\`**: Ênfase no tom da frase (itálico).
`,
    objectives: [
      'Utilizar tags <h1>, <h2> e <h3> respeitando a ordem hierárquica.',
      'Aplicar <strong> para dar peso semântico a palavras-chave.',
    ],
    instructions: `Construa uma hierarquia de artigo contendo um **<h1>**, um **<h2>**, um subtítulo **<h3>** e um parágrafo contendo uma palavra marcada com **<strong>**.`,
    hints: [
      'Não pule níveis (por exemplo, ir direto de h1 para h4).',
      'Use <strong>termo importante</strong> dentro do parágrafo.',
    ],
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <!-- Crie a hierarquia: h1, h2, h3 e p com strong -->

</body>
</html>
`,
    solutionCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Aprender Programação</h1>
  <h2>Lógica de Computação</h2>
  <h3>Algoritmos e Dados</h3>
  <p>A prática constante é o <strong>segredo</strong> do domínio.</p>
</body>
</html>
`,
    testCases: [
      {
        id: 't1',
        description: 'Possui cabeçalho de seção <h2>',
        input: 'selector:h2',
        expectedOutput: '<h2> encontrado',
      },
      {
        id: 't2',
        description: 'Possui cabeçalho de subseção <h3>',
        input: 'selector:h3',
        expectedOutput: '<h3> encontrado',
      },
      {
        id: 't3',
        description: 'Utiliza tag <strong> para destaque semântico',
        input: 'selector:strong',
        expectedOutput: '<strong> encontrado',
      },
    ],
  },
  {
    id: 'html-103',
    trackId: 'html',
    title: 'Links Hipertexto e Imagens Acessíveis',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Estrutura & Semântica Essencial',
    order: 3,
    xpReward: 60,
    estimatedMinutes: 7,
    theory: `### 1.3 Hiperlinks e Imagens na Web

O "Hipertexto" é a essência da Web: conectar documentos através de links e carregar recursos visuais com acessibilidade.

\`\`\`html
<!-- Link seguro abrindo em nova guia -->
<a href="https://exemplo.com" target="_blank" rel="noopener noreferrer">
  Visitar Site
</a>

<!-- Imagem acessível com descrição textual -->
<img src="avatar.jpg" alt="Foto de perfil de Maria sorrindo">
\`\`\`

- **\`href\`**: Destino do hiperlink.
- **\`rel="noopener noreferrer"\`**: Proteção crítica de segurança contra tab-nabbing.
- **\`alt\`**: Texto alternativo obrigatório para acessibilidade e SEO.
`,
    objectives: [
      'Criar uma tag <a> com href e target="_blank".',
      'Incluir atributo rel="noopener noreferrer" no link.',
      'Inserir uma tag <img> com atributo alt descritivo preenchido.',
    ],
    instructions: `Crie um link **<a>** direcionando para uma URL com os atributos **target="_blank"** e **rel="noopener noreferrer"**, e adicione uma imagem **<img>** com um atributo **alt** descritivo.`,
    hints: [
      'Exemplo: <a href="https://github.com" target="_blank" rel="noopener noreferrer">Meu Portfólio</a>',
      'Exemplo de img: <img src="logo.png" alt="Logotipo da DevDoZero">',
    ],
    starterCode: `<div>
  <!-- Crie o link seguro e a imagem com alt -->

</div>
`,
    solutionCode: `<div>
  <a href="https://devdozero.com.br" target="_blank" rel="noopener noreferrer">Conhecer DevDoZero</a>
  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300" alt="Notebook aberto com código na tela">
</div>
`,
    testCases: [
      {
        id: 't1',
        description: 'Link <a> configurado com target="_blank"',
        input: 'attr:a[target="_blank"]',
        expectedOutput: 'Atributo validado em <a>',
      },
      {
        id: 't2',
        description: 'Link <a> possui rel="noopener noreferrer" de segurança',
        input: 'attr:a[rel*="noopener"]',
        expectedOutput: 'Atributo validado em <a>',
      },
      {
        id: 't3',
        description: 'Imagem <img> possui atributo alt para acessibilidade',
        input: 'attr:img[alt]',
        expectedOutput: 'Atributo validado em <img>',
      },
    ],
  },

  // HTML5 - INTERMEDIÁRIO (MÓDULO 2)
  {
    id: 'html-201',
    trackId: 'html',
    title: 'Listas Ordenadas e Não-Ordenadas',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Coleções, Formulários & Tabelas',
    order: 4,
    xpReward: 65,
    estimatedMinutes: 6,
    theory: `### 2.1 Estruturando Coleções com Listas HTML

Listas estruturam dados sequenciais ou agrupamentos de itens:

\`\`\`html
<!-- Lista Não-Ordenada (marcadores/bullets) -->
<ul>
  <li>HTML5 Semântico</li>
  <li>CSS3 Responsivo</li>
  <li>JavaScript Moderno</li>
</ul>

<!-- Lista Ordenada (numeração sequencial) -->
<ol>
  <li>Escrever código</li>
  <li>Executar testes</li>
  <li>Publicar em produção</li>
</ol>
\`\`\`
`,
    objectives: [
      'Criar uma lista não-ordenada (<ul>) ou ordenada (<ol>).',
      'Inserir ao menos 3 itens de lista (<li>) filhos diretos.',
    ],
    instructions: `Crie uma lista não-ordenada **<ul>** contendo no mínimo 3 itens **<li>** representando tecnologias de desenvolvimento web.`,
    hints: [
      'Abra com <ul> e feche com </ul>.',
      'Coloque <li>HTML5</li>, <li>CSS3</li> e <li>JavaScript</li> dentro de <ul>.',
    ],
    starterCode: `<div>
  <!-- Crie a lista ul com ao menos 3 itens li -->

</div>
`,
    solutionCode: `<div>
  <ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript ES6+</li>
  </ul>
</div>
`,
    testCases: [
      {
        id: 't1',
        description: 'Tag de lista <ul> presente no código',
        input: 'selector:ul',
        expectedOutput: '<ul> encontrado',
      },
      {
        id: 't2',
        description: 'Contém ao menos 3 itens de lista <li>',
        input: 'count:li>=3',
        expectedOutput: '3 elemento(s) \'li\' encontrado(s)',
      },
    ],
  },
  {
    id: 'html-202',
    trackId: 'html',
    title: 'Formulários com Validação Nativa',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Coleções, Formulários & Tabelas',
    order: 5,
    xpReward: 75,
    estimatedMinutes: 9,
    theory: `### 2.2 Formulários Modernos e Acessibilidade

O elemento \`<form>\` agrupa controles de entrada. A associação entre \`<label>\` e \`<input>\` via atributo \`for\` e \`id\` é indispensável para usabilidade e tecnologias assistivas:

\`\`\`html
<form action="/login" method="POST">
  <label for="email-input">E-mail Corporativo:</label>
  <input type="email" id="email-input" name="email" required placeholder="dev@exemplo.com">

  <label for="senha-input">Senha Secreta:</label>
  <input type="password" id="senha-input" name="senha" required minlength="8">

  <button type="submit">Entrar na Plataforma</button>
</form>
\`\`\`
`,
    objectives: [
      'Declarar um elemento <form>.',
      'Adicionar um input type="email" com atributo required.',
      'Adicionar um input type="password".',
      'Incluir um botão com type="submit".',
    ],
    instructions: `Construa um formulário de login com um campo de e-mail obrigatório (**type="email"** com **required**), um campo de senha (**type="password"**) e um botão de envio (**<button type="submit">**).`,
    hints: [
      'Use <input type="email" required>',
      'Use <input type="password">',
      'Use <button type="submit">Entrar</button>',
    ],
    starterCode: `<!-- Construa o formulário de login aqui -->
`,
    solutionCode: `<form>
  <label for="user-email">E-mail:</label>
  <input type="email" id="user-email" name="email" required placeholder="seu@email.com">

  <label for="user-pass">Senha:</label>
  <input type="password" id="user-pass" name="senha" required>

  <button type="submit">Acessar Conta</button>
</form>
`,
    testCases: [
      {
        id: 't1',
        description: 'Elemento <form> criado corretamente',
        input: 'selector:form',
        expectedOutput: '<form> encontrado',
      },
      {
        id: 't2',
        description: 'Input com type="email" e validação required',
        input: 'attr:input[type="email"][required]',
        expectedOutput: 'Atributo validado em <input>',
      },
      {
        id: 't3',
        description: 'Input do tipo password presente',
        input: 'attr:input[type="password"]',
        expectedOutput: 'Atributo validado em <input>',
      },
      {
        id: 't4',
        description: 'Botão de submissão do tipo submit presente',
        input: 'attr:button[type="submit"]',
        expectedOutput: 'Atributo validado em <button>',
      },
    ],
  },
  {
    id: 'html-203',
    trackId: 'html',
    title: 'Tabelas Semânticas com thead e tbody',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Coleções, Formulários & Tabelas',
    order: 6,
    xpReward: 70,
    estimatedMinutes: 8,
    theory: `### 2.3 Tabelas de Dados Estruturadas

Tabelas em HTML5 devem ser usadas exclusivamente para **dados tabulares**, nunca para layout:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Linguagem</th>
      <th>Paradigma</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>JavaScript</td>
      <td>Multiparadigma</td>
    </tr>
  </tbody>
</table>
\`\`\`
`,
    objectives: [
      'Utilizar <table> com <thead> e <tbody>.',
      'Definir cabeçalhos de coluna com <th>.',
      'Definir células de dados com <td> dentro de linhas <tr>.',
    ],
    instructions: `Crie uma tabela com cabeçalho **<thead>** contendo ao menos dois **<th>**, e um corpo **<tbody>** contendo ao menos uma linha **<tr>** com células de dados **<td>**.`,
    hints: [
      'Estruture: <table><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>',
    ],
    starterCode: `<!-- Crie sua tabela de dados semântica -->
`,
    solutionCode: `<table>
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Nível</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML5</td>
      <td>Iniciante</td>
    </tr>
  </tbody>
</table>
`,
    testCases: [
      {
        id: 't1',
        description: 'Tag de cabeçalho tabular <thead> presente',
        input: 'selector:thead',
        expectedOutput: '<thead> encontrado',
      },
      {
        id: 't2',
        description: 'Tag de corpo tabular <tbody> presente',
        input: 'selector:tbody',
        expectedOutput: '<tbody> encontrado',
      },
      {
        id: 't3',
        description: 'Células de cabeçalho <th> definidas',
        input: 'selector:th',
        expectedOutput: '<th> encontrado',
      },
    ],
  },

  // HTML5 - AVANÇADO (MÓDULO 3)
  {
    id: 'html-301',
    trackId: 'html',
    title: 'Layout Semântico Moderno (header, nav, main, footer)',
    level: 'avancado',
    moduleTitle: 'Módulo 3: Arquitetura Semântica & Acessibilidade',
    order: 7,
    xpReward: 90,
    estimatedMinutes: 10,
    theory: `### 3.1 Tags Semânticas Estruturais do HTML5

O HTML5 eliminou a "div soup" (dezenas de divs aninhadas) introduzindo tags com significado intrínseco de layout:

\`\`\`html
<header>
  <h1>Logo da Empresa</h1>
  <nav aria-label="Menu principal">
    <a href="#home">Início</a>
  </nav>
</header>

<main>
  <article>
    <h2>Notícia do Dia</h2>
    <p>Conteúdo independente do artigo...</p>
  </article>
</main>

<footer>
  <p>© 2026 DevDoZero. Todos os direitos reservados.</p>
</footer>
\`\`\`
`,
    objectives: [
      'Utilizar a tag <header> com um título.',
      'Incluir a tag de navegação <nav>.',
      'Envolver o conteúdo central na tag <main>.',
      'Encerrar o documento com a tag <footer>.',
    ],
    instructions: `Construa um esqueleto completo de página utilizando as tags estruturais: **<header>**, **<nav>**, **<main>**, **<article>** e **<footer>**.`,
    hints: [
      'Coloque o menu de links dentro de <nav>.',
      'Coloque o artigo principal dentro de <main><article>...</article></main>.',
    ],
    starterCode: `<!-- Estruture o layout com tags semânticas HTML5 -->
`,
    solutionCode: `<header>
  <h1>Portal DevDoZero</h1>
  <nav>
    <a href="/cursos">Cursos</a>
    <a href="/sobre">Sobre</a>
  </nav>
</header>
<main>
  <article>
    <h2>Boas-vindas à Trilha Web</h2>
    <p>O HTML5 moderno é a base de toda a engenharia de software frontend.</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 DevDoZero</p>
</footer>
`,
    testCases: [
      {
        id: 't1',
        description: 'Tag de cabeçalho estrutural <header> presente',
        input: 'selector:header',
        expectedOutput: '<header> encontrado',
      },
      {
        id: 't2',
        description: 'Tag de navegação <nav> presente',
        input: 'selector:nav',
        expectedOutput: '<nav> encontrado',
      },
      {
        id: 't3',
        description: 'Tag de conteúdo principal <main> presente',
        input: 'selector:main',
        expectedOutput: '<main> encontrado',
      },
      {
        id: 't4',
        description: 'Tag de rodapé <footer> presente',
        input: 'selector:footer',
        expectedOutput: '<footer> encontrado',
      },
    ],
  },
  {
    id: 'html-302',
    trackId: 'html',
    title: 'Acessibilidade Web & Papéis ARIA',
    level: 'avancado',
    moduleTitle: 'Módulo 3: Arquitetura Semântica & Acessibilidade',
    order: 8,
    xpReward: 95,
    estimatedMinutes: 10,
    theory: `### 3.2 WAI-ARIA (Accessible Rich Internet Applications)

ARIA complementa o HTML para que aplicações dinâmicas sejam legíveis por leitores de tela:

\`\`\`html
<!-- aria-label fornece texto acessível para botões apenas com ícone -->
<button aria-label="Fechar modal de configurações">✕</button>

<!-- aria-live avisa sobre atualizações dinâmicas na tela -->
<div role="status" aria-live="polite">
  Salvando rascunho automaticamente...
</div>
\`\`\`
`,
    objectives: [
      'Criar um botão com atributo aria-label.',
      'Criar um container com role="status" ou role="alert".',
      'Configurar o atributo aria-live="polite".',
    ],
    instructions: `Crie um botão de ação com o atributo **aria-label="Excluir item"** e um alerta de status dinâmico utilizando **role="status"** e **aria-live="polite"**.`,
    hints: [
      'Use <button aria-label="Excluir item">X</button>',
      'Use <div role="status" aria-live="polite">Item atualizado com sucesso.</div>',
    ],
    starterCode: `<!-- Adicione os elementos acessíveis com ARIA -->
`,
    solutionCode: `<div>
  <button aria-label="Excluir item">Excluir</button>
  <div role="status" aria-live="polite">Processamento concluído com êxito.</div>
</div>
`,
    testCases: [
      {
        id: 't1',
        description: 'Elemento com atributo aria-label declarado',
        input: 'attr:[aria-label]',
        expectedOutput: 'Atributo validado em <button>',
      },
      {
        id: 't2',
        description: 'Elemento com role="status" declarado',
        input: 'attr:[role="status"]',
        expectedOutput: 'Atributo validado em <div>',
      },
      {
        id: 't3',
        description: 'Elemento com aria-live="polite" configurado',
        input: 'attr:[aria-live="polite"]',
        expectedOutput: 'Atributo validado em <div>',
      },
    ],
  },

  // ==========================================
  // CSS3 - INICIANTE (MÓDULO 1)
  // ==========================================
  {
    id: 'css-101',
    trackId: 'css',
    title: 'Box Model: Padding, Margin e Box-Sizing',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Seletores, Box Model & Tipografia',
    order: 1,
    xpReward: 50,
    estimatedMinutes: 6,
    theory: `### 1.1 O Modelo de Caixas (CSS Box Model)

Todo elemento no CSS é uma caixa retangular composta por 4 camadas:
1. **Content**: O conteúdo real (texto, imagem).
2. **Padding**: Espaçamento interno entre o conteúdo e a borda.
3. **Border**: Borda que envolve o padding.
4. **Margin**: Espaçamento externo entre a borda e elementos vizinhos.

\`\`\`css
* {
  box-sizing: border-box; /* Fundamental: padding não estoura a largura! */
}

.card {
  width: 300px;
  padding: 16px;
  margin: 24px;
  border: 1px solid #334155;
}
\`\`\`
`,
    objectives: [
      'Definir box-sizing: border-box.',
      'Aplicar regras de padding e margin em uma classe .card.',
      'Definir border visível.',
    ],
    instructions: `Configure o reset universal com **box-sizing: border-box** e crie a classe **.card** com **padding: 20px**, **margin: 16px** e **border: 1px solid #ccc**.`,
    hints: [
      'Use o seletor universal * { box-sizing: border-box; }',
      'Na classe .card, defina padding: 20px; margin: 16px; border: 1px solid #ccc;',
    ],
    starterCode: `/* Escreva suas regras de Box Model */
`,
    solutionCode: `* {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 20px;
  margin: 16px;
  border: 1px solid #ccc;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Configura box-sizing: border-box',
        input: 'prop:box-sizing=border-box',
        expectedOutput: 'box-sizing: border-box configurado',
      },
      {
        id: 't2',
        description: 'Define padding na classe .card',
        input: 'rule:.card{padding:20px}',
        expectedOutput: 'Regra .card com padding aplicada',
      },
      {
        id: 't3',
        description: 'Define margin na classe .card',
        input: 'rule:.card{margin:16px}',
        expectedOutput: 'Regra .card com margin aplicada',
      },
    ],
  },
  {
    id: 'css-102',
    trackId: 'css',
    title: 'Cores, Fundos e Estilização de Texto',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Seletores, Box Model & Tipografia',
    order: 2,
    xpReward: 50,
    estimatedMinutes: 6,
    theory: `### 1.2 Tipografia e Cores em CSS3

Estilize texto e fundos com propriedades essenciais:

\`\`\`css
body {
  background-color: #0f172a;
  color: #f8fafc;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

.titulo {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}
\`\`\`
`,
    objectives: [
      'Definir background-color e color.',
      'Definir font-family e line-height.',
      'Definir font-size e text-align.',
    ],
    instructions: `Defina para o **body** uma cor de fundo com **background-color**, cor do texto com **color** e **line-height: 1.5**. Na classe **.titulo**, defina **font-size: 24px** e **text-align: center**.`,
    hints: [
      'Exemplo: body { background-color: #1e293b; color: #ffffff; line-height: 1.5; }',
      'Exemplo: .titulo { font-size: 24px; text-align: center; }',
    ],
    starterCode: `/* Defina estilos de texto e fundo */
`,
    solutionCode: `body {
  background-color: #0f172a;
  color: #ffffff;
  line-height: 1.5;
  font-family: sans-serif;
}

.titulo {
  font-size: 24px;
  text-align: center;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Define background-color no CSS',
        input: 'regex:background-color\\s*:',
        expectedOutput: 'Padrão CSS identificado',
      },
      {
        id: 't2',
        description: 'Define line-height com valor 1.5',
        input: 'prop:line-height=1.5',
        expectedOutput: 'line-height: 1.5 configurado',
      },
      {
        id: 't3',
        description: 'Centraliza título com text-align: center',
        input: 'prop:text-align=center',
        expectedOutput: 'text-align: center configurado',
      },
    ],
  },
  {
    id: 'css-103',
    trackId: 'css',
    title: 'Seletores e Pseudo-classes :hover',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Seletores, Box Model & Tipografia',
    order: 3,
    xpReward: 55,
    estimatedMinutes: 6,
    theory: `### 1.3 Pseudo-classes Interativas

A pseudo-classe \`:hover\` aplica estilos quando o usuário passa o cursor sobre o elemento:

\`\`\`css
.btn {
  background-color: #0284c7;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #0369a1;
}
\`\`\`
`,
    objectives: [
      'Criar classe .btn com cursor: pointer.',
      'Definir estado .btn:hover com alteração visual.',
    ],
    instructions: `Crie a classe **.btn** com **cursor: pointer** e defina o estado **.btn:hover** alterando o **background-color**.`,
    hints: [
      'Lembre-se da sintaxe: .btn:hover { background-color: #0284c7; }',
    ],
    starterCode: `/* Crie a classe .btn e seu estado :hover */
`,
    solutionCode: `.btn {
  background-color: #3b82f6;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.btn:hover {
  background-color: #1d4ed8;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Configura cursor: pointer na classe .btn',
        input: 'prop:cursor=pointer',
        expectedOutput: 'cursor: pointer configurado',
      },
      {
        id: 't2',
        description: 'Declara seletor de pseudo-classe .btn:hover',
        input: 'regex:\\.btn:hover',
        expectedOutput: 'Padrão CSS identificado',
      },
    ],
  },

  // CSS3 - INTERMEDIÁRIO (MÓDULO 2)
  {
    id: 'css-201',
    trackId: 'css',
    title: 'Flexbox Essencial: Alinhamento e Justificação',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Flexbox & Layout Moderno',
    order: 4,
    xpReward: 70,
    estimatedMinutes: 8,
    theory: `### 2.1 O Poder do CSS Flexbox

O Flexbox resolve o desafio histórico de centralizar e distribuir elementos:

\`\`\`css
.container {
  display: flex;
  justify-content: center; /* Alinha no eixo principal (horizontal) */
  align-items: center;     /* Alinha no eixo cruzado (vertical) */
  gap: 16px;               /* Espaçamento uniforme entre filhos */
}
\`\`\`
`,
    objectives: [
      'Ativar display: flex.',
      'Centralizar no eixo principal com justify-content: center.',
      'Centralizar no eixo transversal com align-items: center.',
      'Definir espaçamento com gap.',
    ],
    instructions: `Configure a classe **.flex-container** com **display: flex**, **justify-content: center**, **align-items: center** e **gap: 16px**.`,
    hints: [
      'Use: .flex-container { display: flex; justify-content: center; align-items: center; gap: 16px; }',
    ],
    starterCode: `/* Configure o container Flexbox */
`,
    solutionCode: `.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Ativa container com display: flex',
        input: 'prop:display=flex',
        expectedOutput: 'display: flex configurado',
      },
      {
        id: 't2',
        description: 'Configura justify-content: center',
        input: 'prop:justify-content=center',
        expectedOutput: 'justify-content: center configurado',
      },
      {
        id: 't3',
        description: 'Configura align-items: center',
        input: 'prop:align-items=center',
        expectedOutput: 'align-items: center configurado',
      },
      {
        id: 't4',
        description: 'Configura gap: 16px',
        input: 'prop:gap=16px',
        expectedOutput: 'gap: 16px configurado',
      },
    ],
  },
  {
    id: 'css-202',
    trackId: 'css',
    title: 'Flexbox Responsivo: Direção e Quebra de Linha',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Flexbox & Layout Moderno',
    order: 5,
    xpReward: 75,
    estimatedMinutes: 8,
    theory: `### 2.2 Quebra de Linha e Direção do Eixo

\`\`\`css
.galeria {
  display: flex;
  flex-direction: row; /* Padrão (linha) ou 'column' (coluna) */
  flex-wrap: wrap;     /* Permite quebrar linha quando faltar espaço */
  gap: 12px;
}
\`\`\`
`,
    objectives: [
      'Utilizar display: flex.',
      'Configurar flex-wrap: wrap para garantir fluxo responsivo.',
      'Definir flex-direction: column ou row.',
    ],
    instructions: `Crie a classe **.galeria-cards** com **display: flex**, **flex-wrap: wrap** e **gap: 20px**.`,
    hints: [
      'Use flex-wrap: wrap para que os cartões desçam quando a tela for pequena.',
    ],
    starterCode: `/* Crie a classe .galeria-cards com flex-wrap */
`,
    solutionCode: `.galeria-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Ativa flexbox com display: flex',
        input: 'prop:display=flex',
        expectedOutput: 'display: flex configurado',
      },
      {
        id: 't2',
        description: 'Permite quebra de linha com flex-wrap: wrap',
        input: 'prop:flex-wrap=wrap',
        expectedOutput: 'flex-wrap: wrap configurado',
      },
      {
        id: 't3',
        description: 'Define gap: 20px entre os cards',
        input: 'prop:gap=20px',
        expectedOutput: 'gap: 20px configurado',
      },
    ],
  },

  // CSS3 - AVANÇADO (MÓDULO 3)
  {
    id: 'css-301',
    trackId: 'css',
    title: 'CSS Grid Bidimensional e Template Columns',
    level: 'avancado',
    moduleTitle: 'Módulo 3: Grid, Animações & Responsividade',
    order: 6,
    xpReward: 90,
    estimatedMinutes: 10,
    theory: `### 3.1 CSS Grid Layout Bidimensional

Enquanto o Flexbox opera em 1 dimensão (linha OU coluna), o CSS Grid domina simultaneamente linhas e colunas:

\`\`\`css
.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas de fração igual */
  gap: 24px;
}
\`\`\`
`,
    objectives: [
      'Definir display: grid.',
      'Configurar grid-template-columns utilizando repeat ou frações (fr).',
      'Configurar espaçamento uniforme com gap.',
    ],
    instructions: `Configure a classe **.grid-dashboard** com **display: grid**, **grid-template-columns: repeat(3, 1fr)** e **gap: 24px**.`,
    hints: [
      'A função repeat(3, 1fr) cria 3 colunas de proporção idêntica.',
    ],
    starterCode: `/* Configure o CSS Grid com repeat(3, 1fr) */
`,
    solutionCode: `.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Ativa grid bidimensional com display: grid',
        input: 'prop:display=grid',
        expectedOutput: 'display: grid configurado',
      },
      {
        id: 't2',
        description: 'Configura colunas com grid-template-columns: repeat(3, 1fr)',
        input: 'regex:grid-template-columns\\s*:\\s*repeat\\(3,\\s*1fr\\)',
        expectedOutput: 'Padrão CSS identificado',
      },
      {
        id: 't3',
        description: 'Define gap: 24px',
        input: 'prop:gap=24px',
        expectedOutput: 'gap: 24px configurado',
      },
    ],
  },
  {
    id: 'css-302',
    trackId: 'css',
    title: 'Media Queries e Design Mobile-First',
    level: 'avancado',
    moduleTitle: 'Módulo 3: Grid, Animações & Responsividade',
    order: 7,
    xpReward: 95,
    estimatedMinutes: 10,
    theory: `### 3.2 Media Queries e Responsividade Mobile-First

No design moderno, estilizamos primeiro para dispositivos móveis (base) e expandimos com media queries para telas maiores:

\`\`\`css
/* Estilo Base: Mobile */
.sidebar {
  display: none;
}

/* Telas de tablet ou desktop (>= 768px) */
@media (min-width: 768px) {
  .sidebar {
    display: block;
    width: 250px;
  }
}
\`\`\`
`,
    objectives: [
      'Declarar uma regra @media com min-width ou max-width.',
      'Adaptar seletores no interior da media query.',
    ],
    instructions: `Crie um bloco de estilo responsivo utilizando **@media (min-width: 768px)** alterando o estilo da classe **.container** para **display: flex**.`,
    hints: [
      'Sintaxe: @media (min-width: 768px) { .container { display: flex; } }',
    ],
    starterCode: `/* Escreva a media query para desktop/tablet */
`,
    solutionCode: `@media (min-width: 768px) {
  .container {
    display: flex;
    flex-direction: row;
  }
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Declaração de @media query presente',
        input: 'media:min-width',
        expectedOutput: '@media query declarada',
      },
      {
        id: 't2',
        description: 'Contém ajuste de layout responsivo na media query',
        input: 'regex:@media[\\s\\S]*display\\s*:\\s*flex',
        expectedOutput: 'Padrão CSS identificado',
      },
    ],
  },

  // ==========================================
  // JAVASCRIPT - INICIANTE (MÓDULO 1)
  // ==========================================
  {
    id: 'js-101',
    trackId: 'javascript',
    title: 'Variáveis e Operações Aritméticas',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Fundamentos & Sintaxe',
    order: 1,
    xpReward: 50,
    estimatedMinutes: 7,
    theory: `### 1.1 Variáveis e Tipos no JavaScript Moderno

No JavaScript moderno (ES6+), utilizamos \`const\` para valores imutáveis e \`let\` para variáveis que podem ser reatribuídas:

\`\`\`javascript
const pi = 3.14159;
let saldo = 100;
saldo = saldo + 50;

function somar(a, b) {
  return a + b;
}
\`\`\`
`,
    objectives: [
      'Declarar uma função calcularMedia(a, b).',
      'Retornar a média aritmética exata dos dois parâmetros.',
    ],
    instructions: `Implemente a função **calcularMedia(a, b)** que recebe dois números e retorna a média aritmética entre eles.`,
    hints: [
      'A média de a e b é dada por: (a + b) / 2',
      'Use return (a + b) / 2;',
    ],
    starterCode: `function calcularMedia(a, b) {
  // Retorne a media aritmetica de a e b
}
`,
    solutionCode: `function calcularMedia(a, b) {
  return (a + b) / 2;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'calcularMedia(10, 8) retorna 9',
        input: 'calcularMedia(10, 8)',
        expectedOutput: '9',
      },
      {
        id: 't2',
        description: 'calcularMedia(7, 7) retorna 7',
        input: 'calcularMedia(7, 7)',
        expectedOutput: '7',
      },
      {
        id: 't3',
        description: 'calcularMedia(0, 100) retorna 50',
        input: 'calcularMedia(0, 100)',
        expectedOutput: '50',
      },
    ],
  },
  {
    id: 'js-102',
    trackId: 'javascript',
    title: 'Condicionais e Operadores Lógicos',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Fundamentos & Sintaxe',
    order: 2,
    xpReward: 55,
    estimatedMinutes: 8,
    theory: `### 1.2 Controle de Fluxo com if / else

Tome decisões em código utilizando expressões lógicas:

\`\`\`javascript
function classificarIdade(idade) {
  if (idade < 12) {
    return 'Criança';
  } else if (idade < 18) {
    return 'Adolescente';
  } else {
    return 'Adulto';
  }
}
\`\`\`
`,
    objectives: [
      'Criar a função verificarAcesso(idade, temIngresso).',
      'Retornar "Acesso Permitido" somente se idade >= 18 e temIngresso === true.',
      'Caso contrário, retornar "Acesso Negado".',
    ],
    instructions: `Implemente a função **verificarAcesso(idade, temIngresso)**. Ela deve retornar a string **"Acesso Permitido"** se a pessoa tiver 18 anos ou mais e possuir ingresso. Caso contrário, deve retornar **"Acesso Negado"**.`,
    hints: [
      'Use o operador lógico E (&&): if (idade >= 18 && temIngresso) { ... }',
    ],
    starterCode: `function verificarAcesso(idade, temIngresso) {
  // Implemente as condicoes de acesso
}
`,
    solutionCode: `function verificarAcesso(idade, temIngresso) {
  if (idade >= 18 && temIngresso) {
    return "Acesso Permitido";
  }
  return "Acesso Negado";
}
`,
    testCases: [
      {
        id: 't1',
        description: 'verificarAcesso(20, true) permite acesso',
        input: 'verificarAcesso(20, true)',
        expectedOutput: 'Acesso Permitido',
      },
      {
        id: 't2',
        description: 'verificarAcesso(16, true) nega por idade insuficiente',
        input: 'verificarAcesso(16, true)',
        expectedOutput: 'Acesso Negado',
      },
      {
        id: 't3',
        description: 'verificarAcesso(25, false) nega por ausência de ingresso',
        input: 'verificarAcesso(25, false)',
        expectedOutput: 'Acesso Negado',
      },
    ],
  },
  {
    id: 'js-103',
    trackId: 'javascript',
    title: 'Funções e Template Literals',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Fundamentos & Sintaxe',
    order: 3,
    xpReward: 60,
    estimatedMinutes: 7,
    theory: `### 1.3 Arrow Functions e Template Literals

Template Literals usam crases (\`\`) para interpolação limpa de variáveis:

\`\`\`javascript
const saudar = (nome, cidade) => \`Olá, \${nome}! Bem-vindo a \${cidade}.\`;
\`\`\`
`,
    objectives: [
      'Declarar uma função que interpola nome e curso.',
      'Retornar a string exata utilizando template literals.',
    ],
    instructions: `Implemente a função **gerarCertificado(nome, curso)** que retorna a frase: **\`"Parabéns \${nome}, você concluiu o curso de \${curso}!"\`**.`,
    hints: [
      'Use crases: \`Parabéns \${nome}, você concluiu o curso de \${curso}!\`',
    ],
    starterCode: `function gerarCertificado(nome, curso) {
  // Retorne a string interpolada
}
`,
    solutionCode: `function gerarCertificado(nome, curso) {
  return \`Parabéns \${nome}, você concluiu o curso de \${curso}!\`;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Formata certificado para Lucas em JavaScript',
        input: 'gerarCertificado("Lucas", "JavaScript")',
        expectedOutput: 'Parabéns Lucas, você concluiu o curso de JavaScript!',
      },
      {
        id: 't2',
        description: 'Formata certificado para Maria em HTML5',
        input: 'gerarCertificado("Maria", "HTML5")',
        expectedOutput: 'Parabéns Maria, você concluiu o curso de HTML5!',
      },
    ],
  },

  // JAVASCRIPT - INTERMEDIÁRIO (MÓDULO 2)
  {
    id: 'js-201',
    trackId: 'javascript',
    title: 'Manipulação Funcional de Arrays (Filter & Map)',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Coleções, Objetos & Funções de Alta Ordem',
    order: 4,
    xpReward: 75,
    estimatedMinutes: 9,
    theory: `### 2.1 Métodos de Array de Alta Ordem (Filter e Map)

Abordagens funcionais evitam laços imperativos (for/while) tornando o código conciso e declarativo:

\`\`\`javascript
const produtos = [
  { id: 1, nome: 'Teclado', preco: 150, ativo: true },
  { id: 2, nome: 'Mouse', preco: 80, ativo: false },
  { id: 3, nome: 'Monitor', preco: 900, ativo: true },
];

const nomesAtivos = produtos
  .filter((p) => p.ativo)
  .map((p) => p.nome.toUpperCase());
\`\`\`
`,
    objectives: [
      'Filtrar produtos ativos.',
      'Aplicar desconto de 10% no preço de cada item filtrado.',
      'Retornar novo array sem mutar o original.',
    ],
    instructions: `Implemente a função **aplicarDescontoAtivos(produtos)**. Ela deve receber um array de objetos contendo \`{ id, preco, ativo }\`, filtrar apenas os que tiverem \`ativo: true\`, e retornar um array com o preço de cada um reduzido em 10% (preço * 0.9).`,
    hints: [
      'Encadeie .filter((p) => p.ativo) com .map((p) => Math.round(p.preco * 0.9))',
    ],
    starterCode: `function aplicarDescontoAtivos(produtos) {
  // Filtre os ativos e retorne os precos com 10% de desconto
  return [];
}
`,
    solutionCode: `function aplicarDescontoAtivos(produtos) {
  return produtos
    .filter((p) => p.ativo)
    .map((p) => Math.round(p.preco * 0.9));
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Filtra ativos e reduz 10% do preço',
        input: 'aplicarDescontoAtivos([{id:1,preco:100,ativo:true},{id:2,preco:200,ativo:false},{id:3,preco:50,ativo:true}])',
        expectedOutput: '[90,45]',
      },
    ],
  },
  {
    id: 'js-202',
    trackId: 'javascript',
    title: 'Redução de Coleções com Array.reduce',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Coleções, Objetos & Funções de Alta Ordem',
    order: 5,
    xpReward: 80,
    estimatedMinutes: 9,
    theory: `### 2.2 O Método Array.prototype.reduce

O \`reduce\` acumula valores de uma lista em um único resultado:

\`\`\`javascript
const vendas = [120, 300, 80, 450];
const total = vendas.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
\`\`\`
`,
    objectives: [
      'Implementar função somarCarrinho(itens).',
      'Multiplicar quantidade por precoUnitario em cada item.',
      'Retornar o total consolidado usando reduce.',
    ],
    instructions: `Implemente a função **somarCarrinho(itens)** que recebe um array de itens no formato \`{ nome, precoUnitario, qtd }\` e calcula o valor total da compra usando **reduce**.`,
    hints: [
      'Use: itens.reduce((acc, item) => acc + (item.precoUnitario * item.qtd), 0);',
    ],
    starterCode: `function somarCarrinho(itens) {
  // Calcule o total do carrinho usando reduce
  return 0;
}
`,
    solutionCode: `function somarCarrinho(itens) {
  return itens.reduce((acc, item) => acc + (item.precoUnitario * item.qtd), 0);
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Calcula total do carrinho corretamente',
        input: 'somarCarrinho([{nome:"Mouse",precoUnitario:50,qtd:2},{nome:"Teclado",precoUnitario:120,qtd:1}])',
        expectedOutput: '220',
      },
      {
        id: 't2',
        description: 'Carrinho vazio retorna 0',
        input: 'somarCarrinho([])',
        expectedOutput: '0',
      },
    ],
  },
  {
    id: 'js-203',
    trackId: 'javascript',
    title: 'Desestruturação e Spread Operator',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Coleções, Objetos & Funções de Alta Ordem',
    order: 6,
    xpReward: 80,
    estimatedMinutes: 8,
    theory: `### 2.3 Destructuring & Spread Operator

A desestruturação extrai propriedades de objetos ou elementos de arrays com facilidade:

\`\`\`javascript
const usuario = { nome: 'Carlos', idade: 28, cargo: 'Arquiteto' };
const { nome, cargo } = usuario;

// Spread operator copia e expande objetos sem mutação
const usuarioAtualizado = { ...usuario, status: 'Ativo' };
\`\`\`
`,
    objectives: [
      'Desestruturar propriedades de um objeto.',
      'Utilizar spread operator (...) para mesclar dados.',
    ],
    instructions: `Implemente a função **mesclarConfig(padrao, usuario)** que mescla dois objetos de configuração usando o **spread operator**, garantindo que as propriedades fornecidas pelo usuário sobrescrevam as padrões.`,
    hints: [
      'Use: return { ...padrao, ...usuario };',
    ],
    starterCode: `function mesclarConfig(padrao, usuario) {
  // Mescle usando o spread operator
}
`,
    solutionCode: `function mesclarConfig(padrao, usuario) {
  return { ...padrao, ...usuario };
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Mescla configurações com sobrescrita correta',
        input: 'mesclarConfig({ tema: "light", debug: false }, { debug: true })',
        expectedOutput: '{"tema":"light","debug":true}',
      },
    ],
  },

  // JAVASCRIPT - AVANÇADO (MÓDULO 3)
  {
    id: 'js-301',
    trackId: 'javascript',
    title: 'Assincronismo: Promises e Async / Await',
    level: 'avancado',
    moduleTitle: 'Módulo 3: Assincronismo & Engenharia de Código',
    order: 7,
    xpReward: 95,
    estimatedMinutes: 10,
    theory: `### 3.1 JavaScript Assíncrono com Async/Await

Operações de I/O, bancos de dados e APIs web rodam no Event Loop sem travar a thread principal:

\`\`\`javascript
async function buscarUsuario(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error('Falha HTTP');
    const dados = await res.json();
    return dados;
  } catch (erro) {
    console.error(erro);
    throw erro;
  }
}
\`\`\`
`,
    objectives: [
      'Criar função assíncrona com async.',
      'Aguardar resolução com await.',
      'Retornar valor processado.',
    ],
    instructions: `Implemente a função assíncrona **buscarPrecoFinal(precoBase, cupom)**. Se cupom for "DEV10", deve aguardar uma promessa simulada e retornar \`precoBase * 0.9\`. Caso contrário, retorna o próprio \`precoBase\`.`,
    hints: [
      'Use: async function buscarPrecoFinal(precoBase, cupom) { ... }',
    ],
    starterCode: `async function buscarPrecoFinal(precoBase, cupom) {
  // Implemente o cálculo assíncrono
  return precoBase;
}
`,
    solutionCode: `async function buscarPrecoFinal(precoBase, cupom) {
  if (cupom === "DEV10") {
    return precoBase * 0.9;
  }
  return precoBase;
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Aplica cupom DEV10 com sucesso',
        input: 'buscarPrecoFinal(100, "DEV10")',
        expectedOutput: '90',
      },
      {
        id: 't2',
        description: 'Sem cupom retorna preço base',
        input: 'buscarPrecoFinal(100, "")',
        expectedOutput: '100',
      },
    ],
  },
  {
    id: 'js-302',
    trackId: 'javascript',
    title: 'Closures e Funções Fábrica (Encapsulamento)',
    level: 'avancado',
    moduleTitle: 'Módulo 3: Assincronismo & Engenharia de Código',
    order: 8,
    xpReward: 95,
    estimatedMinutes: 10,
    theory: `### 3.2 Closures e Escopo Léxico

Uma **closure** ocorre quando uma função "lembra" e mantém acesso às variáveis de seu escopo pai mesmo após a função pai ter terminado de executar:

\`\`\`javascript
function criarContador(inicial = 0) {
  let count = inicial; // Variável privada
  return {
    incrementar: () => ++count,
    obterValor: () => count,
  };
}
\`\`\`
`,
    objectives: [
      'Criar uma função fábrica criarCofre(senhaSecreta).',
      'Encapsular a senha em escopo léxico privado.',
      'Expor método verificar(tentativa) que retorna booleano.',
    ],
    instructions: `Implemente a função **criarCofre(senhaSecreta)**. Ela deve retornar um objeto com o método **verificar(tentativa)** que retorna \`true\` se a tentativa coincidir com \`senhaSecreta\` e \`false\` caso contrário, sem expor a variável diretamente.`,
    hints: [
      'return { verificar: (tentativa) => tentativa === senhaSecreta };',
    ],
    starterCode: `function criarCofre(senhaSecreta) {
  // Retorne o objeto com o metodo verificar
}
`,
    solutionCode: `function criarCofre(senhaSecreta) {
  return {
    verificar: (tentativa) => tentativa === senhaSecreta,
  };
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Valida senha correta com true',
        input: 'criarCofre("1234").verificar("1234")',
        expectedOutput: 'true',
      },
      {
        id: 't2',
        description: 'Nega senha incorreta com false',
        input: 'criarCofre("1234").verificar("9999")',
        expectedOutput: 'false',
      },
    ],
  },

  // ==========================================
  // OUTRAS TRILHAS: TYPESCRIPT, PYTHON, JAVA, C#
  // ==========================================
  {
    id: 'ts-301',
    trackId: 'typescript',
    title: 'Generics e Type Narrowing Seguro',
    level: 'avancado',
    moduleTitle: 'Módulo 3: Arquitetura de Tipos Enterprise',
    order: 1,
    xpReward: 90,
    estimatedMinutes: 10,
    theory: `### 3.1 Generics e Type Guards em TypeScript

Generics criam componentes reutilizáveis que funcionam com múltiplos tipos enquanto mantêm segurança estática estrita:

\`\`\`typescript
interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  error?: string;
}

function safeParseJSON<T>(jsonStr: string, fallback: T): T {
  try {
    return JSON.parse(jsonStr) as T;
  } catch {
    return fallback;
  }
}
\`\`\`
`,
    objectives: [
      'Implementar safeParseJSON seguro com fallback.',
      'Tratar exceções de sintaxe JSON de forma elegante.',
    ],
    instructions: `Implemente a função **safeParseJSON(jsonStr, fallback)**. Ela deve tentar fazer \`JSON.parse\` da string e retornar o valor parseado; se ocorrer erro de sintaxe, deve retornar o valor de \`fallback\`.`,
    hints: [
      'Use um bloco try / catch retornando fallback em caso de erro.',
    ],
    starterCode: `function safeParseJSON(jsonStr, fallback) {
  // Implemente o parser resiliente
}
`,
    solutionCode: `function safeParseJSON(jsonStr, fallback) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return fallback;
  }
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Parse de JSON válido retorna objeto',
        input: 'safeParseJSON(\'{"name":"Dev"}\', {})',
        expectedOutput: '{"name":"Dev"}',
      },
      {
        id: 't2',
        description: 'Parse de JSON quebrado retorna o fallback sem crashar',
        input: 'safeParseJSON(\'{invalido}\', {status:"padrao"})',
        expectedOutput: '{"status":"padrao"}',
      },
    ],
  },
  {
    id: 'py-101',
    trackId: 'python',
    title: 'Funções e Tomada de Decisão em Python',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Fundamentos da Linguagem',
    order: 1,
    xpReward: 50,
    estimatedMinutes: 8,
    theory: `### 1.1 Lógica Condicional em Python

Python utiliza indentação obrigatória de 4 espaços para delimitar blocos:

\`\`\`python
def classificar_temperatura(graus):
    if graus > 30:
        return "Quente"
    elif graus >= 15:
        return "Agradavel"
    else:
        return "Frio"
\`\`\`
`,
    objectives: [
      'Declarar uma função verificar_aprovacao(nota, frequencia).',
      'Validar critérios de presença mínima (>= 75%) e nota.',
    ],
    instructions: `Implemente a função **verificar_aprovacao(nota, frequencia)** em Python. Se frequência < 75%, retorne **"Reprovado por Falta"**. Caso contrário, se nota >= 7.0 retorne **"Aprovado"**, se nota >= 5.0 retorne **"Recuperacao"**, senão retorne **"Reprovado"**.`,
    hints: [
      'Verifique primeiro a frequência: if frequencia < 75: return "Reprovado por Falta"',
    ],
    starterCode: `def verificar_aprovacao(nota, frequencia):
    # Implemente a regra de negocio
    pass
`,
    solutionCode: `def verificar_aprovacao(nota, frequencia):
    if frequencia < 75:
        return "Reprovado por Falta"
    if nota >= 7.0:
        return "Aprovado"
    elif nota >= 5.0:
        return "Recuperacao"
    else:
        return "Reprovado"
`,
    testCases: [
      {
        id: 't1',
        description: 'Nota 8.5 e Frequência 80% retorna Aprovado',
        input: '(8.5, 80)',
        expectedOutput: 'Aprovado',
      },
      {
        id: 't2',
        description: 'Nota 9.0 com Frequência 60% reprova por falta',
        input: '(9.0, 60)',
        expectedOutput: 'Reprovado por Falta',
      },
    ],
  },
  {
    id: 'jv-201',
    trackId: 'java',
    title: 'POO & Encapsulamento em Java',
    level: 'intermediario',
    moduleTitle: 'Módulo 2: Orientação a Objetos na JVM',
    order: 1,
    xpReward: 70,
    estimatedMinutes: 9,
    theory: `### 2.1 Encapsulamento Rigoroso e Modificadores de Acesso

Em Java corporativo, atributos são estritamente \`private\` e manipulados por métodos com validações contratuais.
`,
    objectives: [
      'Implementar método sacar(double valor) com validação de saldo e valor positivo.',
    ],
    instructions: `Na classe **ContaCorrente**, implemente o método **sacar(double valor)**. Lance \`IllegalArgumentException\` se o valor for menor ou igual a zero, debite o saldo e retorne \`true\` se houver saldo suficiente, ou retorne \`false\` sem alterar o saldo se for insuficiente.`,
    hints: [
      'Lance exceção: if (valor <= 0) throw new IllegalArgumentException("Valor invalido");',
    ],
    starterCode: `public class ContaCorrente {
    private double saldo = 1000.0;

    public boolean sacar(double valor) {
        // Implemente as validacoes
        return false;
    }
}
`,
    solutionCode: `public class ContaCorrente {
    private double saldo = 1000.0;

    public boolean sacar(double valor) {
        if (valor <= 0) throw new IllegalArgumentException("Valor invalido");
        if (saldo >= valor) {
            saldo -= valor;
            return true;
        }
        return false;
    }
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Saque de R$ 200 debita do saldo e retorna true',
        input: 'sacar(200)',
        expectedOutput: 'true, novo saldo: 800.0',
      },
    ],
  },
  {
    id: 'cs-301',
    trackId: 'csharp',
    title: 'Concorrência e Task Parallel Library (TPL)',
    level: 'avancado',
    moduleTitle: 'Módulo 3: Engenharia Cloud de Alto Desempenho',
    order: 1,
    xpReward: 90,
    estimatedMinutes: 10,
    theory: `### 3.1 Orquestração Paralela com Task.WhenAll

O ecossistema .NET moderno permite despachar múltiplas operações I/O de alta velocidade de forma não-bloqueante usando \`Task.WhenAll\`.
`,
    objectives: [
      'Processar coleção com Task.WhenAll.',
      'Somar os resultados assíncronos.',
    ],
    instructions: `Implemente o método **ProcessarLoteAsync(IEnumerable<int> ids)** executando \`Task.WhenAll\` sobre tarefas assíncronas e retornando a soma dos resultados calculados.`,
    hints: [
      'Use: int[] results = await Task.WhenAll(ids.Select(CalcularAsync)); return results.Sum();',
    ],
    starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ProcessadorAssincrono {
    public static async Task<int> CalcularAsync(int id) {
        await Task.Delay(50);
        return id * 2;
    }

    public static async Task<int> ProcessarLoteAsync(IEnumerable<int> ids) {
        // Implemente a orquestracao com Task.WhenAll
        return 0;
    }
}
`,
    solutionCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ProcessadorAssincrono {
    public static async Task<int> CalcularAsync(int id) {
        await Task.Delay(50);
        return id * 2;
    }

    public static async Task<int> ProcessarLoteAsync(IEnumerable<int> ids) {
        var tasks = ids.Select(CalcularAsync);
        int[] results = await Task.WhenAll(tasks);
        return results.Sum();
    }
}
`,
    testCases: [
      {
        id: 't1',
        description: 'Processar [1, 2, 3] retorna 12 (2+4+6) em paralelo',
        input: '[1, 2, 3]',
        expectedOutput: '12',
      },
    ],
  },
];
