"use strict";
let fakestr = "";
let realstr = "";
let case1 = true;
let button = document.querySelectorAll(".btn");
let intagIn = document.getElementById("n1");
let intagout = document.getElementById("n2");
let start;
let end;
let obj = {
    "key0101": 100,
};
let appendx = (val) => {
    if (intagIn != null && intagIn.disabled === false) {
        intagIn.focus();
        start = intagIn.selectionStart;
        end = intagIn.selectionEnd;
        intagIn.setSelectionRange(start, end);
        //console.log("beforeupdate ", start);
        //console.log("after update ", start);
        const curr = intagIn.value;
        intagIn.value += val;
        const newVal = curr.substring(0, Number(start)) + val + curr.substring(Number(end));
        intagIn.value = newVal;
        // Move the cursor to the end of the inserted value
        intagIn.selectionStart = start + val.length;
        intagIn.selectionEnd = start + val.length;
        end = intagIn.selectionStart;
        fakestr = newVal;
        console.log("start: ", start);
        console.log("end: ", end);
        case1 = false;
    }
};
function checkString() {
    realstr = intagIn.value;
    realstr = replaceAllOccurrences(realstr, "sin", "Math.sin");
    realstr = replaceAllOccurrences(realstr, "tan", "Math.tan");
    realstr = replaceAllOccurrences(realstr, "cos", "Math.cos");
    realstr = replaceAllOccurrences(realstr, "PI", "Math.PI");
    realstr = replaceAllOccurrences(realstr, "sqrt", "Math.sqrt");
    for (let a in obj) {
        let temp = String(obj[a]);
        realstr = replaceAllOccurrences(realstr, a, temp);
    }
    console.log("real string: ", realstr);
    return realstr;
}
Array.from(button).forEach((btn) => btn.addEventListener("click", (e) => {
    let ele = e.target;
    //getSelection()
    if (ele.innerText != "=" &&
        ele.innerText != "Del" &&
        ele.innerText != "Sin" &&
        ele.innerText != "Cos" &&
        ele.innerText != "pi" &&
        ele.innerText != "Sqr" &&
        ele.innerText != "Edit" &&
        ele.innerText != "Tan" &&
        ele.innerText != "Add Constant") {
        //case1=true;
        if (intagIn.disabled == false) {
            appendx(ele.innerText);
        }
        else {
            fakestr = fakestr + ele.innerText;
        }
        console.log(fakestr);
        intagIn.value = fakestr;
    }
    if (ele.innerText == "=") {
        try {
            checkString();
            let ans = eval(realstr);
            ans = Number(ans).toFixed(4);
            intagout.value = ans;
        }
        catch (error) {
            intagout.value = error.message;
        }
    }
    if (ele.innerText == "C") {
        intagIn.value = "";
        fakestr = "";
        realstr = "";
    }
    if (ele.innerText == "Del") {
        if (fakestr.endsWith("sin(") ||
            fakestr.endsWith("cos(") ||
            fakestr.endsWith("tan(")) {
            fakestr = fakestr.slice(0, -4);
        }
        else if (fakestr.endsWith("sqrt(")) {
            fakestr = fakestr.slice(0, -5);
        }
        else if (fakestr.endsWith("PI")) {
            fakestr = fakestr.slice(0, -2);
        }
        else {
            fakestr = fakestr.slice(0, -1);
        }
        intagIn.value = fakestr;
    }
    if (ele.innerText == "Sin") {
        fakestr = intagIn.value;
        if (intagIn.disabled == false) {
            appendx("sin(");
            console.log("intag value fake", intagIn.value);
        }
        else {
            fakestr += "sin(";
            realstr += "Math.sin(";
        }
        intagIn.value = fakestr;
    }
    if (ele.innerText == "Cos") {
        fakestr = intagIn.value;
        if (intagIn.disabled == false) {
            appendx("cos(");
            console.log("intag value fake", intagIn.value);
        }
        else {
            fakestr += "cos(";
            realstr += "Math.cos(";
        }
        intagIn.value = fakestr;
    }
    if (ele.innerText == "Tan") {
        fakestr = intagIn.value;
        if (intagIn.disabled == false) {
            appendx("tan(");
            console.log("intag value fake", intagIn.value);
        }
        else {
            fakestr += "tan(";
            // realstr += "Math.tan(";
        }
        intagIn.value = fakestr;
    }
    if (ele.innerText == "pi") {
        fakestr = intagIn.value;
        if (intagIn.disabled == false) {
            appendx("PI(");
            console.log("intag value fake", intagIn.value);
        }
        else {
            fakestr += "PI";
            realstr += "Math.PI";
            console.log(realstr);
        }
        intagIn.value = fakestr;
    }
    if (ele.innerText == "Sqr") {
        fakestr = intagIn.value;
        if (intagIn.disabled == false) {
            appendx("sqrt(");
            console.log("intag value fake", intagIn.value);
        }
        else {
            fakestr += "sqrt(";
            realstr += "Math.sqrt(";
        }
        intagIn.value = fakestr;
    }
    if (ele.innerText == "Edit") {
        intagIn.disabled == true
            ? (intagIn.disabled = false)
            : (intagIn.disabled = true);
    }
    if (ele.innerText == "Add Constant") {
        let name = prompt("Please Enter you Verable name");
        if (checkExistance(name)) {
            alert("Thsi variable already exists..!");
        }
        else {
            let value = prompt("Please Enter you Verable Value");
            let newvalue = parseInt(value !== null && value !== void 0 ? value : "0");
            if (!isNaN(newvalue)) {
                addNewButton(name);
                obj[`${name}`] = newvalue;
            }
            else {
                alert("Please enter a valid number value");
            }
        }
        console.log(obj);
    }
}));
function checkExistance(name) {
    let temp = false;
    for (let a in obj) {
        if (a == name) {
            temp = true;
            break;
        }
    }
    return temp;
}
function replaceAllOccurrences(inputString, wordToReplace, newWord) {
    const regex = new RegExp("\\b" + wordToReplace + "\\b", "gi");
    return inputString.replace(regex, newWord);
}
function getSelection() {
    const start = intagIn.selectionStart;
    const end = intagIn.selectionEnd;
    const selectedText = intagIn.value.substring(start, end);
    console.log("Selected Text:", selectedText);
}
function addNewButton(name) {
    // Create a new button element
    const newButton = document.createElement("button");
    // Set the button's attributes and properties
    newButton.textContent = name;
    newButton.className = "btn";
    newButton.style.padding = "10px"; // Set an ID for the new button (optional)
    //newButton.onclick = newButtonClickHandler;
    // Append the new button to the buttonContainer div
    const buttonContainer = document.getElementById("btncon");
    if (buttonContainer) {
        buttonContainer.appendChild(newButton);
    }
}
const arr = [1, 2, 3, () => { }];
