import React, { useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else if (ingredients.split(",").length < 2) {
      newErrors.ingredients = "At least 2 ingredients required";
    }
    if (!steps.trim()) newErrors.steps = "Preparation steps are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Recipe submitted successfully!");
      setTitle("");
      setIngredients("");
      setSteps("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg md:max-w-xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Add New Recipe
        </h2>

        {/* Title Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm md:text-base">
            Recipe Title
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 md:p-3 focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm md:text-base">
              {errors.title}
            </p>
          )}
        </div>

        {/* Ingredients Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm md:text-base">
            Ingredients (comma separated)
          </label>
          <textarea
            className="w-full border rounded-lg p-2 md:p-3 focus:ring-2 focus:ring-blue-400"
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 mt-1 text-sm md:text-base">
              {errors.ingredients}
            </p>
          )}
        </div>

        {/* Steps Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm md:text-base">
            Preparation Steps
          </label>
          <textarea
            className="w-full border rounded-lg p-2 md:p-3 focus:ring-2 focus:ring-blue-400"
            rows="4"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
          {errors.steps && (
            <p className="text-red-500 mt-1 text-sm md:text-base">
              {errors.steps}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 md:py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;