(async function () {
    const { mathjs, riemann_sum_integral } = require("./riemann.js");
    const prompt = require("prompt");

    const dados = [
        { name: "eq",
            description: "Equação                          ",
            type: "string",
            required: true,
        },
        { name: "a",
            description: "Limite Inferior de Integração (a)",
            type: "string",
            required: true,
        },
        { name: "b",
            description: "Limite Superior de Integração (b)",
            type: "string",
            required: true,
        },
        { name: "n",
            description: "Quantidade de sub-intervalos  (n)",
            // type: "number",
            pattern: /^(?!0+$)\d+$/,
            warning: "Somente números naturais são permitidos",
            required: true,
        },
    ];

    prompt.start();
    // const { eq, a, b, n } = await prompt.get(dados);
    const teste = await prompt.get(dados);

    console.log(teste);



    // const eq = mathjs.compile("e^x");
    // const opcoes = {
    //     a: 3,
    //     b: 4,
    //     n: 1,
    // };

    // const resultado = riemann_sum_integral(eq, opcoes);
    // console.log(resultado);
})();