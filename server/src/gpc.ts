export interface ProblemTemplate {
  modeName: string;
  operandMin: number;
  operandMax: number;
}

export class GPC {
  static generateQuestion(mode: string, templateJson?: string): { text: string; answer: string } {
    let min = 1;
    let max = 10;

    if (templateJson) {
      try {
        const parsed = JSON.parse(templateJson) as ProblemTemplate;
        min = parsed.operandMin ?? min;
        max = parsed.operandMax ?? max;
      } catch {}
    }

    const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

    if (mode === "MATRIX_DETERMINANT") {
      const a = rand(min, max);
      const b = rand(min, max);
      const c = rand(min, max);
      const d = rand(min, max);
      const det = a * d - b * c;
      return {
        text: `det([${a}, ${b}; ${c}, ${d}])`,
        answer: det.toString()
      };
    } else if (mode === "MODULAR_CONGRUENCE") {
      const dividend = rand(10, 100);
      const divisor = rand(3, 9);
      const remainder = dividend % divisor;
      return {
        text: `${dividend} mod ${divisor}`,
        answer: remainder.toString()
      };
    } else {
      // Sequence extrapolation fallback
      const base = rand(min, max);
      const diff = rand(2, 5);
      const s1 = base;
      const s2 = base + diff;
      const s3 = base + 2 * diff;
      const solution = base + 3 * diff;
      return {
        text: `${s1}, ${s2}, ${s3}, ?`,
        answer: solution.toString()
      };
    }
  }

  // Dynamic server-side evaluator running under 1.2ms
  static evaluateDynamicTemplate(templateJson: string): { text: string; answer: string } {
    const startTime = performance.now();
    const template = JSON.parse(templateJson) as ProblemTemplate;
    const result = this.generateQuestion(template.modeName, templateJson);
    const duration = performance.now() - startTime;
    if (duration > 1.2) {
      console.warn(`[GPC] Warning: Template evaluation took ${duration.toFixed(3)}ms`);
    }
    return result;
  }
}
