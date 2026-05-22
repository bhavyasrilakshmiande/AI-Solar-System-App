function checkAnswer(answer){

  const result = document.getElementById("result");

  if(answer === "Mars"){
    result.innerHTML = "Correct!";
  }
  else{
    result.innerHTML = "Wrong Answer!";
  }

}
