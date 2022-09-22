const { mathCompileError } = require("./handle-erro.js");

const { create, all } = require("mathjs");
const mathjs = create(all, {});

/** Calcular a área sobre um gráfico através da Soma de Riemann.
 *
 * @param {Function} equacao  Função que retorna um valor *y* para um determinado *x*.
 * @param {Object}   opcoes   Informações adicionais para realizar a soma.
 * @param {Number}   opcoes.a Limite Inferior da soma.
 * @param {Number}   opcoes.b Limite Superior da soma.
 * @param {Number}   opcoes.n Quantidade de retângulos que estarão entre os limites.
 *                            Quanto maior o número, mais preciso será o `resultado`,
 *                            porém, mais tempo levará para realizar a soma.
 * 
 * @returns Valor da área sobre o gráfico da `equacao`.
 */
function riemann_sum(equacao, { a, b, n }) {
    /** Flag para calcular a integral mesmo que `a` seja maior que `b`.
     *
     *  Caso isso aconteça, inverte a ordem dos operandos da subtração no `delta_x`
     *  para que sempre seja (maior número - menor número), e que `X1` seja sempre o menor termo.
     */
    const inverter = a > b;
    const delta_x = (inverter ? a - b : b - a) / n;

    if (delta_x === 0) return 0;

    const termo_esq = inverter ? b : a;
    let resultado = 0;

    for (let i = 1; i <= n; i++) {
        const Xi = termo_esq + (i * delta_x);

        /** Sem o cálculo do módulo, o resultado final representaria
         *  apenas a soma das áreas do retângulos **acima** do eixo `x` e
         *  o **oposto** da soma das áreas do retângulos **abaixo** do mesmo eixo.
         *
         *  O que se busca calcular é a área total dentro do intervalo, por isso é
         *  necessário o valor positivo das áreas **abaixo** do eixo `x`.
         */
        resultado += mathjs.abs( equacao({ x: Xi }) ) * delta_x;

        // console.table({ delta_x, Xi, resultado });
    }

    return resultado;
}

function calc_num(str, print_erro = true) {
    try {
        // Calcula o valor númerico de uma expressão, ex.: "PI/2" ou "log(2, 10)".
        const num = mathjs.compile(str).evaluate();
        return num;

    } catch (error) {
        if (print_erro) mathCompileError(error, str);
    }
}

exports.mathjs = mathjs;
exports.riemann_sum = riemann_sum;
exports.calc_num = calc_num;
