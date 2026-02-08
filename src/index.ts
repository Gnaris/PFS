import ParisFashionShop from "./entities/PFS.js"

const pfs = await new ParisFashionShop().connect("princesse.fcenter@gmail.com", "0951869879Chen")
await pfs.refreshPage({page : 1, nbProduct : 1})
