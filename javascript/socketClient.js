var start = performance.now();

var exampleSocket = new WebSocket("ws://127.0.0.1:8000/healthcareProvider/socketServer.php");
const form = document.querySelector(".socketChat form"),
continueBtn = form.querySelector("input[name='btnSend']");

// exampleSocket.onopen = function (event) {
//     console.log(event);
//     continueBtn.onclick = () => {
//         let formData = new FormData(form);
//         console.log(...formData);
//         let message = formData.get('txtMessage');
//         console.log(message);
//         exampleSocket.send(message);
//     }
// };

continueBtn.onclick = () => {
    let formData = new FormData(form);
    console.log(...formData);
    let message = formData.get('txtMessage');
    console.log(message);
    exampleSocket.send(message);
    exampleSocket = new WebSocket("ws://127.0.0.1:8000/healthcareProvider/socketServer.php");
    exampleSocket.onmessage = function (event) {
        console.log(event.data);
    }    
}

exampleSocket.onmessage = function (event) {
    console.log(event.data);
}

form.onsubmit = (e) => {
    e.preventDefault();
    console.log("hello");
}

var end = performance.now();
var timeTaken = end - start; 
console.log("time: ", timeTaken);
// continueBtn.onclick = () => {
//     let formData = new FormData(form);
//     console.log(...formData);
// }
