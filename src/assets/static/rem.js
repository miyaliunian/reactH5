(function(){
    var docEl = document.documentElement;
    function setRemUnit(){
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit();

    window.addEventListener("resize",setRemUnit)
})()