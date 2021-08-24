reactor.registerEvent('stateChanged')
const DATA_SOURCE_ADDRESS = "/json/shoes.json"
const FETCH_STEP = 20
// state
const state = {
  products: [],
  nextProductIndex: 0,
  sourceProductsTotalCount: 0
}
// mutations
function addProducts(products) {
  state.products.push(...products)
  reactor.dispatchEvent('stateChanged', { propertyName: 'products' })
}
// actions
async function fetchMore() {
  const response = await fetch(DATA_SOURCE_ADDRESS);
  const products = await response.json()
  state.sourceProductsTotalCount = products.length
  const prevCount = state.products.length
  // console.log(state.nextProductIndex, state.nextProductIndex + FETCH_STEP)
  const fetchedProducts = products.slice(state.nextProductIndex, state.nextProductIndex + FETCH_STEP)
  // console.log(fetchedProducts)
  // fetchedProducts.forEach(p => state.products.push(p))
  addProducts(fetchedProducts)
  // console.log(state.products)
  const currentCount = state.products.length
  state.nextProductIndex = currentCount
  return currentCount - prevCount
}
// getters
function getProducts() {
  return JSON.parse(JSON.stringify(state.products))
}
function getSourceProductsTotalCount() {
  return JSON.parse(JSON.stringify(state.sourceProductsTotalCount))
}