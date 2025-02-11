
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


// Mobile Menu Swipe Slider
$(function() {
    let currentIndex = 0;
    const menuItems = $('#menuList li');
    const totalItems = menuItems.length;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Initialize mobile menu
    function initMobileMenu() {
        if ($(window).width() <= 710) {
        
            // Style menu items for horizontal sliding
            menuItems.css({
                'min-width': '100%',
                'transition': 'transform 0.5s ease',
                'transform': `translateX(-${currentIndex * 100}%)`
            });
            
            // Add pagination dots if they don't exist
            if ($('#menuPagination').length === 0) {
                let paginationHtml = '<div id="menuPagination" style="display: flex; justify-content: center; gap: 8px; margin: 20px 0;">';
                for (let i = 0; i < totalItems; i++) {
                    paginationHtml += `<span class="menu-dot" data-index="${i}" style="
                        width: 8px;
                        height: 8px;
                        background: ${i === currentIndex ? 'var(--primary)' : '#ddd'};
                        border-radius: 50%;
                        cursor: pointer;
                        transition: all 0.3s ease;"></span>`;
                }
                paginationHtml += '</div>';
                $('#menuList').after(paginationHtml);
            }
        } else {
            // Reset styles for desktop view
            $('#menuList, #menuList li').removeAttr('style');
            $('#menuPagination').remove();
        }
    }

    // Update pagination dots
    function updatePagination() {
        $('.menu-dot').css('background', '#ddd')
            .eq(currentIndex).css('background', 'var(--primary)');
    }

    // Slide to specific index


    // Touch events for swipe functionality
    $('#menuList').on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });

    $('#menuList').on('touchmove', function(e) {
        if ($(window).innterWidth() <= 710) {
            e.preventDefault(); // Prevent default only in mobile view
        }
    });

    $('#menuList').on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - show previous
                slideTo(currentIndex - 1);
            } else {
                // Swipe left - show next
                slideTo(currentIndex + 1);
            }
        }
    }

    // Dot navigation event handler
    $(document).on('click', '.menu-dot', function() {
        slideTo($(this).data('index'));
    });

    // Initialize on load and resize
    initMobileMenu();
    $(window).on('resize', initMobileMenu);
});ㄴ