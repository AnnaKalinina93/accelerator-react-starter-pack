import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function GuitarsErrorScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
            Что-то пошло не так. Попробуйте перезагрузить страницу!
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default GuitarsErrorScreen;
