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
        var result = regex.exec(className)[3];
        var kiz = document.createElement('div');
        kiz.className = 'kiz ' + color;
        kiz.innerText = result;
        $(kiz).hide();
        $(element).append(kiz);
        setKiz(element, result);
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
    down.className = 'kiz up ' + color;
    var left = document.createElement('div');
    left.className = 'kiz up ' + color;
    var right = document.createElement('div');
    right.className = 'kiz up ' + color;
    navkiz.appendChild(fillerL);
    navkiz.appendChild(up);
    navkiz.appendChild(fillerR);
    navkiz.appendChild(left);
    navkiz.appendChild(down);
    navkiz.appendChild(right);
    $('body').append(navkiz);
    $(navkiz).children().hide();
}

function setAlerts(){
    $('*[class*="kiz-"]').on('click',function(){console.log('Clicked ' + this.className)});
    $('*[class*="kiz"]').on('focus',function(){console.log('Focused ' + this.className)});
}

function setKiz(element, stroke){
    listener.register_combo({
        'keys'          : 'alt ' + stroke,
        'on_keydown'    : function(){clickKiz(); element.click(); element.focus()}
    });
}

function displayKiz(){
    console.log('Display kizs');
    $('.kiz').fadeIn(500);
}

function hideKiz(){
    console.log('Hide kizs');
    $('.kiz').fadeOut(1000);
}

function clickKiz(){
    $('.kiz').hide();
}