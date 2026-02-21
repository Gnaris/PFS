import ParisFashionShop from "./entities/ParisFashionShop.js"
import ParisFashionShopOrder from "./entities/ParisFashionShopOrder.js"
import ParisFashionShopProduct from "./entities/ParisFashionShopProduct.js"

const session = await new ParisFashionShop().connect("", "")

const PFSProduct = new ParisFashionShopProduct(session.getToken())
await PFSProduct.refreshPage({page : 55, nbProduct : 100, blacklistRef : ["Y41VS1", "A144VS2", "J190", "D356", "A1944VS2", "ZC22", "ZC22A", "ZC22E", "BL280", "BL281"]})

// const PFSOrder = new ParisFashionShopOrder(session.getToken())
// await PFSOrder.getOrderSummary()
