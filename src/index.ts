import ParisFashionShop from "./entities/PFS.js"

const pfs = await new ParisFashionShop().connect("MAIL", "MDP")
await pfs.refreshPage({page : 0, nbProduct : 0})
