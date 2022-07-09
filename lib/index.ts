import { useCallback, useState } from 'react';

export function useBatchState<T extends Object>(initState: T) {
  const [state, updateState] = useState(initState);

  const setState = useCallback((action: Partial<T> | ((preState: T) => T)) => {
    typeof action === 'function' ? updateState(action) : updateState((s) => ({ ...s, ...action }));
  }, []);

  return { state, setState };
}

export function openUrl(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.click();
}

export function safeParse<T extends unknown, E = Error>(str: string): [E, undefined] | [undefined, T] {
  try {
    return [undefined, JSON.parse(str) as T];
  } catch (error) {
    return [error as E, undefined];
  }
}

export function to<T, U = Error>(f: () => T): [U, undefined] | [undefined, T] {
  try {
    return [undefined, f()];
  } catch (err) {
    return [err as U, undefined];
  }
}

export function omitNullish(item: Record<string, unknown>) {
  return Object.keys(item).reduce(
    (ret, key) => (item[key] && (ret[key] = item[key]), ret),
    {} as Record<string, unknown>
  );
}

export function omitKeys<T, K extends keyof T>(item: T, keys: K[]) {
  const keySet = new Set(keys);
  return (Object.keys(item) as K[]).reduce((ret, k) => {
    !keySet.has(k) && (ret[k] = item[k]);
    return ret;
  }, {} as Partial<T>);
}
