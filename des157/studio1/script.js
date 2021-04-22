(function(){
    'use strict';

    const myForm = document.getElementById("myform");
    const madlib = document.getElementById("madlib");
    const words = [];

    myForm.addEventListener("submit", function(event){
       
        event.preventDefault();

        const formData = document.querySelectorAll("input[type=text]");
        processData(formData);
    })

    function processData(formData){
        let emptyFields = 0;

        for (const eachWord of formData){
            if (eachWord.value.trim()){
                words.push(eachWord.value);
                eachWord.value = "";
            } else {emptyFields++;}
        }

        if (emptyFields > 0){
            alert("Please fill out all fields");
        } else {
            makeMadlib(words);
        }
    }

    function makeMadlib(wordsArray){
        const text = `Words: ${wordsArray[0]}, ${wordsArray[1]}, ${wordsArray[2]}, ${wordsArray[3]}`;
        
        madlib.innerHTML = text;
    }
})();