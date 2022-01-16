
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import GuitarsErrorScreen from './guitars-error-screen';

describe('Component: GuitarsErrorScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <GuitarsErrorScreen />
      </Router>,
    );

    expect(screen.getByText(/Что-то пошло не так. Попробуйте перезагрузить страницу!/i)).toBeInTheDocument();
  });
});
