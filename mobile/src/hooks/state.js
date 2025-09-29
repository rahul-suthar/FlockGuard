const { useState, useRef } = require('react');

function useCustomState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const initialRef = useRef(initialValue);

  const reset = () => setValue(initialRef.current);

  return [value, setValue, reset];
}

export { useCustomState };
