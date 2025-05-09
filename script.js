let a = '';
let b = '';
let operator = '';
let setA = true;
let equalProduct = false;

const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".buttonContainer");
const clearButton = document.getElementById("clear");
const signChange = document.getElementById("sign");
const equals = document.getElementById("eq");
const dotOp = document.getElementById("dot");
const backSpace = document.getElementById("backspace");

function operate(){
    if(operator==='+'){
        let temp = parseFloat(a)+parseFloat(b)
        a = temp.toString();
        display.textContent = a;
    }
    else if(operator==='-'){
        let temp = parseFloat(a)-parseFloat(b)
        a = temp.toString();
        display.textContent = a;
    }
    else if(operator==='*'){
        let temp = parseFloat(a)*parseFloat(b)
        temp = Math.round(temp * 100) / 100
        a = temp.toString();
        display.textContent = a;
    }
    else if(operator==='/'){
        if(parseFloat(b)===0){
            display.textContent = 'Err.';
            a = '';
            b = '';
            operator = '';
            setA=true;
            return;
        }
        let temp = parseFloat(a)/parseFloat(b);
        temp = Math.round(temp * 100) / 100
        a = temp.toString();
        display.textContent = a;
    }
}

backSpace.addEventListener('click', ()=>{
    let lastChar = display.textContent.slice(-1);
    if(['+','-','*','/'].includes(lastChar)){
        operator = '';
    }
    else if(!setA){
        b = b.slice(0,-1);
    }
    else{
        a = a.slice(0,-1);
    }
    display.textContent = display.textContent.slice(0,-1);

});

dotOp.addEventListener('click', ()=>{
    if(setA){
       if(!a.includes('.')){
            a += '.';
            display.textContent+='.';
       }
    }
    else{
        if(!b.includes('.')){
            b +='.';
            display.textContent+='.';
        }
    }
});

clearButton.addEventListener('click', ()=>{
    display.textContent = '';
    a = '';
    b = '';
    operator = '';
    setA=true;
    console.clear();
});

signChange.addEventListener('click', ()=>{
    if(setA){
        if(a.startsWith('-'))
            a = a.substring(1); 
        else 
            a = '-'+a;

        display.textContent = a;
    }
    else{
        if(b!==''){
            let parts = display.textContent.split(/(\D)/);
            parts[parts.length-1] = '(-' + parts[parts.length-1]+')';
            display.textContent = parts.join('');
            b = '-'+b;
        }
    }
});

equals.addEventListener('click', ()=>{
    operate();
    operator = '';
    b = '';
    setA=true;
    console.log(a);
    console.log(b);
    equalProduct = true;
});

buttonContainer.addEventListener("click", (event)=>{
    
    if(event.target.classList.contains("main")){
        if(equalProduct)
            equalProduct = false;

        if(operator !=='' && b===''){
            display.textContent = display.textContent.slice(0,-1); 
        }
        else if(operator !=='' && b!==''){
            operate();
            operator=event.target.textContent;
            b = '';
        }
        operator = event.target.textContent;
        console.log(operator);
        if(a!=='' && b===''){
            setA = false;
            display.textContent += event.target.textContent;
        }
        
    }

    if(event.target.classList.contains("numbers")){

        if (equalProduct) {
            display.textContent = ''; 
            a = ''; 
            setA = true; 
            equalProduct = false;
        }


        if(display.textContent==='Err.'){
            display.textContent = '';
        }

        if(setA){
            if(display.textContent === '0')
                display.textContent = '';
            a += event.target.textContent;
        }
        else{
            b += event.target.textContent;
        }
        display.textContent += event.target.textContent;
    }
});
