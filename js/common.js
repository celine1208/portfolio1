function gnbHandler () {
    if (window.scrollY === 0) {
        $('#header h1 a').css({ backgroundImage: 'url(./images/logo1.png)'})
        $('#header').removeClass('active')
                    .height(100);
    }
}

function resizeHandler () {
    if (window.innerWidth < 1280) {
        $('#header h1 a').css({ backgroundImage: 'url(./images/logo2.png)'})
        $('#header').addClass('active')
        $('#header').height(100);
        $('#gnb a.mobileBtn').removeClass('mobileClose').addClass('mobileBtn');
        if(window.innerWidth <= 710){
        $('#header').height(60);
    }
    } else {
        if(scrollY === 0){
            $('#header h1 a').css({ backgroundImage: 'url(./images/logo1.png)'})
        }
        if (!$('#gnb a.mobileBtn').hasClass('mobileClose')) {
            $('#header').height(100);
        }
        $('.snb').show();
        if(window.scrollY === 0){
            $('#header').removeClass('active');
        }
    }
}
function logoHandler () {
    $('#header h1 a').css({ backgroundImage: 'url(./images/logo2.png)'})
}

// 네비바 마우스 오버 이벤트
$('#gnb').on('mouseenter', function () {
    if (window.innerWidth > 1280) {
        $('#header').stop().animate({ height: 400 }, 500);
        $('#header').addClass('active');
        logoHandler();
    }
});

$('#header').on('mouseleave', function () {
    if (window.innerWidth > 1280) {
        $('#header').stop().animate({ height: 100 }, 500);
        $('body').css({ overflow: 'visible' });
        logoHandler();
        gnbHandler();
    }
});

// 스크롤 시 네비바 배경색 변경
$(window).on('scroll', function(){
    if(window.innerWidth > 1280){
        $('#header').addClass('active');
        logoHandler();
        gnbHandler();
    }
})

// 모바일 헤더 배경 붉은색
resizeHandler ();

$(window).on('resize', function () {
    resizeHandler ()
});

// 모바일 버튼 클릭시 네비바 토글
$('#gnb a.mobileBtn').on('click', function (e) {
    e.preventDefault();
    $('.snb').hide();
    if(window.innerWidth < 1280){
        $(this).toggleClass('mobileClose');
        if ($(this).hasClass('mobileClose')) {
            $('#header').stop().animate({ height: '100vh' }, 500);
            $('#pageTop').hide();
        }
        else {
            $('#header').stop().animate({ height: 100 }, 500);
            if (window.innerWidth <= 710) {
                $('#header').stop().animate({ height: 60 }, 500);
            }
            $('#pageTop').show();
        }
    }
});

// 외부 클릭시 네비바 닫기
$(document).on('click', function (e) {
    if (window.innerWidth <= 1280) {
        // 클릭된 요소가 #gnb 내부가 아닐 경우
        if (!$(e.target).closest('#gnb').length) {
            $('#gnb a.mobileBtn').removeClass('mobileClose').addClass('mobilebtn');
            $('#header').stop().animate({ height: 100 }, 500);
            if (window.innerWidth <= 710) {
                $('#header').stop().animate({ height: 60 }, 500);
            }
        }
    }
});

// gnbList 클릭시 서브메뉴 토글
$('#gnbList li a').on('click', function (e) {
    e.preventDefault();
    if (window.innerWidth <= 1280) {
        $(this).next().slideToggle();
        $(this).parent().siblings().children('.snb').slideUp();
    }
});