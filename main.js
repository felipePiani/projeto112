//ok
//deslike
//acenando
//https://teachablemachine.withgoogle.com/models/82SbDKccg/


prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/82SbDKccg/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "A primeira previsão é " + prediction_1;
  speak_data_2 = "E a segunda previsão é " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}

function check()
{
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}
function gotResult(error, results)
{
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_image").innerHTML = results[0].label;
    document.getElementById("result_emotion_image2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "ok") {
      document.getElementById("update_emoji").innerHTML = "👍";
    }
    if(results[0].label == "deslike") {
      document.getElementById("update_emoji").innerHTML = "👎";
    }
    if(results[0].label == "acenando") {
      document.getElementById("update_emoji").innerHTML = "👋";
    }

    if(results[1].label == "ok") {
      document.getElementById("update_emoji2").innerHTML = "👍";
    }
    if(results[1].label == "deslike") {
      document.getElementById("update_emoji2").innerHTML = "👎";
    }
    if(results[1].label == "acenando") {
      document.getElementById("update_emoji2").innerHTML = "👋";
    }

  }
}