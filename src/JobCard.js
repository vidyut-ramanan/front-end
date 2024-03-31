function JobCard(props) {
  const { title, description } = props;
  return (
    <div class="card" style={{ width: "50rem" }}>
      <div class="card-header">Potential Career Path</div>
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{description}</p>
        <a href="#" class="btn btn-primary">
          Learn More
        </a>
      </div>
    </div>
  );
}

export default JobCard;
