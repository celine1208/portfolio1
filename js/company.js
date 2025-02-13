$(document).ready(function() {
    // 초기 로드 시 타이틀 섹션 스크롤 가이드 표시
    setTimeout(() => {
        $('#introTitle').addClass('visible');
    }, 500);

    // 스크롤 이벤트 처리
    const handleScroll = () => {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        // 타임라인 섹션 처리
        const $timeline = $('.timeline-grid');
        const timelineTop = $timeline.offset().top;

        if (scrollTop + windowHeight > timelineTop + 100) {
            $timeline.addClass('visible');
            
            // 각 타임라인 아이템 순차적으로 표시
            $('.timeline-item').each(function(index) {
                const $item = $(this);
                const itemTop = $item.offset().top;

                if (scrollTop + windowHeight > itemTop + 100) {
                    setTimeout(() => {
                        $item.addClass('visible');
                    }, index * 200); // 각 아이템 0.2초 간격으로 나타남
                }
            });
        }
    };

    // 스크롤 이벤트 리스너 등록
    $(window).on('scroll', handleScroll);
    
    // 초기 실행
    handleScroll();

    // 창 크기 변경 시 재계산
    $(window).on('resize', handleScroll);
});