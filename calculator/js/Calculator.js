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
      return result;
    } catch (error) {
      return '';
    }
  }
}
