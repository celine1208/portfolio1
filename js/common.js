// 네비바 마우스 오버 이벤트
$('#gnb').on('mouseenter', function(){
    $('#header').stop().animate({height: 400}, 500);
});

$('#gnb').on('mouseleave', function(){
    $('#header').stop().animate({height: 100}, 500);
});

// 슬라이드
let num = 0;
function nextSlide (){
    const $currentSlide = $("#slideList li:eq(0)");
    const $nextSlide = $("#slideList li:eq(1)");
    $nextSlide.addClass('active')
                         .css({opacity: 0})
                         .animate({opacity: 1},500, function(){
                            $('#slideList').append($('#slideList li:eq(0)'))
                            $('#slideList li:last').removeClass('active');
                   })
    num++;
    if (num === 3) {num = 0};
    // console.log(num);
    $('#pageNum').text(`0${num+1}`);
}

function prevSlide (){
    $("#slideList li:last").addClass('active')
                        .css({opacity: 0})
                        .animate({opacity: 1},500, function(){
                        $('#slideList').prepend($('#slideList li:last'))
                        $('#slideList li:eq(1)').removeClass('active');
    })
    num --;
    if (num === -1) {num = 2};
    console.log(num);
    $('#pageNum').text(`0${num+1}`);
};

$('.nextBtn').on('click', function(){
    nextSlide();
});

$('.prevBtn').on('click', function(){
    prevSlide();
});

// 스크롤시 텍스트 업
let state = 0;
$(window).on('scroll', function(){
    if (state === 0) {
        state === 1;
        if (window.scrollY > 2200){
            $('#faq').css({bottom: '-800px'});
        }
        else { $('#faq').css({bottom: '-1200px'}), function(){
            state = 0;
        } }
    }
});

//  눈알 마우스 따라다니기
let radius = 25;
let centerX = $('#characterLogo div').offset().left + $('#characterLogo div').width()/2; // 중심 x좌표
let centerY = $('#characterLogo div').offset().top + $('#characterLogo div').height()/2; // 중심 y좌표
$(window).on('mousemove',function(e){
    let mouseX = e.clientX; // 마우스 x좌표
    let mouseY = e.clientY; // 마우스 y좌표
    let angle = Math.atan2(mouseY - centerY, mouseX - centerX); // 마우스와 중심 사이의 각도
    let x = radius * Math.cos(angle); // 마우스와 중심 사이의 x좌표
    let y = radius * Math.sin(angle); // 마우스와 중심 사이의 y좌표
    $('#characterLogo span').css({ transform: `translate(${x}px, ${y}px)`}) // 마우스와 중심 사이의 거리만큼 이동
})
