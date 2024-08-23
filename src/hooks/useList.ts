import { useEffect, useRef, useState } from 'react';

type UseListProps<T, V> = {
  items: T[];
  getValue: (item: T) => V;
  timeout: number;
};

type ListItem<T> = {
  data: T;
  state: 'adding' | 'removing' | 'idle';
};

export const useList = <T, V>({ items, getValue, timeout }: UseListProps<T, V>) => {
  const [visible, setVisible] = useState<ListItem<T>[]>(items.map((item) => ({ data: item, state: 'idle' })));
  const [count, setCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const getAddingItem = () => {
    const lastVisible = visible[visible.length - 1];
    if (!lastVisible) return items[0];

    const index = items.findIndex((item) => getValue(item) === getValue(lastVisible.data));

    if (index === -1) return items[0];

    return items[index + 1];
  };

  const getRemovingItem = () => {
    const firstVisible = visible[0];

    if (!firstVisible) return undefined;

    const index = items.findIndex((item) => getValue(item) === getValue(firstVisible.data));

    if (index === -1) return firstVisible.data;

    return undefined;
  };

  const handleNewItems = () => {
    if (timerRef.current) return;

    const addingItem = getAddingItem();
    const removingItem = getRemovingItem();

    if (addingItem || removingItem) {
      setVisible((visible) => [
        ...visible.map((item) =>
          removingItem && getValue(item.data) === getValue(removingItem)
            ? { ...item, state: 'removing' as const }
            : item,
        ),
        ...(addingItem ? [{ data: addingItem, state: 'adding' as const }] : []),
      ]);

      timerRef.current = setTimeout(() => {
        timerRef.current = null;

        setVisible((visible) =>
          visible.filter((item) => item.state !== 'removing').map((item) => ({ ...item, state: 'idle' })),
        );

        setCount((prevValue) => prevValue + 1);
      }, timeout);
    }
  };

  useEffect(() => {
    handleNewItems();
  }, [items, count]);

  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  return [...visible].reverse();
};
