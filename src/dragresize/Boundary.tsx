import React from 'react';

const Boundary = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(function Boundary(
  props,
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      style={{width: 1000, height: 1000}}
      className={
        'overflow-hidden rounded-xl bg-gray-200 dark:bg-[#121212] ' + props.className
      }
    />
  );
});

export default Boundary;
