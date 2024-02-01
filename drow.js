import { convertBytes } from "./utils.js";

export function drowPieChart(total, right, wrong){
    return  `
    <div class="card">
    <!-- 3 numbers need to be calculated (comments below): -->
    <!-- Circle is 448 wide (SVG grid); calcs based off that -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <circle class="fill" cx="256" cy="256" r="224" />
      <!-- 1/8 incorrect = 0.125 -->
      <!-- 0.125 * 448*pi = 175 -->
      <circle class="incorrect" cx="256" cy="256" r="224" stroke-dasharray="${(wrong/total) * 448 * Math.PI} 1407" />
      <!-- 7/8 correct = 0.875 -->
      <!-- 0.875 * 448*pi = 1231 -->
      <circle class="correct" cx="256" cy="256" r="224" stroke-dasharray="${(right/total) * 448 * Math.PI} 1407" />
    </svg>
    <div class="score">
        <h3>${total}</h3>
    </div>
    <div class="breakdown">
      <div class="right">${right} valid</div>
      <div class="wrong">${wrong} invalid</div>
    </div>
  </div>
    </div>`
}

export function drowBarChart(projects){
  const number = projects.length

  let content = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" font-size="10px" font-family="sans-serif" fill="none" stroke="none" stroke-width="1.5" width="" height="75vh" viewBox="0 0 140 43">
      <g transform="translate(0.0,0.0)">`;
  let x = 0;
  let y = -5;
  let width = 

  projects.forEach((project, index) => {
      let xp = project.amount; // Assurez-vous que l'xp est bien défini et est un nombre
      content += `
      <rect y=${y} width=${Math.round(xp*10/1000)/20}px height="5" fill="var(--color-primary)" stroke="rgba(200, 200, 210, 0.1)" stroke-width="1px"/>
      <text pointer-events="none" x="0" dy="0" transform="translate(0,${y+3.5})" fill="rgb(198,199,208)">${project.name} - ${convertBytes(project.amount)[0]}${convertBytes(project.amount)[1]}</text>`;
      y += 5.5; // Déplacez chaque barre de 20 pixels vers la droite
  });

  content += `</g>
  </svg>
  `;
  return content;
}

export function skillsEvo(skills){
  let content = ""
  skills.forEach(skill =>{
    content += `<svg class="progress" viewBox="0 0 500 100">
    <text pointer-events="none" x="0" dy="0" transform="translate(0,70)" fill="rgb(198,199,208)">${(skill.skill).split("_")[1].toUpperCase()}</text>
    <path class="drop" style="fill:none;stroke:#d0d0d0;stroke-width:2;stroke-linecap:round;" d="m 50,80 c 0,0 60,-0.001 90,-0.001 30,0 60,0.001 90,0.001 30,0 60,-0.001 90,-0.001 30,0 90,0.001 90,0.001"></path>
    <path class="range" style="fill: none; stroke: var(--color-primary); stroke-width: 8; stroke-linecap: round; stroke-dasharray: ${(skill.amount*500)/100}, 396;" d="m 50,80 c 0,0 60,-0.001 90,-0.001 30,0 60,0.001 90,0.001 30,0 60,-0.001 90,-0.001 30,0 90,0.001 90,0.001"></path>
    <text pointer-events="none" x="420" dy="0" transform="translate(0,85)" fill=var(--color-primary)>${(skill.amount)}%</text>
    </svg>`
  });
  return content
}