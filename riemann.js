const { mathCompileError } = require("./tratar_erros.js");

const { create, all } = require("mathjs");
const mathjs = create(all, {});

function riemann_sum(equacao, { a, b, n }) {
    /** Flag para calcular a integral mesmo que `b` seja menor que `a`.
     *
     *  Invertendo tanto o cálculo de `delta_x` quanto o termo que
     *  calculará `Xi`.
     */
    const inverter = a > b;
    const delta_x = (inverter ? a - b : b - a) / n;

    if (delta_x === 0) return 0;

    const termo_esq = inverter ? b : a;
    let resultado = 0;

    for (let i = 1; i <= n; i++) {
        const Xi = termo_esq + (i * delta_x);

        // Se NÃO calcular o módulo, soma-se as áreas positivas e negativas do gráfico, que
        // não representa o valor total da área sob a curva.
        resultado += mathjs.abs( equacao({ x: Xi }) ) * delta_x;

        // console.table({ delta_x, Xi, resultado });
    }

    return resultado;
}

function calc_num(str, print_erro = true) {
    try {
        const num = mathjs.compile(str).evaluate();
        return num;

    } catch (error) {
        if (print_erro) mathCompileError(error, str);
    }
}

exports.mathjs = mathjs;
exports.riemann_sum = riemann_sum;
exports.calc_num = calc_num;
