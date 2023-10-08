

function colorRed(input) {
    input.style.color = "red";
}

function colorWhite(input){
    input.style.color = "black";
}

document.addEventListener("DOMContentLoaded", () =>{
    var check = function() {
        if (document.getElementById('password').value ==
          document.getElementById('confirm-password').value) {
          document.getElementById('message').style.color = 'green';
          document.getElementById('message').innerHTML = 'matching';
        } else {
          document.getElementById('message').style.color = 'red';
          document.getElementById('message').innerHTML = 'not matching';
        }
    }
    document.querySelectorAll(".radio").forEach((input) => {
        input.style.cursor = "pointer";
        input.onclick = () => {
            var element = document.getElementsByClassName("radio");
            for(var i=0; i<element.length; i++){
                if(element[i] === input){
                    colorRed(element[i].parentElement);
                }else{
                    colorWhite(element[i].parentElement);
                }
            }
        };
    });

    document.querySelector(".signup-form").onsubmit = checkPassword(this);
});