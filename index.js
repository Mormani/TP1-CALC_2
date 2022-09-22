(async function() {
    const prompt = require("prompt");
    const { bold_colorize, parse_erro_math } = require("./tratar_erros.js");
    const { mathjs, sum_integral, calcular_num } = require("./riemann.js");

    const dados = [
        { name: "str_eq",
            description: "Equação                          ",
            type: "string",
            allowEmpty: false,
            required: true,
            conform: function (_eq, o, schema) {
                try {
                    mathjs.compile(_eq);
                    return true;
                } catch (error) {
                    parse_erro_math(error, _eq);
                    return false;
                }
            }
        },
        { name: "a",
            description: "Limite Inferior de Integração (a)",
            type: "string",
            allowEmpty: false,
            required: true,
            message: `Limite Inferior ${bold_colorize("inválido")}\n`,
            conform: function (_a, o, schema) {
                // BUG: Editei o código-fonte do revalidate.js para receber o `schema`
                // como parâmetro e assim editar a mensagem de erro.
                let msg = "";
                const valor_a = calcular_num(_a);

                if (!mathjs.isNumber(valor_a)) {
                    msg = `Limite Inferior ${bold_colorize("deve ser um valor númerico")}\n`;
                }  else {
                    return true;
                }

                schema.message = msg;
                return false;
            },
            before: function (valor) { return calcular_num(valor, false); }
        },
        { name: "b",
            description: "Limite Superior de Integração (b)",
            type: "string",
            allowEmpty: false,
            required: true,
            message: `Limite Superior ${bold_colorize("inválido")}\n`,
            conform: function (_b, o, schema) {
                // BUG: Editei o código-fonte do revalidate.js para receber o `schema`
                // como parâmetro e assim editar a mensagem de erro.
                let msg = "";
                const valor_b = calcular_num(_b);

                if (!mathjs.isNumber(valor_b)) {
                    msg = `Limite Superior ${bold_colorize("deve ser um valor númerico")}\n`;
                } else {
                    return true;
                }

                schema.message = msg;
                return false;
            },
            before: function (valor) { return calcular_num(valor, false); }
        },
        { name: "n",
            description: "Quantidade de sub-intervalos  (n)",
            type: "number",
            minimum: 1,
            required: true,
            message: `Somente ${bold_colorize("números naturais não nulos")} são permitidos\n`,
        },
    ];

    prompt.start();
    const { str_eq, a, b, n } = await prompt.get(dados);

    const equacao = mathjs.compile(str_eq).evaluate;
    const opcoes = { a, b, n };

    const resultado = sum_integral(equacao, opcoes);
    console.log(`\n       ${b}\nÁrea = ∫ ( ${str_eq} ) = ${bold_colorize(resultado, "green")}\n       ${a}`);
})();