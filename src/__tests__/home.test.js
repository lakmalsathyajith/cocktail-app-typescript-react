import React from 'react';
import { screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import Home from '../components/Home';
import { renderWithProviders } from '../helpers/testUtils';
import { setupServer } from 'msw/lib/node';
import { handlers } from '../mock/api/handler';

const server = setupServer(...handlers);
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => {
  server.close();
  cleanup();
});

describe('Home component', () => {
  test('Home component renders without error', () => {
    renderWithProviders(<Home />);
  });

  test('Search input field should be in home page', async () => {
    renderWithProviders(<Home />);
    await screen.findByPlaceholderText('Search…').then((element) => {
      expect(element).toBeInstanceOf(HTMLInputElement);
    });
  });

  test('Refresh button should be in home page', () => {
    renderWithProviders(<Home />);
    const element = screen.queryByText('Refresh');
    expect(element).toBeInstanceOf(HTMLButtonElement);
  });

  test('Not found label should be there', () => {
    renderWithProviders(<Home />);
    const element = screen.queryByText('Not found ...');
    expect(element).toBeInstanceOf(HTMLHeadingElement);
  });

  test('5 cocktails in the home page', async () => {
    server.use();
    renderWithProviders(<Home />);
    await waitFor(() => {
      const elements = screen.queryAllByTestId('cocktailCard');
      expect(elements.length).toBe(5);
    });
  });

  test('By clicking on favorite add it to favorite list', async () => {
    server.use();
    renderWithProviders(<Home />);
    await waitFor(() => {
      screen.findAllByTestId('favorite').then((elements) => {
        fireEvent.click(elements[0]);
      });
      const favElements = screen.queryAllByTestId('favoriteCard');
      expect(favElements[0]).toBeInTheDocument();
    });
  });
});
