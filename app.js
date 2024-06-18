const musicCountainer=document.querySelector('.music-countainer')
const progresscontainer=document.querySelector('.progress-container')
const progress=document.querySelector('.progress')
const audio=document.querySelector('#audio')
const prevBtn=document.querySelector('#prev')
const playBtn=document.querySelector('#play')
const nextBtn=document.querySelector('#next')
const title=document.querySelector('#title')
const des=document.querySelector('#des')
const cover=document.querySelector('#cover')
const background=document.querySelector('#background')
const currentTimeSong=document.getElementById('currentTime')
const durationSong=document.getElementById('duration')
const h1Elem=document.querySelector('h1')
const speedSong=document.querySelector('.speed')
const speedlowSong=document.querySelector('.speeds')

// song titles
const Songs=[
    {
    song:'fe!n',
    artist:'Travis Scott',
    path:
    "fe!n.mp3",
    cover:'fe!n.png',
},
    {
    song:'molly',
    artist:'Playboi Carti',
    path:
    "molly.mp3",
    cover:'molly.png',
},
    {
    song:'redrum',
    artist:'21Savage',
    path:
    "redrum.mp3",
    cover:'redrum.png',
},
    ]
// keep track song
let songIndex=0

//initially load song info DOM
loadSong(Songs[songIndex])

//update song details
function loadSong(song){
    title.innerText=song.song
    des.innerText=song.artist
    audio.src=song.path
    cover.src=song.cover
    background.src=song.cover

}

//play song
function playSong(){
    musicCountainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

// puase song
function puaseSong(){
    musicCountainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

//prev song
function prevSong(){
    songIndex--
    if(songIndex  < 0){
        songIndex=Songs.length-1
    }
   loadSong(Songs[songIndex])
  playSong()
}
 //next song
function nextSong(){
    songIndex++
    if(songIndex >Songs.length-1){
        songIndex=0
        
    }
   loadSong(Songs[songIndex])
  playSong()
}

// add currentTime 
function updateProgress(e){
    const {duration , currentTime}=e.srcElement
    const progressPercent=(currentTime / duration )* 100
    progress.style.width=`${progressPercent}%`

      // Calculate display for duration
     const durationMinutes=Math.floor(duration / 60)
     let  durationSeconds=Math.floor(duration % 60)
     if(durationSeconds < 10){
         durationSeconds='0'+durationSeconds
     }
         //   // Delay switching duration Element to avoid NaN

     if(durationSeconds){
        durationSong.textContent=durationMinutes+':'+durationSeconds
     }
    //   // Calculate display for currentTime

     const currentMinutes=Math.floor(currentTime/60)
     let currentSeconds=Math.floor(currentTime%60)
     if(currentSeconds<10){
        currentSeconds='0'+currentSeconds
     }
        currentTimeSong.textContent=currentMinutes+':'+currentSeconds
     
}

// click and move currentTime 
function setProgress(e){
 const width=this.clientWidth
 const clickX=e.offsetX
 const duration=audio.duration

 audio.currentTime=(clickX / width) * duration
}

// Event listener
playBtn.addEventListener('click',()=>{
    let isPlaying=musicCountainer.classList.contains('play')
    if(isPlaying){
        puaseSong()
    }else{
       playSong()
    }
})


speedSong.addEventListener('click',()=>{
    audio.volume+=0.4;
})

speedlowSong.addEventListener('click',()=>{
    audio.volume-=0.2
})


// Change Song Events
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
audio.addEventListener('timeupdate',updateProgress)
progresscontainer.addEventListener('click',setProgress)
audio.addEventListener('ended',nextSong)
