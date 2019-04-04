const fps=30;
include('https://cdn.jsdelivr.net/gh/Mythius/Bookmarklets@master/collisions.js');
include('https://cdn.jsdelivr.net/gh/Mythius/Bookmarklets@master/helpers.js');
include('https://cdn.jsdelivr.net/gh/Mythius/Bookmarklets@master/player.js');
var element=document.createElement('img');
element.src='https://media.tenor.com/images/0791eb3858075aca85eed5ecfe08c778/tenor.gif';
var player=new Player(element);
Object.prototype.goTo=function(x,y){
    this.style.left=x+'px';
    this.style.top=y+'px';
}
player.goTo(0,300);
player.setControls([87,65,83,68]);
var pltfrms=document.getElementById('p');
player.setPlatforms(pltfrms);
tick();
function tick(){
    setTimeout(function(){
        requestAnimationFrame(tick);
        player.step();
    },1000/fps);
}
function include(link){
    var s=document.createElement('script');
    s.src=link;
    document.body.appendChild(s);
}