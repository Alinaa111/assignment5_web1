// PART 1
// 1st Task
$(document).ready(function() {
    $("#search").on("keyup", function() {
        const value = $(this).val().toLowerCase().trim();

        $(".program-card").each(function () {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(value));
        });
    });
});

// 2nd Task
$(document).ready(function () {
    const programs = [
        "Water Sports",
        "Gym",
        "Stretching & Pilates",
        "Yoga",
        "Intensive Classes",
        "Martial Arts",
        "Dance",
        "Team Sports",
        "Different Activities"
    ];

    let selectedIndex = -1;
    let $suggestionsList;

    $("#search").on("input", function () {
        const value = $(this).val().toLowerCase().trim();

        // Remove previous suggestions
        $(".autocomplete-list").remove();
        selectedIndex = -1;

        if (value.length === 0) return;

        const matches = programs.filter(name =>
            name.toLowerCase().includes(value)
        );

        if (matches.length > 0) {
            // Create new suggestion list
            $suggestionsList = $("<ul>")
                .addClass("autocomplete-list")
                .css({
                    position: "absolute",
                    background: "white",
                    border: "1px solid #ccc",
                    width: $("#search").outerWidth(),
                    marginTop: "4px",
                    zIndex: 10,
                    listStyle: "none",
                    padding: 0
                });

            matches.forEach(match => {
                const $item = $("<li>")
                    .addClass("suggestion-item")
                    .text(match)
                    .css({
                        padding: "8px",
                        cursor: "pointer"
                    })
                    .on("click", function () {
                        $("#search").val(match);
                        $(".autocomplete-list").remove();
                        $("#search").trigger("keyup");
                    });

                $suggestionsList.append($item);
            });

            $("#search").after($suggestionsList);
        }
    });

    // Keyboard navigation
    $("#search").on("keydown", function (e) {
        const $items = $(".autocomplete-list .suggestion-item");
        if ($items.length === 0) return;

        if (e.key === "ArrowDown") {
            selectedIndex = (selectedIndex + 1) % $items.length;
        } else if (e.key === "ArrowUp") {
            selectedIndex = (selectedIndex - 1 + $items.length) % $items.length;
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0) {
                const selectedText = $items.eq(selectedIndex).text();
                $("#search").val(selectedText);
                $(".autocomplete-list").remove();
                $("#search").trigger("keyup");
            }
        }

        $items.removeClass("active").css({ background: "", color: "" });
        if (selectedIndex >= 0) {
            $items.eq(selectedIndex).addClass("active").css({
                background: "#007cf0",
                color: "white"
            });
        }
    });

    // Hide suggestions when clicking outside
    $(document).on("click", function (e) {
        if (!$(e.target).closest("#search").length) {
            $(".autocomplete-list").remove();
        }
    });
});


// 3rd Task
$(document).ready(function () {
    function highlight(keyword) {
        $(".program-card").each(function () {
            const $card = $(this);
            const title = $card.find("h2");
            const text = title.text();
            const regex = new RegExp(`(${keyword})`, "gi");

            if (keyword.length > 0 && regex.test(text)) {
                const highlighted = text.replace(regex, "<mark>$1</mark>");
                title.html(highlighted);
            }
            else {
                title.html(text);
            }
        });
    }

    $("#search").on("input", function () {
        const keyword = $(this).val().trim();
        highlight(keyword);
    })


    // Empty state
    const $programsGrid = $(".programs-grid");
    const $emptyState = $("<p>", {
    class: "empty-state",
    text: "No fitness programs found 😔"
    }).hide();

    $programsGrid.after($emptyState);

    $("#search").on("input", function() {
    const query = $(this).val().toLowerCase();
    let anyVisible = false;

    $(".program-card").each(function() {
        const text = $(this).text().toLowerCase();
        const match = text.includes(query);
        $(this).toggle(match);
        if (match) anyVisible = true;
    });

    $emptyState.toggle(!anyVisible);
    });

})