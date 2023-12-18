// catsweeper
// var levels = {
//     easy:       {
//         id: 0,
//         rows: 9,
//         cols: 9,
//         cats: 10
//     },
//     medium:     {
//         id: 1,
//         rows: 16,
//         cols: 16,
//         cats: 40        
//     },
//     hard:       {
//         id: 2,
//         rows: 30,
//         cols: 16,
//         cats: 99      
//     }, 
//     extreme:    {
//         id: 3,
//         rows: 30,
//         cols: 24,
//         cats: 180    
//     },
//     custom:     {
//         id: 4,
//         minRows: 9,
//         minCols: 9,
//         minCats: 10,
//         maxRows: 30, 
//         maxCols: 30,
//         maxCats: 160
//     }
// };
// var inLevels =  {
//     undo: 3,
//     defaultLevel: 'easy',
//     currentLevel: null,
//     nRows: null,
//     nCols: null,
//     nCats: null,
//     flags: ['covered', 'flag', 'question'] 
// }
var level = {
    numRows: 0,
    numCols: 0
}

var catsweeper = {
    numRows: 0,
    numCols: 0,
    cell: 'cell.png',

    init: function(elementID)  {
        var self = this;
        $("#" + elementID).append(
            '<header class="logo-name">' + 
                '<h1 class="name"><i class="fas fa-paw"></i> CATSWEEPER <i class="fas fa-paw"></i></h1>' +
            '</header>' +
            '<div class="settings">' +
                '<a href="#help"><i class="fas fa-question btn" id="helpBtn"></i></a>' +
                '<div class="mode" id="mode">' +
                    '<button id ="chooseMode">Easy 9x9 (10 cats)</button>' +
                    '<i class="bx bxs-down-arrow arrow" id="arrow"></i>' +
                    '<div class="options" id="options">' +
                        '<option value="9x9x10">Easy 9x9 (10 cats)</option>' +
                        '<option value="16x16x40">Medium 16x16 (40 cats)</option>' +
                        '<option value="30x16x99">Hard 30x16 (99 cats)</option>' +
                        '<option value="30x30x180">Extreme 30x24 (180 cats)</option>' +
                        '<option value="0x0x0">Custom...</option>' +
                    '</div>' +
                '</div>' +
                '<a href="#setting"><i class="fas fa-gear btn" id="settingBtn"></i></a>' +
            '</div>' +
            '<div class="stats">' +
                '<value class="nCats val" id="nCats">0</value>' +
                '<icon class="game-icon" id="game-icon"> 😿😾 </icon>' +
                '<value class="time val" id="time">0</value>' +
            '</div>' +            
                '<div class="ingame" id="ingame">' +                
            '</div>' +
            '<div class="game-setting" id="gameSetting">' +
                '<header class="logo-name">' +
                    '<h1 class="name">' +
                        '<i class="fa-solid fa-gear"></i> SETTING <i class="fa-solid fa-gear"></i>' +
                        '<div class="line"></div>' +
                    '</h1>' +
                '</header>' +
                '<div class="setting-options">' +
                    '<a href="#" class="saveGame"><i class="fa-solid fa-floppy-disk setting-icon"></i> Save Game <i class="fa-solid fa-floppy-disk"></i></a>' +
                    '<a href="#" class="newGame"><i class="fa-solid fa-square-plus setting-icon"></i> New Game <i class="fa-solid fa-square-plus"></i></a>' +
                    '<a href="#" class="showHighScores"><i class="fa-solid fa-star setting-icon"></i> Show High Scores<i class="fa-solid fa-star"></i></a>' +
                    '<a href="#" class="exitGame"><i class="fa-solid fa-door-open setting-icon"></i> Exit <i class="fa-solid fa-door-open"></i></a>' +
                '</div>' +
                '<div class="sound-options">' +
                    '<a href="#musicOptions"><i class="fa-solid fa-volume-xmark btn" id="musicOptions"></i></a>' +
                '</div>' +
            '</div>' +

            '<div class="game-help" id="gameHelp">' +
                '<header class="logo-name">' +
                    '<h1 class="name">' +
                        '<i class="fa-solid fa-question"></i></i> HELP <i class="fa-solid fa-question"></i>' +
                        '<div class="line"></div>' +
                    '</h1>' +
                '</header>' +
                '<div class="icon-description">' +
                    '<div class="icon-button">' +
                        '<img src="bg/cell-redflag.png" alt="Icon 1">' +
                        '<p>Right click or alt</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img src="bg/cell-newgame.png" alt="Icon 2">' +
                        '<p>New Game</p>' +
                    '</div>' +
                    '<div class="icon-button">' + 
                        '<img src="bg/cell-undo.png" alt="Icon 3">' +
                        '<p>Undo</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img src="bg/cell-gameover.png" alt="Icon 4">' +
                        '<p>Cat (Bomb)</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img src="bg/cell-remaining.png" alt="Icon 5">' +
                        '<p>Remaining Cats</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<p><b>Save Game</b> is in <b>Setting</b></p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img src="bg/catBox.png" alt="Icon 6">' +
                        '<p>(Left) Number of Cats</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img src="bg/timeBox.png" alt="Icon 7">' +
                        '<p>(Right) Time</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<audio id="background-music" loop>' +
                '<source src="bg/BGM.mp3" type="audio/mpeg" />' +
            '</audio>'
            );
        
        var $chooseMode = $('#chooseMode'),
            $arrow = $('.arrow'),
            $options = $('#options option');

        $chooseMode.on('click', this.chooseMode.bind(this));
        $arrow.on('click', this.chooseMode.bind(this));
        $options.on('click', function() {
            self.choose(this);
        });
        // Create an image element and set its source
        var imgElement = document.createElement('img');
        imgElement.src = self.cell;

        // Append the image element to the "ingame" element
        document.getElementById("ingame").appendChild(imgElement);

        const settingBtn = document.getElementById("settingBtn");
        const helpBtn = document.getElementById("helpBtn")
        const settingCloseBtn = document.querySelector(".game-setting .icon-close");
        const helpCloseBtn = document.querySelector(".game-help .icon-close");
        const gameSetting = document.getElementById("gameSetting");
        const gameHelp = document.getElementById("gameHelp");
        const gameContainer = document.querySelector(".game-container");
        settingBtn.addEventListener("click", () => {
            if (!gameHelp.classList.contains("display")) {
                gameSetting.classList.add("display");
                gameContainer.classList.add("dimmed");
            }
        });
        helpBtn.addEventListener("click", () => {
            if (!gameSetting.classList.contains("display")) {
                gameHelp.classList.add("display");
                gameContainer.classList.add("dimmed");
            }
        });
        document.addEventListener("click", (event) => {
            if (!gameSetting.contains(event.target) && !settingBtn.contains(event.target)) {
                gameSetting.classList.remove("display");
                gameContainer.classList.remove("dimmed");
            }
        });
        document.addEventListener("click", (event) => {
            if (!gameHelp.contains(event.target) && !helpBtn.contains(event.target)) {
                gameHelp.classList.remove("display");
                gameContainer.classList.remove("dimmed");
            }
        });
        var musicOn = 1;
        document.getElementById("musicOptions").addEventListener("click", () => {
            if (musicOn == 1) {
                document.getElementById("background-music").pause();
                musicOn = 0;
            } else {
                document.getElementById("background-music").play();
                musicOn = 1;
            }
        });
    },

    chooseMode: function() {
        var mode = document.getElementById("mode").getElementsByClassName("options")[0];
        mode.style.display = (mode.style.display === "block") ? "none" : "block";
    },

    choose: function(option) {
        var btn = document.getElementById("mode").getElementsByTagName("button")[0];
        btn.textContent = $(option).text();
        //change game size depending on mode
        if (option.value != "custom")   {
            const selectedMode = option.value.split('x');
            level.numCols = selectedMode[0];
            level.numRows = selectedMode[1];
            const ingame = document.getElementById('ingame');
            ingame.style.width = level.numCols*20 + 'px';
            ingame.style.height = level.numRows*20 + 'px';
        }
        // chooseMode();
        this.chooseMode();
    },


    newgame: function() {       
        document.getElementById("ingame").textContent = this.numRows;
    },
}



$(document).ready(function() {
	catsweeper.init("game-container");
});