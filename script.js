const text = ["Frontend Developer", "Full Stack Developer", "MERN Stack Developer", "UI/UX Designer"];

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

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if(contactForm && formStatus){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = contactForm.querySelector("input[name='name']").value.trim();
        const email = contactForm.querySelector("input[name='email']").value.trim();
        const message = contactForm.querySelector("textarea[name='message']").value.trim();

        if(!name || !email || !message){
            formStatus.textContent = "Please fill in all fields before sending.";
            formStatus.className = "form-status error show";
            return;
        }

        formStatus.textContent = "Sending your message...";
        formStatus.className = "form-status show";

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(function(response){
            if(response.ok){
                formStatus.textContent = `Thanks ${name}! Your message has been sent successfully.`;
                formStatus.className = "form-status show";
                contactForm.reset();
                document.querySelector(".contact").scrollIntoView({behavior:"smooth", block:"center"});
            } else {
                throw new Error("Submission failed");
            }
        })
        .catch(function(){
            formStatus.textContent = "Sorry, the message could not be sent right now. Please try again later.";
            formStatus.className = "form-status error show";
        });
    });
}