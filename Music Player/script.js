// Music Player

const playlistContainertag = document.getElementsByClassName('playlistContainer')[0];
const audioTag = document.getElementsByClassName('audioTag')[0];
const currentAndTotalTimeTag = document.getElementsByClassName('currentAndTotalTime')[0];
const currrentProgressTag = document.getElementById('currentProgress');
const playButtonTag = document.getElementsByClassName("playButton")[0]
const pauseButtonTag = document.getElementsByClassName('pauseButton')[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0]
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks = [
    { trackId: "Musics for the player/Gangsta's paradise.mp4", title : "Gangsta's Paradise by Coolio", 
    trackImg : "https://upload.wikimedia.org/wikipedia/en/e/e9/Coolio_-_Gangsta%27s_Paradise.jpg"},
    { trackId : "Musics for the player/Chit Oo.mp4", title : "မောင့်အချစ်ဦး by သားသား , ထက်ယံ , နွဲ့ယဉ်ဝင်", 
    trackImg: "https://i.ytimg.com/vi/l5AT60wsl3Q/mqdefault.jpg"},
    { trackId : "Musics for the player/live show.mp4", title : 'နာရီမိနစ်စက္ကန့်မလစ် by ringo', 
    trackImg : "https://i.ytimg.com/vi/fKMnJrgcCs4/mqdefault.jpg"},
    { trackId : "Musics for the player/way down we go.mp4", title : "Way Down We Go by KALEO",
    trackImg : "https://upload.wikimedia.org/wikipedia/en/a/a1/KaleoWayDownWeGo.jpg"},
    { trackId : "Musics for the player/Trick me.mp4", title : " လှည့်စားလိုက် (Cover By Ko Htett)",
    trackImg : "https://i.ytimg.com/vi/SEd_QspChBw/maxresdefault.jpg"},
    { trackId : "Musics for the player/take me to church.mp4", title : "Take Me To Church by Hozier",
    trackImg : "https://i1.sndcdn.com/artworks-000111141668-pcx2iq-t500x500.jpg"},
    { trackId : "Musics for the player/who I am.mp4", title : "Who I am By The Score",
    trackImg : "https://i.ytimg.com/vi/jCYxckPjG90/maxresdefault.jpg"},
    { trackId : "Musics for the player/Nostalgia.mp4", title : "Nostalgia By Big Bang",
    trackImg : "https://i.ytimg.com/vi/QMQTf4hMc5A/maxresdefault.jpg"},
    { trackId : "Musics for the player/videoplayback.mp4", title : "သည်းခံ By Big Bang",
    trackImg : "https://i.ytimg.com/vi/TSQ09Lyv3GI/mqdefault.jpg"},
    { trackId : "Musics for the player/နာရီမိနစ် စက္ကန့်မလစ် -(cover by sin pauk).mp4", title : "နာရီမိနစ် စက္ကန့်မလစ် -(cover by sin pauk)",
    trackImg : "https://i.ytimg.com/vi/mJV1Irwoky4/maxresdefault.jpg"},
    { trackId : "Musics for the player/human.mp4", title : "Human By Rag'n'Bone",
    trackImg : "https://upload.wikimedia.org/wikipedia/en/a/a8/Human_-_Rag%27n%27Bone_Man_Single.png"},
    { trackId : "Musics for the player/hill.mp4", title : "Hill By The Weekend",
    trackImg : "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/The_Weeknd_-_The_Hills.jpg/220px-The_Weeknd_-_The_Hills.jpg"},
    { trackId: "Musics for the player/Pumped up kicks.mp4", title : "Pumped up kicks By Foster The People",
    trackImg : "https://i.ytimg.com/vi/k_aQYP8rsgE/maxresdefault.jpg"},
    { trackId : "Musics for the player/valentino.mp4", title : "Valentino By 24KGoldn",
    trackImg : "https://i.ytimg.com/vi/c3_Ia2CaO8k/maxresdefault.jpg"},
    { trackId : "Musics for the player/beat the devil's tatto.mp4", title: "Beat The Devil's Tatto By Black Rebel Motocycle Club",
    trackImg : "https://areamagazine.files.wordpress.com/2010/12/black-rebel-motorcycle-club-beat-the-devils-tattoo.jpg"},
];

for (let i =0; i<tracks.length; i++){
    const trackTag = document.createElement('div');        
    const trackImgTag = document.createElement("img");
    const trackImage = tracks[i].trackImg
    trackImgTag.src = trackImage;
    trackImgTag.style.width="65px"
    trackImgTag.style.height ="46px"
    trackImgTag.style.marginLeft = "10px"
    
    trackTag.addEventListener('click', () => {
        currentPlayingIndex =i
        playSong()
        // console.log(audioTag.duration)// NaN
    });
    trackTag.classList.add('trackIteam');
    const title = (i+ 1).toString() + '. ' + tracks[i].title
    trackTag.textContent = title;
    playlistContainertag.append(trackTag, trackImgTag);
    trackTag.appendChild(trackImgTag)
}

let duration =0
let durationText = "00:00" // bc timeupdate function wanna use this
audioTag.addEventListener('loadeddata', () => {
   // console.log('Song duration is :', audioTag.duration)// returns seconds and millisecons
    duration = Math.floor(audioTag.duration);
    durationText = creatMinutesAndSecondText(duration);
    //console.log("Total duration of current playing song:",creatMinutesAndSecondText(duration));
    /*
    const minutes = Math.floor(duration/60);
    const seconds = duration%60;
    don't need this anymore bc it's aginest to DRY  
    const minutesText = minutes < 10 ? '0' + minutes.toString() : minutes;
    const secondText = seconds < 10 ? '0' + seconds.toString() : seconds;
    */
   // console.log(minutesText + ':' + secondText)
});

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = creatMinutesAndSecondText(currentTime);
    const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.textContent = currentTimeTextAndDurationText
    updateCurrentProgress(currentTime)
    /* console.log(
        "currentTimeTextAndDurationText: ",
        currentTimeTextAndDurationText
    )*/
    //console.log(" Played time :",creatMinutesAndSecondText(currentTime));
    /*
    const minutes = Math.floor(currentTime/60);
    const seconds = currentTime%60;
     don't need this anymore bc it's aginest to DRY 
    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    console.log(minutesText + ":" + secondText);
    */
});

const updateCurrentProgress= (currentTime) => {
    const currentProgressWith = (500/duration) * currentTime;
    currrentProgressTag.style.width = currentProgressWith.toString() + "px" // $px
}

// this function is for above. this also pursue to DRY 
const creatMinutesAndSecondText = (totalSecond)=>{
    const minutes = Math.floor(totalSecond/60);
    const seconds = totalSecond % 60;

    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteText + ":" + secondText;
};
let currentPlayingIndex = 0
let isPlaying = false
playButtonTag.addEventListener('click', () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true
    if (currentTime === 0) {
        playSong()
    } else {
        audioTag.play(); //ေရာက်တဲ့နေရာမှာplayတယ်
        updatePlayAndPauseButton();
    }
});

pauseButtonTag.addEventListener('click', () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton()
});

previousButtonTag.addEventListener("click", () => {
    if(currentPlayingIndex === 0 ) {
        currentPlayingIndex = 14
    }
    currentPlayingIndex -= 1
    playSong()
})

nextButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === tracks.length-1){
        currentPlayingIndex = -1
    } 
    currentPlayingIndex += 1
    playSong()
});
// to puresue (DRY). Bc most of the above codes're repeating  
const playSong = () => {
    const songIdToPlay = tracks[currentPlayingIndex].trackId
    audioTag.src = songIdToPlay
    audioTag.play()
    isPlaying = true
    updatePlayAndPauseButton()
}

const updatePlayAndPauseButton= () => {
    if (isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline"
    }else {
        playButtonTag.style.display = "inline"
        pauseButtonTag.style.display = "none"
    }
}

console.log("Hello world");