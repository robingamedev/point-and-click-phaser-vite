const Store = localStorage;

export function setObjectToStore(key: string, value: object | null): void {
  console.log("setObjectToStore", key, value)
  try {
    // Retrieve existing data or create an empty object
    const existingData = Store.getItem(key) ? JSON.parse(Store.getItem(key)) : {};

    // Merge new data with existing data
    Object.assign(existingData, value);

    if (value === null) {
      Store.setItem(key, JSON.stringify({}));
      console.log("set Object to null")
    } else {
      Store.setItem(key, JSON.stringify(existingData));
      console.log("set Object to ", existingData)

    }


  } catch (error) {
    console.error('Error saving object to Store:', error);
  }
}

export function setArrayToStore(key: string, value: Array<any> | null): void {

  console.log("setArrayToStore", key, value)
  try {
    // Retrieve existing data or create an empty array
    let existingData = Store.getItem(key) ? JSON.parse(Store.getItem(key)) : [];

    if (!Array.isArray(existingData)) {
      // Handle potential type conflict
      existingData = [];
    }

    if (value === null) {
      Store.setItem(key, JSON.stringify([]));
      console.log("set Array to null")

    } else {
      existingData = [...existingData, ...value];
      Store.setItem(key, JSON.stringify(existingData));
      console.log("set Array to ", existingData)
    }


  } catch (error) {
    console.error('Error saving array to Store:', error);
  }
}
export
  function getObjectFromStore(key: string): object | null {
  try {
    const storedData = Store.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error loading object from Store:', error);
    return null;
  }
}

export function getArrayFromStore(key: string): Array<any> | null {
  try {
    const storedData = Store.getItem(key);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        return parsedData;
      } else {
        console.warn('Data stored under key is not an array:', key);
        return [];
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error loading array from Store:', error);
    return null;
  }
}

export function checkIfValueExistsInStore(key: string): boolean {
  try {
    const storedData = Store.getItem(key);
    if (!storedData) {
      return false; // Key does not exist
    }

    const parsedData = JSON.parse(storedData);
    return (
      Object.keys(parsedData).length > 0 || // Check for non-empty object
      parsedData.length > 0 // Check for non-empty array
    );
  } catch (error) {
    // Handle potential parsing errors
    console.error('Error checking value in Store:', error);
    return false;
  }
}