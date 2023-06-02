const getLocalStorage = (key, def) => {
    const value = localStorage.getItem(key);
    if (!value) {
      setLocalStorage(key, def);
      return def;
    }
  
    return value;
  };
  
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  
  export { getLocalStorage, setLocalStorage };