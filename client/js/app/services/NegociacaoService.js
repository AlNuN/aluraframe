class NegociacaoService {
  obter(link, mensagemDeErro) {
    return fetch(link)
      .then((response) => response.json()
      )
      .then(result => result
        .map(obj => 
          new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
      )
      .catch(e => {
        console.log(e)
        throw mensagemDeErro
      })
  }

  obterNegociacoesDaSemana() {
    return this.obter('negociacoes/semana', 'Não foi possível obter as negociações da semana')
  }

  obterNegociacoesDaSemanaAnterior() {
    return this.obter('negociacoes/anterior', 'Não foi possível obter as negociações da semana anterior')
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this.obter('negociacoes/retrasada', 'Não foi possível obter as negociações da semana retrasada')
  }

  obterNegociacoes () {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada(),
    ])
      .then(periodos => periodos.reduce((dados, periodo) => dados.concat(periodo), [])
        .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
      )
      .catch(e => { throw e })
  }
}