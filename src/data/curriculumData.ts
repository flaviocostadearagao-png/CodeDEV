import { Track, Lesson, Badge } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'python',
    name: 'Python',
    iconName: 'Terminal',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    accentColor: '#10b981',
    tagline: 'Da sintaxe limpa a algoritmos avançados e IA',
    description: 'Aprenda a linguagem mais popular do mundo para automação, análise de dados e backend.',
    totalLessons: 84,
    completedLessons: 6,
    inicianteCount: 28,
    intermediarioCount: 32,
    avancadoCount: 24,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    iconName: 'Code',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    accentColor: '#f59e0b',
    tagline: 'A linguagem onipresente da Web moderna',
    description: 'Domine a linguagem fundamental da web, do DOM assíncrono ao Node.js.',
    totalLessons: 92,
    completedLessons: 12,
    inicianteCount: 30,
    intermediarioCount: 36,
    avancadoCount: 26,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    iconName: 'FileCode2',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    accentColor: '#3b82f6',
    tagline: 'JavaScript tipado em escala enterprise',
    description: 'Eleve seu código com tipagem estática rigorosa, interfaces, generics e decorators.',
    totalLessons: 76,
    completedLessons: 3,
    inicianteCount: 24,
    intermediarioCount: 28,
    avancadoCount: 24,
  },
  {
    id: 'java',
    name: 'Java',
    iconName: 'Cpu',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    accentColor: '#f43f5e',
    tagline: 'Robustez empresarial e POO pura na JVM',
    description: 'Construa aplicações de missão crítica com a robustez e maturidade do ecossistema Java.',
    totalLessons: 90,
    completedLessons: 4,
    inicianteCount: 28,
    intermediarioCount: 34,
    avancadoCount: 28,
  },
  {
    id: 'csharp',
    name: 'C# (.NET)',
    iconName: 'Layers',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    accentColor: '#a855f7',
    tagline: 'Alto desempenho para Cloud, Jogos e Web APIs',
    description: 'Explore o ecossistema .NET moderno para microserviços, desenvolvimento de jogos e nuvem.',
    totalLessons: 80,
    completedLessons: 2,
    inicianteCount: 26,
    intermediarioCount: 30,
    avancadoCount: 24,
  },
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b1',
    title: 'Primeiro Hello World',
    description: 'Executou seu primeiro código com sucesso na plataforma.',
    icon: 'Sparkles',
    unlockedAt: 'Hoje',
    category: 'progress',
  },
  {
    id: 'b2',
    title: 'Mestre das Condicionais',
    description: 'Completou todos os desafios de tomada de decisão com if/else.',
    icon: 'GitBranch',
    unlockedAt: 'Ontem',
    category: 'mastery',
  },
  {
    id: 'b3',
    title: 'Alquimista de Arrays',
    description: 'Filtrou, mapeou e reduziu estruturas de coleções com perfeição.',
    icon: 'Database',
    unlockedAt: '3 dias atrás',
    category: 'mastery',
  },
  {
    id: 'b4',
    title: 'Arquiteto de Classes',
    description: 'Criou sua primeira hierarquia de classes com encapsulamento e polimorfismo.',
    icon: 'Box',
    unlockedAt: undefined,
    category: 'architect',
  },
  {
    id: 'b5',
    title: 'Streak de Fogo (7 Dias)',
    description: 'Praticou código por 7 dias consecutivos.',
    icon: 'Flame',
    unlockedAt: undefined,
    category: 'streak',
  },
];

export const SAMPLE_LESSONS: Lesson[] = [
  // JAVASCRIPT - INICIANTE
  {
    id: 'js-101',
    trackId: 'javascript',
    title: 'Variáveis e Operações Aritméticas',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Fundamentos & Sintaxe',
    order: 1,
    xpReward: 50,
    estimatedMinutes: 8,
    theory: `### 1.1 Variáveis e Tipos no JavaScript Moderno

No JavaScript moderno (ES6+), utilizamos \`const\` para valores imutáveis e \`let\` para variáveis que podem ser reatribuídas. Evitamos \`var\` devido ao escopo de função e problemas de hoisting.

\`\`\`javascript
const pi = 3.14159;
let saldo = 100;
saldo = saldo + 50; // Operação básica
\`\`\`

Os tipos primitivos fundamentais incluem:
- **Number**: Inteiros e pontos flutuantes (ex: \`42\`, \`3.14\`)
- **String**: Cadeias de caracteres (ex: \`"DevDoZero"\`)
- **Boolean**: Valores lógicos (\`true\` ou \`false\`)
`,
    objectives: [
      'Declarar uma função que recebe dois números e retorna a média aritmética.',
      'Utilizar variáveis adequadas (`const` / `let`).',
      'Garantir retorno numérico exato.',
    ],
    instructions: `Implemente a função **calcularMedia(a, b)**. Ela deve receber dois parâmetros numéricos (\`a\` e \`b\`) e retornar a média aritmética exata entre eles.

Exemplo:
\`calcularMedia(10, 20)\` deve retornar \`15\`.
\`calcularMedia(7, 8)\` deve retornar \`7.5\`.`,
    hints: [
      'A média de dois valores é obtida somando-os e dividindo o resultado por 2: (a + b) / 2.',
      'Atenção à precedência de operadores: use parênteses na soma antes de dividir.',
    ],
    starterCode: `// DevDoZero - Desafio Prático
// Implemente a função calcularMedia

function calcularMedia(a, b) {
  // Seu código aqui
  
}

// Teste local:
console.log("Teste local:", calcularMedia(10, 20));
`,
    solutionCode: `function calcularMedia(a, b) {
  return (a + b) / 2;
}

console.log(calcularMedia(10, 20));`,
    testCases: [
      {
        id: 't1',
        description: 'calcularMedia(10, 20) deve retornar 15',
        input: '10, 20',
        expectedOutput: '15',
      },
      {
        id: 't2',
        description: 'calcularMedia(7, 8) deve retornar 7.5',
        input: '7, 8',
        expectedOutput: '7.5',
      },
      {
        id: 't3',
        description: 'calcularMedia(-4, 4) deve retornar 0 (teste oculto com negativos)',
        input: '-4, 4',
        expectedOutput: '0',
        isHidden: true,
      },
    ],
    completed: true,
  },
  // JAVASCRIPT - INTERMEDIÁRIO
  {
    id: 'js-201',
    trackId: 'javascript',
    title: 'Transformação Funcional com Array.map & filter',
    level: 'intermediario',
    moduleTitle: 'Módulo 4: Manipulação de Dados & Funções',
    order: 2,
    xpReward: 120,
    estimatedMinutes: 15,
    theory: `### 2.1 Paradigma Funcional em Coleções

Métodos de ordem superior como \`.filter()\` e \`.map()\` permitem encadear transformações sem mutar o array original, garantindo imutabilidade e clareza.

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const paresDobrados = numeros
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
// paresDobrados = [4, 8]
\`\`\`
`,
    objectives: [
      'Filtrar produtos que estão ativos (`ativo: true`).',
      'Aplicar 10% de desconto no preço de cada produto filtrado.',
      'Retornar um novo array com os produtos atualizados sem modificar o original.',
    ],
    instructions: `Implemente a função **aplicarDescontoAtivos(produtos)**.
Ela recebe uma lista de objetos contendo \`{ id, nome, preco, ativo }\`.
A função deve filtrar apenas os produtos onde \`ativo === true\` e retornar um novo array onde cada produto tem a propriedade \`precoComDesconto\` calculada como \`preco * 0.9\`.`,
    hints: [
      'Use .filter(p => p.ativo) primeiro.',
      'Use .map(p => ({ ...p, precoComDesconto: p.preco * 0.9 })) para manter a imutabilidade.',
    ],
    starterCode: `function aplicarDescontoAtivos(produtos) {
  // Escreva sua solução funcional aqui:
  
}

const mockProdutos = [
  { id: 1, nome: "Teclado", preco: 100, ativo: true },
  { id: 2, nome: "Mouse", preco: 50, ativo: false },
  { id: 3, nome: "Monitor", preco: 1000, ativo: true }
];

console.log(aplicarDescontoAtivos(mockProdutos));
`,
    solutionCode: `function aplicarDescontoAtivos(produtos) {
  return produtos
    .filter(p => p.ativo)
    .map(p => ({
      ...p,
      precoComDesconto: +(p.preco * 0.9).toFixed(2)
    }));
}`,
    testCases: [
      {
        id: 't1',
        description: 'Filtra itens inativos e aplica 10% nos ativos',
        input: '[{id:1, preco:100, ativo:true}, {id:2, preco:50, ativo:false}]',
        expectedOutput: '[{"id":1,"preco":100,"ativo":true,"precoComDesconto":90}]',
      },
      {
        id: 't2',
        description: 'Retorna array vazio quando todos estão inativos',
        input: '[{id:1, preco:100, ativo:false}]',
        expectedOutput: '[]',
        isHidden: true,
      },
    ],
  },
  // PYTHON - INICIANTE
  {
    id: 'py-101',
    trackId: 'python',
    title: 'Estruturas Condicionais e Funções em Python',
    level: 'iniciante',
    moduleTitle: 'Módulo 1: Primeiros Passos com Python',
    order: 1,
    xpReward: 60,
    estimatedMinutes: 10,
    theory: `### 1.1 Indentação e Condicionais em Python

Python utiliza indentação rigorosa com 4 espaços para delimitar blocos de código ao invés de chaves \`{}\`.

\`\`\`python
def classificar_idade(idade):
    if idade >= 18:
        return "Maior de idade"
    elif idade >= 12:
        return "Adolescente"
    else:
        return "Crianca"
\`\`\`
`,
    objectives: [
      'Definir funções usando a palavra-chave `def`.',
      'Estruturar ramificações lógicas com `if`, `elif` e `else`.',
      'Respeitar a sintaxe estrita de indentação Python.',
    ],
    instructions: `Implemente a função **verificar_aprovacao(nota, frequencia)**.
Regras de aprovação:
- Se a \`nota\` for maior ou igual a 7.0 **E** a \`frequencia\` for maior ou igual a 75, retorna \`"Aprovado"\`.
- Se a \`frequencia\` for menor que 75, retorna \`"Reprovado por Frequencia"\`.
- Caso a \`frequencia\` seja suficiente mas a \`nota\` seja entre 5.0 e 6.9, retorna \`"Recuperacao"\`.
- Caso contrário, retorna \`"Reprovado por Nota"\`.`,
    hints: [
      'Use operadores lógicos como `and` e `or`.',
      'Lembre-se de retornar exatamente as strings especificadas (case-sensitive).',
    ],
    starterCode: `# DevDoZero - Desafio Python
def verificar_aprovacao(nota, frequencia):
    # Seu codigo aqui
    pass

print(verificar_aprovacao(8.5, 80))
`,
    solutionCode: `def verificar_aprovacao(nota, frequencia):
    if frequencia < 75:
        return "Reprovado por Frequencia"
    if nota >= 7.0:
        return "Aprovado"
    elif nota >= 5.0:
        return "Recuperacao"
    else:
        return "Reprovado por Nota"`,
    testCases: [
      {
        id: 't1',
        description: 'Nota 8.5 e Frequência 80% -> "Aprovado"',
        input: '8.5, 80',
        expectedOutput: '"Aprovado"',
      },
      {
        id: 't2',
        description: 'Nota 9.0 e Frequência 70% -> "Reprovado por Frequencia"',
        input: '9.0, 70',
        expectedOutput: '"Reprovado por Frequencia"',
      },
      {
        id: 't3',
        description: 'Nota 6.0 e Frequência 85% -> "Recuperacao"',
        input: '6.0, 85',
        expectedOutput: '"Recuperacao"',
        isHidden: true,
      },
    ],
  },
  // TYPESCRIPT - AVANÇADO
  {
    id: 'ts-301',
    trackId: 'typescript',
    title: 'Generics e Discriminated Unions',
    level: 'avancado',
    moduleTitle: 'Módulo 8: Tipagem Estrita e Arquitetura de Tipos',
    order: 3,
    xpReward: 200,
    estimatedMinutes: 20,
    theory: `### 3.1 Padrão Result<T, E> com Discriminated Unions

Em sistemas de missão crítica, tratar erros via tipagem estrita (Result Pattern) evita exceções não capturadas e força o desenvolvedor a lidar com cenários de falha.

\`\`\`typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
\`\`\`
`,
    objectives: [
      'Definir tipos genéricos reutilizáveis.',
      'Implementar funções de guarda de tipos (type guards).',
      'Construir pipelines seguros à prova de falhas em runtime.',
    ],
    instructions: `Implemente uma função genérica **safeParseJSON<T>(jsonString: string): Result<T, string>**.
Se o parse for bem sucedido, retorne \`{ success: true, data: parsed }\`.
Se ocorrer uma exceção durante o parse, capture-a e retorne \`{ success: false, error: 'JSON Invalido' }\`.`,
    hints: [
      'Use bloco try/catch para envolver JSON.parse.',
      'Assegure o retorno dos dois formatos da união discriminada.',
    ],
    starterCode: `type Result<T, E = string> = 
  | { success: true; data: T }
  | { success: false; error: E };

function safeParseJSON<T>(jsonString: string): Result<T, string> {
  // Implemente o validador com seguranca de tipos
  
}

console.log(safeParseJSON('{"name":"DevDoZero"}'));
`,
    solutionCode: `type Result<T, E = string> = 
  | { success: true; data: T }
  | { success: false; error: E };

function safeParseJSON<T>(jsonString: string): Result<T, string> {
  try {
    const data = JSON.parse(jsonString) as T;
    return { success: true, data };
  } catch {
    return { success: false, error: "JSON Invalido" };
  }
}`,
    testCases: [
      {
        id: 't1',
        description: 'Parse válido retorna success: true com objeto',
        input: '\'{"id":1}\'',
        expectedOutput: '{"success":true,"data":{"id":1}}',
      },
      {
        id: 't2',
        description: 'Parse inválido retorna success: false com erro amigável',
        input: '\'corrompido\'',
        expectedOutput: '{"success":false,"error":"JSON Invalido"}',
      },
    ],
  },
  // JAVA - INTERMEDIÁRIO
  {
    id: 'java-201',
    trackId: 'java',
    title: 'POO: Encapsulamento e Métodos de Acesso',
    level: 'intermediario',
    moduleTitle: 'Módulo 3: Programação Orientada a Objetos',
    order: 2,
    xpReward: 140,
    estimatedMinutes: 18,
    theory: `### 2.1 Encapsulamento e Modificadores de Acesso

Encapsulamento protege o estado interno de um objeto contra modificações diretas indevidas. Atributos são mantidos \`private\` e acessados através de getters e setters com validação de regras de negócio.

\`\`\`java
public class ContaBancaria {
    private double saldo;
    
    public void depositar(double valor) {
        if (valor > 0) this.saldo += valor;
    }
}
\`\`\`
`,
    objectives: [
      'Proteger atributos com `private`.',
      'Implementar validações de negócio nos métodos modificadores.',
      'Garantir integridade do estado do objeto.',
    ],
    instructions: `Na classe **ContaCorrente**, implemente o método **sacar(double valor)**.
Regras:
- Se o valor do saque for menor ou igual a 0, lance \`IllegalArgumentException("Valor invalido")\`.
- Se o saldo for insuficiente, retorne \`false\`.
- Caso contrário, debite o valor do saldo e retorne \`true\`.`,
    hints: [
      'Verifique primeiro as condições de erro antes de alterar o saldo.',
    ],
    starterCode: `public class ContaCorrente {
    private double saldo;

    public ContaCorrente(double saldoInicial) {
        this.saldo = saldoInicial;
    }

    public double getSaldo() {
        return this.saldo;
    }

    public boolean sacar(double valor) {
        // Implemente a regra de saque seguro
        return false;
    }
}
`,
    solutionCode: `public class ContaCorrente {
    private double saldo;

    public ContaCorrente(double saldoInicial) {
        this.saldo = saldoInicial;
    }

    public double getSaldo() {
        return this.saldo;
    }

    public boolean sacar(double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor invalido");
        }
        if (this.saldo >= valor) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }
}`,
    testCases: [
      {
        id: 't1',
        description: 'Saque de 50 com saldo 100 debita e retorna true',
        input: 'saldo: 100, saque: 50',
        expectedOutput: 'true, saldo_restante: 50.0',
      },
      {
        id: 't2',
        description: 'Saque de 150 com saldo 100 recusa e retorna false',
        input: 'saldo: 100, saque: 150',
        expectedOutput: 'false, saldo_restante: 100.0',
      },
    ],
  },
  // C# - AVANÇADO
  {
    id: 'cs-301',
    trackId: 'csharp',
    title: 'Concorrência com Task e async/await em .NET',
    level: 'avancado',
    moduleTitle: 'Módulo 7: Programação Assíncrona de Alta Performance',
    order: 3,
    xpReward: 210,
    estimatedMinutes: 22,
    theory: `### 3.1 O Modelo Assíncrono baseado em Tarefas (TAP)

No ecossistema .NET moderno, \`async\` e \`await\` operam sobre a classe \`Task\`. Elas evitam o bloqueio de threads do ThreadPool através de uma máquina de estados de alto desempenho gerada pelo compilador.

\`\`\`csharp
public async Task<string> FetchDataAsync(HttpClient client, string url) {
    var response = await client.GetStringAsync(url);
    return response;
}
\`\`\`
`,
    objectives: [
      'Orquestrar múltiplas tarefas simultâneas com `Task.WhenAll`.',
      'Prevenir deadlocks de contexto.',
      'Controlar cancelamento via `CancellationToken`.',
    ],
    instructions: `Implemente o método assíncrono **ProcessarLoteAsync(IEnumerable<int> ids)** que executa em paralelo a busca de dados simulada para cada ID usando \`Task.WhenAll\` e retorna a soma de todos os resultados calculados.`,
    hints: [
      'Use ids.Select(id => CalcularAsync(id)) para criar a coleção de tarefas.',
      'Aguarde com await Task.WhenAll(tarefas) antes de somar.',
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
        // Implemente a orquestracao paralela com Task.WhenAll
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
}`,
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
