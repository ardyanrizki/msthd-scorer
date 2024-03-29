class Scorer {
  constructor(globalConfig, reporterOptions, reporterContext) {
    this._globalConfig = globalConfig;
    this._options = reporterOptions;
    this._context = reporterContext;
  }

  onRunComplete(testContexts, results) {
    let totalScore = 0;
    for (let suiteResult of results.suiteResults) {
      for (let testCaseResult of suiteResult.testCaseResults) {
        totalScore += parseScenarioScore(testCaseResult);
      }
    }
    console.log('Score Output');
    console.log(`${colorizePoints(totalScore)}Percentage: ${totalScore}%`, '\u001b[0m');
  }
}

const parseScenarioScore = test => {
  if (test.status === 'passed') {
    let score;
    const matches = test.title.matchAll(/\((\d+\.?\d?)\)/g);
    for (let match of matches) {
      score = Number(match[1]);
    }
    return score || 0;
  } else if (test.status === 'failed') {
    let score;
    const matches = test.title.matchAll(/\((\-?\d+)\)/g);
    for (let match of matches) {
      score = Math.sign(Number(match[1])) === -1 ? Number(match[1]) : 0;
    }
    return score;
  } else {
    return 0;
  }
}

const colorizePoints = score => {
  if (score < 50) return '\u001b[31m';
  if (score < 70) return '\u001b[33m';
  return '\u001b[32m';
}

module.exports = Scorer;
