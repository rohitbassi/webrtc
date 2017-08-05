var stream;
var Peer = require('simple-peer')
var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
})

peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
})

document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
})

document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value
    peer.send(yourMessage)
})

peer.on('data', function (data) {
    document.getElementById('messages').textContent += data + '\n'
})

function hasUserMedia() {
    //check if the browser supports the WebRTC
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);
}

if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia;

    //enabling video and audio channels
    navigator.getUserMedia({ video: true, audio: true }, function (s) {
        stream = s;
        var video = document.querySelector('video');

        //inserting our stream to the video tag
        video.src = window.URL.createObjectURL(stream);
    }, function (err) {});

} else {
    alert("WebRTC is not supported");
}

btnGetAudioTracks.addEventListener("click", function(){
    console.log("getAudioTracks");
    console.log(stream.getAudioTracks());
});

btnGetTrackById.addEventListener("click", function(){
    console.log("getTrackById");
    console.log(stream.getTrackById(stream.getAudioTracks()[0].id));
});

btnGetTracks.addEventListener("click", function(){
    console.log("getTracks()");
    console.log(stream.getTracks());
});

btnGetVideoTracks.addEventListener("click", function(){
    console.log("getVideoTracks()");
    console.log(stream.getVideoTracks());
});

btnRemoveAudioTrack.addEventListener("click", function(){
    console.log("removeAudioTrack()");
    stream.removeTrack(stream.getAudioTracks()[0]);
});

btnRemoveVideoTrack.addEventListener("click", function(){
    console.log("removeVideoTrack()");
    stream.removeTrack(stream.getVideoTracks()[0]);
});