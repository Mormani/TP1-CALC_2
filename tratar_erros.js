const colors = require("@colors/colors");

colors.setTheme({
    c_ok: ["brightGreen", "bold"],
    c_err: ["brightRed", "bold"],
    c_warn: ["brightYellow", "bold"],
    m_cy: ["brightCyan", "bold"],
    m_link: ["cyan", "underline", "italic"],
});

function mathCompileError(e, str) {
    process.stdout.write(e.message);

    if (e.char ?? false) {
        const pos = e.char;

        const info = `Erro no caractere ${pos}`.c_warn;
        str = str.substring(0, pos - 1) + str.substring(pos - 1).c_warn;

        console.log(` | ${info}: ${str}`);
    } else {
        console.log();
    }
}

exports.mathCompileError = mathCompileError;
