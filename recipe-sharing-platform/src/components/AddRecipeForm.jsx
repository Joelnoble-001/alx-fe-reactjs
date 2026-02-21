import { useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !ingredients || !steps) {
      setError("All fields are required.");
      return;
    }

    const ingredientList = ingredients.split(",");

    if (ingredientList.length < 2) {
      setError("Please include at least two ingredients.");
      return;
    }

    setError("");
    alert("Recipe submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New Recipe
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Recipe Title
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Ingredients (comma separated)
          </label>
          <textarea
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Preparation Steps
          </label>
          <textarea
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            rows="4"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;