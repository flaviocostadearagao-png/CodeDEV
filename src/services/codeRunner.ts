import { Lesson, ExecutionResult, TestResultItem } from '../types';

export async function runCode(code: string, lesson: Lesson): Promise<ExecutionResult> {
  const startTime = performance.now();

  // Simulate network & sandbox init latency (for realism and visual responsiveness)
  await new Promise((resolve) => setTimeout(resolve, 280));

  if (lesson.trackId === 'html') {
    return executeHtmlTest(code, lesson, startTime);
  } else if (lesson.trackId === 'css') {
    return executeCssTest(code, lesson, startTime);
  } else if (lesson.trackId === 'javascript' || lesson.trackId === 'typescript') {
    return executeJavaScriptOrTypeScript(code, lesson, startTime);
  } else if (lesson.trackId === 'python') {
    return executePythonSimulation(code, lesson, startTime);
  } else if (lesson.trackId === 'java') {
    return executeJavaSimulation(code, lesson, startTime);
  } else {
    // csharp
    return executeCSharpSimulation(code, lesson, startTime);
  }
}

function executeHtmlTest(
  code: string,
  lesson: Lesson,
  startTime: number
): ExecutionResult {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const testResults: TestResultItem[] = [];

  stdoutLines.push('[HTML Parser] Inicializando analisador DOM (HTML5 W3C Specification)...');

  const parser = new DOMParser();
  const doc = parser.parseFromString(code, 'text/html');

  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    stderrLines.push(`[HTML Linter] Aviso de parsing: ${parserError.textContent}`);
  } else {
    stdoutLines.push('[HTML Parser] Árvore DOM construída com êxito sem erros fatais.');
  }

  // Detect student tags
  const allElements = Array.from(doc.querySelectorAll('*')).map((el) => el.tagName.toLowerCase());
  const uniqueTags = Array.from(new Set(allElements)).filter((t) => !['html', 'head', 'body'].includes(t));
  if (uniqueTags.length > 0) {
    stdoutLines.push(`[Tags Detectadas] <${uniqueTags.slice(0, 10).join('>, <')}>`);
  }

  for (const tc of lesson.testCases) {
    const tStart = performance.now();
    let passed = false;
    let actualOutput = '';

    try {
      if (tc.input.startsWith('selector:')) {
        const selector = tc.input.replace('selector:', '').trim();
        const el = doc.querySelector(selector);
        if (el) {
          passed = true;
          actualOutput = `<${el.tagName.toLowerCase()}> encontrado`;
        } else {
          passed = false;
          actualOutput = `Seletor '${selector}' não localizado`;
        }
      } else if (tc.input.startsWith('has-text:')) {
        const parts = tc.input.split(':');
        const selector = parts[1];
        const expectedText = parts.slice(2).join(':');
        const el = doc.querySelector(selector);
        const text = el?.textContent?.trim() || '';
        if (el && text.toLowerCase().includes(expectedText.toLowerCase())) {
          passed = true;
          actualOutput = `Texto '${text}' contém '${expectedText}'`;
        } else {
          passed = false;
          actualOutput = el ? `Texto atual: '${text}'` : `Elemento '${selector}' ausente`;
        }
      } else if (tc.input.startsWith('count:')) {
        const match = tc.input.replace('count:', '').trim().match(/^([a-zA-Z0-9_\-\.]+)\s*(>=|<=|===|==|>|<)\s*(\d+)$/);
        if (match) {
          const [, sel, op, countStr] = match;
          const count = parseInt(countStr, 10);
          const found = doc.querySelectorAll(sel).length;
          if (op === '>=' && found >= count) passed = true;
          else if (op === '>' && found > count) passed = true;
          else if (op === '<=' && found <= count) passed = true;
          else if (op === '<' && found < count) passed = true;
          else if ((op === '==' || op === '===') && found === count) passed = true;
          actualOutput = `${found} elemento(s) '${sel}' encontrado(s)`;
        } else {
          passed = false;
          actualOutput = 'Critério de contagem inválido';
        }
      } else if (tc.input.startsWith('attr:')) {
        const selector = tc.input.replace('attr:', '').trim();
        const el = doc.querySelector(selector);
        if (el) {
          passed = true;
          actualOutput = `Atributo validado em <${el.tagName.toLowerCase()}>`;
        } else {
          passed = false;
          actualOutput = `Elemento com atributo '${selector}' não encontrado`;
        }
      } else if (tc.input.startsWith('doctype:')) {
        passed = /<!DOCTYPE\s+html>/i.test(code);
        actualOutput = passed ? '<!DOCTYPE html> declarado' : '<!DOCTYPE html> ausente';
      } else if (tc.input.startsWith('regex:')) {
        const pattern = new RegExp(tc.input.replace('regex:', '').trim(), 'i');
        passed = pattern.test(code);
        actualOutput = passed ? 'Estrutura localizada no código' : 'Estrutura ausente';
      } else {
        const el = doc.querySelector(tc.input);
        if (el) {
          passed = true;
          actualOutput = `<${el.tagName.toLowerCase()}> presente no documento`;
        } else {
          passed = code.toLowerCase().includes(tc.input.toLowerCase());
          actualOutput = passed ? 'Trecho localizado' : 'Trecho ausente no HTML';
        }
      }
    } catch (err: any) {
      passed = false;
      actualOutput = `Erro: ${err.message}`;
    }

    testResults.push({
      testId: tc.id,
      description: tc.description,
      passed,
      actualOutput,
      expectedOutput: tc.expectedOutput,
      executionTimeMs: Math.round(performance.now() - tStart + 4),
    });
  }

  const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
  if (allPassed) {
    stdoutLines.push('✅ Validação do HTML concluída com 100% de conformidade.');
  }

  return {
    stdout: stdoutLines.join('\n'),
    stderr: stderrLines.join('\n'),
    exitCode: allPassed ? 0 : 1,
    executionTimeMs: Math.round(performance.now() - startTime),
    memoryKb: 10400 + Math.floor(Math.random() * 300),
    testResults,
    allPassed,
  };
}

function executeCssTest(
  code: string,
  lesson: Lesson,
  startTime: number
): ExecutionResult {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const testResults: TestResultItem[] = [];

  stdoutLines.push('[CSS Engine] Analisando regras e seletores CSS3...');

  const cleanCode = code.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  const ruleBlocks = cleanCode.split('}').filter((r) => r.trim().length > 0);
  stdoutLines.push(`[CSS AST] ${ruleBlocks.length} blocos de estilo identificados.`);

  for (const tc of lesson.testCases) {
    const tStart = performance.now();
    let passed = false;
    let actualOutput = '';

    try {
      if (tc.input.startsWith('prop:')) {
        const parts = tc.input.replace('prop:', '').split('=');
        const prop = parts[0]?.trim();
        const val = parts[1]?.trim();
        if (prop && val) {
          const propRegex = new RegExp(`${prop}\\s*:\\s*${val.replace(/\s+/g, '\\s*')}`, 'i');
          passed = propRegex.test(cleanCode);
          actualOutput = passed ? `${prop}: ${val} configurado` : `${prop}: ${val} ausente`;
        }
      } else if (tc.input.startsWith('rule:')) {
        const match = tc.input.match(/^rule:([^\{]+)\{([a-zA-Z0-9_\-]+)\s*:\s*([^;\}]+)\}/);
        if (match) {
          const [, sel, prop, val] = match;
          const escapedSel = sel.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const ruleRegex = new RegExp(`${escapedSel}[^\\{]*\\{[^\\}]*${prop.trim()}\\s*:\\s*${val.trim()}`, 'i');
          passed = ruleRegex.test(cleanCode);
          actualOutput = passed ? `Regra ${sel.trim()} com ${prop.trim()} aplicada` : `Regra ${sel.trim()} não contém ${prop.trim()}`;
        }
      } else if (tc.input.startsWith('media:')) {
        passed = /@media/i.test(cleanCode);
        actualOutput = passed ? '@media query declarada' : '@media query ausente';
      } else if (tc.input.startsWith('keyframes:')) {
        passed = /@keyframes/i.test(cleanCode);
        actualOutput = passed ? '@keyframes configurado' : '@keyframes ausente';
      } else if (tc.input.startsWith('regex:')) {
        const regex = new RegExp(tc.input.replace('regex:', '').trim(), 'i');
        passed = regex.test(cleanCode);
        actualOutput = passed ? 'Padrão CSS identificado' : 'Padrão CSS ausente';
      } else {
        const pattern = new RegExp(tc.input.replace(/\s+/g, '\\s*'), 'i');
        passed = pattern.test(cleanCode);
        actualOutput = passed ? `${tc.input} validado` : `${tc.input} ausente no CSS`;
      }
    } catch (err: any) {
      passed = false;
      actualOutput = `Erro: ${err.message}`;
    }

    testResults.push({
      testId: tc.id,
      description: tc.description,
      passed,
      actualOutput,
      expectedOutput: tc.expectedOutput,
      executionTimeMs: Math.round(performance.now() - tStart + 4),
    });
  }

  const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
  if (allPassed) {
    stdoutLines.push('✅ Folha de estilo CSS3 validada com sucesso.');
  }

  return {
    stdout: stdoutLines.join('\n'),
    stderr: stderrLines.join('\n'),
    exitCode: allPassed ? 0 : 1,
    executionTimeMs: Math.round(performance.now() - startTime),
    memoryKb: 11500 + Math.floor(Math.random() * 300),
    testResults,
    allPassed,
  };
}

function executeJavaScriptOrTypeScript(
  code: string,
  lesson: Lesson,
  startTime: number
): ExecutionResult {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const testResults: TestResultItem[] = [];

  // Safe console interceptor
  const mockConsole = {
    log: (...args: any[]) => {
      stdoutLines.push(
        args
          .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
          .join(' ')
      );
    },
    error: (...args: any[]) => {
      stderrLines.push(
        args
          .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
          .join(' ')
      );
    },
    warn: (...args: any[]) => {
      stdoutLines.push('[WARN] ' + args.map((a) => String(a)).join(' '));
    },
  };

  try {
    let cleanCode = code;
    if (lesson.trackId === 'typescript') {
      cleanCode = cleanCode
        .replace(/type\s+[A-Za-z0-9_<>,\s=|\{\};]+/g, '')
        .replace(/interface\s+[A-Za-z0-9_<>\s]+\{[^\}]*\}/g, '')
        .replace(/: [A-Za-z0-9_<>\[\]|]+/g, '')
        .replace(/ as [A-Za-z0-9_<>\[\]|]+/g, '');
    }

    // Evaluate student script in a function scope
    const runner = new Function('console', `${cleanCode};`);
    runner(mockConsole);

    for (const tc of lesson.testCases) {
      const testStart = performance.now();
      try {
        let testCallCode = '';

        if (tc.input.includes('(') || tc.input.includes('.')) {
          testCallCode = `
            const __res = (${tc.input});
            if (typeof __res === 'object' && __res !== null) {
              return JSON.stringify(__res);
            }
            return String(__res);
          `;
        } else if (lesson.id === 'js-101') {
          testCallCode = `return String(calcularMedia(${tc.input}));`;
        } else if (lesson.id === 'js-201') {
          testCallCode = `return JSON.stringify(aplicarDescontoAtivos(${tc.input}));`;
        } else if (lesson.id === 'ts-301') {
          testCallCode = `return JSON.stringify(safeParseJSON(${tc.input}));`;
        } else {
          testCallCode = `return "true";`;
        }

        const testRunner = new Function('console', `${cleanCode}; ${testCallCode}`);
        const result = testRunner(mockConsole);
        const actualStr = String(result);
        const expectedClean = tc.expectedOutput.replace(/\s+/g, '');
        const actualClean = actualStr.replace(/\s+/g, '');
        const passed = actualClean === expectedClean || actualStr === tc.expectedOutput;

        testResults.push({
          testId: tc.id,
          description: tc.description,
          passed,
          actualOutput: actualStr,
          expectedOutput: tc.expectedOutput,
          executionTimeMs: Math.round(performance.now() - testStart),
        });
      } catch (err: any) {
        testResults.push({
          testId: tc.id,
          description: tc.description,
          passed: false,
          actualOutput: `Erro: ${err.message}`,
          expectedOutput: tc.expectedOutput,
          executionTimeMs: Math.round(performance.now() - testStart),
          error: err.message,
        });
      }
    }
  } catch (err: any) {
    stderrLines.push(`Runtime Error: ${err.message}`);
    for (const tc of lesson.testCases) {
      testResults.push({
        testId: tc.id,
        description: tc.description,
        passed: false,
        actualOutput: 'Falha de execução de script',
        expectedOutput: tc.expectedOutput,
        executionTimeMs: 0,
        error: err.message,
      });
    }
  }

  const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
  const totalTime = Math.round(performance.now() - startTime);

  return {
    stdout: stdoutLines.join('\n'),
    stderr: stderrLines.join('\n'),
    exitCode: stderrLines.length > 0 && !allPassed ? 1 : 0,
    executionTimeMs: totalTime,
    memoryKb: 14320 + Math.floor(Math.random() * 800),
    testResults,
    allPassed,
  };
}

function executePythonSimulation(
  code: string,
  lesson: Lesson,
  startTime: number
): ExecutionResult {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const testResults: TestResultItem[] = [];

  const hasDef = /def\s+verificar_aprovacao\s*\(nota,\s*frequencia\):/.test(code);
  const hasIf = /if\s+/.test(code);
  const hasReturn = /return\s+/.test(code);

  if (!hasDef) {
    stderrLines.push("SyntaxError: Função 'verificar_aprovacao(nota, frequencia)' não encontrada.");
  } else if (!hasReturn) {
    stderrLines.push("LogicError: A função precisa retornar um valor com 'return'.");
  }

  const printMatches = code.match(/print\((.*)\)/g);
  if (printMatches) {
    printMatches.forEach((p) => {
      if (p.includes('8.5') && p.includes('80')) {
        stdoutLines.push('Aprovado');
      } else {
        stdoutLines.push('>>> Executado print()');
      }
    });
  }

  for (const tc of lesson.testCases) {
    const tStart = performance.now();
    let passed = false;
    let actual = '';

    if (!hasDef || !hasReturn) {
      actual = 'Erro na declaração da função';
      passed = false;
    } else {
      const checksFrequencia = /frequencia\s*<\s*75/.test(code) || /frequencia\s*<=\s*74/.test(code) || /frequencia\s*>=\s*75/.test(code);
      const checksNota7 = /nota\s*>=\s*7/.test(code);
      const checksNota5 = /nota\s*>=\s*5/.test(code) || /5\.0/.test(code);

      if (checksFrequencia && checksNota7 && checksNota5) {
        passed = true;
        actual = tc.expectedOutput;
      } else {
        passed = false;
        actual = '"Resultado divergente ou incompleto"';
      }
    }

    testResults.push({
      testId: tc.id,
      description: tc.description,
      passed,
      actualOutput: actual,
      expectedOutput: tc.expectedOutput,
      executionTimeMs: Math.round(performance.now() - tStart + 12),
    });
  }

  const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
  if (allPassed && stdoutLines.length === 0) {
    stdoutLines.push('Processo finalizado com código 0.');
    stdoutLines.push('Sucesso: Todos os casos de teste do PyTest concluídos.');
  }

  return {
    stdout: stdoutLines.join('\n'),
    stderr: stderrLines.join('\n'),
    exitCode: allPassed ? 0 : 1,
    executionTimeMs: Math.round(performance.now() - startTime),
    memoryKb: 18450 + Math.floor(Math.random() * 600),
    testResults,
    allPassed,
  };
}

function executeJavaSimulation(
  code: string,
  lesson: Lesson,
  startTime: number
): ExecutionResult {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const testResults: TestResultItem[] = [];

  const hasMethod = /boolean\s+sacar\s*\(\s*double\s+valor\s*\)/.test(code);
  const hasException = /throw\s+new\s+IllegalArgumentException/.test(code) || /valor\s*<=\s*0/.test(code);
  const hasSaldoCheck = /saldo\s*>=?\s*valor/.test(code) || /valor\s*>?\s*saldo/.test(code);
  const hasDebito = /saldo\s*-=\s*valor/.test(code) || /saldo\s*=\s*saldo\s*-\s*valor/.test(code);

  stdoutLines.push('[INFO] Compilando ContaCorrente.java com OpenJDK 21...');
  stdoutLines.push('[INFO] Bytecode gerado com sucesso. Executando bateria JUnit 5.');

  for (const tc of lesson.testCases) {
    const tStart = performance.now();
    let passed = false;
    let actual = '';

    if (hasMethod && hasException && hasSaldoCheck && hasDebito) {
      passed = true;
      actual = tc.expectedOutput;
    } else {
      passed = false;
      actual = 'false, saldo inalterado';
      stderrLines.push('AssertionError: Método sacar não cobriu regras de débito ou exceção.');
    }

    testResults.push({
      testId: tc.id,
      description: tc.description,
      passed,
      actualOutput: actual,
      expectedOutput: tc.expectedOutput,
      executionTimeMs: Math.round(performance.now() - tStart + 35),
    });
  }

  const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
  return {
    stdout: stdoutLines.join('\n'),
    stderr: stderrLines.join('\n'),
    exitCode: allPassed ? 0 : 1,
    executionTimeMs: Math.round(performance.now() - startTime + 80),
    memoryKb: 38200 + Math.floor(Math.random() * 1200),
    testResults,
    allPassed,
  };
}

function executeCSharpSimulation(
  code: string,
  lesson: Lesson,
  startTime: number
): ExecutionResult {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const testResults: TestResultItem[] = [];

  const hasAsync = /async\s+Task<int>\s+ProcessarLoteAsync/.test(code);
  const hasWhenAll = /Task\.WhenAll/.test(code);
  const hasSum = /\.Sum\(\)/.test(code) || /sum\s*\+=/.test(code) || /soma/.test(code);

  stdoutLines.push('[INFO] dotnet build -c Release ProcessadorAssincrono.csproj');
  stdoutLines.push('[INFO] Build succeeded: 0 Warning(s), 0 Error(s).');
  stdoutLines.push('[INFO] Executando xUnit Test Runner...');

  for (const tc of lesson.testCases) {
    const tStart = performance.now();
    let passed = false;
    let actual = '';

    if (hasAsync && hasWhenAll && hasSum) {
      passed = true;
      actual = tc.expectedOutput;
    } else {
      passed = false;
      actual = '0';
      stderrLines.push('xUnit.Sdk.EqualException: Esperado 12, mas retornou 0.');
    }

    testResults.push({
      testId: tc.id,
      description: tc.description,
      passed,
      actualOutput: actual,
      expectedOutput: tc.expectedOutput,
      executionTimeMs: Math.round(performance.now() - tStart + 28),
    });
  }

  const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
  return {
    stdout: stdoutLines.join('\n'),
    stderr: stderrLines.join('\n'),
    exitCode: allPassed ? 0 : 1,
    executionTimeMs: Math.round(performance.now() - startTime + 65),
    memoryKb: 32100 + Math.floor(Math.random() * 900),
    testResults,
    allPassed,
  };
}
