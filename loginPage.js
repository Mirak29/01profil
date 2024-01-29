import { FetchData } from "./graphql.js"
import {jsonify, loadCSS} from "./utils.js"

export class Login extends HTMLElement{
    constructor(){
        super()
        document.title="Login form"
        this.innerHTML = `<div class="container">
		<div class="row">
			<div class="col-md-8 col-md-offset-2 col-sm-12">	
				<div class="form">
			
					<form id="login-form">

						<h1>Welcome back!</h1>

						<div class="input-group col-md-8 col-md-offset-2">
							<input type="text" name="username" class="input email" autocomplete="on" id=email>
							<label>E-Mail/username</label>
						</div>
					
						<div class="input-group col-md-8 col-md-offset-2">
							<input type="password" name="password" class="input password" id=pswd>
							<label>Password</label>
						</div>
				
						<div class="input-group">
							<div class="col-md-4 col-md-offset-4">
								<button type="submit" id="login-btn">
									LOGIN
								</button>							
							</div>
						</div>
						<div class="error"></div>
					</form>
				</div>
			</div>
		</div>
	</div>`
    }
    async connectedCallback(){
        await loadCSS("./login.css")
        let LoginForm = document.querySelector("#login-form")
        let err = document.querySelector(".error")
        console.log(LoginForm);
        LoginForm.addEventListener("submit",async (f)=>{
            f.preventDefault()
            let form = new FormData(LoginForm)
            let user = jsonify(form)
            let btnlogin = document.querySelector("#login-btn")
            btnlogin.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>
            `
            btnlogin.disabled = true
            let config = {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${window.btoa(`${user.username}:${user.password}`)}`
                }
            }
            try {
                let response = await FetchData("https://learn.zone01dakar.sn/api/auth/signin",config)
                console.log(response);
                if (response?.status) {
                    localStorage.setItem("user_token",response.response)
                    document.body.innerHTML= "<home-user></home-user>"
                    return 
                }else{
                    err.innerHTML = JSON.parse(response.errorBody).error
                }
            } catch (error) {
                console.log(error);
                err.innerHTML = error.error
            }
            btnlogin.innerHTML="LOGIN"
            btnlogin.disabled = false
        });

        (function(){
            var inputs = document.querySelectorAll('.form .input-group input');
			var button = document.getElementById('login');

            inputs.forEach((input) => {
                input.addEventListener('focusout', (e) => {
                    if (e.target.value === "") {
                        return e.target.classList.remove('has-value');
                    }

                    return e.target.classList.add('has-value');
                });
            });
        })();
    }
    
}