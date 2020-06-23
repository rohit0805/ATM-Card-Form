//UIController
var UIController=(function(){
    var DOMstring={
        card_number:"#card_number",
        card_holder:"#card_holder",
        card_month:"#card_month",
        card_year:"#card_year",
        card_cv:"#card_cv",
        holder_name:".holder_name",
        company:".front_company",
    };
    var selector={
        card_number:document.querySelector(DOMstring.card_number),
        card_holder:document.querySelector(DOMstring.card_holder),
        card_month:document.querySelector(DOMstring.card_month),
        card_year:document.querySelector(DOMstring.card_year),
        card_cv:document.querySelector(DOMstring.card_cv)
    };

    return{
        getDOM:function(){
            return DOMstring;
        },
        getSelector:function(){
            return selector;
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

        //5.updating the cardfront(the number is stored in str)
        //use of UICtrl(later )
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

    }

    var SetupEventListener=function(){
        selector.card_number.addEventListener("input",function(event){
            ManageCardNumber(event);
        });
        selector.card_holder.addEventListener("input",function(){
            ManageCardHolder(event);
        });
    };

    return{
        init:function(){
            SetupEventListener();
        }
    }
})(UIController);

Controller.init();