$('#gnb').on('mouseenter', function(){
    $('#header').stop().animate({height: 400}, 300)

});

$('#gnb').on('mouseleave', function(){
    $('#header').stop().animate({height: 100}, 300);
});

// $('#gnbList > li > a').on('mouseenter', function(){
//     $(this).addClass('active')
//            .css({borderBottom: '2px solid #B90B0B'});
// });

// $('#gnbList > li > a').on('mouseleave', function(){
//     $(this).removeClass('active');
//     $('#gnbList > li > a').css({borderBottom: '2px solid #fff'})
// });

// $('#gnbList .snb li a').on('mouseenter', function(){
//     $(this).addClass('active')
// });

// $('#gnbList .snb li a').on('mouseleave', function(){
//     $(this).removeClass('active');
// });