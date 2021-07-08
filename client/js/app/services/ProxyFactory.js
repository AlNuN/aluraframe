class ProxyFactory {
  static create(objeto, props, acao) {
    return new Proxy(objeto, {
      get(target, prop, receiver) {
        if(props.includes(prop) && ProxyFactory.isFunction(target[prop])) {
          return function () {
            const result = Reflect.apply(target[prop], target, arguments)
            acao(target)
            return result
          }
        }
        return Reflect.get(target, prop, receiver)
      },
      set(target, prop, value, receiver) {
        const result = Reflect.set(target, prop, value, receiver)
        props.includes(prop) && acao(target) 
        return result
      }
    })
  }

  static isFunction(func) {
    return typeof(func) == typeof(Function)
  }
}