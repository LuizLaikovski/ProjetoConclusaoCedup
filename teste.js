const nome = "Luiz Laikovski";
function saudacao(nome = "Visitante") {
    console.log(`Olá, ${nome}!`);
}

saudacao(); // Saída: "Olá, Visitante!"