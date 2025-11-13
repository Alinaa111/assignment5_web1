document.addEventListener("DOMContentLoaded", () => {
    // Select elements from the page
    const showRecipeBtn = document.querySelector(".show-recipe-btn"); // button to open the recipe section
    const mealButton = document.querySelector(".meal-but"); // "Next recipe" button
    const mealTitle = document.querySelector("#meal-title");
    const mealImage = document.querySelector("#meal-img");
    const mealInstructions = document.querySelector("#meal-instructions");
    const recipeSection = document.querySelector("#recipe-section");
    const closeBtn = document.querySelector("#close-btn");

    // When user clicks "Show Recipe", load and show the section
    showRecipeBtn.addEventListener("click", async () => {
    recipeSection.style.display = "block";
    recipeSection.classList.remove("hidden");
    await getRecipe(); // load first recipe
    });

    // "Next recipe" loads a new random one
    mealButton.addEventListener("click", getRecipe);

    // Close the recipe section
    closeBtn.addEventListener("click", () => {
    recipeSection.classList.add("hidden");
    setTimeout(() => {
        recipeSection.style.display = "none";
    }, 300);
    });

    // Fetch and show random recipe from TheMealDB
    async function getRecipe() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();

        const meal = data.meals[0];
        mealTitle.textContent = meal.strMeal;
        mealImage.src = meal.strMealThumb;
        mealInstructions.textContent = meal.strInstructions.slice(0, 300) + "...";
    } catch (error) {
        mealTitle.textContent = "Failed to load the recipe 😞. Please try again.";
        console.error("API error:", error);
    }
    }
});