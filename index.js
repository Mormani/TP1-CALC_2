const prompt = require("prompt");
const { mathCompileError, initialMsg } = require("./tratar_erros.js");
const { mathjs, riemann_sum, calc_num } = require("./riemann.js");

(async function() {

    const dados = [
        { name: "str_eq",
            description: "Equação                          ",
            type: "string",
            allowEmpty: false,
            required: true,
            message: `Equação ${"inválida".c_err}\n`,
            conform: function (_eq, o, schema) {
                try {
                    mathjs.compile(_eq).evaluate({x: 0});
                    return true;
                } catch (error) {
                    mathCompileError(error, _eq);
                    return false;
                }
            }
        },
        { name: "a",
            description: "Limite Inferior de Integração (a)",
            type: "string",
            allowEmpty: false,
            required: true,
            message: `Limite Inferior ${"inválido".c_err}\n`,
            conform: function (_a, o, schema) {
                // BUG: Editei o código-fonte do revalidate.js para receber o `schema`
                // como parâmetro e assim editar a mensagem de erro.
                let msg = "";
                const valor_a = calc_num(_a);

                if (!mathjs.isNumber(valor_a)) {
                    msg = `Limite Inferior ${"deve ser um valor númerico".c_err}\n`;
                }  else {
                    return true;
                }

                schema.message = msg;
                return false;
            },
            before: function (valor) { return calc_num(valor, false); }
        },
        { name: "b",
            description: "Limite Superior de Integração (b)",
            type: "string",
            allowEmpty: false,
            required: true,
            message: `Limite Superior ${"inválido".c_err}\n`,
            conform: function (_b, o, schema) {
                // BUG: Editei o código-fonte do revalidate.js para receber o `schema`
                // como parâmetro e assim editar a mensagem de erro.
                let msg = "";
                const valor_b = calc_num(_b);

                if (!mathjs.isNumber(valor_b)) {
                    msg = `Limite Superior ${"deve ser um valor númerico".c_err}\n`;
                } else {
                    return true;
                }

                schema.message = msg;
                return false;
            },
            before: function (valor) { return calc_num(valor, false); }
        },
        { name: "n",
            description: "Quantidade de sub-intervalos  (n)",
            type: "number",
            minimum: 1,
            required: true,
            message: `Somente ${"números naturais não nulos".c_err} são permitidos\n`,
        },
    ];

    prompt.start();
    const { str_eq, a, b, n } = await prompt.get(dados);

    const equacao = mathjs.compile(str_eq).evaluate;
    const opcoes = { a, b, n };

    const resultado = String(riemann_sum(equacao, opcoes));
    console.log(`\n       ${b}\nÁrea = ∫ ( ${str_eq} ) = ${resultado.c_ok}\n       ${a}`);
})();