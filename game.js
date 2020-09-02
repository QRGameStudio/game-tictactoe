function generateFooter() {
    document.querySelectorAll('.qr-footer').forEach(e => e.parentNode.removeChild(e));
    const footer = document.createElement('footer');
    footer.innerHTML = '<a href="https://qrgamestudio.com/">Made By QRGameStudio</a>';
    footer.className = 'qr-footer';
    document.body.appendChild(footer);
}

function gameInit() {
    document.body.innerHTML = '';
    generateFooter();

    let playerTurn = 1;
    let gameFinished = false;
    const btns = [];
    const possibleWinCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    for (let i = 0; i < 9; i++) {
        const btn = document.createElement("div");
        btn.className = 'btn np';
        document.body.appendChild(btn);
        btns.push(btn);

        btn.onclick = () => {
            if (gameFinished) {
                // the game is finished, restart
                gameInit();
                return;
            }
            if (!btn.classList.contains('np')) {
                // this button was already played
                return;
            }
            btn.classList.remove('np');
            btn.classList.add(`p${playerTurn}`);
            playerTurn = playerTurn === 1 ? 2 : 1;

            // take a look if somebody won
            for (let j = 0; j < possibleWinCombinations.length; j++) {
                if (gameFinished) {
                    break;
                }
                gameFinished = true;
                const comboButtons = possibleWinCombinations[j].map(k => btns[k]);
                let buttonsPlayer = null;
                for (let k = 0; k < comboButtons.length; k++) {
                    const cbtn = comboButtons[k];
                    if (cbtn.classList.contains('np')) {
                        gameFinished = false;
                        break;
                    }
                    const cbtnP = cbtn.classList.contains('p1') ? 1 : 2;
                    if (buttonsPlayer !== null && buttonsPlayer !== cbtnP ) {
                        gameFinished = false;
                        break;
                    }
                    buttonsPlayer = cbtnP;
                }

                if (gameFinished) {
                    comboButtons.forEach(cbtn => cbtn.classList.add('win'));
                }
            }

            // take a look if there is a room to play
            gameFinished = gameFinished || !btns.find(b2 => b2.classList.contains('np'));
        }
    }
}

const gameStart = gameInit;
window.onload = gameStart;
