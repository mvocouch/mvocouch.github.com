(function(){
    'use strict';

    class StoryBranch{
      constructor(text, options){
        this.text = text;
        this.options = options;
      }

      display_text(){
        const story_text = document.getElementById("text");
        story_text.innerHTML = this.text;
      }
    }

    class Card{
        constructor(name) {
          this.name = name;
          this.image = `<img src="images/${name}/card.png" id=${name} class="card">`;
          this.drawn = false;
        }
      }

    function build_deck(){
      const card_names = ["HERO", "SUN", "MOON", "QUEEN", "TIME"];
      let deck = [];

      card_names.forEach(card_name=>{
        deck.push(new Card(card_name));
      });

      return deck;
    }

    function animate_flip(card_img){
      const fps = 12;
      //Timeout delay in milliseconds
      const delay = 1000/fps;

      for (let i=1; i<=5; i++){
        setTimeout(function(){card_img.src = `images/BACK/000${i}.png`;}, i*delay);
      }

      for (let i=6; i<=9; i++){
        setTimeout(function(){card_img.src = `images/${card_img.id}/000${i}.png`}, i*delay);
      }
    }

    function draw_a_card(){
      let drawn_card = deck[Math.floor(Math.random() * deck.length)];
      // Redraw if the card has already been drawn
      while(drawn_card.drawn){
        drawn_card = deck[Math.floor(Math.random() * deck.length)];
      }
      drawn_card.drawn = true;
      return drawn_card;
    }

    //The story tree
    const tree = {
      "start": new StoryBranch("Who are you?", {"QUEEN":"royalty", "HERO":"peasant", "TIME":"elder", "SUN":"son", "MOON":"daughter"}),
      "royalty": new StoryBranch("You are a princess, born of royalty in a prosperous land. All your life you have been told that you are destined to one day be queen. But you dream of a different life...", {"HERO":"peasant", "TIME":"elder", "SUN":"son", "MOON":"daughter"}),
      "peasant": new StoryBranch("You are but a simple peasant living in the outskirts of the city near the woods. You live a simple life but you dream of more...", {"QUEEN":"royalty", "TIME":"elder", "SUN":"son", "MOON":"daughter"}),
      "elder": new StoryBranch("You have lived a long happy life, if perhaps a simple one. You have only known these woods, you cozy cottage, and the nearby village but you knew love for many years before your late spouse passed. You have almost no regrets, but if there was anything you could change...", {"QUEEN":"royalty", "HERO":"peasant", "SUN":"son", "MOON":"daughter"}),
      "son": new StoryBranch("You are the eldest son in a family of seven children. You live a simple but prosperous life with your family but you are nearing marrying age. You mother calls to you to make one request before you seek a spouse...", {"QUEEN":"royalty", "HERO":"peasant", "TIME":"elder", "SUN":"son", "MOON":"daughter"}),
      "daughter": new StoryBranch("You are the eldest daughter in a family of seven children. You live a simple but prosperous life with your family but you are nearing marrying age. You father calls to you to make one request before you seek a spouse...", {"QUEEN":"royalty", "HERO":"peasant", "TIME":"elder", "SUN":"son", "MOON":"daughter"}),
    };

    let current_branch = "start";
    //tree[current_branch].display_text();
    const deck = build_deck();
    const spread = document.getElementById("spread");
    
    for (let i = 0; i < 3; i++){
      const drawn_card = draw_a_card();
      //spread.innerHTML += `${drawn_card.image}`;
      spread.innerHTML += `<img src= "images/BACK/0001.png" id = "${drawn_card.name}" class = "card">`;
    }
    
    //For each of the cards in the document's spread, add an eventlistener
    document.querySelectorAll('.card').forEach(function(card_img, index){
      //Play animation for each card image

      deck.forEach(card=>{
        if (card.name == card_img.id){

          setTimeout(animate_flip, 1000*index, card_img);

          card_img.addEventListener('click', event => {
            //Draw a new card
            const drawn_card = draw_a_card();
            card_img.id=drawn_card.name;
            animate_flip(card_img);

            //Change the text according to the correct branch
            const next_branch = tree[current_branch].options[card.name]
            current_branch = next_branch;
            setTimeout(function(){tree[current_branch].display_text();}, 1200);
          });
        }
      }
    );
    

  }); 
})();