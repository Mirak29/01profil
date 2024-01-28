import { Login } from "./loginPage.js"
import { Profil } from "./profilPage.js"
import {HaveSession} from "./graphql.js"
customElements.define('login-user', Login)
customElements.define('home-user', Profil)
const auth = await HaveSession()
document.querySelector("body").innerHTML= ""
if ( !auth) {
    document.querySelector("body").innerHTML= "<login-user></login-user>"
}else{
    document.querySelector("body").append(new Profil())
}