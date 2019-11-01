import { soma, subtracao, multiplicacao, divisao } from './OperacoesBasicas.js'

test('adds 1 + 2 to equal 3', () => {
    expect(soma(1, 2)).toBe(3);
});

test('subtract 3 - 1 to equal 2', () => {
    expect(subtracao(3, 1)).toBe(2);
});

test('adds 2 * 2 to equal 4', () => {
    expect(multiplicacao(2, 2)).toBe(4);
});

test('adds 6 / 2 to equal 3', () => {
    expect(divisao(6, 2)).toBe(3);
});
