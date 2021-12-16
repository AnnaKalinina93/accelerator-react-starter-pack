import PacmanLoader from 'react-spinners/ClipLoader';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function LoadingScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
            <PacmanLoader size={30} /> Loading...
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoadingScreen;
