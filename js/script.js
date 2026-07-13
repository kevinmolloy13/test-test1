function openMobile() {
 document.getElementById("mobileNav").classList.add("open");
}

function closeMobile() {
 document.getElementById("mobileNav").classList.remove("open");
}
function openMobile() {
 document.getElementById("mobileNav")
 .classList.add("open");
}

function closeMobile() {
 document.getElementById("mobileNav")
 .classList.remove("open");
}


const affirmations = [

"I am not alone on this journey.",

"My body deserves patience and kindness.",

"I honour every stage of my life.",

"I am strong, capable and supported.",

"I give myself permission to rest.",

"Change does not diminish my worth."

];

let currentAff = 0;

const quote =
document.getElementById("affQuote");

const dots =
document.getElementById("affDots");

const prev =
document.getElementById("affPrev");

const next =
document.getElementById("affNext");


function renderDots(){

if(!dots) return;

dots.innerHTML="";

affirmations.forEach((_,i)=>{

const dot =
document.createElement("div");

dot.className="aff-dot";

if(i===currentAff){

dot.classList.add("active");

}

dot.addEventListener("click",()=>{

currentAff=i;

updateAffirmation();

});

dots.appendChild(dot);

});

}


function updateAffirmation(){

if(!quote) return;

quote.style.opacity=0;

setTimeout(()=>{

quote.textContent=
`"${affirmations[currentAff]}"`;

quote.style.opacity=1;

renderDots();

},250);

}


if(prev){

prev.addEventListener("click",()=>{

currentAff--;

if(currentAff<0){

currentAff=
affirmations.length-1;

}

updateAffirmation();

});

}


if(next){

next.addEventListener("click",()=>{

currentAff++;

if(
currentAff>=affirmations.length
){

currentAff=0;

}

updateAffirmation();

});

}


if(quote){

renderDots();

setInterval(()=>{

currentAff++;

if(
currentAff>=affirmations.length
){

currentAff=0;

}

updateAffirmation();

},7000);

}
