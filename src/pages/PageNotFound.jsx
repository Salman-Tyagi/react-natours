import { Link, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <Link onClick={() => navigate(-1)}>Go Back</Link>
      <h1>Page not found</h1>
    </div>
  );
}
