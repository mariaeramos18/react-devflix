const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/courses`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar cursos: ${response.status}`);
  }
  return response.json();
}