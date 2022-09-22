const colors = require("@colors/colors");

colors.setTheme({
    c_ok: ["brightGreen", "bold"],
    c_err: ["red", "bold"],
    c_warn: ["brightYellow", "bold"],
    m_cy: ["brightCyan", "bold"],
    m_link: ["cyan", "underline", "italic"],
});

function mathCompileError(e, str) {
    process.stdout.write(e.message);

    // Caso haja indicação do caractere que causou o erro, formata uma saída para destacá-lo.
    if (e.char ?? false) {
        const pos = e.char;

        const info = `Erro no caractere ${pos}`.c_warn;
        str = str.substring(0, pos - 1) + str.substring(pos - 1).c_warn;

        console.log(` | ${info}: ${str}`);
    } else {
        console.log();
    }
}

function initialMsg() {
    if (process.argv.includes("--suppress-init-msg")) return;

    const li = "*".blue;
    const msg = ` _____________________________________
∫
∫ ${"! *** INFORMAÇÕES IMPORTANTES *** !".c_err}
∫
∫ ${li} O programa calcula uma função ${"apenas com a variável x".c_warn},
∫   funções ${"com mais de uma variável".c_err} ou ${"sem a variável x".c_err}
∫   não irão funcionar e será gerado um erro ao rodar.
∫
∫ ${li} Casa decimal deve ser representada com ${". (ponto)".c_ok} ao invés de ${", (vírgula)".c_err}.
∫
∫ ${li} Devido as limitações de representação de números decimais em computadores,
∫   alguns resultados poderão estar errados ou inconsistentes.
∫
∫ ${li} ${"Potências              :".gray} x^10, x^-1, x^(2x + 1)
∫
∫ ${li} ${"Raízes                 :".gray} x^(${"c".m_cy}/${"a".c_ok}), x^(1/2), x^(1/3), x^(3/2)
∫
∫   Onde ${"a".c_ok} é o índice da raiz e ${"c".m_cy} o expoente do radicando.
∫   A quadrada e cúbica podem ser escritas, respectivamente, como sqrt(x) e cbrt(x).
∫
∫ ${li} ${"Funções Logarítmicas   :".gray} log(x, ${"a".m_cy}), log(x, 10), log(x, 2), log(x)
∫
∫   Quando omite-se a base (${"a".m_cy}), é calculado o ${"logaritmo natural".c_warn} de x.
∫   Ex.: ${"✓ log(e) = 1".c_ok}       ${"× ln(e) = 1".c_err}
∫        ${"✓ log(2) = 0.693".c_ok}   ${"× ln(2) = 0.693".c_err}
∫
∫ ${li} ${"Funções Trigonométricas:".gray} sin(x), cos(x), tan(x), sec(x), csc(x), cot(x)
∫                            asin(x), acos(x), ...
∫
∫   Ex.: ${"✓ sin(PI/6) = 1/2".c_ok}   ${"× sen(PI/6) = 1/2".c_err}
∫        ${"✓ tan(-pi/2) = -1".c_ok}   ${"× tg(-pi/2) = -1".c_err}
∫
∫   Divirta-se testando :)
∫   Andrei - Hugo - Lucas
∫
∫   ${"Para não aparecer essa mensagem rode o comando: npm run sm".bold.gray}
∫
`;

    console.log(msg);
}

exports.mathCompileError = mathCompileError;
exports.initialMsg = initialMsg;
