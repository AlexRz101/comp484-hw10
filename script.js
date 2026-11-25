$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);
    $('.sleep-button').click(clickedSleepButton);
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name: "Rex", weight: 30, happiness: 50, energy: 100};
  
    function clickedTreatButton() {
      pet_info['weight']++;
      pet_info['happiness'] += 5;
      pet_info['energy'] += 5;
      checkAndUpdatePetInfoInHtml();
      showComment("Yum! Best treat ever!");
    }
    
    function clickedPlayButton() {
      pet_info['happiness'] += 5;
      pet_info['energy'] -= 10;
      pet_info['weight']--;
      showComment("Woof! That was fun!");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      pet_info['happiness'] -= 5;
      pet_info['weight'] -= 2;
      pet_info['energy'] -= 10;
      showComment("That was tiring!");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedNapButton() {
      pet_info['happiness'] += 5;
      pet_info['energy'] += 30;
      showComment("I feel refreshed!");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedSleepButton() {
      pet_info['happiness'] += 20;
      pet_info['energy'] += 80;
      showComment("I feel fully rested!");
      checkAndUpdatePetInfoInHtml();
    }

    function showComment(message) {
      $('#pet-comment').finish()   //clear any running animation first
        .text(message)             //put the message text into the element
        .fadeToggle(300)           //fade in

        /* .delay(2000) is my second unique jQuery method. It pauses the
        animation queue on this element for 2000 milliseconds (2 seconds).
        Any effect chained after it has to wait, so the comment stays
        visible for 2 seconds before the next fadeToggle() fades it out.
        It only delays queued effects, not regular methods like .text(). */
        .delay(2000)            
        .fadeToggle(300);          //fade out
    }

    function updatePetSize() {
      /* .width(value) is my second unique jQuery method. It sets the width
      of the matched element in pixels. The argument is a number (jQuery
      assumes "px"), and here it is 150 plus 5 pixels per pound of weight.
      After every button click the pet image gets wider when it gains
      weight and narrower when it loses weight, so the player can see it. */
      $('.pet-image').width(150 + pet_info['weight'] * 5);
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      //Weight checks
      if (pet_info['weight'] < 0) { pet_info['weight'] = 0; }

      if (pet_info['weight'] <= 15) {
        showComment("I'm getting too skinny... feed me!");
      }

      if (pet_info['weight'] >= 45) {
        showComment("I'm getting too heavy... play with me!");
      }

      //Happiness checks
      if (pet_info['happiness'] < 0) { pet_info['happiness'] = 0; }

      //Energy checks
      if (pet_info['energy'] < 0) { pet_info['energy'] = 0; }
      // Optional: cap energy so it behaves like a 0-100 meter
      if (pet_info['energy'] > 100) { pet_info['energy'] = 100; }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info['energy']);
      updatePetSize();
    }
  
    // Part 2.1: Console logging
    function demoConsoleLogs() {
      console.info('INFO: Giga Pet loaded');
      console.log('LOG: pet_info =', pet_info);
      console.warn('WARN: Rex energy is getting low');
      console.error('ERROR: Rex refused the treat');

      console.table([
        { name: pet_info.name, weight: pet_info.weight, happiness: pet_info.happiness, energy: pet_info.energy },
        { name: 'Max', weight: 30, happiness: 10, energy: 5 }
      ]);

      console.group('Rex stats');
      console.log('Weight:', pet_info.weight);
      console.log('Happiness:', pet_info.happiness);
      console.log('Energy:', pet_info.energy);
      console.groupEnd();

      console.log(
        '%cRex says woof!',
        'color:#fff; background:#e67e22; font-size:20px; padding:4px 8px; border-radius:4px;'
      );
    }

    // Part 2.2: Browser-logged messages
    function trigger404() {
      fetch('api/does-not-exist.json');
      $('<img>').attr('src', 'images/missing-pet.png').appendTo('body');
    }

    function triggerTypeError() {
      const nothing = undefined;
      console.log(nothing.length);
    }

    function triggerViolation() {
      const start = Date.now();
      while (Date.now() - start < 400) {}
    }

    // Part 2.4: Intentional bug 
    function addTreatsToWeight() {
      let weight = 20;
      let treats = $('#treat-count').val();
      let newWeight = weight + Number(treats);
      $('#debug-result').text('Rex weighs ' + newWeight + ' lbs');
    }

    $(function () {
      demoConsoleLogs();
      $('#btn-404').click(trigger404);
      $('#btn-typeerror').click(triggerTypeError);
      $('#btn-violation').click(triggerViolation);
      $('#btn-debug').click(addTreatsToWeight);
    });