class DateHelper {
  constructor() {
    throw 'Esta classe não pode ser instanciada'
  }

  static textoParaData(texto) {
    if(!/\d{4}-\d{2}-\d{2}/.test(texto))
      throw 'Deve estar no formato aaaa-mm-dd';

    return new Date(
      ...texto.split('-')
        .map((v, i) => v - i % 2)
    )
  }

  static dataParaTexto(data) {
    return `${data.getDate()}/${data.getMonth()
      +1}/${data.getFullYear()}`
  }
}