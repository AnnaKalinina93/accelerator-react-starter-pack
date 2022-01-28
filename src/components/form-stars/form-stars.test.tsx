import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FormStars from './form-stars';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);

const guitars = new Array(6).fill(null).map(()=>(makeFakeGuitar()));
const guitar = makeFakeGuitar();
const storeWithGuitar = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: false,
    guitars,
    guitar,
    guitarLoading: false,
    guitarError: false,
  },
});
const count = '3';
const title = '3-start';
const value = '3';
const onStartChange = jest.fn();
describe('Component: FormStars', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <FormStars count={count} title={title} onStartChange={onStartChange} value={value}/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByTestId(count)).not.toBeNull();
    userEvent.click(screen.getByTestId(count));
    expect(screen.getByTestId(count)).toBeChecked();
  });

});
