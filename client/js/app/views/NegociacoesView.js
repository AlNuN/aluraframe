class NegociacoesView extends View{
  constructor(elemento) {
    super(elemento)
  }

  _template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th onclick="negociacaoController.ordena('data')">
              <span>DATA</span>
              <img src="./img/sort.svg" 
                alt="setas para cima e para baixo indicando que você pode ordenar a tabela em ordem crescente ou decrescente">
            </th>
            <th onclick="negociacaoController.ordena('quantidade')">
              <span>QUANTIDADE</span>
              <img src="./img/sort.svg" 
                alt="setas para cima e para baixo indicando que você pode ordenar a tabela em ordem crescente ou decrescente">
            </th>
            <th onclick="negociacaoController.ordena('valor')">
              <span>VALOR</span>
              <img src="./img/sort.svg" 
                alt="setas para cima e para baixo indicando que você pode ordenar a tabela em ordem crescente ou decrescente">
            </th>
            <th onclick="negociacaoController.ordena('volume')">
              <span>VOLUME</span>
              <img src="./img/sort.svg" 
                alt="setas para cima e para baixo indicando que você pode ordenar a tabela em ordem crescente ou decrescente">
            </th>
          </tr>
        </thead>

        <tbody>
          ${
            model.negociacoes.map((v) => `
              <tr>
                <td>${DateHelper.dataParaTexto(v.data)}</td>
                <td>${v.quantidade}</td>
                <td>${v.valor}</td>
                <td>${v.volume}</td>
              </tr>
            `)
            .join('')
          }
        </tbody>

        <tfoot>
          <td colspan="3"></td>
          <td>
            ${
              model.negociacoes
                .reduce((prev, curr) => prev + curr.volume, 0.0)
            }
          </td>
        </tfoot>
      </table>
    `
  }
}
