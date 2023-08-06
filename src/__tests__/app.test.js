import App from '../App';
import { renderWithProviders } from '../helpers/testUtils';

describe('App root', () => {
  test('App renders without error', () => {
    renderWithProviders(<App />);
  });
});
