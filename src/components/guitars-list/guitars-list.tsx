import { Guitar } from '../../types/guitar';
import GuitarItem from '../guitar-item/guitar-item';
import LoadingScreen from '../loading-screen/loading-screen';
import GuitarsErrorScreen from '../guitars-error-screen/guitars-error-screen';
import {
  getGuitarsError,
  getGuitarsLoading
} from '../../store/guitars-data/selectors';
import { useSelector } from 'react-redux';

type GuitarsListProps = {
  guitars: Guitar[]
}
function GuitarsList({ guitars }: GuitarsListProps): JSX.Element {
  const guitarsLoading = useSelector(getGuitarsLoading);
  const guitarsError = useSelector(getGuitarsError);

  if (guitarsLoading) {
    return <LoadingScreen />;
  }

  if (!guitarsLoading && guitarsError) {
    return <GuitarsErrorScreen />;
  }

  return (
    <div className="cards catalog__cards">
      {guitars?.map((guitar) => (
        <GuitarItem key={`${guitar.id}-${guitar.vendorCode}`} guitar={guitar} />
      ))}
    </div>
  );
}

export default GuitarsList;
