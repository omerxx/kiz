/**
 * Created by lironrs and omerxx on 8/1/15.
 */

$(function() {
    setKey('alt');
    renderTogglekiz('alt');
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

function renderTogglekiz(key){
    console.log('Render onkiz');
    var onkiz = '<input class="onkiz-checkbox" id="onkiz" type="checkbox"/>' +
                '<label class="onkiz" for="onkiz"><div class="black"></div>kiz support</label>';
    $('body').append(onkiz);
    $('.onkiz-checkbox').click(function(){
        if($(this).is(":checked")){
            listener.stop_listening();
        }
        else if($(this).is(":not(:checked)")){
            listener.listen();
        }
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
    var navkiz = '<div class="navkiz">' +
                    '<div class="kiz filler"></div>' +
                    '<div class="kiz up ' + color + '"></div>' +
                    '<div class="kiz filler"></div>' +
                    '<div class="kiz left ' + color + '"></div>' +
                    '<div class="kiz down ' + color + '"></div>' +
                    '<div class="kiz right ' + color + '"></div>' +
                    '<div class="kiz space ' + color + '"></div>' +
                '</div>';
    $('body').append(navkiz);
    $('.navkiz').children('.kiz').hide();
}

function setAlerts(){
    $('*[class*="kiz-"]').on('click',function(){console.log('Clicked ' + this.className)});
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