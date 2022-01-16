import Header from '../header/header';
import Footer from '../footer/footer';

function Product(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
            Описание товара.
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Product;
