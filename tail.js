import fs from "fs";
import readline from "readline";

let linesToPrint = 10;
let arr = [];


const params = process.argv.slice(2);
const file = params.slice(params.length - 1).toString();
const stream = fs.createReadStream(file);;

for(let i  = 0; i < params.length - 1; i++) {
    switch(params[i]) {
    case "-n":
        if(isNaN(params[i+1])) throw new Error("invalid input");
        linesToPrint = Number(params[i+1])
        i++;
        break;
    default:
        throw new Error(`${params[i]} not found`);
    }
}

let rl = readline.createInterface({
    input: stream,
    terminal: false
});
    
rl.on('line', (line) => {
    if(arr.length === linesToPrint) arr.shift();
    arr.push(line);
});

rl.on('close', () => {
    console.log(arr.join("\n"));
})