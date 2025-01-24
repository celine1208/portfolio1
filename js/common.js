// 네비바 마우스 오버 이벤트
$('#gnb').on('mouseenter', function () {
    if (window.innerWidth > 440) {
        $('#header').stop().animate({ height: 400 }, 500);
    }
});

$('#gnb').on('mouseleave', function () {
    $('#header').stop().animate({ height: 100 }, 500);
});

// 모바일 버튼 클릭시 네비바 토글
$('#gnb a.mobileBtn').on('click', function () {
    if (window.innerWidth <= 600) {
        $('#gnb').toggleClass('on');
        if ($('#gnb').hasClass('on')) {
            $('#header').stop().animate({ height: 770 }, 500);
            $('#gnb a.mobileBtn').css({ backgroundImage:'url(./images/close.png)'})
            $('.snb').hide();
        }
        else {
            $('#header').stop().animate({ height: 100 }, 500);
            $('#gnb a.mobileBtn').css({ backgroundImage:'url(./images/mobileBtn.png)'})

        }
    }
});

$('#gnbList li a').on('click', function () {
    if (window.innerWidth <= 600) {
        $(this).next().slideToggle();
        $(this).parent().siblings().children('.snb').slideUp();
    }
});

// 슬라이드
let slideLength = $("#slideList li").length;
let num = 0;
let zNum = 0;

$("#btnBar").animate({ width: `100%` }, 3000)

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

let timer = setInterval(nextSlide, 3000)


$('.nextBtn').on('click', function () {
    clearInterval(timer);
    nextSlide();
});

$('.prevBtn').on('click', function () {
    clearInterval(timer);
    prevSlide();
});

function pageUpChange() {
    if (window.scrollY >= $('#location').offset().top -500) {
        $('#pageTop').css({ filter: 'invert(100%)' })
    }
    else {
        $('#pageTop').css({ filter: 'invert(0%)' })
    }
}

// 스크롤시 텍스트 업
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