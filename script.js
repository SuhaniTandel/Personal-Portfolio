const text = ["Frontend Developer", "Full Stack Developer", "MERN StackDeveloper", "UI/UX Designer"];

let i=0, j=0, current="", isDel=false;

function type(){

current = text[i];

if(isDel){
j--;
}else{
j++;
}

document.querySelector(".typing").textContent =
current.substring(0,j);

if(!isDel && j===current.length){
isDel=true;
setTimeout(type,1000);
return;
}

if(isDel && j===0){
isDel=false;
i=(i+1)%text.length;
}

setTimeout(type,isDel?60:100);
}

type();