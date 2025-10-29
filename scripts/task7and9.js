$(document).ready(function(){
    console.log("jQuery is ready!");

    window.showNotification = function(message) {
        $("#notification").text(message).addClass("show");
        setTimeout(function(){
            $("#notification").removeClass("show");
        }, 2000);
    };

    // Lazy Loading
    function lazyLoad() {
        $(".lazy").each(function () {
            let imgTop = $(this).offset().top;
            let scrollBottom = $(window).scrollTop() + $(window).height();

            if (scrollBottom > imgTop) {
                $(this).attr("src", $(this).data("src"));
                $(this).removeClass("lazy");
            }
        });
    }

    lazyLoad();
    $(window).on("scroll", lazyLoad);
});
