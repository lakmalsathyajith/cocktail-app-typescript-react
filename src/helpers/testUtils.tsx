import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import setupStore from '../store';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export function renderWithProviders(
  ui: any,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
