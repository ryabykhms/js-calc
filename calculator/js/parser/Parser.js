class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
    this.length = tokens.length;
    this.EOF = new Token(TokenType.EOF, '');
  }

  parse() {
    const result = [];
    while (!this.match(TokenType.EOF)) {
      result.push(this.expression());
    }
    return result;
  }

  func() {
    const name = this.consume(TokenType.WORD).text;
    this.consume(TokenType.LPAREN);
    const functionalExpression = new FunctionalExpression(name);
    while (!this.match(TokenType.RPAREN)) {
      functionalExpression.addArgument(this.expression());
      this.match(TokenType.COMMA);
    }
    return functionalExpression;
  }

  expression() {
    return this.additive();
  }



  additive() {
    let result = this.multiplicative();
    let rightExpression = null;
    while (true) {
      if (this.match(TokenType.PLUS)) {
        rightExpression = this.multiplicative();
        if (this.match(TokenType.PERCENT)) {
          result = new BinaryExpression('+%', result, rightExpression);
        } else {
          result = new BinaryExpression('+', result, rightExpression);
        }
        continue;
      }
      if (this.match(TokenType.MINUS)) {
        rightExpression = this.multiplicative();
        if (this.match(TokenType.PERCENT)) {
          result = new BinaryExpression('-%', result, rightExpression);
        } else {
          result = new BinaryExpression('-', result, rightExpression);
        }
        continue;
      }
      break;
    }
    return result;
  }

  multiplicative() {
    let result = this.power();
    let rightExpression = null;
    while (true) {
      if (this.match(TokenType.STAR)) {
        rightExpression = this.power();
        if (this.match(TokenType.PERCENT)) {
          result = new BinaryExpression('*%', result, rightExpression);
        } else {
          result = new BinaryExpression('*', result, rightExpression);
        }
        continue;
      }
      if (this.match(TokenType.SLASH)) {
        rightExpression = this.power();
        if (this.match(TokenType.PERCENT)) {
          result = new BinaryExpression('/%', result, rightExpression);
        } else {
          result = new BinaryExpression('/', result, rightExpression);
        }
        continue;
      }
      break;
    }
    return result;
  }

  power() {
    let result = this.fact();
    while (true) {
      if (this.match(TokenType.POW)) {
        result = new BinaryExpression('^', result, this.fact());
        continue;
      }
      break;
    }
    return result;
  }

  fact() {
    const result = this.unary();
    if (this.match(TokenType.FACT)) {
      let functionalExpression = null;
      if (result.value.toString().indexOf('.') !== -1) {
        functionalExpression = new FunctionalExpression('factFloat');
      } else {
        functionalExpression = new FunctionalExpression('fact');
      }
      functionalExpression.addArgument(result);
      return functionalExpression;
    }
    return result;
  }

  unary() {
    if (this.match(TokenType.MINUS)) {
      return new UnaryExpression('-', this.primary());
    }
    if (this.match(TokenType.PLUS)) {
      return this.primary();
    }
    return this.primary();
  }

  primary() {
    const current = this.get(0).text;
    if (this.match(TokenType.NUMBER)) {
      return new NumberExpression(parseFloat(current));
    }
    if (this.match(TokenType.HEX_NUMBER)) {
      return new NumberExpression(parseInt(current, 16));
    }

    if (this.get(0).type === TokenType.WORD && this.get(1).type === TokenType.LPAREN) {
      return this.func();
    }
    if (this.match(TokenType.WORD)) {
      return new ConstantExpression(current);
    }
    if (this.match(TokenType.LPAREN)) {
      const result = this.expression();
      this.match(TokenType.RPAREN);
      return result;
    }
    throw new Error('Unknown expression');
  }

  consume(type) {
    const current = this.get(0);
    if (type !== current.type) throw new Error("Token " + current + " doesn't match " + type);
    this.pos++;
    return current;
  }

  match(type) {
    const current = this.get(0);
    if (type !== current.type) return false;
    this.pos++;
    return true;
  }

  get(relativePosition) {
    const position = this.pos + relativePosition;
    if (position >= this.length) return this.EOF;
    return this.tokens[position];
  }
}
