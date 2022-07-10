export async function register(workerIdentifier : number, cardType: 'groceries' | 'restaurants' | 'transport' | 'education'| 'health'){
  console.log('chegou na função register')
  console.log(workerIdentifier, cardType)
}