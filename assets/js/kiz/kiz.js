/**
 * Created by lironrs and omerxx on 8/1/15.
 */

$(function() {
    setKey('alt');
    renderKiz('black');
    renderNavkiz('black');
    setAlerts();
});

function setKey(key){
    console.log('Set main key');
    listener = new window.keypress.Listener();
    listener.register_combo({
        'keys': key,
        'on_keydown': function () {
            displayKiz()
        },
        'on_release': function () {
            hideKiz()
        },
        'is_solitary': true,
        'is_exclusive': true,
        'prevent_repeat': true
    });
}

function renderKiz(color){
    console.log('Render kiz');
    var elements = $('*[class*="kiz-"]').get();
    for (var i=0, len=elements.length; i < len; i++) {
        var element = elements[i];
        var className = element.className;
        var regex = /(.*?\s*?(kiz-){1}(\w)\s*?.*?)/;
        var stroke = regex.exec(className)[3];
        var kiz = document.createElement('div');
        kiz.className = 'kiz ' + color;
        kiz.innerText = stroke;
        $(kiz).hide();
        $(element).prepend(kiz);
        setKiz(element, stroke);
    }
}

function renderNavkiz(color){
    console.log('Render navkiz');
    var navkiz = document.createElement('div');
    navkiz.className = 'navkiz';
    var fillerL = document.createElement('div');
    fillerL.className = 'kiz filler';
    var fillerR = document.createElement('div');
    fillerR.className = 'kiz filler';
    var up = document.createElement('div');
    up.className = 'kiz up ' + color;
    var down = document.createElement('div');
    down.className = 'kiz down ' + color;
    var left = document.createElement('div');
    left.className = 'kiz left ' + color;
    var right = document.createElement('div');
    right.className = 'kiz right ' + color;
    var space = document.createElement('div');
    space.className = 'kiz space ' + color;
    navkiz.appendChild(fillerL);
    navkiz.appendChild(up);
    navkiz.appendChild(fillerR);
    navkiz.appendChild(left);
    navkiz.appendChild(down);
    navkiz.appendChild(right);
    navkiz.appendChild(space);
    $('body').append(navkiz);
    $(navkiz).children().hide();
}

function setAlerts(){
    $('*[class*="kiz-"]').on('click',function(){console.log('Clicked ' + this.className)});
    $('*[class*="kiz"]').on('focus',function(){console.log('Focused ' + this.className)});
}

function setKiz(element, stroke){
    console.log('Set combo');
    listener.register_combo({
        'keys'          : 'alt ' + stroke,
        'on_keydown'    : function(){clickKiz(element); element.click();}
    });
}

function displayKiz(){
    console.log('Display kiz');
    $('.kiz').fadeIn(500);
}

function hideKiz(){
    console.log('Hide kiz');
    $('.kiz').fadeOut(1000);
}

function clickKiz(element){
    $('.kiz').hide();
}