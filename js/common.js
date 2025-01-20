$('#gnb').on('mouseenter', function(){
    $('#header').stop().animate({height: 400}, 300)

});

$('#gnb').on('mouseleave', function(){
    $('#header').stop().animate({height: 100}, 300);
});

// 브랜드이야기 호버효과
$('brandList li').on('onclick', function(){
    $(this).find('div').stop().fadeIn(300);
});