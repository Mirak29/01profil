export class Error extends HTMLElement{
    constructor(status, message){
        super()
        document.title = "Error"
        this.innerHTML = `
        <div class="exit"><svg width="30px" viewBox="0 0 130 130"><path fill="black" stroke="var(--color-primary)" stroke-width="7px" d="M85 21.81a51.5 51.5 0 1 1-39.4-.34M64.5 10v51.66" style="transition: stroke 0.2s ease-out 0s, opacity 0.2s ease-out 0s;"></path></svg></div>
        <h1 id=${status}></h1>
        <p id=${message}></p>
        `
    }
}