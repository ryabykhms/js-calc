class Calculator {
  calculate(mathString) {
    try {
      const lexer = new Lexer(mathString);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      const expressions = parser.parse();
      let result = "";
      expressions.forEach((expression) => {
        result = expression.evaluate();
      });
      if (Number.isNaN(result)) {
        result = "";
      } else {
        result = parseFloat(result.toFixed(10)).toString();
      }
      result = result.toString().replace(/([0-9.]+)e\+/, "$1*10^");
      return result;
    } catch (error) {
      return "";
    }
  }
}
