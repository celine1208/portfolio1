// 슬라이드
let slideLength = $("#slideList li").length;
let num = 0;
let zNum = 0;

$("#btnBar").animate({ width: `100%` }, 4000)

let $video = $('#slideList video');
function videoControl() {
    $video[num].pause();
    setTimeout(function () {
        $video[num].currentTime = 0;
        $video[num].play();
    })
}
//다음 슬라이드
function nextSlide() {
    num++;
    zNum++;
    if (num === slideLength) num = 0;
    $("#slider li:eq(" + num + ")").css({ zIndex: zNum, opacity: 0 })
        .animate({ opacity: 1 }, 500, function () {
            zNum = 1;
            $("#slider li").not($(this)).css({ zIndex: 0 });
            $(this).css({ zIndex: 1 });
        })
    $('#pageNum').text(`0${num + 1}`);
    $("#btnBar").stop().css({ width: 0 }).animate({ width: `100%` }, 3000)
    
    // 비디오 재실행
    videoControl();
}
//이전 슬라이드
function prevSlide() {
    num--;
    zNum++;
    if (num === -1) num = slideLength - 1;
    $("#slider li:eq(" + num + ")").css({ zIndex: zNum, opacity: 0 })
        .animate({ opacity: 1 }, 500, function () {
            zNum = 1;
            $("#slider li").not($(this)).css({ zIndex: 0 });
            $(this).css({ zIndex: 1 });
        })
    $('#pageNum').text(`0${num + 1}`);
    $("#btnBar").stop().css({ width: 0 }).animate({ width: `100%` }, 3000)
    
    // 비디오 재실행
    videoControl();
};

let timer = setInterval(nextSlide, 4000)

$('.nextBtn').on('click', function () {
    clearInterval(timer);
    nextSlide();
});

$('.prevBtn').on('click', function () {
    clearInterval(timer);
    prevSlide();
});

// 페이지업 버튼 색상 변경
function pageUpChange() {
    if (window.scrollY >= $('#location').offset().top -500) {
        $('#pageTop').css({ filter: 'invert(100%)' })
    }
    else {
        $('#pageTop').css({ filter: 'invert(0%)' })
    }
}

// 스크롤시 텍스트 업 애니메이션
$(window).on('scroll', function (e) {
    if (window.scrollY > $("#franchise").offset().top - 800) {
        $('#faq').css({ bottom: '-800px' })
        $("#faq dl > *").each(function () {
            let $this = $(this);
            let pos = $(this).offset().top - 600
            if (window.scrollY > pos) {
                $this.css({ opacity: 1 })
            }
            else if (window.scrollY <= pos) {
                $this.css({ opacity: 0 })

            }
        })
    }
    else {
        $('#faq').css({ bottom: '-1200px' }), function () {
            state = 0;
        }
    }
    pageUpChange()
});

//  눈알 마우스 따라다니기
function eyeMove(e) {
    let centerX = $('#characterLogo div').offset().left + $('#characterLogo div').width() / 2; // 중심 x좌표
    let centerY = $('#characterLogo div').offset().top + $('#characterLogo div').height() / 2; // 중심 y좌표
    let mouseX = e.pageX; // 마우스 x좌표
    let mouseY = e.pageY; // 마우스 y좌표
    let angle = Math.atan2(mouseY - centerY, mouseX - centerX); // 마우스와 중심 사이의 각도
    let pos = `rotate(${(180 * angle / Math.PI - 90)}deg)`;
    $('#characterLogo div').css({ transform: pos }) // 마우스와 중심 사이의 거리만큼 이동
}
$(window).on('mousemove', function (e) {
    eyeMove(e)
})

// 마우스 드래그 스크롤 이벤트
let $slider = $('#menuList');
let isDown = false;
let startX;
let scrollLeft;

$slider.on('mousedown', function(e) {
  isDown = true;
  startX = e.pageX - $slider.offset().left;
  scrollLeft = $slider.scrollLeft();
});
$('document').on('mouseleave mouseup', function() {
  if (isDown) {
    isDown = false;
  }
});
$slider.on('mousemove', function(e) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - $slider.offset().left;
  const walk = x - startX;
  $slider.scrollLeft(scrollLeft - walk);
});


//  Swiper
    var $menuList = $('#menuList');
    var $slides = $('#menuList li');
    var slideCount = $slides.length;
    var currentIndex = 0;
    var touchStartX = 0;
    var touchMoveX = 0;
    var isDragging = false;
    var startLeft = 0;

    // 1280 미만일 때, 무한 슬라이드를 위한 복제
    if ($(window).width() < 1280) {
        $menuList.append($slides.first().clone());
        $menuList.prepend($slides.last().clone());
    }

    $slides = $('#menuList li')
    
    // 슬라이드 초기화
    function initSlidePosition() {
        var windowWidth = $(window).width();
        $slides.width(windowWidth);
        $menuList.css('left', -windowWidth);
    }
    
    // 반응형 처리
    function handleResponsive() {
        var windowWidth = $(window).width();
        $slides.width(windowWidth);
        
        // 710px 이하에서만 페이지네이션 표시
        if(windowWidth <= 710) {
            $('.swiper-pagination').show();
        } else {
            $('.swiper-pagination').hide();
        }
        initSlidePosition();
    }
    
    // 슬라이드 이동
    function moveSlide(index, animation = true) {
        var windowWidth = $(window).width();
        var moveX = -(windowWidth * (index + 1));
        
        if (animation) {
            $menuList.stop().animate({
                left: moveX
            }, 300, function() {
                // 무한 슬라이드 처리
                if(index >= slideCount) {
                    currentIndex = 0;
                    $menuList.css('left', -windowWidth);
                } else if(index < 0) {
                    currentIndex = slideCount - 1;
                    $menuList.css('left', -(windowWidth * slideCount));
                } else {
                    currentIndex = index;
                }
                updateDots();
            });
        } else {
            $menuList.css('left', moveX);
        }
    }
    
    // 터치 이벤트 처리
    $menuList.on('touchstart mousedown', function(e) {
        isDragging = true;
        touchStartX = e.type === 'touchstart' ? e.originalEvent.touches[0].pageX : e.pageX;
        startLeft = parseInt($menuList.css('left'));
        
        return false; // 기본 이벤트 방지
    });
    
    $(document).on('touchmove mousemove', function(e) {
        if (!isDragging) return;
        touchMoveX = e.type === 'touchmove' ? e.originalEvent.touches[0].pageX : e.pageX;
        var diff = touchMoveX - touchStartX;
        $menuList.css('left', startLeft + diff);
        return false; // 기본 이벤트 방지
    });
    
    $(document).on('touchend mouseup', function(e) {
        if (!isDragging) return;
        
        isDragging = false;
        var windowWidth = $(window).width();
        var moveX = touchMoveX - touchStartX;
        
        if (Math.abs(moveX) > windowWidth / 4) { // 25% 이상 드래그 시 슬라이드 전환
            if (moveX > 0) {
                moveSlide(currentIndex - 1);
            } else {
                moveSlide(currentIndex + 1);
            }
        } else {
            moveSlide(currentIndex); // 원위치
        }
    });
    
    // 네비게이션 버튼 생성 및 이벤트 바인딩
    $('#menu').append(
        '<button class="swiper-button-prev">&lt;</button>' +
        '<button class="swiper-button-next">&gt;</button>'
    );
    
    $('.swiper-button-next').click(function() {
        moveSlide(currentIndex + 1);
    });
    
    $('.swiper-button-prev').click(function() {
        moveSlide(currentIndex - 1);
    });
    
    // 윈도우 리사이즈 이벤트
    $(window).resize(function() {
        handleResponsive();
        moveSlide(currentIndex, false); // 애니메이션 없이 위치 조정
    });
    
    // 초기화
    handleResponsive();
    updateDots();