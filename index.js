import { Login } from "./loginPage.js"
import { Profil } from "./profilPage.js"
import { Error } from "./errorPage.js"
import {HaveSession} from "./graphql.js"
customElements.define('login-user', Login)
customElements.define('home-user', Profil)
customElements.define('error-page', Error)
const auth = await HaveSession()
document.querySelector("body").innerHTML= ""
if ( !auth) {
    document.querySelector("body").innerHTML= "<login-user></login-user>"
}else{
    document.querySelector("body").append(new Profil())
}

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const message = params.get('message');
    console.log(status, message);
    if (!status){
        document.querySelector("body").innerHTML= "<error-page></error-page>"
    }
};