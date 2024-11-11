import { useCallback, useEffect, useState } from 'react';

import { JournalDatePickerContext } from './context';
import { ResizeViewport } from './viewport';

export interface JournalDatePickerProps {
  date: string;
  onChange: (date: string) => void;
  withDotDates: Set<string | null | undefined>;
}
export const JournalDatePicker = ({
  date: selected,
  onChange,
  withDotDates,
}: JournalDatePickerProps) => {
  const [cursor, setCursor] = useState(selected);

  // should update cursor when selected modified outside
  useEffect(() => {
    setCursor(selected);
  }, [selected]);

  const onSelect = useCallback(
    (date: string) => {
      setCursor(date);
      onChange(date);
    },
    [onChange]
  );

  return (
    <JournalDatePickerContext.Provider
      value={{
        selected,
        onSelect,
        cursor,
        setCursor,
        width: window.innerWidth,
        withDotDates,
      }}
    >
      <ResizeViewport></ResizeViewport>
    </JournalDatePickerContext.Provider>
  );
};
