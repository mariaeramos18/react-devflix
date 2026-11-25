import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CourseSection from "./components/CourseSection";
import FavoritesSection from "./components/FavoritesSection";
import VideoPlayer from "./components/VideoPlayer";
import { fetchCategories } from "./services/api";
import "./App.css";

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => new Set());
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchCategories();
        if (!cancelled) setCategories(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const allCourses = useMemo(
    () => categories.flatMap((category) => category.courses),
    [categories]
  );

  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return categories;

    return categories
      .map((category) => ({
        ...category,
        courses: category.courses.filter((course) =>
          course.title.toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.courses.length > 0);
  }, [categories, searchTerm]);

  function handleToggleFavorite(courseId) {
    setFavorites((previous) => {
      const next = new Set(previous);
      next.has(courseId) ? next.delete(courseId) : next.add(courseId);
      return next;
    });
  }

  if (loading) return <p className="status-message">Carregando catálogo...</p>;
  if (error) return <p className="status-message error">Erro: {error}</p>;

  return (
    <>
      <Header categories={categories} />
      <main id="home">
        <section className="hero">
          <h1>Bem-vindo ao DevFlix</h1>
          <p>Aprenda programação com aulas gratuitas.</p>
          <a href="#frontend" className="hero-button">Explorar aulas</a>
        </section>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <FavoritesSection
          favorites={favorites}
          allCourses={allCourses}
          onSelect={setSelectedCourse}
          onToggleFavorite={handleToggleFavorite}
        />

        {filteredCategories.length === 0 ? (
          <p className="empty-state">Nenhuma aula encontrada para "{searchTerm}".</p>
        ) : (
          filteredCategories.map((category) => (
            <CourseSection
              key={category.id}
              category={category}
              onSelect={setSelectedCourse}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </main>

      <VideoPlayer course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </>
  );
}
export default App;