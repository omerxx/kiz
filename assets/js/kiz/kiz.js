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

    var navkiz = document.createElement('div');
    navkiz.style.width = 'auto';
    navkiz.style.height = 'auto';
    navkiz.style.position = 'fixed';
    navkiz.style.top = '100px';
    navkiz.style.left = '40px';
    navkiz.style.fontSize = '15px';

    var filler = document.createElement('div');
    filler.style.width = '30px';
    filler.style.height = '20px';
    filler.style.display = 'inline-block';

    var rowTop = document.createElement('div');

    var rowBottom = document.createElement('div');

    var kizUp = document.createElement('kbd');
    kizUp.className = 'light';
    kizUp.innerText = '\u25B2';
    kizUp.style.paddingLeft = '6px';
    kizUp.style.paddingRight = '6px';
    kizUp.style.margin = '3px';
    kizUp.style.display = 'none';

    var kizLeft = document.createElement('kbd');
    kizLeft.className = 'light';
    kizLeft.innerText = '\u25C0';
    kizLeft.style.paddingLeft = '6px';
    kizLeft.style.paddingRight = '6px';
    kizLeft.style.margin = '3px';
    kizLeft.style.display = 'none';

    var kizDown = document.createElement('kbd');
    kizDown.className = 'light';
    kizDown.innerText = '\u25BC';
    kizDown.style.paddingLeft = '6px';
    kizDown.style.paddingRight = '6px';
    kizDown.style.margin = '3px';
    kizDown.style.display = 'none';

    var kizRight = document.createElement('kbd');
    kizRight.className = 'light';
    kizRight.innerText = '\u25B6';
    kizRight.style.paddingLeft = '6px';
    kizRight.style.paddingRight = '6px';
    kizRight.style.margin = '3px';
    kizRight.style.display = 'none';

    rowTop.appendChild(filler);
    rowTop.appendChild(kizUp);
    rowBottom.appendChild(kizLeft);
    rowBottom.appendChild(kizDown);
    rowBottom.appendChild(kizRight);
    navkiz.appendChild(rowTop);
    navkiz.appendChild(rowBottom);
    $('body').append(navkiz);

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