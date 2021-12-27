import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guitarsType, numberOfString } from '../../const';
import { minPriceChange, maxPriceChange, typeGuitarChange, numberOfStringChange } from '../../store/ui-state/action';
import { getTypeGuitar, getActiveStrings } from '../../store/ui-state/selectors';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { getFilterGuitars } from '../../store/guitars-data/selectors';
import { getStringsFromType } from '../../utils';
import { useHistory } from 'react-router';

function Filter(): JSX.Element {
  const guitars = useSelector(getFilterGuitars);
  const activeTypeGuitar = useSelector(getTypeGuitar);
  const activeNumberOfStrings = useSelector(getActiveStrings);

  const dispatch = useDispatch();
  const onUserAnswerMinPrice = (minPrice: string) => {
    dispatch(minPriceChange(minPrice));
  };
  const onUserAnswerMaxPrice = (maxPrice: string) => {
    dispatch(maxPriceChange(maxPrice));
  };
  const onUserTypeAnswer = (type: string[]) => {
    dispatch(typeGuitarChange(type));
  };

  const onUserStringsAnswer = (numberStrings: string[]) => {
    dispatch(numberOfStringChange(numberStrings));
  };

  const history = useHistory();
  const assortedGuitars = guitars.slice().sort((a,b) => a.price - b.price);
  const minGuitarPrice = assortedGuitars[0].price.toString();
  const maxGuitarPrice = assortedGuitars[assortedGuitars.length-1].price.toString();

  const handleInputMinChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if ( target.value < minGuitarPrice) {
      history.push(`/start=${minGuitarPrice}`);
      onUserAnswerMinPrice(minGuitarPrice);
    } else if (target.value > maxGuitarPrice) {
      history.push(`/start=${maxGuitarPrice}`);
      onUserAnswerMinPrice(maxGuitarPrice);
    } else {
      history.push(`/start=${target.value}`);
      onUserAnswerMinPrice(target.value);
    }
  };

  const handleInputMaxChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if ( target.value > maxGuitarPrice) {
      history.push(`/end=${maxGuitarPrice}`);
      onUserAnswerMaxPrice(maxGuitarPrice);
    } else if(target.value < minGuitarPrice) {
      history.push(`/end=${minGuitarPrice}`);
      onUserAnswerMaxPrice(minGuitarPrice);
    }
    else {
      history.push(`/end=${target.value}`);
      onUserAnswerMaxPrice(target.value);
    }
  };

  const handleTypeChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const typeGuitars = [...activeTypeGuitar];
    if (!typeGuitars.includes(target.name)){
      typeGuitars.push(target.name);
    } else {
      const currentIndex = typeGuitars.indexOf(target.name);
      typeGuitars.splice(currentIndex,1);
    }
    onUserTypeAnswer(typeGuitars);
  };

  const handleStringsChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const numberStrings = [...activeNumberOfStrings];
    if (!numberStrings.includes(target.value)) {
      numberStrings.push(target.value);
    } else {
      const currentIndex = numberStrings.indexOf(target.value);
      numberStrings.splice(currentIndex,1);
    }
    onUserStringsAnswer(numberStrings);
  };

  const isDisabled = (string: string, types: string[] ): boolean => {
    if (types.length) {let numberStrings: string[] = [];
      types.map((typeItem) => {
        numberStrings = [...numberStrings, ...getStringsFromType(typeItem)];
      });
      const set = new Set(numberStrings);
      return !Array.from(set).includes(string);
    }
    return false;
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={minGuitarPrice}
              id="priceMin"
              name="от"
              min="0"
              onChange={AwesomeDebouncePromise(handleInputMinChange, 500)}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={maxGuitarPrice}
              id="priceMax"
              name="до"
              min="0"
              onChange={AwesomeDebouncePromise(handleInputMaxChange, 500)}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        { Object.entries(guitarsType).map(([key,value]) =>(
          <div key={key} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={key}
              name={key}
              checked={activeTypeGuitar.includes(key)}
              onChange={handleTypeChange}
            />
            <label htmlFor={key}>{value}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
          Количество струн
        </legend>
        { Object.entries(numberOfString).map(([key,value]) => (
          <div key={key} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={value}
              name={value}
              value={key}
              checked={activeNumberOfStrings.includes(key)}
              onChange={handleStringsChange}
              disabled={isDisabled(key, activeTypeGuitar)}
            />
            <label htmlFor={value}>{key}</label>
          </div>
        ))}
      </fieldset>
    </form>
  );
}

export default Filter;
