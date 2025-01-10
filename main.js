document.getElementById('nfse-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const valorVenda = parseFloat(document.getElementById('valorVenda').value);
    const itensVendidos = document.getElementById('itensVendidos').value;
    const irpf = parseFloat(document.getElementById('irpf').value);
    const pis = parseFloat(document.getElementById('pis').value);
    const cofins = parseFloat(document.getElementById('cofins').value);
    const inss = parseFloat(document.getElementById('inss').value);
    const issqn = parseFloat(document.getElementById('issqn').value);

    const impostos = {
        IRPF: calcularImposto(valorVenda, irpf),
        PIS: calcularImposto(valorVenda, pis),
        COFINS: calcularImposto(valorVenda, cofins),
        INSS: calcularImposto(valorVenda, inss),
        ISSQN: calcularImposto(valorVenda, issqn)
    };

    exibirNotaFiscal(valorVenda, itensVendidos, impostos);
});

function calcularImposto(valor, porcentagem) {
    return (valor * (porcentagem / 100)).toFixed(2);
}

function exibirNotaFiscal(valorVenda, itensVendidos, impostos) {
    document.getElementById('outputValorVenda').innerText = valorVenda.toFixed(2);
    document.getElementById('outputItensVendidos').innerText = itensVendidos;
    document.getElementById('outputIRPF').innerText = impostos.IRPF;
    document.getElementById('outputPIS').innerText = impostos.PIS;
    document.getElementById('outputCOFINS').innerText = impostos.COFINS;
    document.getElementById('outputINSS').innerText = impostos.INSS;
    document.getElementById('outputISSQN').innerText = impostos.ISSQN;

    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    document.getElementById('dataEmissao').innerText = dataFormatada;

    document.getElementById('notaFiscal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}


document.getElementById('closeBtn').addEventListener('click', function () {
    fecharPopup();
});


document.getElementById('overlay').addEventListener('click', function () {
    fecharPopup();
});


function fecharPopup() {
    console.log("Fechando popup...");
    document.getElementById('notaFiscal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.getElementById('printBtn').addEventListener('click', function () {
    const notaFiscal = document.getElementById('notaFiscal');
    const originalContent = document.body.innerHTML;

    // Temporariamente substitui o conteúdo da página pelo popup da Nota Fiscal
    document.body.innerHTML = notaFiscal.outerHTML;

    // Imprime o conteúdo
    window.print();

    // Restaura o conteúdo original da página
    document.body.innerHTML = originalContent;

    // Restaura os eventos
    window.location.reload();
});

