class NegociacoesView extends View{
  constructor(elemento) {
    super(elemento)
  }

  _template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
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
