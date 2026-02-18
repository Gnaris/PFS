import ParisFashionShop from "./entities/ParisFashionShop.js"
import ParisFashionShopOrder from "./entities/ParisFashionShopOrder.js"
import ParisFashionShopProduct from "./entities/ParisFashionShopProduct.js"

const session = await new ParisFashionShop().connect("", "")

const PFSProduct = new ParisFashionShopProduct(session.getToken())
await PFSProduct.refreshPage({page : 1, nbProduct : 1})

// const PFSOrder = new ParisFashionShopOrder(session.getToken())
// await PFSOrder.getOrderSummary()
