window.onload = function(){
    /*获取元素*/
    var clienW = document.documentElement.clientWidth;
    var clienH = document.documentElement.clientHeight;
    var scene = document.querySelector(".scene");
    var room = document.querySelector(".room");
    room.style.transformOrigin = "center center "+clienW/2+"px";

    /*设置ceil floor*/
    var ceil = document.querySelector(".panel:nth-child(1)");
    var floor = document.querySelector(".panel:nth-child(5)");
    ceil.style.width = floor.style.width = ceil.style.height = floor.style.height = clienW+"px";
    floor.style.top = -(clienW-clienH) +"px";

    /*lastpanel*/
    var lastpanel = document.querySelector(".panel:last-child");
    lastpanel.style.transform = "translate3d(0,0,"+clienW+"px)";

    /*代码实现*/
    lastpanel.onclick = function(){
        room.style.transition = "transform 3s";
        room.style.transform="translateZ(-800px) rotateY(0deg)";
    }
    var angle1=0,angle=0;
    var flag1 = false;
    document.onmousedown = function(e){
        room.style.transition="none";
        var startx = e.clientX;
        var starty = e.clientY;
        document.onmousemove = function(e){
            flag1 = true;
            var movex = e.clientX;
            var movey = e.clientY;

            angle = Math.abs(movex-startx)>Math.abs(movey-starty)?movex-startx:movey-starty;
            room.style.transform = " translateZ(-800px) rotate3d(0,1,0,"+(angle1+angle)+"deg)";
            e.preventDefault();
        }
            document.onmouseup = function(){
                if(flag1) {
                    flag1 = false;
                    angle1 += angle;
                }
                document.onmousemove = null;
                document.onmouseup = null;
        }
        e.preventDefault();
    }
    var flag = true;
    var panel = document.querySelectorAll(".panel");
    for(var i = 0; i < panel.length; i++){
        if(i < panel.length-1){
            panel[i].onclick = function(){
                if(flag){
                    room.style.transform = " translateZ(-200px) rotate3d(0,1,0,"+(angle1)+"deg)";
                    flag = false;
                    flag1 = false;
                }else{
                    room.style.transform = " translateZ(-800px) rotate3d(0,1,0,"+(angle1)+"deg)";
                    flag = true;
                    flag1 = false;
                }
            }
        }
    }
}