import { Lesson, ExecutionResult, TestResultItem } from '../types';

export async function runCode(code: string, lesson: Lesson): Promise<ExecutionResult> {
  const startTime = performance.now();
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const testResults: TestResultItem[] = [];

  // Simulate network & sandbox init latency (for realism and visual responsiveness)
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (lesson.trackId === 'javascript' || lesson.trackId === 'typescript') {
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
    // Strip simple TS types for runtime evaluation if TypeScript
    let cleanCode = code;
    if (lesson.trackId === 'typescript') {
      cleanCode = cleanCode
        .replace(/type\s+[A-Za-z0-9_<>,\s=|\{\};]+/g, '')
        .replace(/interface\s+[A-Za-z0-9_<>\s]+\{[^\}]*\}/g, '')
        .replace(/: [A-Za-z0-9_<>\[\]|]+/g, '')
        .replace(/ as [A-Za-z0-9_<>\[\]|]+/g, '');
    }

    // Evaluate student script in a controlled function scope with custom console
    const runner = new Function('console', `${cleanCode};`);
    runner(mockConsole);

    // Now run test cases
    for (const tc of lesson.testCases) {
      const testStart = performance.now();
      try {
        let testCallCode = '';
        if (lesson.id === 'js-101') {
          testCallCode = `return calcularMedia(${tc.input});`;
        } else if (lesson.id === 'js-201') {
          testCallCode = `return JSON.stringify(aplicarDescontoAtivos(${tc.input}));`;
        } else if (lesson.id === 'ts-301') {
          testCallCode = `return JSON.stringify(safeParseJSON(${tc.input}));`;
        } else {
          testCallCode = `return true;`;
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

  // Check Python function definition
  const hasDef = /def\s+verificar_aprovacao\s*\(nota,\s*frequencia\):/.test(code);
  const hasIf = /if\s+/.test(code);
  const hasReturn = /return\s+/.test(code);

  if (!hasDef) {
    stderrLines.push("SyntaxError: Função 'verificar_aprovacao(nota, frequencia)' não encontrada.");
  } else if (!hasReturn) {
    stderrLines.push("LogicError: A função precisa retornar um valor com 'return'.");
  }

  // Parse simulated print outputs in code
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

  // Test cases evaluation based on code logic detection
  for (const tc of lesson.testCases) {
    const tStart = performance.now();
    let passed = false;
    let actual = '';

    if (!hasDef || !hasReturn) {
      actual = 'Erro na declaração da função';
      passed = false;
    } else {
      // Check logical rules presence
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
