import { Guitar } from '../../types/guitar';
import GuitarItem from '../guitar-item/guitar-item';

type GuitarsListProps = {
  guitars: Guitar[]
}
function GuitarsList({ guitars }: GuitarsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => (
        <GuitarItem key={`${guitar.id}-${guitar.vendorCode}`} guitar={guitar} />
      ))}
    </div>
  );
}

export default GuitarsList;
