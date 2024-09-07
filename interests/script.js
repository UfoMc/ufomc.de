//data
const data = [
    { text: "Minecraft-Building", video: "media/Video1.mp4", discription: "Early when I started playing Minecraft I realised how much fun it was for me to build&amp; things and just beeing creative so I decidet to apply @ skydinse.net server.&amp; As the months and years passed by I reached out to multiple other servers such as anturnia.net.&amp; Now I still cant say I am a very good builder but you have some of my refferenzes in the background :D", pauseDuration: 31000},
    { text: "Coding", video: "media/Video2.mp4", discription: "So as 1 or 2 years passed after I got my pc I got in contact&amp; with different developers but the person who realy got me into programming was NachGecodet.&amp; One of my best friends in that time. He tought me java (especially bukkit api and mongodb) wich was my starting point.&amp; Since then I learned a few other languages and file formates such as html, php, js&amp; but my main and most loved language has stayed java ever since", pauseDuration: 140000},
    { text: "Mountain-Biking", video: "media/Video3.mp4", discription: "-- not added yet --", pauseDuration: 200},
];

//needed elemets
const animatedText = document.getElementById('animatedText');
const backgroundVideo = document.getElementById('backgroundVideo');
const currentDiscription = document.getElementById('discription');

let currentMessageIndex = 0;
let typingTimeout, deleteTimeout, cooldownTimeout;
let isCooldownActive = false; 
const typingSpeed = 100;

//type and delete message animation
function typeMessage(message, charIndex = 0) {
    if (charIndex < message.length) {
        animatedText.textContent += message[charIndex];
        typingTimeout = setTimeout(() => typeMessage(message, charIndex + 1), typingSpeed);
    } else {
        deleteTimeout = setTimeout(() => {
            deleteMessage(message);
        }, data[currentMessageIndex].pauseDuration);
    }
}

function deleteMessage(message) {
    if (message.length > 0) {
        animatedText.textContent = message.substring(0, message.length - 1);
        deleteTimeout = setTimeout(() => deleteMessage(message.substring(0, message.length - 1)), typingSpeed / 2);
    } else {
        currentMessageIndex = (currentMessageIndex + 1) % data.length;
        updateBackgroundVideo(data[currentMessageIndex].video);
        updateDiscription(data[currentMessageIndex].discription);
        cooldownTimeout = setTimeout(() => {
            typeMessage(data[currentMessageIndex].text);
            isCooldownActive = false; 
        }, 500); 
    }
}

//update video & description
function updateBackgroundVideo(videoSrc) {
    backgroundVideo.src = videoSrc;
    backgroundVideo.play();
}

function updateDiscription(discription) {
    let temp = discription.replace(/&amp;/g, '<br>');
    currentDiscription.innerHTML = temp;
}

//update the timings for button
function setButtonTimeOut(id, cooldownTime) {
    const button = document.getElementById(id);
    if (!isCooldownActive) {
        isCooldownActive = true;
        button.classList.add('disabled');
        cooldownTimeout = setTimeout(() => {
            button.classList.remove('disabled');
            isCooldownActive = false;
        }, cooldownTime);
    }
}

//load page
window.onload = () => {
    startAnimation();
    loadButtons();
};

function startAnimation() {
    updateDiscription(data[0].discription);
    updateBackgroundVideo(data[0].video);
    typeMessage(data[0].text);
}

function loadButtons() {
    const nextButton = document.getElementById("nextVid");
    const cooldownTime = 10000;

    nextButton.addEventListener('click', function() {
        if (!isCooldownActive) {
            clearTimeout(typingTimeout);
            clearTimeout(deleteTimeout);
            clearTimeout(cooldownTimeout);

            setButtonTimeOut("nextVid", cooldownTime);
            deleteMessage(data[currentMessageIndex].text);
        }
    });
}


