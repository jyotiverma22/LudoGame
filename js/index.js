var G_moves=[0,0,0,0]; //count the moves of each green coin
var B_moves=[0,0,0,0]; //count the moves of each blue coin

//Initial position of Green
var g_left=[81,120,159,120]; 
var g_top=[104,65,104,143];

//Initial position of blue
var b_left=[506,467,428,467];
var b_top=[452,491,452,413];

var count=0;// to count the number of 6's

//Array of positions on ludo
var green_top=[240,240,240,240,240,201,162,123,84,45,6,6,6,45,84,123,162,201,240,240,240,240,240,240,279,318,318,318,318,318,318,356,395,434,473,510,549,549,549,510,473,434,395,356,317,317,317,317,317,317,279,240];
var green_left=[62,101,140,179,218,255,255,255,255,255,255,294,333,333,333,333,333,333,370,409,448,487,526,565,565,565,526,487,448,409,370,332,332,332,332,332,332,293,254,254,254,254,254,254,217,178,139,101,61,23,23,23];

//postions of house row
var inner_top=[279,279,279,279,279,279];

var g_inner_left=[61,101,139,178,217,254];

var b_inner_left=[526,487,448,409,370,333];

 var total_green=0,total_blue=0;//No. of coins that move into the house

//Set initial positions

function setpositions()
{
    for(var i=0;i<4;i++)
    {
        document.getElementById("g"+(i+1)).style.top=g_top[i]+'px';
        document.getElementById("g"+(i+1)).style.left=g_left[i]+'px';
        document.getElementById("b"+(i+1)).style.top=b_top[i]+'px';
        document.getElementById("b"+(i+1)).style.left=b_left[i]+'px';
        G_moves[i]=0;
        B_moves[i]=0;

    }
}


//start functions execute on clicking the start button
function StartGame(){

    document.getElementById('startBtn').style.display='none';
    document.getElementById('stopBtn').style.display='block';
    document.getElementById('player').style.display='block';
    document.getElementById('roll').style.display='inline-block';
    document.getElementById("resultArea").style.display="none";
    document.getElementById('dice').attributes.onclick.nodeValue="startRolling()";
    document.getElementById('dice').style.backgroundImage="url('..//images/dice.png')";
   	document.getElementById("player").innerHTML="Green's Turn";
   	document.getElementById("player").style.color="green";
   
    setpositions();//set the initial positions of the coins
  
}

function startRolling(){
    document.getElementById('roll').style.display='none';
    document.getElementById('dice').style.backgroundImage="url('..//images/R-dice.gif')"
    console.log("turn");
    document.getElementById('dice').attributes.onclick.nodeValue="";
    setTimeout(selectOneNumber,1000);
}

function selectOneNumber()
{
 //   document.getElementById('dice').attributes.onclick.nodeValue="";
    var nums=["one","two","three","four","five","six"];
    
    nums=shuffle(nums);
    
    var number=document.getElementById('number');
    number.style.display='block';
    number.className=nums[0];

    switch(nums[0])
    {
        case "one":
        moveSteps(1);
        break;

        case "two":
        moveSteps(2);
        break;

        case "three":
        moveSteps(3);
        break;

        case "four":
        moveSteps(4);
        break;  

        case "five":
        moveSteps(5);
        break;

        case "six":
        moveSteps(6);
        break;
    }
   
}

//function to shuffle the dice numbers

function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex; 
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;    
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      } 
      return array;
}

//Move the coin 

function moveSteps(num)
{
    var player=document.getElementById('player');   
    if(player.innerHTML=="Green's Turn")
    {
        activateGreen(num);
    }
    else{
        activateBlue(num);     
    }

}


var greens=0,coin,item;
function activateGreen(num)
{
    
    var list=document.getElementsByClassName('Green');
    for(var i=0;i<list.length;i++)
    {
        if((num===6)&&(G_moves[i]<=51))
        {   
                greens=changeGreenColor(list[i],i,num);
        }
        else if((num===1)&&(G_moves[i]<=56))
        {
                greens=changeGreenColor(list[i],i,num);
        }
        else if((G_moves[i]>0)&&(G_moves[i]<(58-num)))
        { 
             greens=changeGreenColor(list[i],i,num)
        }        
    }

    if(greens===0)
    {
        console.log("deactivate Green");
        setTimeout(deactivateGreen,300);  
    }
    else if(greens===1)
    {
        greens=0;
        setTimeout(function(){moveGreen(coin,num,item)} ,300) ;
        coin.attributes.onclick.nodeValue="";
    }
}


    function changeGreenColor(current ,i,n){
                        greens+=1;
                console.log(G_moves[i]);

                console.log(current.id);
                current.style.backgroundColor="#86B375";
                current.style.boxShadow="1px 1px 1px 1px"
                current.attributes.onclick.nodeValue="moveGreen(this,"+n+","+ i+")";
                coin=current;
                current.style.zIndex="1";
                item=i;
                console.log("Green Value  "+greens);
                return greens;

    }


function activateGreenAgain()
{
    console.log("activate green again");
    document.getElementById('roll').style.display='inline-block';
    document.getElementById('dice').style.backgroundImage="url('..//images/dice.png')";
    document.getElementById('dice').attributes.onclick.nodeValue="startRolling()";
    document.getElementById('number').style.display='none';
    
    var list=document.getElementsByClassName("Green");
    for(var i=0;i<list.length;i++)
    {
        list[i].style.backgroundColor="green";        
        list[i].style.boxShadow="none";
        list[i].attributes.onclick.nodeValue="";
        
    }
    
}


function deactivateGreen()
{
   
    console.log("In Deactivate Green");
    
    var list=document.getElementsByClassName("Green");
    for(var i=0;i<list.length;i++)
    {
       deactivateGreenParticular(list[i]);  
    }
    player.innerHTML="Blue's Turn";
    player.style.color="blue";

}

function deactivateGreenParticular(i)
{
     greens=0;
    document.getElementById('roll').style.display='inline-block';
    document.getElementById('dice').style.backgroundImage="url('..//images/dice.png')";
    document.getElementById('dice').attributes.onclick.nodeValue="startRolling()";
    document.getElementById('number').style.display='none';
    
    console.log("Deactivate particular Green");

    i.style.backgroundColor="green";        
    i.style.boxShadow="none";
    i.attributes.onclick.nodeValue="";
    i.style.zIndex="0";
 
    if(total_green===4)
    {
        stopGame("Green");
    }
 }


 function checkGreenStatus(coin,i,color)
 {
    console.log("In Green status check");
    var sum=0;
    var top_g=coin.style.top;
    var left_g=coin.style.left;
    var b;
    var newarray;
    var list=document.getElementsByClassName(color);
    console.log(list);
    if(color==="blue")
    {
        newarray=B_moves.slice();
    }
    else {
        newarray=G_moves.slice();
    }
    for(var j=0;j<list.length;j++)
    {
  //      console.log("blue: "+(list[i].id));
        if((list[j].style.top===top_g)&&(list[j].style.left===left_g))
        {
//            console.log("itms2"+(list[i].id));            
            sum+=1;
            b=j;
        }
    }
    console.log("sum "+sum+" term that matches :"+b);
    if(sum===1)
    {
        if((newarray[b]===1) ||(newarray[b]===9)||(newarray[b]===14)||(newarray[b]===22)||(newarray[b]===27)||(newarray[b]===35)||(newarray[b]===40)||(newarray[b]===48))
        {
            console.log("Blue on save positions");
        }
        else{
            console.log("move blue to origin");
   
            moveBlueToOrigin(list[b],b,color);
            
        }
    }
 }

function moveGreen(coin,num,i)
{
    greens=0;
    console.log("In Move Green");
    console.log(G_moves[[i]]);
    if((num+G_moves[i])>=58)
    {
          G_moves[i]=G_moves[i];
          deactivateGreenParticular(coin);
          
    }
    else{
    	if(G_moves[i]===0)
    	{
    		G_moves[i]=1;
    	}
    	else{
        G_moves[i]=(G_moves[i]+num);      
        } 
    }

    if((G_moves[i]<=51))
    {
                  
        console.log(coin);
        coin.style.top=green_top[G_moves[i]-1]+'px';
        coin.style.left=green_left[G_moves[i]-1]+'px';
        coin.style.transition="0.6s";
        console.log("check in green");

        if(num===6||(count===1))
        {
            

            if(count===1)
            {
            console.log("Green count if 2 :"+count);

                count=0;
                checkGreenStatus(coin,i,"blue");
                deactivateGreen();
    
            }
            else{
            	count+=1;
            console.log("Green count  :"+count);
                              checkGreenStatus(coin,i,"blue");          
                activateGreenAgain();
            }

        }
        else{
            checkGreenStatus(coin,i,"blue");
            deactivateGreen();
        }
        
        
    }
    else
    {
        if( (G_moves[i]>51)&&(G_moves[i]<=57))
        {
        coin.style.top=inner_top[(G_moves[i]-52)]+'px';
        coin.style.left=g_inner_left[(G_moves[i]-52)]+'px';
        coin.style.transition="0.6s";
        console.log("inner green 1");
       
        if((num===6)||(count===1))
          {

            if(count===1)
            {
            console.log("Green count :"+count);
                count=0;
                 checkGreenStatus(coin,i,"blue");

                deactivateGreen();
    
            }

            else{
            	            count+=1;
            console.log("Green count :"+count);
             checkGreenStatus(coin,i,"blue");
            
                activateGreenAgain();
            }



         }
        else{
                          checkGreenStatus(coin,i,"blue");

          deactivateGreen();
        }

            if(G_moves[i]>=57)
            {   total_green+=1;
                deactivateGreenParticular(coin);
                console.log("here");
                            }

    }
    
        else{
            deactivateGreen();

            
        }
    }
}
// function to activate the blue coin
var blues=0;
function activateBlue(num)
{
    console.log("Activate Blue");    
    var list=document.getElementsByClassName('blue');
    for(var i=0;i<list.length;i++)
    {
        if((num===6)&&(B_moves[i]<=51))
        {
                blues=changeBlueColor(list[i],i,num);

        }
        else if((num===1)&&(B_moves[i]<=56))
        {
                blues=changeBlueColor(list[i],i,num);
        }
        else if((B_moves[i]>0)&&(B_moves[i]<(58-num)))
            { 
                blues=changeBlueColor(list[i],i,num);
                
            }
        
    }

    if(blues===0) {
        console.log("deactivateblue");
        setTimeout(deactivateBlue,300);
    }
       else if(blues===1){
       setTimeout(function(){moveBlue(coin,num,item)} ,300) ;
        coin.attributes.onclick.nodeValue="";
    }

}


function changeBlueColor(current,i,n)
{
         blues+=1;
         console.log("id of blue element: "+current.id);
         current.style.backgroundColor="#4861C0";
         current.style.boxShadow="1px 1px 1px 1px"
         current.attributes.onclick.nodeValue="moveBlue(this,"+n+","+ i+")";
         current.style.zIndex="1";
         item=i;
         coin=current;
        return blues;
}


function deactivateBlue()
{
    console.log("In blue deactivate");
    var list=document.getElementsByClassName("blue");
    for(var i=0;i<list.length;i++)
    {
       deactivateBlueParticular(list[i]);       
    }
      
    player.innerHTML="Green's Turn";
    player.style.color="green";

}

function deactivateBlueParticular(i)
{
    
    document.getElementById('roll').style.display='inline-block';
    document.getElementById('number').style.display='none';
    document.getElementById('dice').style.backgroundImage="url('..//images/dice.png')";
    document.getElementById('dice').attributes.onclick.nodeValue="startRolling()";  
    console.log("Deactivate particular blue element");
    i.style.backgroundColor="#4580EB";        
    i.style.boxShadow="none";
    i.attributes.onclick.nodeValue=""; 
    i.style.zIndex="0";
    
   if(total_blue===4)
    {
        stopGame("blue");
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
}


function activateBlueAgain()
{
    console.log("activate blue again");
    document.getElementById('roll').style.display='inline-block';
    document.getElementById('dice').style.backgroundImage="url('..//images/dice.png')";
    document.getElementById('dice').attributes.onclick.nodeValue="startRolling()";
    document.getElementById('number').style.display='none';
    
    var list=document.getElementsByClassName("blue");
    for(var i=0;i<list.length;i++)
    {
        list[i].style.backgroundColor="#4580EB";        
        list[i].style.boxShadow="none";
        list[i].attributes.onclick.nodeValue="";
        
    }


}



function moveBlueToOrigin(coin,i,color)
{
    console.log("Move Blue to origin");
    console.log("origin element "+i);
    console.log("origin moves  "+B_moves[i]);
    if(color==='blue')
    {
   B_moves[i]=0;
   coin.style.top=b_top[i]+'px';
   coin.style.left=b_left[i]+'px';
    }
    else{
    G_moves[i]=0; 
    coin.style.top=g_top[i]+'px';
    coin.style.left=g_left[i]+'px';
}

}




function moveBlue(coin,num,i)
{
     blues=0;
    console.log("In Blue move function");
    console.log(B_moves[i]);
    if((num+B_moves[i])>=58)
    {
          B_moves[i]=B_moves[i];
          deactivateBlueParticular(coin);
          
    }
    else{
    	if(B_moves[i]===0)
    	{
    		B_moves[i]=1;
    	}
    	else{
        B_moves[i]=(B_moves[i]+num);
        }
    }

    if(B_moves[i]<=51)
    {
         if(B_moves[i]<=26)
        { 
        coin.style.top=green_top[B_moves[i]+25]+'px';
        coin.style.left=green_left[B_moves[i]+25]+'px';
        coin.style.transition="0.6s";
        console.log("Blue less than 26");
    
         }
         else{
        coin.style.top=green_top[B_moves[i]-27]+'px';
        coin.style.left=green_left[B_moves[i]-27]+'px';
        coin.style.transition="0.6s";
        console.log("Blue greater than 26");
             
        }

        if((num===6)||(count===1))
        {
           

            if(count===1)
            {

            console.log("Blue count if 2  :"+count);

                count=0;
                 checkGreenStatus(coin,i,"Green");
                deactivateBlue();
            
            }
            else{
            	 count+=1;
            	console.log("Blue count :"+count);

                checkGreenStatus(coin,i,"Green");          
                activateBlueAgain();
                 }

        }
        else{
        checkGreenStatus(coin,i,"Green");
        deactivateBlue();
        }
    }
    else{


        if( (B_moves[i]>51)&&(B_moves[i]<=57))
        {
        coin.style.top=inner_top[(B_moves[i]-52)]+'px';
        coin.style.left=b_inner_left[(B_moves[i]-52)]+'px';
        coin.style.transition="0.6s";
        console.log("inner blue");

                if(num===6||(count===1))
                {
                    

                    if(count===1)
                    {
                    console.log("Blue count if 2 : "+count);

                    count=0;
                     checkGreenStatus(coin,i,"Green");
                    deactivateBlue();
         
                    }
                    else{
                    	count+=1;
                    console.log("Blue count: "+count);
                    checkGreenStatus(coin,i,"Green");            
                    activateBlueAgain();
                     }

                }
            else{
                checkGreenStatus(coin,i,"Green");
                deactivateBlue();
                }
        if(B_moves[i]>=57)
            {
                 total_blue+=1;
            deactivateBlueParticular(coin);
            console.log("here");
                
            }     
        }

        else{
            deactivateBlue();
        }
            
    }
}


function stopGame(Winner)
{
    console.log("in stop");
   
    //count green numbers;
    for(var i=0;i<4;i++)
    {
        if(G_moves[i]===57)
        {
            total_green+=1;     
        }
    }

    //count blue number

    for(var i=0;i<4;i++)
    {
        if(B_moves[i]===57)
        {
            total_blue+=1;     
        }
    }

    document.getElementById("resultArea").style.display="block";
    document.getElementById("gscore").innerHTML=total_green;
    document.getElementById("bscore").innerHTML=total_blue;
    document.getElementById("winner").style.display="block";
    
    if((total_blue>total_green)||(Winner==="blue"))
    {
        total_blue=0;
        total_green=0;
        document.getElementById("winner").innerHTML="Blue";
        document.getElementById("winner").style.color="blue";
        
    }
    else if(total_blue===total_green)
    {
                total_blue=0;
        total_green=0;
        document.getElementById("winner").innerHTML="Its Tie";
        document.getElementById("winner").style.color="black";
        
    }
    else if((total_green>total_blue)||(total_green==="Green"))
    {
          total_blue=0;
        total_green=0;
        document.getElementById("winner").innerHTML="Green";
        document.getElementById("winner").style.color="green";
        
    }

    document.getElementById('startBtn').style.display='block';
    document.getElementById('stopBtn').style.display='none';
        document.getElementById('number').style.display='none';
  document.getElementById('dice').style.backgroundImage="url('..//images/dice.png')";
      document.getElementById('dice').attributes.onclick.nodeValue="";
      document.getElementById("roll").style.display="none";
      document.getElementById("player").innerHTML="";

	var listgreen=document.getElementsByClassName("Green");
     for(var i=0;i<listgreen.length;i++)
    {
        listgreen[i].style.backgroundColor="green";        
        listgreen[i].style.boxShadow="none";
        listgreen[i].attributes.onclick.nodeValue="";
        
    }
    var listblue=document.getElementsByClassName("blue");
 
       for(var i=0;i<listblue.length;i++)
    {
        listblue[i].style.backgroundColor="#4580EB";        
        listblue[i].style.boxShadow="none";
        listblue[i].attributes.onclick.nodeValue="";
        
    }
}


