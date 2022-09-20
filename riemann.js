const { create, all } = require("mathjs");
exports.mathjs = create(all, {});

// const mathjs = math.create(math.all, {});

exports.riemann_sum_integral = function(equacao, { a, b, n }) {
    const delta_x = (b - a) / n;
    let resultado = 0;

    for (let Xi = a; Xi <= b; Xi += delta_x) {
        resultado += equacao.evaluate({ x: Xi }) * delta_x;
    }

    return resultado;
}
