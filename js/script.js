/* Author: Alex Ninneman @ninnemana

*/

var fonts_api_domain = 'https://www.googleapis.com/webfonts/v1/webfonts?key=';
var key = 'AIzaSyC8vtPZjvmgdOZPbb4FrOjvnCgn_XLFJJc';
var preview_text = 'Grumpy wizards make toxic brew for the evil Queen and Jack.';


$(function(){
        
    $.get(fonts_api_domain + key +'&callback=getFonts', {'sort':'popularity'},function(){},'jsonp');
    
    $('input[type=text]').live('keyup',function(){
        preview_text = $(this).val();
        $('input[type=text]').val(preview_text);
    });
    
    $('.font-variant').live('change',function(){
        var variant = $(this).val();
        if(variant.indexOf('italic') != -1){
            $(this).parent().parent().find('input[type=text]').css('font-style','italic');
            variant = variant.replace('italic','');
        }
        console.log(variant);
        if(variant.indexOf('bold') != -1){
            console.log(variant);
            $(this).parent().parent().find('input[type=text]').css('font-weight','bold');
            variant = variant.replace('bold','');
        }
        variant = $.trim(variant);
        if(!isNaN(variant) && variant.length > 0){
            $(this).parent().parent().find('input[type=text]').css('font-weight',variant);
        }
    });
    
});
    
    function getFonts(data){
        var container = $('div[role=main]');
        var html = '';
        $.each(data.items,function(i,font){
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'http://fonts.googleapis.com/css?text='+preview_text+'&family=';
            var family = font.family;
            if(font.variants.length > 0){
                family += ':';
                $.each(font.variants,function(i,variant){
                    if(i == 0){
                        family += variant;
                    }else{
                        family += ','+variant;
                    }
                });
            }
            link.href += family;
            $('head').append(link);
            
            html += '<div class="font-listing">';
            html += '<div class="preview-select">';
            html += '<div class="select">';
            html += '<input type="radio" name="select-font" id="'+font.family+'" value="'+font.famiy+'" tabindex="'+i+'" />';
            html += '</div>';
            html += '<div class="font-container">';
            html += '<div class="font-options">';
            html += '<span class="font-title">'+font.family+'</span>';
            if(font.variants.length > 0){
                html += '<select class="font-variant">';
                $.each(font.variants,function(i,variant){
                    html += '<option>'+variant+'</option>';
                });
                html += '</select>';
            }
            //html += '<span class="preview">Paragraph</span>';
            
            html += '</div>';
            html += '<input type="text" style="font-family:'+font.family+'" value="'+preview_text+'"/>';
            html += '</div>';
            html += '<div style="clear:both"></div>';
            html += '</div>';
            html += '</div>';
        });
        $(container).append(html);
        $('#loading').hide();
    }