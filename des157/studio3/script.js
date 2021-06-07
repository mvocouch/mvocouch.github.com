(function(){
    'use strict';

    class StoryBranch{
      constructor(text, options){
        this.text = text;
        this.options = options;
      }

      display_text(){
        const story_text = document.getElementById("text");
        story_text.style.opacity = 0.0;
        story_text.innerHTML = this.text;
        for (let i=1; i<=10; i++){
          setTimeout(function(){story_text.style.opacity = i/10;}, 80*i)
        }
      }

      update_variants(){
        this.variants.forEach(variant=>{});
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

    function flip_sound(){
      console.log("flip!")
      const flip = new Audio("flip_sound.mp3");
      flip.loop = false;
      flip.play();
    }

    function animate_flip(card_img){
      flip_sound();
      //Animation frames per second
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
      "start": new StoryBranch("It is the beginning of your journey and we weave the first thread in the tapestry of your fate. Pray tell, Stranger, who are you...?", {"QUEEN":"QUEEN", "HERO":"HERO", "TIME":"TIME", "SUN":"SUN", "MOON":"MOON"}),
      
      //Start Branches
      "QUEEN": new StoryBranch("You are a princess, born of royalty in a prosperous land. All your life you have been told that you are destined to one day be queen. But you have always dreamed of a different life beyond these castle walls. What lies beyond waiting for you there and do you have the courage to seek it...?", {"HERO":"QUEEN HERO", "TIME":"QUEEN TIME", "SUN":"QUEEN SUN", "MOON":"QUEEN MOON"}),
      "HERO": new StoryBranch("You are but a simple peasant living in the outskirts of the city near the woods. You live a simple life at the convent where you were left as a babe, helping the Sisters tend to the gardens and church. But after meeting a strange traveler who seeks refuge from the rain on a stormy night you learn of the wonders of the world. What more might the world have in store for you if you have the courage to seek it...?", {"QUEEN":"HERO QUEEN", "TIME":"HERO TIME", "SUN":"HERO SUN", "MOON":"HERO MOON"}),
      "TIME": new StoryBranch("You have lived a long happy life, if perhaps a simple one. For many years you have only known these woods, your cozy cottage, and the nearby village but you have known love and contentment throughout your years. Recently your spouse has passed away and you have come to reflect upon your life. You have almost no regrets, but if there was anything you could change, perhaps...?", {"QUEEN":"TIME QUEEN", "HERO":"TIME HERO", "SUN":"TIME SUN", "MOON":"TIME MOON"}),
      "SUN": new StoryBranch("You are the eldest son in a family of seven children, born on a quaint farm. You live a simple but prosperous life with your family but you are nearing marrying age. One day your mother gifts you a beautiful feather quill. She informs you that she would very much like for you to find a marriage partner locally and to settle down on the family farm but she stresses that whatever her desires may be, only you can write the story of your life. But what will your story be...?", {"QUEEN":"SUN QUEEN", "HERO":"SUN HERO", "TIME":"SUN TIME", "MOON":"SUN MOON"}),
      "MOON": new StoryBranch("You are the eldest daughter in a family of seven children, born on a quaint farm. You live a simple but prosperous life with your family but you are nearing marrying age. One day your father gifts you a beautiful feather quill. He informs you that he would very much like for you to find a marriage partner locally and to settle down on the family farm but he stresses that whatever his desires may be, only you can write the story of your life. But what will your story be...?", {"QUEEN":"MOON QUEEN", "HERO":"MOON HERO", "TIME":"MOON TIME", "SUN":"MOON SUN"}),
      
      //Second Queen Branches
      "QUEEN HERO": new StoryBranch("QUEEN HERO place holder text", {"TIME":"QUEEN HERO TIME", "SUN":"QUEEN HERO SUN", "MOON":"QUEEN HERO MOON"}),
      "QUEEN TIME": new StoryBranch("QUEEN TIME place holder text", {"HERO":"QUEEN TIME HERO", "SUN":"QUEEN TIME SUN", "MOON":"QUEEN TIME MOON"}),
      "QUEEN SUN": new StoryBranch("QUEEN SUN place holder text", {"TIME":"QUEEN SUN TIME", "HERO":"QUEEN SUN HERO", "MOON":"QUEEN SUN MOON"}),
      "QUEEN MOON": new StoryBranch("QUEEN MOON place holder text", {"HERO":"QUEEN MOON HERO","TIME":"QUEEN MOON TIME","SUN":"QUEEN MOON SUN"}),

      //Second Hero Branches
      "HERO QUEEN": new StoryBranch("HERO QUEEN place holder text", {"TIME":"HERO QUEEN TIME", "SUN":"HERO QUEEN SUN", "MOON":"HERO QUEEN MOON"}),
      "HERO TIME": new StoryBranch("HERO TIME place holder text", {"QUEEN":"HERO TIME QUEEN", "SUN":"HERO TIME SUN", "MOON":"HERO TIME MOON"}),
      "HERO SUN": new StoryBranch("HERO SUN place holder text", {"QUEEN":"HERO SUN QUEEN", "TIME":"HERO SUN TIME", "MOON":"HERO SUN MOON"}),
      "HERO MOON": new StoryBranch("HERO MOON place holder text", {"QUEEN":"HERO MOON QUEEN", "TIME":"HERO MOON TIME", "SUN":"HERO MOON SUN"}),
      
      //Second Time Branches
      "TIME QUEEN": new StoryBranch("TIME QUEEN place holder text", {"HERO":"TIME QUEEN HERO", "SUN":"TIME QUEEN SUN", "MOON":"TIME QUEEN MOON"}),
      "TIME HERO": new StoryBranch("TIME HERO place holder text", {"QUEEN":"TIME HERO QUEEN", "SUN":"TIME HERO SUN", "MOON":"TIME HERO MOON"}),
      "TIME SUN": new StoryBranch("TIME SUN place holder text", {"QUEEN":"TIME SUN QUEEN", "HERO":"TIME SUN HERO", "MOON":"TIME SUN MOON"}),
      "TIME MOON": new StoryBranch("TIME MOON place holder text", {"QUEEN":"TIME MOON QUEEN", "HERO":"TIME MOON HERO", "SUN":"TIME MOON SUN"}),

      //Second Sun Branches
      "SUN QUEEN": new StoryBranch("How can one write one’s story if they know nothing of the world? Perhaps the time has come for you to learn more of the world. You will take this quill, and seek higher education in the collegiate town nearby.", {"HERO":"SUN QUEEN HERO", "TIME":"SUN QUEEN TIME", "MOON":"SUN QUEEN MOON"}),
      "SUN HERO": new StoryBranch("SUN HERO place holder text", {"QUEEN":"SUN HERO QUEEN", "TIME":"SUN HERO TIME", "MOON":"SUN HERO MOON"}),
      "SUN TIME": new StoryBranch("You agree to live on the family farm, get married, and in your old age retire to a cottage in the woods. You have lived a long happy life, if perhaps a simple one. For many years you have only known these woods, your cozy cottage, and the nearby village but you have known love and contentment throughout your years. Recently your spouse has passed away and you have come to reflect upon your life. You have almost no regrets, but if there was anything you could change, perhaps...?", {"QUEEN":"SUN TIME QUEEN", "HERO":"SUN TIME HERO", "MOON":"SUN TIME MOON"}),
      "SUN MOON": new StoryBranch("SUN MOON place holder text", {"QUEEN":"SUN MOON QUEEN", "HERO":"SUN MOON HERO", "TIME":"SUN MOON TIME"}),

      
      //Second Moon Branches
      "MOON QUEEN": new StoryBranch("How can one write one’s story if they know nothing of the world? Perhaps the time has come for you to learn more of the world. You will take this quill, and seek higher education in the collegiate town nearby.", {"HERO":"MOON QUEEN HERO", "TIME":"MOON QUEEN TIME", "SUN":"MOON QUEEN SUN"}),
      "MOON HERO": new StoryBranch("MOON HERO place holder text", {"QUEEN":"MOON HERO QUEEN", "TIME":"MOON HERO TIME", "SUN":"MOON HERO SUN"}),
      "MOON TIME": new StoryBranch("You agree to live on the family farm, get married, and in your old age retire to a cottage in the woods. You have lived a long happy life, if perhaps a simple one. For many years you have only known these woods, your cozy cottage, and the nearby village but you have known love and contentment throughout your years. Recently your spouse has passed away and you have come to reflect upon your life. You have almost no regrets, but if there was anything you could change, perhaps...?", {"QUEEN":"MOON TIME QUEEN", "HERO":"MOON TIME QUEEN", "SUN":"MOON TIME QUEEN"}),
      "MOON SUN": new StoryBranch("MOON SUN place holder text", {"QUEEN":"MOON SUN QUEEN", "HERO":"MOON SUN QUEEN", "TIME":"MOON SUN TIME"}),
      

      //Third Queen Branches
      "QUEEN TIME HERO": new StoryBranch("QUEEN TIME HERO place holder text", {"SUN":"QUEEN TIME HERO SUN MOON","MOON":"QUEEN TIME HERO MOON SUN"}),
      "QUEEN SUN HERO": new StoryBranch("QUEEN SUN HERO place holder text", {"TIME":"QUEEN SUN HERO TIME MOON","MOON":"QUEEN SUN HERO MOON TIME"}),
      "QUEEN MOON HERO": new StoryBranch("QUEEN MOON HERO place holder text", {"TIME":"QUEEN MOON HERO TIME SUN","SUN":"QUEEN MOON HERO SUN TIME"}),

      "QUEEN HERO TIME": new StoryBranch("QUEEN HERO TIME place holder text", {"SUN":"QUEEN HERO TIME SUN MOON", "MOON":"QUEEN HERO TIME MOON SUN"}),
      "QUEEN SUN TIME": new StoryBranch("QUEEN SUN TIME place holder text", {"HERO":"QUEEN SUN TIME HERO MOON", "MOON":"QUEEN SUN TIME MOON HERO"}),
      "QUEEN MOON TIME": new StoryBranch("QUEEN MOON TIME place holder text", {"HERO":"QUEEN MOON TIME HERO SUN", "SUN":"QUEEN MOON TIME SUN HERO"}),

      "QUEEN HERO SUN": new StoryBranch("QUEEN HERO SUN place holder text", {"TIME":"QUEEN HERO SUN TIME MOON", "MOON":"QUEEN HERO SUN MOON TIME"}),
      "QUEEN TIME SUN": new StoryBranch("QUEEN TIME SUN place holder text", {"HERO":"QUEEN TIME SUN HERO MOON", "MOON":"QUEEN TIME SUN MOON HERO"}),
      "QUEEN MOON SUN": new StoryBranch("QUEEN MOON SUN place holder text", {"HERO":"QUEEN MOON SUN HERO TIME", "TIME":"QUEEN MOON SUN TIME HERO"}),

      "QUEEN HERO MOON": new StoryBranch("QUEEN HERO MOON place holder text", {"TIME":"QUEEN HERO MOON TIME SUN", "SUN":"QUEEN HERO MOON SUN TIME"}),
      "QUEEN TIME MOON": new StoryBranch("QUEEN TIME MOON place holder text", {"HERO":"QUEEN TIME MOON HERO SUN", "SUN":"QUEEN TIME MOON SUN HERO"}),
      "QUEEN SUN MOON": new StoryBranch("QUEEN SUN MOON place holder text", {"HERO":"QUEEN SUN MOON HERO TIME", "TIME":"QUEEN SUN MOON TIME HERO"}),
      
      //Third Hero Branches
      "HERO TIME QUEEN": new StoryBranch("HERO TIME QUEEN place holder text", {"SUN":"HERO TIME QUEEN SUN MOON", "MOON":"HERO TIME QUEEN MOON SUN"}),
      "HERO SUN QUEEN": new StoryBranch("HERO SUN QUEEN place holder text", {"TIME":"HERO SUN QUEEN TIME MOON", "MOON":"HERO SUN QUEEN MOON TIME"}),
      "HERO MOON QUEEN": new StoryBranch("HERO MOON QUEEN place holder text", {"TIME":"HERO MOON QUEEN TIME SUN", "SUN":"HERO MOON QUEEN SUN TIME"}),

      "HERO QUEEN TIME": new StoryBranch("HERO QUEEN TIME place holder text", {"SUN":"HERO QUEEN TIME SUN MOON","MOON":"HERO QUEEN TIME SUN MOON"}),
      "HERO SUN TIME": new StoryBranch("HERO SUN TIME place holder text", {"QUEEN":"HERO SUN TIME QUEEN MOON", "MOON":"HERO SUN TIME MOON QUEEN"}),
      "HERO MOON TIME": new StoryBranch("HERO MOON TIME place holder text", {"QUEEN":"HERO MOON TIME QUEEN SUN", "SUN":"HERO MOON TIME SUN QUEEN"}),

      "HERO QUEEN SUN": new StoryBranch("HERO QUEEN SUN place holder text", {"TIME":"HERO QUEEN SUN TIME MOON", "MOON":"HERO QUEEN SUN MOON TIME"}),
      "HERO TIME SUN": new StoryBranch("HERO TIME SUN place holder text", {"QUEEN":"HERO TIME SUN QUEEN MOON", "MOON":"HERO TIME SUN MOON QUEEN"}),
      "HERO MOON SUN": new StoryBranch("HERO MOON SUN place holder text", {"QUEEN":"HERO MOON SUN QUEEN TIME", "TIME":"HERO MOON SUN TIME QUEEN"}),

      "HERO QUEEN MOON": new StoryBranch("HERO QUEEN MOON place holder text", {"TIME":"HERO QUEEN MOON TIME SUN", "SUN":"HERO QUEEN MOON SUN TIME"}),
      "HERO TIME MOON": new StoryBranch("HERO TIME MOON place holder text", {"QUEEN":"HERO TIME MOON QUEEN SUN", "SUN":"HERO TIME MOON SUN QUEEN"}),
      "HERO SUN MOON": new StoryBranch("HERO SUN MOON place holder text", {"QUEEN":"HERO SUN MOON QUEEN TIME", "TIME":"HERO SUN MOON TIME QUEEN"}),
      
      //Third Sun Branches
      "SUN HERO QUEEN": new StoryBranch("SUN HERO QUEEN place holder text", {"TIME":"SUN HERO QUEEN TIME MOON", "MOON":"SUN HERO QUEEN MOON TIME"}),
      "SUN TIME QUEEN": new StoryBranch("SUN TIME QUEEN place holder text", {"HERO":"SUN TIME QUEEN HERO MOON", "MOON":"SUN TIME QUEEN MOON HERO"}),
      "SUN MOON QUEEN": new StoryBranch("SUN MOON QUEEN place holder text", {"HERO":"SUN MOON QUEEN HERO TIME", "TIME":"SUN MOON QUEEN TIME HERO"}),
      
      "SUN QUEEN HERO": new StoryBranch("SUN QUEEN HERO place holder text", {"TIME":"SUN QUEEN HERO TIME MOON", "MOON":"SUN QUEEN HERO MOON TIME"}),
      "SUN TIME HERO": new StoryBranch("SUN TIME HERO place holder text", {"QUEEN":"SUN TIME HERO QUEEN MOON", "MOON":"SUN TIME HERO MOON QUEEN"}),
      "SUN MOON HERO": new StoryBranch("SUN MOON HERO place holder text", {"QUEEN":"SUN MOON HERO QUEEN TIME", "TIME":"SUN MOON HERO TIME QUEEN"}),
      
      "SUN HERO MOON": new StoryBranch("SUN HERO MOON place holder text", {"QUEEN":"SUN HERO MOON QUEEN TIME", "TIME":"SUN HERO MOON TIME QUEEN"}),
      "SUN HERO TIME": new StoryBranch("SUN HERO TIME place holder text", {"QUEEN":"SUN HERO TIME QUEEN MOON", "MOON":"SUN HERO TIME MOON QUEEN"}),
      "SUN MOON TIME": new StoryBranch("SUN MOON TIME place holder text", {"QUEEN":"SUN MOON TIME QUEEN HERO", "HERO":"SUN MOON TIME HERO QUEEN"}),
      
      "SUN QUEEN MOON": new StoryBranch("SUN QUEEN MOON place holder text", {"HERO":"SUN QUEEN MOON HERO TIME", "TIME":"SUN QUEEN MOON TIME HERO"}),
      "SUN HERO MOON": new StoryBranch("SUN HERO MOON place holder text", {"QUEEN":"SUN HERO MOON QUEEN TIME", "TIME":"SUN HERO MOON TIME QUEEN"}),
      "SUN TIME MOON": new StoryBranch("SUN TIME MOON place holder text", {"QUEEN":"SUN TIME MOON QUEEN HERO", "HERO":"SUN TIME MOON HERO QUEEN"}),
      
      //Third Moon Branches
      "MOON HERO QUEEN": new StoryBranch("MOON HERO QUEEN place holder text", {"TIME":"MOON HERO QUEEN TIME SUN", "SUN":"MOON HERO QUEEN SUN TIME"}),
      "MOON TIME QUEEN": new StoryBranch("MOON TIME QUEEN place holder text", {"HERO":"MOON TIME QUEEN HERO SUN", "SUN":"MOON TIME QUEEN SUN HERO"}),
      "MOON SUN QUEEN": new StoryBranch("MOON SUN QUEEN place holder text", {"HERO":"MOON SUN QUEEN HERO TIME", "TIME":"MOON SUN QUEEN TIME HERO"}),

      "MOON QUEEN HERO": new StoryBranch("MOON QUEEN HERO place holder text", {"TIME":"MOON QUEEN HERO TIME SUN", "SUN":"MOON QUEEN HERO SUN TIME"}),
      "MOON TIME HERO": new StoryBranch("MOON TIME HERO place holder text", {"QUEEN":"MOON TIME HERO QUEEN SUN", "SUN":"MOON TIME HERO SUN QUEEN"}),
      "MOON SUN HERO": new StoryBranch("MOON SUN HERO place holder text", {"QUEEN":"MOON SUN HERO QUEEN TIME", "TIME":"MOON SUN HERO TIME QUEEN"}),

      "MOON QUEEN TIME": new StoryBranch("MOON QUEEN TIME place holder text", {"HERO":"MOON QUEEN TIME HERO SUN", "SUN":"MOON QUEEN TIME SUN HERO"}),
      "MOON HERO TIME": new StoryBranch("MOON HERO TIME place holder text", {"QUEEN":"MOON HERO TIME QUEEN SUN", "SUN":"MOON HERO TIME SUN QUEEN"}),
      "MOON SUN TIME": new StoryBranch("MOON SUN TIME place holder text", {"QUEEN":"MOON SUN TIME QUEEN HERO", "HERO":"MOON SUN TIME HERO QUEEN"}),

      "MOON QUEEN SUN": new StoryBranch("MOON QUEEN SUN place holder text", {"HERO":"MOON QUEEN SUN HERO TIME", "TIME":"MOON QUEEN SUN TIME HERO"}),
      "MOON HERO SUN": new StoryBranch("MOON HERO SUN place holder text", {"QUEEN":"MOON HERO SUN QUEEN TIME", "TIME":"MOON HERO SUN TIME QUEEN"}),
      "MOON TIME SUN": new StoryBranch("MOON TIME SUN place holder text", {"QUEEN":"MOON TIME SUN QUEEN HERO", "HERO":"MOON TIME SUN HERO QUEEN"}),

      //Fourth Queen Branches
      "QUEEN TIME HERO SUN MOON": new StoryBranch("QUEEN TIME HERO SUN MOON place holder text", {}),
      "QUEEN TIME HERO MOON SUN": new StoryBranch("QUEEN TIME HERO MOON SUN place holder text", {}),
      
      "QUEEN SUN HERO TIME MOON": new StoryBranch("QUEEN SUN HERO TIME MOON place holder text", {}),
      "QUEEN SUN HERO MOON TIME": new StoryBranch("QUEEN SUN HERO MOON TIME place holder text", {}),

      "QUEEN MOON HERO TIME SUN": new StoryBranch("QUEEN MOON HERO TIME SUN place holder text", {}),
      "QUEEN MOON HERO SUN TIME": new StoryBranch("QUEEN MOON HERO SUN TIME place holder text", {}),

      "QUEEN HERO TIME SUN MOON": new StoryBranch("QUEEN HERO TIME SUN MOON place holder text", {}),
      "QUEEN HERO TIME MOON SUN": new StoryBranch("QUEEN HERO TIME MOON SUN place holder text", {}),
      
      "QUEEN SUN TIME HERO MOON": new StoryBranch("QUEEN SUN TIME HERO MOON place holder text", {}),
      "QUEEN SUN TIME MOON HERO": new StoryBranch("QUEEN SUN TIME MOON HERO place holder text", {}),
      
      "QUEEN MOON TIME HERO SUN": new StoryBranch("QUEEN MOON TIME HERO SUN place holder text", {}),
      "QUEEN MOON TIME SUN HERO": new StoryBranch("QUEEN MOON TIME SUN HERO place holder text", {}),

      "QUEEN HERO SUN TIME MOON": new StoryBranch("QUEEN HERO SUN TIME MOON place holder text", {}),
      "QUEEN HERO SUN MOON TIME": new StoryBranch("QUEEN HERO SUN MOON TIME place holder text", {}),
      
      "QUEEN TIME SUN HERO MOON": new StoryBranch("QUEEN TIME SUN HERO MOON place holder text", {}),
      "QUEEN TIME SUN MOON HERO": new StoryBranch("QUEEN TIME SUN MOON HERO place holder text", {}),
      
      "QUEEN MOON SUN HERO TIME": new StoryBranch("QUEEN MOON SUN HERO TIME place holder text", {}),
      "QUEEN MOON SUN TIME HERO": new StoryBranch("QUEEN MOON SUN TIME HERO place holder text", {}),

      "QUEEN HERO MOON TIME SUN": new StoryBranch("QUEEN HERO MOON TIME SUN place holder text", {},),
      "QUEEN HERO MOON SUN TIME": new StoryBranch("QUEEN HERO MOON SUN TIME place holder text", {},),
      
      "QUEEN TIME MOON HERO SUN": new StoryBranch("QUEEN TIME MOON HERO SUN place holder text", {}),
      "QUEEN TIME MOON SUN HERO": new StoryBranch("QUEEN TIME MOON SUN HERO place holder text", {}),
      
      "QUEEN SUN MOON HERO TIME": new StoryBranch("QUEEN SUN MOON HERO TIME place holder text", {}),
      "QUEEN SUN MOON TIME HERO": new StoryBranch("QUEEN SUN MOON TIME HERO place holder text", {}),
      
      //Fourth Hero Branches
      "HERO TIME QUEEN SUN MOON": new StoryBranch("HERO TIME QUEEN SUN MOON place holder text", {}),
      "HERO TIME QUEEN MOON SUN": new StoryBranch("HERO TIME QUEEN MOON SUN place holder text", {}),
      
      "HERO SUN QUEEN TIME MOON": new StoryBranch("HERO SUN QUEEN TIME MOON place holder text", {}),
      "HERO SUN QUEEN MOON TIME": new StoryBranch("HERO SUN QUEEN MOON TIME place holder text", {}),
      
      "HERO MOON QUEEN TIME SUN": new StoryBranch("HERO MOON QUEEN TIME SUN place holder text", {}),
      "HERO MOON QUEEN SUN TIME": new StoryBranch("HERO MOON QUEEN SUN TIME place holder text", {}),

      "HERO QUEEN TIME SUN MOON": new StoryBranch("HERO QUEEN TIME SUN MOON place holder text", {}),
      "HERO QUEEN TIME MOON SUN": new StoryBranch("HERO QUEEN TIME MOON SUN place holder text", {}),
      
      "HERO SUN TIME QUEEN MOON": new StoryBranch("HERO SUN TIME QUEEN MOON place holder text", {}),
      "HERO SUN TIME MOON QUEEN": new StoryBranch("HERO SUN TIME MOON QUEEN place holder text", {}),
      
      "HERO MOON TIME QUEEN SUN": new StoryBranch("HERO MOON TIME QUEEN SUN place holder text", {}),
      "HERO MOON TIME SUN QUEEN": new StoryBranch("HERO MOON TIME SUN QUEEN place holder text", {}),

      "HERO QUEEN SUN TIME MOON": new StoryBranch("HERO QUEEN SUN TIME MOON place holder text", {}),
      "HERO QUEEN SUN MOON TIME": new StoryBranch("HERO QUEEN SUN MOON TIME place holder text", {}),
      
      "HERO TIME SUN QUEEN MOON": new StoryBranch("HERO TIME SUN QUEEN MOON place holder text", {}),
      "HERO TIME SUN MOON QUEEN": new StoryBranch("HERO TIME SUN MOON QUEEN place holder text", {}),
      
      "HERO MOON SUN QUEEN TIME": new StoryBranch("HERO MOON SUN QUEEN TIME place holder text", {}),
      "HERO MOON SUN TIME QUEEN": new StoryBranch("HERO MOON SUN TIME QUEEN place holder text", {}),

      "HERO QUEEN MOON TIME SUN": new StoryBranch("HERO QUEEN MOON TIME SUN place holder text", {}),
      "HERO QUEEN MOON SUN TIME": new StoryBranch("HERO QUEEN MOON SUN TIME place holder text", {}),
      
      "HERO TIME MOON QUEEN SUN": new StoryBranch("HERO TIME MOON QUEEN SUN place holder text", {}),
      "HERO TIME MOON SUN QUEEN": new StoryBranch("HERO TIME MOON SUN QUEEN place holder text", {}),
      
      "HERO SUN MOON QUEEN TIME": new StoryBranch("HERO SUN MOON QUEEN TIME place holder text", {}),
      "HERO SUN MOON TIME QUEEN": new StoryBranch("HERO SUN MOON TIME QUEEN place holder text", {}),

      //Fourth Sun Branches
      "SUN HERO QUEEN TIME MOON": new StoryBranch("SUN HERO QUEEN TIME MOON place holder text", {}),
      "SUN HERO QUEEN MOON TIME": new StoryBranch("SUN HERO QUEEN MOON TIME place holder text", {}),
      
      "SUN TIME QUEEN HERO MOON": new StoryBranch("SUN TIME QUEEN HERO MOON place holder text", {}),
      "SUN TIME QUEEN MOON HERO": new StoryBranch("SUN TIME QUEEN MOON HERO place holder text", {}),
      
      "SUN MOON QUEEN HERO TIME": new StoryBranch("SUN MOON QUEEN HERO TIME place holder text", {}),
      "SUN MOON QUEEN TIME HERO": new StoryBranch("SUN MOON QUEEN TIME HERO place holder text", {}),
      
      "SUN QUEEN HERO TIME MOON": new StoryBranch("SUN QUEEN HERO TIME MOON place holder text", {}),
      "SUN QUEEN HERO MOON TIME": new StoryBranch("SUN QUEEN HERO MOON TIME place holder text", {}),
      
      "SUN TIME HERO QUEEN MOON": new StoryBranch("SUN TIME HERO QUEEN MOON place holder text", {}),
      "SUN TIME HERO MOON QUEEN": new StoryBranch("SUN TIME HERO MOON QUEEN place holder text", {}),
      
      "SUN MOON HERO QUEEN TIME": new StoryBranch("SUN MOON HERO QUEEN TIME place holder text", {}),
      "SUN MOON HERO TIME QUEEN": new StoryBranch("SUN MOON HERO TIME QUEEN place holder text", {}),
      
      "SUN QUEEN TIME HERO MOON": new StoryBranch("SUN QUEEN TIME HERO MOON place holder text", {}),
      "SUN QUEEN TIME MOON HERO": new StoryBranch("SUN QUEEN TIME MOON HERO place holder text", {}),
      
      "SUN HERO TIME QUEEN MOON": new StoryBranch("SUN HERO TIME QUEEN MOON place holder text", {}),
      "SUN HERO TIME MOON QUEEN": new StoryBranch("SUN HERO TIME MOON QUEEN place holder text", {}),
      
      "SUN MOON TIME QUEEN HERO": new StoryBranch("SUN MOON TIME QUEEN HERO place holder text", {}),
      "SUN MOON TIME HERO QUEEN": new StoryBranch("SUN MOON TIME HERO QUEEN place holder text", {}),
      
      "SUN QUEEN MOON HERO TIME": new StoryBranch("SUN QUEEN MOON HERO TIME place holder text", {}),
      "SUN QUEEN MOON TIME HERO": new StoryBranch("SUN QUEEN MOON TIME HERO place holder text", {}),
      
      "SUN HERO MOON QUEEN TIME": new StoryBranch("SUN HERO MOON QUEEN TIME place holder text", {}),
      "SUN HERO MOON TIME QUEEN": new StoryBranch("SUN HERO MOON TIME QUEEN place holder text", {}),
      
      "SUN TIME MOON QUEEN HERO": new StoryBranch("SUN TIME MOON QUEEN HERO place holder text", {}),
      "SUN TIME MOON HERO QUEEN": new StoryBranch("SUN TIME MOON HERO QUEEN place holder text", {}),

      //Fourth Moon Branches
      "MOON HERO QUEEN TIME SUN": new StoryBranch("MOON HERO QUEEN TIME SUN place holder text", {}),
      "MOON HERO QUEEN SUN TIME": new StoryBranch("MOON HERO QUEEN SUN TIME place holder text", {}),

      "MOON TIME QUEEN HERO SUN": new StoryBranch("MOON TIME QUEEN HERO SUN place holder text", {}),
      "MOON TIME QUEEN SUN HERO": new StoryBranch("MOON TIME QUEEN SUN HERO place holder text", {}),
      
      "MOON SUN QUEEN HERO TIME": new StoryBranch("MOON SUN QUEEN HERO TIME place holder text", {}),
      "MOON SUN QUEEN TIME HERO": new StoryBranch("MOON SUN QUEEN TIME HERO place holder text", {}),

      "MOON QUEEN HERO TIME SUN": new StoryBranch("MOON QUEEN HERO TIME SUN place holder text", {}),
      "MOON QUEEN HERO SUN TIME": new StoryBranch("MOON QUEEN HERO SUN TIME place holder text", {}),
      
      "MOON TIME HERO QUEEN SUN": new StoryBranch("MOON TIME HERO QUEEN SUN place holder text", {}),
      "MOON TIME HERO SUN QUEEN": new StoryBranch("MOON TIME HERO SUN QUEEN place holder text", {}),
      
      "MOON SUN HERO QUEEN TIME": new StoryBranch("MOON SUN HERO QUEEN TIME place holder text", {}),
      "MOON SUN HERO TIME QUEEN": new StoryBranch("MOON SUN HERO TIME QUEEN place holder text", {}),

      "MOON QUEEN TIME HERO SUN": new StoryBranch("MOON QUEEN TIME HERO SUN place holder text", {}),
      "MOON QUEEN TIME SUN HERO": new StoryBranch("MOON QUEEN TIME SUN HERO place holder text", {}),
      
      "MOON HERO TIME QUEEN SUN": new StoryBranch("MOON HERO TIME QUEEN SUN place holder text", {}),
      "MOON HERO TIME SUN QUEEN": new StoryBranch("MOON HERO TIME SUN QUEEN place holder text", {}),
      
      "MOON SUN TIME QUEEN HERO": new StoryBranch("MOON SUN TIME QUEEN HERO place holder text", {}),
      "MOON SUN TIME HERO QUEEN": new StoryBranch("MOON SUN TIME HERO QUEEN place holder text", {}),

      "MOON QUEEN SUN HERO TIME": new StoryBranch("MOON QUEEN SUN HERO TIME place holder text", {}),
      "MOON QUEEN SUN TIME HERO": new StoryBranch("MOON QUEEN SUN TIME HERO place holder text", {}),
      
      "MOON HERO SUN QUEEN TIME": new StoryBranch("MOON HERO SUN QUEEN TIME place holder text", {}),
      "MOON HERO SUN TIME QUEEN": new StoryBranch("MOON HERO SUN TIME QUEEN place holder text", {}),
      
      "MOON TIME SUN QUEEN HERO": new StoryBranch("MOON TIME SUN QUEEN HERO place holder text", {}),
      "MOON TIME SUN HERO QUEEN": new StoryBranch("MOON TIME SUN HERO QUEEN place holder text", {}),
    };

    let current_branch = "start";
    const deck = build_deck();
    const spread = document.getElementById("spread");
    
    for (let i = 0; i < 3; i++){
      const drawn_card = draw_a_card();
      spread.innerHTML += `<img src= "images/BACK/0001.png" id = "${drawn_card.name}" class = "card">`;
    }

    document.addEventListener("click", event=>
    {
      setTimeout(function(){tree[current_branch].display_text();}, 2800);     
      //For each of the cards in the document's spread, add an eventlistener
      document.querySelectorAll('.card').forEach(function(card_img, index){
        //Play animation for each card image

        deck.forEach(card=>{
          if (card.name == card_img.id){
            setTimeout(function(){animate_flip(card_img);}, 1000*index);

            card_img.addEventListener('click', event => {
              console.log(`card clicked: ${card_img.id}`)
              const next_branch = tree[current_branch].options[card_img.id]

              //Check if there are cards in the deck that have not yet been drawn
              let cards_remaining = false;

              deck.forEach(card=>{
              if (card.drawn === false){
                cards_remaining = true;
                }
              });
        
              if (cards_remaining){
              //Draw a new card
              const drawn_card = draw_a_card();
              card_img.id=drawn_card.name;
              animate_flip(card_img);
              }
              else {
                flip_sound();
                document.getElementById('spread').removeChild(card_img);
              }

              if (typeof next_branch != "undefined"){
                //Change the text according to the next branch
                current_branch = next_branch;
                tree[current_branch].display_text();
              }
            });
          }
        }
      );
  });

  }, {once:true}); 
})();