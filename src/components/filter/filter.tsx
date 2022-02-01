import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guitarsType, numberOfString } from '../../const';
import { typeGuitarChange, numberOfStringChange, priceChange, activePageChange } from '../../store/ui-state/action';
import { getGuitarTypes, getActiveStrings, selectDisabledStringCheckboxes, selectDisabledTypesCheckboxes, getMaxPrice, getMinPrice } from '../../store/ui-state/selectors';
import { useDebouncedCallback } from 'use-debounce';

const typesPrices = {
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
};

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const activeGuitarTypes = useSelector(getGuitarTypes);
  const activeGuitarStrings = useSelector(getActiveStrings);
  const disabledStringCheckboxes = useSelector(selectDisabledStringCheckboxes);
  const disabledSTypesCheckboxes = useSelector(selectDisabledTypesCheckboxes);
  const [localPriceState, setLocalPriceState] = useState({
    minPrice: '',
    maxPrice: '',
  });

  const debouncedPriceChange = useDebouncedCallback((name, value) => {

    let correctedPrice = value;

    if (Number(value) < Number(minPrice) && name === typesPrices.minPrice) {
      correctedPrice = minPrice;
    }

    if (Number(value) > Number(maxPrice) && name === typesPrices.maxPrice) {
      correctedPrice = maxPrice;
    }

    setLocalPriceState((prevState) => ({
      ...prevState,
      [name]: correctedPrice,
    }));
    dispatch(priceChange(name, value));
  }, 500);

  const handleChangePrice = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setLocalPriceState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    dispatch(activePageChange(1));
    debouncedPriceChange(name, value);
  };

  const handleTypesChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const set = new Set(activeGuitarTypes);

    if (set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }

    dispatch(typeGuitarChange([...set]));
    dispatch(activePageChange(1));

  };

  const handleStringsChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const set = new Set(activeGuitarStrings);

    if (set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }

    dispatch(numberOfStringChange([...set]));
    dispatch(activePageChange(1));
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
              placeholder={minPrice?.toString() ?? '0'}
              id="priceMin"
              name={typesPrices.minPrice}
              min="0"
              data-testid={typesPrices.minPrice}
              value={localPriceState.minPrice}
              onChange={handleChangePrice}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={maxPrice?.toString() ?? '0'}
              id="priceMax"
              name={typesPrices.maxPrice}
              min="0"
              value={localPriceState.maxPrice}
              onChange={handleChangePrice}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {Object.entries(guitarsType).map(([key, value]) => (
          <div key={key} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={key}
              name={key}
              value={key}
              checked={activeGuitarTypes.includes(key)}
              onChange={handleTypesChange}
              disabled={disabledSTypesCheckboxes.includes(value)}
            />
            <label htmlFor={key}>{value}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
          Количество струн
        </legend>
        {Object.entries(numberOfString).map(([key, value]) => (
          <div key={key} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={value}
              name={value}
              value={key}
              checked={activeGuitarStrings.includes(key)}
              onChange={handleStringsChange}
              disabled={disabledStringCheckboxes.includes(key)}
            />
            <label htmlFor={value}>{key}</label>
          </div>
        ))}
      </fieldset>
    </form>
  );
}

export default Filter;
