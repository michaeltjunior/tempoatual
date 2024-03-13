export const IndiceCalor = (temperatura, umidade) => {
    var c1 = -42.379;
    var c2 = 2.04901523;
    var c3 = 10.14333127;
    var c4 = -0.22475541;
    var c5 = -0.00683783;
    var c6 = -0.05481717;
    var c7 = 0.00122874;
    var c8 = 0.00085282;
    var c9 = -0.00000199;
    var resultado;

    var tempF = (1.8 * temperatura) + 32;

    var soma = c1 + (c2 * tempF) + (c3 * umidade) + (c4 * tempF * umidade) + (c5 * (tempF * tempF)) + (c6 * (umidade * umidade)) + (c7 * (tempF * tempF) * umidade) + (c8 * tempF * (umidade * umidade)) + (c9 * (tempF * tempF) * (umidade * umidade));
    resultado = (soma - 32) * 5/9;

    return (resultado.toFixed(2));
};