class Negociacao {
  constructor(data = new Date(), quantidade = 1, valor = 0) {
    this._data = new Date(data.getTime())
    this._quantidade = quantidade
    this._valor = valor
    Object.freeze(this)
  }

  //  Programação defensiva para evitar modificação através de Date
  get data() { return new Date(this._data.getTime()) }

  get quantidade() { return this._quantidade }

  get valor() { return this._valor }

  get volume () { return this.quantidade * this.valor }
}
