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
      const imgTop = $(this).offset().top;
      const scrollBottom = $(window).scrollTop() + $(window).height();

      if (scrollBottom + 100 > imgTop) {
        const dataSrc = $(this).data("src");

        if (dataSrc) {
          $(this)
            .attr("src", dataSrc)
            .hide()
            .fadeIn(400) 
            .removeClass("lazy");

          console.log("✅ Lazy image loaded:", dataSrc);
        }
      }
    });
  }

  lazyLoad();

  $(window).on("scroll", lazyLoad);
});
