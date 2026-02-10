import fs from "fs"

import Token from "./Token.js";


class ParisFashionShop {

    public token: Token | null = null;

    public async connect(email: string, password: string) {
        const dateNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
        dateNow.setMinutes(dateNow.getMinutes() + 10)

        const tokenFile = fs.readFileSync("token.json", "utf-8")
        let token = tokenFile ? JSON.parse(tokenFile) as Token : null

        if (!token || !token.access_token || new Date(token.expires_at) < dateNow || token.email != email || token.password != password) {
            const TokenResponse = await fetch("https://wholesaler-api.parisfashionshops.com/api/v1/oauth/token", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const newToken = await TokenResponse.json() as Token | { message: string }
            if (!TokenResponse.ok || "message" in newToken) {
                fs.writeFileSync("token.json", JSON.stringify(newToken))
                throw new Error("email ou mot de passe incorrect")
            }
            token = newToken
            token.email = email
            token.password = password
            fs.writeFileSync("token.json", JSON.stringify(token))
        }
        this.token = token
        return this
    }

    public getToken()
    {
        if(!this.token)
        {
            throw new Error("email ou mot de passe incorrect")
        }
        return this.token
    }
}

export default ParisFashionShop