(function(){
    'use strict';
    //Verify that the script is working
    console.log("reading js");

    //Gather all the buttons
    const start = document.querySelector('.start');
    const nextBtns = document.querySelectorAll('.next');
    const closeBtns = document.querySelectorAll('.center');
    const radioBtns = document.querySelectorAll('input[type=radio]');

    const evilFlowers = ["yellow carnation petals", "geranium petals", "meadowsweet", "black rose petals", "buttercup petals"]
    const goodFlowers = ["yellow begonia petals", "lavender", "white rose petals", "dandelion petals", "honeysuckle"]

    const ingredientAdj = ["crushed", "minced", "ground", "chopped"];
    const ingredientsEvil = ["eye of newt", "bat wings", "mandrake root", "adder's tongue", "fur of bat", "sparrow entrails", "fairy wings", "salamander feet", "viper's tooth", "scavenged bones"];
    const ingredientsGood = ["dandelion root", "clover", "allspice berries", "sage", "knotweed", "rosemary", "parsley", "thyme", "mugwort", "ginseng"];

    //Store the number of form sections so the code knows when you've reached the last section overlay
    const formSections = document.querySelectorAll('.myform section').length;

    //Store the current section the user is on
    let sectionNum = 1;

    //Store whether the user choose good or evil intentions for their spell
    let intentions;

    function randomChoice(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    function capitalize(string){
        if (typeof string !== "string"){
            return "";
        } else {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }

    //Funtion that displays the madlib to be called when the last overlay is closed
    function displayOutput(){

        //Get all madlib entries
        const target = document.querySelector('input[name=target]').value;
        const noun1 = document.querySelector('input[name="noun1"]').value.toLowerCase();
        const noun2 = document.querySelector('input[name="noun2"]').value.toLowerCase();
        const place = document.querySelector('input[name="place"]').value.toLowerCase();
        const scent = document.querySelector('input[name="scent"]').value.toLowerCase();

        let flower;
        let ingredientList;
        let ingredientAdj1;
        let ingredient1;
        let ingredientAdj2;
        let ingredient2;

        //Make random flower choice
        if (intentions ==="evil"){
            flower = randomChoice(evilFlowers);
            ingredientList = ingredientsEvil;

        } else {
            flower = randomChoice(goodFlowers);
            ingredientList = ingredientsGood;
        }

        ingredientAdj1 = randomChoice(ingredientAdj);
        ingredient1 = randomChoice(ingredientList);

        ingredientAdj2 = randomChoice(ingredientAdj);
        ingredient2 = randomChoice(ingredientList);

        while (ingredientAdj1 == ingredientAdj2){
            ingredientAdj2 = randomChoice(ingredientAdj);
        }

        while (ingredient1 == ingredient2){
            ingredient2 = randomChoice(ingredientList);
        }

        //Set the output section to showing (as opposed to hidden)
        document.getElementById('output').className = 'output showing';
        
        const potionTitle = `<h3>Potion of ${capitalize(noun1)} for ${target}<h3>`;
        const ingredients = `<ul><li>Ingredients:</li><li>${target}'s ${noun2}</li><li>A sachet of dried ${flower}</li><li>${capitalize(ingredientAdj1.concat(" ", ingredient1))}</li><li>${capitalize(ingredientAdj2.concat(" ", ingredient2))}</li></ul>`;
        const instructions1 = `<p>To draw energies of ${noun1} into the life of ${target} gather the ingredients listed above.<br> Make a small altar at ${place} and steep the dried ${flower},<br>${ingredientAdj1.concat(" ", ingredient1)}, and ${ingredientAdj2.concat(" ", ingredient2)} in a tea.<br>Place the ${noun2} and the tea at the altar.<br>Introduce ${scent} into the air by lighting a candle or an incense or by wafting an object<br> scented with ${scent} through the air and speak the incantation:</p>`;
        
        let incantation;

        if (intentions === "evil"){
            incantation = `<p>With ${ingredient1} ${ingredientAdj1},<br>${ingredient2} ${ingredientAdj2},<br>and with ${flower} dried, <br>I speak to you, Dark Forces, and I guide, <br>To the one called ${target}, it is they I draw you to,<br>So upon their drinking of this brew,<br>Bind them, curse them to an inevitable fate of ${noun1},<br>Bind them, curse them to an inevitable fate of ${noun1},<br>Bind them, curse them to an inevitable fate of ${noun1}!</p>`;
        } else {
            incantation = `<p>With ${ingredient1} ${ingredientAdj1},<br>${ingredient2} ${ingredientAdj2},<br>and ${flower} dried,<br>I speak to you, Forces of Light, and I guide, <br>To the one called ${target}, it is they I draw you to,<br>So upon their drinking of this brew,<br>Bless them, grant them with the fortunate fate of ${noun1},<br>Bless them, grant them with the fortunate fate of ${noun1},<br>Bless them, grant them with the fortunate fate of ${noun1}!</p>`;
        }

        const instructions2 = `<p>With these steps your potion is now imbued with your ${intentions} intentions.<br>Ensure the drinker imbibes the potion by midnight<br>on the evening of the next new moon.<br><br>Your wishes will be brought to bear by the end of the following lunar cycle.</p>`

        let potionRecipe = potionTitle.concat(ingredients, instructions1, incantation, instructions2);

        document.querySelector('.output article').innerHTML = potionRecipe;
        
    };

    //Function to check if a given input is currently empty to be called when the "Next" button is clicked.
    function notEmpty(num){
        if (num==1){
            if (intentions == null){
                return false;
            }
            else{
                return true;
            }
        }
        else
        {
            const valueToCheck = document.getElementById(`q${num}`).querySelector('article input').value;
            if (valueToCheck == ""){
                return false;
            }
            else{
                return true;
            }
        }
        
    }

    //Display overlay when the start button is clicked
    start.addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector(`.q${sectionNum}`).className = `q${sectionNum} showing`;
    })

    function onNextButton(num){
        //If the user has filled out the entry for this section
        if (notEmpty(num)){
            //Hide the current overlay
            document.getElementById(`q${num}`).className = `q${num} hidden`;

            //Check that this is not the last form section
            if(sectionNum+1<=formSections){
                //If it's not the last section then go to the next section
                sectionNum++;
                document.getElementById(`q${sectionNum}`).className = `q${sectionNum} showing`;

                const nextInput = document.getElementById(`q${sectionNum}`).querySelector('article input');
                nextInput.focus();

            }else{
                //If it is the last section hide the start button and move the Cauldron graphic over to the left to make room for the output
                document.getElementById('start').className = 'start hidden';
                document.querySelector('header').style.left = "0%";
                document.querySelector('header').style.transform = "translateX(20%)";
            
                //Display the output madlib
                displayOutput();
            }
        }else{
            //If the user has not filled out the entry for this section alert the user
            alert("Must enter a value before continuing.");
        }
    }

    //Go to the next overlay when a next button is clicked.
    for (const eachBtn of nextBtns) {
        eachBtn.addEventListener('click', function(event){
            event.preventDefault();

            //Store the id number that tells the code which form section is showing
            const thisBtn = event.target.id;

            onNextButton(thisBtn);
        });
    }

    //Hide the current form section if the overlay is clicked.
    for (const eachBtn of closeBtns) {
        eachBtn.addEventListener('click', function(event){
            event.preventDefault();
            const thisBtn = event.target.id;
            document.getElementById(`q${thisBtn}`).className = `q${thisBtn} hidden`;
        });
    }

    //If the user hits escape close the current form section by hiding it.
    //If the user hits enter while an overlay is open trigger onNextButton()
    document.addEventListener('keydown', function(event){
        if (event.key === 'Escape'){
            event.preventDefault();
            document.getElementById(`q${sectionNum}`).className = `q${sectionNum} hidden`;
        }
        else if (event.key === 'Enter' && document.getElementsByClassName(`q${sectionNum} showing`) !== null){
            onNextButton(sectionNum);
        }
    });

    //When the radio buttons are click set the user's intentions accordingly.
    for (const eachBtn of radioBtns){
        eachBtn.addEventListener('click', function(event){
            intentions = event.target.id;
            
            //Change the following questions to reflect the user's intentions
            if (intentions === "good"){
                document.querySelector('.q2 h3').innerHTML = "What is the name of the fortunate soul you intend to give this potion to?";
                document.querySelector('.q3 input[type="text"]').placeholder = "Noun: Love";
                document.querySelector('.q4 h3').innerHTML = "You will need an ingredient which embodies the essence of your target.<br> What will you use?";
            }
            else if (intentions === "evil"){
                document.querySelector('.q2 h3').innerHTML = "What is the name of the unfortunate soul you intend to give this potion to?";
                document.querySelector('.q3 input[type="text"]').placeholder = "Noun: Vengeance";
                document.querySelector('.q4 h3').innerHTML = "You will need an ingredient which embodies the essence of your victim.<br> What will you use?";
            }
            else{
                console.log("Something went wrong with the Intentions Radio Buttons")
            }
        });
    }
})();