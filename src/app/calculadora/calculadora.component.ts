import { Component, OnInit } from '@angular/core';
import { QueryMatch } from '@angular/compiler';

export interface Equacao {
  n1: number,
  op: string,
  n2: number
}

export interface Op {
  n: string,
}

export interface EquacaoMontada {
  st: string,
}

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})

export class CalculadoraComponent implements OnInit {

  globalEq: EquacaoMontada[];
  equacao: Equacao;
  op: Op[];
  em: EquacaoMontada[];

  constructor() { }

  ngOnInit(): void {
  }

  calculate(equacao: string): number {

    this.globalEq = this.mountEquation(equacao);

    this.globalEq.find(x => x.st == '/');

    if (this.globalEq.find(x => x.st == '/') && this.globalEq.find(x => x.st == '*')) {

      for (let i = 0; i < this.globalEq.length; i++) {

        const e = this.globalEq[i];

        const res = this.divideOrMultiplyLeftToRight(e.st);

        if (res !== undefined) {

          this.resolveArray(i, res);

          i--;

        }

      }
    }
    else {

      if (this.globalEq.find(x => x.st == '/')) {

        this.divideFirst();

      }

      if (this.globalEq.find(x => x.st == '*')) {

        this.multiplyFirst();

      }

    }

    const result = this.calcSumAndSubr();

    return result;

  }

  generateEquation(index: number): Equacao {

    this.equacao = {
      n1: parseInt(this.globalEq[index - 1].st),
      op: this.globalEq[index].st,
      n2: parseInt(this.globalEq[index + 1].st),
    }

    return this.equacao;

  }

  divideOrMultiplyLeftToRight(opType: string): number {

    switch (opType) {

      case '/':

        this.equacao = {
          n1: parseInt(this.globalEq[this.globalEq.indexOf(this.globalEq.find(x => x.st =='/')) - 1].st),
          op: this.globalEq[this.globalEq.indexOf(this.globalEq.find(x => x.st =='/'))].st,
          n2: parseInt(this.globalEq[this.globalEq.indexOf(this.globalEq.find(x => x.st =='/')) + 1].st),
        }

        return parseFloat(this.mathOperation(this.equacao).toString());

      case '*':

        this.equacao = {
          n1: parseInt(this.globalEq[this.globalEq.indexOf(this.globalEq.find(x => x.st =='*')) - 1].st),
          op: this.globalEq[this.globalEq.indexOf(this.globalEq.find(x => x.st =='*'))].st,
          n2: parseInt(this.globalEq[this.globalEq.indexOf(this.globalEq.find(x => x.st =='*')) + 1].st),
        }

        return parseFloat(this.mathOperation(this.equacao).toString());

      default:
        break;
    }

  }

  mathOperation(eq: Equacao): number {

    switch (eq.op) {
      case '/':
        return eq.n1 / eq.n2
      case '+':
        return eq.n1 + eq.n2
      case '*':
        return eq.n1 * eq.n2
      case '-':
        return eq.n1 - eq.n2
      default:
        break;
    }

  }

  divideFirst() {

    for (let i = 0; i < this.globalEq.length;) {

      const e = this.globalEq[i].st;

      if (e == '/') {

        var eq = this.generateEquation(i);
        var res = this.mathOperation(eq)
        this.resolveArray(i, res);

        i--;

      }
      else {

        i++;

      }
    }

  }

  multiplyFirst() {

    for (let i = 0; i < this.globalEq.length;) {

      const e = this.globalEq[i].st;

      if (e == '*') {

        var eq = this.generateEquation(i);
        var res = this.mathOperation(eq)
        this.resolveArray(i, res);

        i--;

      }
      else {

        i++;

      }
    }

  }

  itIsAnOperator(value: string): boolean {

    var operadores = ['+', '-', '*', '/'];

    var includes = operadores.includes(value);

    return includes;

  }

  calcSumAndSubr(): number {

    for (let i = 0; i < this.globalEq.length;) {

      const e = this.globalEq[i].st;

      if (e == '+') {

        var eq = this.generateEquation(i);
        var res = this.mathOperation(eq)
        this.resolveArray(i, res);

        i--;
      }
      else if (e == '-') {

        var eq = this.generateEquation(i);
        var res = this.mathOperation(eq)
        this.resolveArray(i, res);

        i--;
      }
      else {
        i++;
      }

    }

    return parseFloat(this.globalEq[0].st);

  }

  mountEquation(eq: string): EquacaoMontada[] {

    var conc = "";

    this.op = [];
    this.em = [];

    for (let i = 0; i < eq.length; i++) {

      const e = eq[i];

      if(eq.length == i + 1) {

        conc += e;

        this.op.push({
          n: conc
        });

        conc = "";
      }

      if(this.itIsAnOperator(e)) {

        this.op.push({
          n: conc,
        });

        this.op.push({
          n: e,
        });

        conc = "";

      }
      else {
        conc += e;
      }

    }

    this.op.forEach((e) => {

      this.em.push({
        st: e.n
      })

    });

    return this.em;

  }

  resolveArray(i: number, result: number) {

    this.globalEq[i].st = result.toString();
    this.globalEq.splice(i - 1, 1);
    this.globalEq.splice(i, 1);

  }

}
