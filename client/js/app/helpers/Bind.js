class Bind {
  constructor(model, view, ...props) {
    let proxy = ProxyFactory.create(
      model, 
      props,
      (m) => view.update(m)
    )
    view.update(model)
    return proxy
  }
}