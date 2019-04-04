var isTouching=function(d1,d2){
    function getPos(e){
        var pos=e.getBoundingClientRect();
        return [[pos.left,pos.right],[pos.top,pos.bottom]];
    }
    function compare(p1,p2){
        var r1,r2;
        if(p1[0]<p2[0]){
            r1=p1;
            r2=p2;
        } else {
            r1=p2;
            r2=p1;
        }
        return r1[1]>r2[0]||r1[0]==r2[0];
    }
    function r(a,b){
        var p1=getPos(a);
        var p2=getPos(b);
        return compare(p1[0],p2[0]) && compare(p1[1],p2[1]);
    }
    return r(d1,d2);
}