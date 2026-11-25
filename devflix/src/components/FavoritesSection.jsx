import CourseCard from "./CourseCard";

function FavoritesSection({ favorites, allCourses, onSelect, onToggleFavorite }) {
  const favoriteCourses = allCourses.filter((course) => favorites.has(course.id));

  if (favoriteCourses.length === 0) return null;

  return (
    <section id="favorites" className="course-section">
      <h2>Meus Favoritos</h2>
      <div className="course-grid">
        {favoriteCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={onSelect}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
export default FavoritesSection;