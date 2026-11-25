function CourseCard({ course, onSelect, isFavorite, onToggleFavorite }) {
  const thumbnail = `https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`;

  return (
    <div className="course-card-wrapper">
      <button
        type="button"
        className="course-card"
        onClick={() => onSelect(course)}
      >
        <img src={thumbnail} alt={`Capa da aula ${course.title}`} />
        <div className="course-info">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      </button>

      <button
        type="button"
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        onClick={() => onToggleFavorite(course.id)}
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={isFavorite}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}
export default CourseCard;