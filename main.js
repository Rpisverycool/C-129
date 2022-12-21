song="";
scoreLeftWrist= 0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload() {
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized')
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#6666ff");
    stroke("#6666ff");

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    }
}

function play()
{
    song.play();
    song.setVolume(1)
    song.rate(1)

}
function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreleftWrist);

        leftWristX = results[0].poseNet.leftWrist.x;
        leftWristY = results[0].poseNet.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY = " + leftWristY)

        rightWristX = results[0].poseNet.rightWrist.x;
        rightWristY = results[0].poseNet.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + "rightWristY = " + rightWristY)
    }
}