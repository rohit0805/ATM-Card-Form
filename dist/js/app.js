//UIController
var UIController=(function(){
    var DOMstring={
        card_number:"#card_number",
        card_holder:"#card_holder",
        card_month:"#card_month",
        card_year:"#card_year",
        card_cv:"#card_cv",
        holder_name:".holder_name",
        company:".image_com",
        month:".valid_month",
        year:".valid_year",
        image:".img",
        front_image:".front_img",
        cv_hide:".cv_hide"
    };
    var selector={
        card_number:document.querySelector(DOMstring.card_number),
        card_holder:document.querySelector(DOMstring.card_holder),
        card_month:document.querySelector(DOMstring.card_month),
        card_year:document.querySelector(DOMstring.card_year),
        card_cv:document.querySelector(DOMstring.card_cv),
        company:document.querySelector(DOMstring.company),
        name:document.querySelector(DOMstring.holder_name),
        month:document.querySelector(DOMstring.month),
        year:document.querySelector(DOMstring.year),
        image:document.querySelector(DOMstring.image),
        front_image:document.querySelector(DOMstring.front_image),
        cv_hide:document.querySelector(DOMstring.cv_hide)
    };
    
    return{
        getDOM:function(){
            return DOMstring;
        },
        getSelector:function(){
            return selector;
        },
        AddCardNumber:function(str){
            for(var i=0;i<str.length;i++){
                if(i<=3 || i>=12){
                    document.querySelector(`.card_no-${i+1}`).textContent=str[i];
                }
                else{
                    document.querySelector(`.card_no-${i+1}`).textContent="*";
                }
            }
            for(var i=str.length+1;i<=16;i++){
                document.querySelector(`.card_no-${i}`).textContent="X";
                if(i==1){
                    selector.company.classList.remove('mastercard_company');
                    selector.company.classList.remove('visa_company');
                    selector.company.classList.remove('american_company');
                }
            }
            if(str.length>0){       
                if(str[0]==="3"){
                    selector.company.classList.add('mastercard_company');
                }
                else if(str[0]==="4"){
                    selector.company.classList.add('visa_company');
                }
                else{
                    selector.company.classList.add('american_company');
                }
            }
        },
        AddCardHolder:function(name){
            selector.name.innerHTML=name;
            if(name.length===0){
                selector.name.innerHTML="YOUR NAME";
            }
        },
        AddCardMonth:function(month){
            if(month.length===1)
                month="0"+month;
            selector.month.innerHTML=month;
        },
        AddCardYear:function(year){
            selector.year.innerHTML=year.substring(2,4);
        },
        AddCardCV:function(len){
            selector.front_image.classList.add("rotate_front")
            setTimeout(function(){            
                selector.image.classList.add("rotate_clock");
            },450);
            for(var i=0;i<len;i++){
                document.querySelector(`.cv-${i+1}`).innerHTML="*";
            }
            for(i=len+1;i<=4;i++){
                document.querySelector(`.cv-${i}`).innerHTML="";
            }
        }
    }
})();


//Controller
var Controller=(function(UICtrl){
    var dom=UICtrl.getDOM();
    var selector=UICtrl.getSelector();
    var str;
    var ManageCardNumber=function(event){

        //1.get the input text 
        str=selector.card_number.value;
        
        //2.check for coming input
        if(!(parseInt(event.data)>=0 && parseInt(event.data)<=9) && event.inputType!=="deleteContentBackward"){
            //startindex and lastindex
            str=str.substring(0,str.length-1);
        }

        //3.adding gap after 4 digit
        var copy="",count=0;
        for(var i=0;i<str.length;i++){
            if(count===4 && str[i]!=="-"){
                copy+="-";
                count=0;
            }
            copy+=str[i];
            if(str[i]!=="-")
                count++;
            else{
                count=0;
            }
        }
        if(copy[copy.length-1]=="-"){
            copy=copy.substring(0,copy.length-1);
        }

        //4.Updating the input text
        selector.card_number.value=copy;

        //5.getting back the str for cardfront
        var send=str.split("-");
        str="";
        for(var i=0;i<send.length;i++){
            str+=send[i];
        }
        //6.updating the cardfront(the number is stored in str)
        UICtrl.AddCardNumber(str);
    };

    var ManageCardHolder=function(event){
        //1.get the input
        var str=selector.card_holder.value;
        
        //2.check for Coming Input
        if((parseInt(event.data)>=0 && parseInt(event.data)<=9)){
            //startindex and lastindex
            str=str.substring(0,str.length-1);
        }

        //3.Updating the input text
        selector.card_holder.value=str;

        //4.updating the card front
        UICtrl.AddCardHolder(str);
    }

    var ManageCardMonth=function(event){
        //1.get the input 
        var month=selector.card_month.value;
        //2.updating the card front
        UICtrl.AddCardMonth(month);
    };

    var ManageCardYear=function(event){
        //1.get the input
        var year=selector.card_year.value;
        //2.updating the card front
        UICtrl.AddCardYear(year);
    };

    var ManageCardCV=function(event){
        //1.get the input
        var cv=selector.card_cv.value;
    
        if(!(parseInt(event.data)>=0 && parseInt(event.data)<=9) && event.inputType!=="deleteContentBackward" && event.type!="focus"){
            //startindex and lastindex
            cv=cv.substring(0,cv.length-1);
        }
        //2.updating the input type
        selector.card_cv.value=cv;
        
        //3.updating the card rear
        UICtrl.AddCardCV(cv.length);

    };

    var SetupEventListener=function(){
        selector.card_number.addEventListener("input",function(event){
            ManageCardNumber(event);
        });
        selector.card_holder.addEventListener("input",function(){
            ManageCardHolder(event);
        });
        selector.card_month.addEventListener("change",function(event){
            ManageCardMonth(event);
        });
        selector.card_year.addEventListener("change",function(event){
            ManageCardYear(event);
        });
        selector.card_cv.addEventListener("input",function(event){
            ManageCardCV(event);
        });
        selector.card_cv.addEventListener("focus",function(event){
            ManageCardCV(event);
        });
        selector.card_cv.addEventListener("blur",function(event){
            selector.image.classList.remove("rotate_clock");
            setTimeout(function(){
                selector.front_image.classList.remove("rotate_front");
            },450)
        });
        
    };

    return{
        init:function(){
            SetupEventListener();
        }
    }
})(UIController);

Controller.init();