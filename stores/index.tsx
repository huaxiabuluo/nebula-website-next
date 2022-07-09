import { createContext, FC, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

enableStaticRendering(typeof window === 'undefined');

export class RootStore {
  pageLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate = (data: Pick<RootStore, 'pageLoading'>) => {
    if (!data) {
      return;
    }
    const keys = Object.keys(data) as (keyof typeof data)[];
    keys.forEach((key) => (this[key] = data[key]));
  };

  setPageLoading = (loading: boolean) => (this.pageLoading = loading);
}

export const rootStoreRef = {
  current: new RootStore(),
};

export const storeContext = createContext(undefined as unknown as RootStore);

export const StoreProvider: FC<{ initialData?: RootStore }> = ({ children, initialData }) => {
  const store = initializeStore(initialData);
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

function initializeStore(initialData?: RootStore) {
  const _store = rootStoreRef.current ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData);
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store;
  }

  // Create the store once in the client
  !rootStoreRef.current && (rootStoreRef.current = _store);

  // @ts-ignore
  window._store = _store;
  return _store;
}

export function useStore() {
  const store = useContext(storeContext);
  return store;
}
