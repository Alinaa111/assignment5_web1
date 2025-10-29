$(document).ready(function () {
    console.log("jQuery is ready!");

    // Notification Toast
    window.showNotification = function (message) {
        let toast = $("#toast");

        toast.text(message).css("opacity", "1");

        setTimeout(() => {
            toast.css("opacity", "0");
        }, 1800);
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
