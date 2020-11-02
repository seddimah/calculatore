//comments
/*
1-function getHistory:
  return history value->(مقدار موجود در بخش حافظه موقت که در
     قسمت بالایی ماشین حساب است رابر می گرداند.)

2-function setHistory:
  show and set value enterd and previously history on history div->(مقدار وارد شده توسط کاربر را 
    به مقدار قبلی حافظه موقت اضافه کرده و نمایش می دهد.)

3-function getOutput:
  return output value->(مقدار موجود در خروجی را بر می گرداند)

4-function setOutput:
  show and set value entered on output->(مقدار وارد شده توسط کاربر را در خروجی 
    نمایش می دهد)


7-function localStorage.setObj:
  save and set calculations on local storage and show in history box->(
    محاسبه انجام شده توسط کاربر را در حافظه لوکال ذخیره می کند
  )

8-function localStorage.getObj:
  return previously calcualtions from local storage->(
    مقدار ذخیره شده در حافظه لوکال را بر میگرداند
  )

9-function history_memory:
  if you click on this, you can see history box->(
    اگر روی دکمه تاریخچه در ص ماشین حساب کلیک کنید، قسمت تاریهچه محاسبات را میبینید
  )

10-function keyboard_box:
  if you click on this, you can see keyboard again and keep on to calculate->(
    اگر در قسمت تاریخچه بودید برای برگشت به محاسبات و دیدن ص کلید باید
    روی گزینه صفحه کلید کلیک کنید.
  )
*/

function getHistory() {
  return document.getElementById("history-value").innerText;
}


//function for set history and show data in story box
function setHistory(num) {
  document.getElementById("history-value").innerText =num;
  
}

function getOutput() {
  
  return document.getElementById("output-value").innerText;
}

//function for set output and show data in output box
function setOutput(num) {
  if (num == "") {
    
    document.getElementById("output-value").innerText = num;
  } 
  else {
    document.getElementById("output-value").innerText = num;
  }

}


// function for setItem in local 
var names=[];

Storage.prototype.setObj = function(key, obj,size_records) {
  var n=size_records;
  names[n] =obj;
  n++;
  // alert(n)
  return this.setItem(key, JSON.stringify(names)) 
}

// function for getItem from local
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}




var click=1;
var size_records;
var full_empty_history=0;
// function for click on "show hitory"
function history_memory(){
  
  document.getElementById("keywboard").style.display="none"; 

  var historyBox=document.getElementById("history_box");
  historyBox.style.display="block";

  document.getElementById("history_button").style.display="none";

  document.getElementById("keyboard_button").style.display="block";

  var records_item =localStorage.getObj("record");
 
  if(click==1){

    var records_item =localStorage.getObj("record");
    size_records=Object.keys(records_item).length;
   
    for(var t=0;t<size_records;t++){

      var history_item=document.createElement('p');
      history_item.innerHTML=records_item[t];
      historyBox.appendChild(history_item);
    }
    click++;
  }

  else{

      var size_record_temp=Object.keys(records_item).length;
    
      if(size_record_temp >size_records){

        for(var t=size_records;t<size_record_temp;t++){

          var history_item=document.createElement('p');
          history_item.innerHTML=records_item[t];
          historyBox.appendChild(history_item);
        }
        size_records=size_record_temp;
      }
  }
  
}

//function for show keyboard
function keyboard_box(){

  document.getElementById("history_box").style.display="none"; 
  document.getElementById("keywboard").style.display="block";
  document.getElementById("keyboard_button").style.display="none";
  document.getElementById("history_button").style.display="block";

}

function back_space(){
  var output = getOutput();
  if (output) {
    output = output.substr(0, output.length - 1);
    setOutput(output);
  }
}

function ABS_calculate(output){
  if (output >0){

    output=-Math.abs(output);
  }
  else if (output <0){

    output=Math.abs(output);
  }
  setHistory(output);
  setOutput("");
}

////////////////////////////////////////////////////////////////////////////////////////////
//claculate by operator buttons
var operator = document.getElementsByClassName("opt");

for (var i = 0; i < operator.length; i++) {

  operator[i].addEventListener('click', function () {
   
    //if cicked button == clear "AC"
    if (this.id == "clear") {
      setOutput("");
      setHistory("");
    }

    //if cicked button ==back-space "تصحیح"
    else if (this.id == "back-space") {
      back_space();

    }
    //if cicked button ==(+,-,=,%,/,*,(,),-+)
    else {
      var output = getOutput();
      var history = getHistory();
    //  alert(history)
      if (this.id !="ABS"){

        setHistory(history);
      
      }
     
     
      //if first enterd button ==number and output!=" "
      if (output != "") {
    
        
       
        var x=history.indexOf(")");
       
        var length_history=history.length;
       
       
        if(x==(length_history-1)&& x!=-1 && (output=="1" || output=="2" || output=="3"|| output=="4"
         || output=="5" || output=="6" || output=="7" || output=="8" || output=="9" || output=="0")){
          history=history+"*"+output;
        }
        else{
           history = history + output;
        }
        //if cicked button == "="
        if (this.id == "=") {

          
          var result = eval(history);
          setOutput(result);
          setHistory("");
          full_empty_history=1;
          
          var hist_result=history+"="+result.toString();
          var records_item =localStorage.getObj("record");

          if(records_item){

            var size_records=Object.keys(records_item).length;
            localStorage.setObj("record", hist_result,size_records);
            
          }
          else{

           var size_records=0;
           localStorage.setObj("record", hist_result,size_records);
            
          }
          //alert(history)
          
        }
       //if cicked button !="="
        else {
          //ABS== +-
          if (this.id =="ABS"){
            ABS_calculate(output);
            
          }
          else{
            if(this.id=="("){
              history=history+"*"+this.id;
            }
           
            else{
              
              history = history + this.id;
              
              }

            setHistory(history);
            setOutput("");
           
          }
          
        }
      }
      //if first enterd button ==opt or "(,)" and output==" "
      else {
        if (this.id == "=") {
          console.log(history)
          var result = eval(history);
          setOutput(result);
          setHistory("");
          full_empty_history=1;
          var hist_result=history+"="+result.toString();
          var records_item =localStorage.getObj("record");

          if(records_item){
            var size_records=Object.keys(records_item).length;
            localStorage.setObj("record", hist_result,size_records);
            
          }
          else{
           var size_records=0;
            localStorage.setObj("record", hist_result,size_records);
            
          }
        }
        else{
          output=this.id;

          
          var length_history=history.length;
            
          if(history[length_history-1]!="-" && history[length_history-1]!="+" && history[length_history-1]!="*"
          && history[length_history-1]!="/" && history[length_history-1]!="%"){
            history=history+output;
            
          }
          setHistory(history);
        }
        
      }
    }
  })
}

///////////////////////////////////////////////////////////////////////////////////////////
//claculate by number buttons
var number = document.getElementsByClassName("number");

for (var i = 0; i < number.length; i++) {

  number[i].addEventListener('click', function () {
    var history=getHistory();
    var output =getOutput();
  
    if(output != NaN && full_empty_history){

      output = this.id;
      setOutput(output);
      full_empty_history=0;
    }
   else if (output != NaN && full_empty_history==0) {
      output = output+ this.id;
      setOutput(output);

    }

  })
}


