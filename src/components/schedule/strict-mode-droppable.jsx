'use client';

import { Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

export const StrictModeDroppable = ({ children, ...props }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};