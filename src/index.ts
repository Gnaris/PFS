import ParisFashionShop from "./entities/ParisFashionShop.js"
import ParisFashionShopOrder from "./entities/ParisFashionShopOrder.js"
import ParisFashionShopProduct from "./entities/ParisFashionShopProduct.js"

const session = await new ParisFashionShop().connect("princesse.fcenter@gmail.com", "0951869879Chen")

// const PFSProduct = new ParisFashionShopProduct(session.getToken())
// await PFSProduct.refreshPage({page : 500, nbProduct : 3})

const PFSOrder = new ParisFashionShopOrder(session.getToken())
await PFSOrder.getOrderSummary()
