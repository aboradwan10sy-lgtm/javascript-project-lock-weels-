//1- despot some mouny
//2- determen number of line to bet on 
//3-collece a bet amount 
//4 Spin the slot machine
//5- check if the user won 
//6 - give the user there winnings
//7- play again



//1 
// function deposit() {
//     return 1
// }
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}
const SymBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}


const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};
const getNumberOfLines = () => {
    while (true) {
        const numberOfLines = prompt("Enter the number of lines (1-3): ");
        const numberNumberOfLines = parseFloat(numberOfLines);
        if (isNaN(numberNumberOfLines) || numberNumberOfLines <= 0 || numberNumberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberNumberOfLines;
        }
    }
};
const GetBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet amount, try again.");
        } else {
            return numberBet;
        }
    }
}
const spin = () => {
    const symbols = [];
    for (const [Symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(Symbol);
        }
    }
    const reels = [[], [], []];
    for (let i = 0; i < COLS; i++) {
        const reelSymboles = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomindex = Math.floor(Math.random() * reelSymboles.length)
            const selectedSymblo = reelSymboles[randomindex];
            reels[i].push(selectedSymblo);
            reelSymboles.splice(randomindex, 1);

        }
    }
    return reels;
};
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1)
                rowString += " | "
        }

        console.log(rowString);
    }
};

const getWinnigs = (rows, bet, lines) => {
    let Winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            Winnings += SymBOL_VALUES[symbols[0]] * bet;
        }
    }
    return Winnings;
}
const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance.toString());
        const numberOfLines = getNumberOfLines();
        const bet = GetBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnigs(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());
        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again? (y/n): ");
        if (playAgain != "y") {
            break;
        }
    };
}
game();