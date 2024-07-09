import * as readlineSync from 'readline-sync';
function calName():void {
console.log('Welcome To The Calculator!')

}
function getUserInput(prompt: string): string {
return readlineSync.question(prompt);
}
function throwError(errorMsg: string): never {
console.log(errorMsg);
}
calName();

console.log(`OPTIONS-
1. Add

2. Subtract
3. Multiply
4. Divide
5. Exponent`)

const option : any = getUserInput('Enter your option:' );
let opt = parseInt(option);

const num1: string = getUserInput('Enter first number: ');

const num2: string = getUserInput('Enter second number: ');
switch(opt) {
case 1: {
console.log(parseInt(num1) + parseInt(num2));
break;

}
case 2: {
console.log(parseInt(num1) - parseInt(num2));
break;
}
case 3: {
console.log(parseInt(num1) * parseInt(num2));
break;
}
case 4: {
if (parseInt(num2)==0){
throwError('Denominator cannot be 0');
}
else{
console.log(parseInt(num1) / parseInt(num2));
}
break;
}
case 5: {
console.log(parseInt(num1) ** parseInt(num2));
break;
}
default: {
console.log('Option invalid')
break;

}
}