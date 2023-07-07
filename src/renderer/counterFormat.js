export default function (number) {
	let numStr = number.toString();
	if(numStr.length == 1) return `0${number}`;
	return number; 
}