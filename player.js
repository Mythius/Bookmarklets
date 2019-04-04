var Player=function(o,gravity){
    var x=0,y=0,dir=0,speed=0,g=4,va=0,ha=0,w=0;
    var keyisdown=[false,false,false,false];
    var platforms;
    var isPlayer=true;
    if(gravity)g=gravity;
    function toRads(d){return Math.PI*d/180;}
    function updatePos(){
        o.style.left=x+'px';
        o.style.top=y+'px';
    }
    this.goTo=function(px,py){
        x=px;
        y=py;
        updatePos();
    };
    this.getPos=function(){
        return {x:x,y:y};   
    };
    this.setDir=function(d){
        dir=toRads(d);
    };
    this.turn=function(d){
        dir+=toRads(d); 
    };
    this.getDir=function(){
        return dir;
    };
    this.move=function(s){
        x+=s*Math.sin(dir);
        y-=s*Math.cos(dir);
        updatePos();
    };
    this.setSpeed=function(s){
        speed=s;
    }
    this.step=function(){
        if(!isPlayer){
            speed=Math.sqrt((speed*speed+g+g)-2*speed*g*Math.cos(dir));
            if(speed<g){
                this.setDir(180);   
            } else {
                dir+=(Math.asin(g*Math.sin(dir)/speed));
            }
            this.move(speed);
        } else {

            x+=ha;
            y+=va;
            updatePos();
            var amount=2;

            if(keyisdown[1]) ha-=amount;
            if(keyisdown[2]) va+=9;
            if(keyisdown[3]) ha+=amount;

            if(ha<0)ha+=.5;
            if(va>0)va-=.5;
            if(ha>0)ha-=.5;
            va+=g;
            if(y+o.offsetHeight>=window.innerHeight+5){
                va=0;
                w=0;
                while(y+o.offsetHeight>=window.innerHeight+5){
                    y--;
                }
                y++;
            }
            
            for(let i=0;i<platforms.length;i++){
                if(isTouching(o,platforms[i])&&va>0){
                    va=0;
                    w=0;
                    while(isTouching(o,platforms[i])){
                        y--;
                        updatePos();
                    }
                    y+=5;
                    updatePos();
                    w=0;
                } else if(isTouching(o,platforms[i])){
                    while(isTouching(o,platforms[i])&&va<0){
                        y++;
                        updatePos();
                    }
                    va=1;
                }
            }
            
            w++;
            
            if(keyisdown[0]) if(w<3){va=-30;}
        }
    }
    this.setControls=function(awasd){
        document.on('keydown',function(e){
            switch(e.keyCode){
                case awasd[0]: keyisdown[0]=true; break;
                case awasd[1]: keyisdown[1]=true; o.style.transform='scaleX(-1)'; break;
                case awasd[2]: keyisdown[2]=true; break;
                case awasd[3]: keyisdown[3]=true; o.style.transform='scaleX(1)';break;
            }
        });
        document.on('keyup',function(e){
            switch(e.keyCode){
                case awasd[0]: keyisdown[0]=false; break;
                case awasd[1]: keyisdown[1]=false; break;
                case awasd[2]: keyisdown[2]=false; break;
                case awasd[3]: keyisdown[3]=false; break;
            }
        });
    };
    this.getAccs=function(){
        return "Vertical Acceleration: "+va+", Horizontal Acceleration: "+ha;   
    }
    this.getKeyValues=function(){
        return keyisdown;   
    }
    this.setPlatforms=function(p){
        platforms=p;   
    }
    this.addPlatform=function(p){
        platforms.push(p);   
    }
    this.getPlatforms=function(){
        return platforms;   
    }
}