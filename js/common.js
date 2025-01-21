// 네비바 마우스 오버 이벤트
$('#gnb').on('mouseenter', function(){
    $('#header').stop().animate({height: 400}, 500);
});

$('#gnb').on('mouseleave', function(){
    $('#header').stop().animate({height: 100}, 500);
});