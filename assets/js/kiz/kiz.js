/**
 * Created by lironrs and omerxx on 8/1/15.
 */

//$('*[class*="kiz-"]').on('click',function(){console.log('Clicked ' + this.className)});

$(function() {
    listener = new window.keypress.Listener();
    listener.register_combo({
        'keys': 'alt',
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
});

$(function(){
    console.log('Create kizs');
    var elements = $('*[class*="kiz-"]').get();
    for (var i=0, len=elements.length; i < len; i++) {
        var element = elements[i];
        var className = element.className;
        var regex = /(.*?\s*?(kiz-){1}(\w)\s*?.*?)/;
        var result = regex.exec(className)[3];
        var kiz = document.createElement('kbd');
        kiz.className = 'light';
        kiz.innerText = result;
        kiz.style.display = 'block';
        $(kiz).hide();
        kiz.style.position = 'absolute';
        kiz.style.bottom = '-30px';
        kiz.style.paddingLeft = '6px';
        kiz.style.paddingRight = '6px';
        $(element).append(kiz);
        setKiz(element,result);
    }
});

function setKiz(element, stroke){
    listener.register_combo({
        'keys'          : 'alt ' + stroke,
        'on_keydown'    : function(){element.click(); clickKiz(); }
    });
}

function displayKiz(){
    console.log('Display kizs');
    $('kbd').fadeIn(500);
}

function hideKiz(){
    console.log('Hide kizs');
    $('kbd').fadeOut(1000);
}

function clickKiz(){
    $('kbd').hide();
}