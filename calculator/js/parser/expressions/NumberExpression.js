class NumberExpression extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }

  evaluate() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}
