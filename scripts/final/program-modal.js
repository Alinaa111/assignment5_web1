document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("programModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDescription");
    const modalRooms = document.getElementById("modalRooms");
    const closeBtn = document.querySelector(".close");

    let programsData = {};

    fetch("../data/programs.json")
        .then(res => res.json())
        .then(data => {
            programsData = data;
        })
        .catch(err => console.error("Error loading programs.json", err));

        
    document.querySelectorAll(".program-card").forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h2").innerText;
            modalTitle.innerText = title;
            modalDesc.innerText = `Upcoming sessions for ${title}:`;

            modalRooms.innerHTML = "";

            const key = card.classList[1];
            const categoryKeyMap = {
                "water": "water_sports",
                "gym": "gym",
                "stretching": "stretching_pilates",
                "yoga": "yoga",
                "intensive": "intensive_classes",
                "martial_arts": "martial_arts",
                "dance": "dance",
                "team_sports": "team_sports",
                "diff_activity": "different_activities"
            };

            const jsonKey = categoryKeyMap[key];
            const sessions = programsData[jsonKey];

            if (sessions && sessions.length > 0){
                sessions.forEach(s => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${s.name}</strong> — ${s.time}<br>${s.location}<br>Trainer: ${s.trainer}, Max people: ${s.max_people}`;
                    modalRooms.appendChild(li);
                });
            }
            else {
                const li = document.createElement("li");
                li.innerText = "No upcoming sessions.";
                modalRooms.appendChild(li);
            }
            
            modal.style.display = "flex";
        });
    });

    // Closing with button
    closeBtn.onclick = () => (modal.style.display = "none");

    // Closing with click outside pop-up
    window.onclick = e => {
        if (e.target === modal) modal.style.display = "none";
    };

});
