/* Author: Alex Ninneman @ninnemana

*/

var fonts_api_domain = 'https://www.googleapis.com/webfonts/v1/webfonts?key=';
var key = 'AIzaSyC8vtPZjvmgdOZPbb4FrOjvnCgn_XLFJJc';
var preview_text = 'Grumpy wizards make toxic brew for the evil Queen and Jack.';


$(function(){
        
    $.get(fonts_api_domain + key +'&callback=getFonts', {'sort':'popularity'},function(){},'jsonp');
    
    });
    
    function getFonts(data){
        var container = $('div[role=main]');
        var html = '';
        $.each(data.items,function(i,font){
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'http://fonts.googleapis.com/css?family='+font.family+'&text='+preview_text;
            $('head').append(link);
            
            html += '<div class="font-listing">';
            html += '<div class="preview-select">';
            html += '<div class="select">';
            html += '<input type="radio" name="select-font" id="'+font.family+'" value="'+font.famiy+'" />';
            html += '</div>';
            html += '<input type="text" style="font-family:'+font.family+'" value="'+preview_text+'"/>';
            html += '<div style="clear:both"></div>';
            html += '</div>';
            html += '</div>';
            });
            $(container).append(html);
            $('#loading').hide();
    }