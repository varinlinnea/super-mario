const app = document.getElementById("app");
let mario = new Character("Mario", "images/mario.png", "images/mariohead.png", 200, 5);
let peach = new Character("Peach", "images/peach.png", "images/peachhead.png", 100, 7);
let yoshi = new Character("Yoshi", "images/yoshi.png", "images/yoshihead.png", 80, 4);
let luigi = new Character("Luigi", "images/luigi.png", "images/luigihead.png", 140, 8);
let bowser = new Character("Bowser", "images/bowser.png", "", 300, 15);

let attacks = 0;
let selectedCharacter;

function characterSelect() {
    app.innerHTML = /*HTML*/ `
    <div class="characterSelectContainer">
        <div class="character" onclick=chooseCharacter(mario)>
            <img src="${mario.headImage}">
            <div>HP: ${mario.health}</div>
        </div>
        <div class="character" onclick=chooseCharacter(peach)>
            <img src="${peach.headImage}">
            <div>HP: ${peach.health}</div>
        </div>
        <div class="character" onclick=chooseCharacter(yoshi)>
            <img src="${yoshi.headImage}">
            <div>HP: ${yoshi.health}</div>
        </div>
        <div class="character" onclick=chooseCharacter(luigi)>
            <img src="${luigi.headImage}">
            <div>HP: ${luigi.health}</div>
        </div>        
    <div/>
    `;
}

function combatView() {
    app.innerHTML = /*HTML*/ `
        <div class="combatContainer">
            <div class="items">
                <img src="images/mushroom.png" onclick="eatMushroom()">
            </div>
            <div class="character">
                <img src="${selectedCharacter.fullsizeImage}">
                <div>HP: ${selectedCharacter.health}</div>
                <button onclick="attack()">Attack</button>
            </div>
            <div class="bowser">
                <img src="${bowser.fullsizeImage}">
                <div>HP: ${bowser.health}</div>
            <div>
        </div>
    `;
}

function winningView() {
    app.innerHTML = /*HTML*/ `
    <div class="winningContainer">
        <div>LETSGOOO</div>
        <button onclick="characterSelect()">BACK TO MAIN SCREEN</button>
    </div>
    `
}

function deathscreenView() {
    app.innerHTML = /*HTML*/ `
        <div class="deathContainer">
            <div>DU SUGER!</div>
            <button onclick="characterSelect()">TRY AGAIN</button>
        </div>
    `;
}

function Character(characterName, fullsizeImage, headImage, health, attackDmg) {
    this.characterName = characterName;
    this.fullsizeImage = fullsizeImage;
    this.headImage = headImage;
    this.health = health;
    this.attackDmg = attackDmg;
}

function chooseCharacter(character) {
    selectedCharacter = character;
    combatView();
}

function attack() {
    
        switch(selectedCharacter) {
            case mario: 
                bowser.health -= mario.attackDmg;
                break;
            case peach:
                bowser.health -= peach.attackDmg;
                break;
            case yoshi:
                bowser.health -= yoshi.attackDmg;
                break;
            case luigi:
                bowser.health -= luigi.attackDmg;
        }
        attacks++;
        if (attacks == 5) {
            attacks = 0;
            bowserAttack();
        } else {
            combatView();
        }
    if(bowser.health <= 0) {
        winningView();
        resetHealth();
    }
      
}

function resetHealth() {
    mario.health = 200;
    peach.health = 100;
    yoshi.health = 80;
    luigi.health = 140;
    bowser.health = 300;
}

function bowserAttack() {
    selectedCharacter.health -= bowser.attackDmg;
    if (selectedCharacter.health <= 0) {
        deathscreenView();
        resetHealth();
    } else {
        combatView();
    }
}

function eatMushroom() {
    if (selectedCharacter.health <= 150) {
       selectedCharacter.health += 20;
       combatView(); 
    }
}