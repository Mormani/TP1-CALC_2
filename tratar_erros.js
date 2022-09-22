const colors = require("@colors/colors/safe");

function bold_colorize(str, color = "red") {
    return colors.bold( colors[color](str) );
}

function mathCompileError(e, str) {
    process.stdout.write(e.message);

    if (e.char ?? false) {
        const pos = e.char;

        const info = bold_colorize(`Erro no caractere ${pos}`, "yellow");
        str = str.substring(0, pos - 1) + bold_colorize(str.substring(pos - 1));

        console.log(` | ${info}: ${str}`);
    } else {
        console.log();
    }
}

exports.mathCompileError = mathCompileError;
