export const saveToLocalStorage = (key:string, data:any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
};

export const loadFromLocalStorage = (key:string) => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return undefined;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return undefined;
    }
};