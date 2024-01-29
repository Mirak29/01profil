import { RemoveComponent, loadCSS, convertBytes, getRankName, calculateAudits, extractProjectDetails } from "./utils.js"
import { getUserData } from "./graphql.js"
import { Login } from "./loginPage.js"
import { drowPieChart, drowBarChart } from "./drow.js"

export class Profil extends HTMLElement {
    constructor() {
        super()
        document.title = "Dashboard"
        RemoveComponent("login-user")
    }
    async connectedCallback() {
        await loadCSS("./profil.css")
        const response = await getUserData();
        let userInfos = response.response.user[0]
        let xp = convertBytes(response.response.totalXp.aggregate.sum.amount)
        console.log(userInfos.campus);
        if (!userInfos.campus) {
            this.Logout()
            return
        }
        let totalProjects = response.response.projects.aggregate.count
        let ratio = Math.round(userInfos.auditRatio * 10) / 10
        let lvl = response.response.level[0].amount
        let audited = calculateAudits(userInfos.audited)
        let projects = extractProjectDetails(response.response.xps)
        console.log("hello", response, projects);
        // console.log(sumAmount(response.response.allxp));
        this.innerHTML = `
        <!-- My Main Content -->
        <div class="mainContent">
            <nav>
                <div class="sideBarre__logo">
                    <div class="sideBarre__cercle"></div>
                    <h2>${userInfos.firstName} ${userInfos.lastName}</h2>
                </div>
                <div class="exit"><svg width="30px" viewBox="0 0 130 130"><path fill="black" stroke="var(--color-primary)" stroke-width="7px" d="M85 21.81a51.5 51.5 0 1 1-39.4-.34M64.5 10v51.66" style="transition: stroke 0.2s ease-out 0s, opacity 0.2s ease-out 0s;"></path></svg></div>
            </nav>
    
            <!-- My Box Content -->
            <div class="boxContent">
                <div class="firstRow">
                    <div class="cardOne glassemorphism">
                        <div class="description">
                            <p>Level</p>
                            <h3>${lvl}</h3>
                            <p>${getRankName(lvl)}</p>
                        </div>
                    </div>
                    <div class="cardTwo glassemorphism">
                        <div class="description">
                            <p>Total XP</p>
                            <div class="xp"><h3>${Math.round(xp[0])}</h3><span> ${xp[1]}<span></div>
                        </div>
                    </div>
                    <div class="cardThree glassemorphism">
                        <div class="description">
                            <p>Audits ratio</p>
                            <h3>${ratio}</h3>                    
                        </div>
                    </div>
                    <div class="cardFour glassemorphism">
                    <div class="description">
                        <p>Done Projects</p>
                        <h3>${totalProjects}</h3>                       
                    </div>
                </div>

                </div>
                <div class="secondRow">
                <div class="cardChart skills">
                <h1>Best skills<h1> 
                
            </div>
                    <div class="cardChart audits">
                        <h1>Audits<h1>
                        ${drowPieChart(audited.total, audited.valid, audited.invalid)}
                    </div>
                    
                <div class="thirdRow">
                    <div class="cardChart topProjects">
                    <h1>Top XP Projects<h1>
                    ${drowBarChart(projects)}                       
                    </div
                </div>      
            </div>
        </div>
        `
        this.querySelector(".exit").addEventListener("click", this.Logout)
    }

    Logout() {
        localStorage.removeItem("user_token");
        let bodyy = document.querySelector("body");
        bodyy.innerHTML = "";
        bodyy.append(new Login());
    }

}