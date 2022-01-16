import PacmanLoader from 'react-spinners/ClipLoader';

function LoadingScreen(): JSX.Element {
  return (
    <div className="cards catalog__cards">
      <h1 className="page-content__title title title--bigger">
        <PacmanLoader size={30} /> Loading...
      </h1>
    </div>
  );
}

export default LoadingScreen;
