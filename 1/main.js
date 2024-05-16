function bai1() {
    const btn = document.querySelector('.bai1 button');
    const input = document.querySelector('.bai1 input');
    
    let value;
    let result = document.querySelector('.bai1 .result');
    btn.addEventListener('click', function () {
        // console.log(input.value);
        // console.log(typeof(input.value));
        value = intIncrease(input.value);
        console.log(String(value));
        result.innerText = value;

    })
}

function intIncrease(str) {
   let number = str.split(',');
   number = number.map(element => {
        return parseInt(element)
   });
   let result;
   let i;
   for (i=0; i<number.length; i++) {
    if (number[i]>=number[i+1]) return false;
   }
   return true;
}

bai1();

function bai4() {
    const btn = document.querySelector('.bai4 button');
    const input = document.querySelector('.bai4 input');
    
    let value;
    let result = document.querySelector('.bai4 .result');
    btn.addEventListener('click', function () {
        // console.log(input.value);
        // console.log(typeof(input.value));
        value = findLongWord(input.value);
        console.log((value));
        result.innerText = value;

    })
}

function findLongWord(str) {
    str = str.split(" ")
    console.log(str);
    let maxWord = str[0];
    for (let i=1;i<=str.length-1;i++){
        // console.log(str[i]);
        // console.log(typeof(str[i]));
        // if (i<str.length-1)
            // console.log(str[i]);
            if (str[i-1].length <= str[i].length ) maxWord = str[i];
    }
    return maxWord
    
}

bai4();

function bai5() {
    const btn = document.querySelector('.bai5 button');
    const input = document.querySelector('.bai5 input');
    
    let value;
    let result = document.querySelector('.bai5 .result');
    btn.addEventListener('click', function () {
        // console.log(input.value);
        // console.log(typeof(input.value));
        value = findsecondLongWord(input.value);
        console.log((value));
        result.innerText = value;

    })
}

function findsecondLongWord(str) {
    str = str.split(" ")
    console.log(str);
    let maxWord;
    let temp;

    if (str[1]){
        if(str[0]>=str[1]) {
            maxWord = str[0];
            temp=str[1]
        }
    }

    for (let i=1;i<=str.length-1;i++){

            if (str[i-1].length < str[i].length ) {
                temp=maxWord;
                maxWord = str[i];
                // console.log(temp);

                // return temp;
            }
            if (i==str.length-1){
                // console.log(temp.length ); console.log(str[str.length-1].length);

                if (temp.length == str[str.length-1].length) return str[str.length-1]

            }
    }
    // if (temp.length == maxWord.length) return maxWord
    // console.log(temp.length ); console.log(str(str.length-1));
    // if (temp.length == str(str.length-1)) return str(str.length-1)
    return temp;
    
}

//ternary operation

bai5();


function bai6() {
    const btn = document.querySelector('.bai6 button');
    const input = document.querySelector('.bai6 input');
    
    let value;
    let result = document.querySelector('.bai6 .result');
    btn.addEventListener('click', function () {
        value = totalEvenNumber(input.value);
        console.log(String(value));
        result.innerText = value;

    })
}

function totalEvenNumber(str) {
   let numbers = str.split(',');
   numbers = numbers.map(number => {
        return parseInt(number)
   });
   evenNumber = numbers.filter((number)=>{
    return number%2==0
   })
   let sum = evenNumber.reduce((total, value)=>{
    return total + value;
   },0)
//    console.log(evenNumber);
   return sum;
}

bai6();

function bai8() {
    const btn = document.querySelector('.bai8 button');
    const input = document.querySelector('.bai8 input');
    
    let value;
    let result = document.querySelector('.bai8 .result');
    btn.addEventListener('click', function () {
        value = makeString (input.value);
        console.log(String(value));
        result.innerText = value;

    })
}

function makeString(str) {
    if (str.length < 3 || str.length%2==0) {
       return "Khong hop le"
    }
    return str.slice(str.length/2-1, str.length/2-1+3)
}

bai8();