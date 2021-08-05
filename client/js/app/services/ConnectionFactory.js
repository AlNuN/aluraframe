// Module pattern
var ConnectionFactory = (function() {

  const stores = ['negociacoes']
  const version = 4
  const dbName = 'aluraframe'

  let connection = null
  let close = null

  return class ConnectionFactory {
    constructor() {
      throw 'Não é possível criar instâncias dessa classe'
    }
  
    static getConnection() {
      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, version)
  
        openRequest.onupgradeneeded = e => {
          ConnectionFactory._createStores(e.target.result)
        }
  
        openRequest.onsuccess = e => {
          if(!connection) {
            connection = e.target.result
            close = connection.close.bind(connection)  // Salva acesso ao método
            connection.close = function() {  // Sobrescreve: Monkey Patch
              throw 'Você não pode fechar diretamente a conexão'
            }
          }
          resolve(connection)
        }
  
        openRequest.onerror = e => {
          console.log(e.target.error)
          reject(e.target.name)
        }
      })
    }
  
    static _createStores(connection) {
      stores.forEach(store => {
        if(connection.objectStoreNames.contains(store))
          connection.deleteObjectStore(store)
  
        connection.createObjectStore(store, { autoIncrement: true })
      })
    }

    static closeConnection() {
      if(connection) {
        close()
        connection = null
      }
    }
  }
})()
