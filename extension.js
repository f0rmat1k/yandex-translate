var key = 'trnsl.1.1.20160531T091436Z.507c846faf27c7d3.070941436e4c223200d2d95c18988163e3f62b2f';
var apiHost = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
var lang = encodeURIComponent('en-ru');

init();

function init(){
    document.addEventListener('mouseup', function(){
        var selection = window.getSelection();
        var selectionStr = selection.toString();

        selectionStr = selectionStr.replace(/[а-яё]*/ig, '').trim();

        if (!selectionStr) return;

        insertScript(selectionStr);
    });

    var container = document.createElement('div');
    container.className = '__y-translate-container';

    var clientScript = document.createElement('script');

    clientScript.innerHTML = `
        var yTranslatePlugin = {
            getData: function(data){
                console.log('data');
                console.log(data);
                yTranslatePlugin.showResult(data.text.join(' '));
            },

            showResult: function(text){
                console.log('text');
                console.log(text);

                clearTimeout(this.showTimer);

                var showContainer = document.querySelector('.__y-translate-container');
                showContainer.textContent = text;

                showContainer.className = '__y-translate-container __y-translate-container_showed_yes';

                this.showTimer = setTimeout(function(){
                    showContainer.className = '__y-translate-container';
                }, 3000);
            },

            showTimer: 3000
        };
    `;

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('body').appendChild(clientScript);
        document.querySelector('body').appendChild(container);
    });
}

function insertScript(selectionStr){
    var script = buildScript(selectionStr);

    document
        .querySelector('body')
        .appendChild(script);
}

function buildScript(selectionStr){
    var script = document.createElement('script');

    script.src=`${apiHost}?key=${key}&text=${selectionStr}&lang=${lang}&format=plain&callback=yTranslatePlugin.getData`;

    return script;
}
