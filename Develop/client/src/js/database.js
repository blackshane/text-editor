import { openDB } from 'idb';

const initdb = async () => {
  try {
    const db = await openDB('jate', 1);
    if (db.objectStoreNames.contains('jate')) {
      console.log('jate database already exists');
      return;
    }
    const objectStore = db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
    console.log('jate database created', objectStore);
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({ jate: content });
    const result = await request;
    console.log('Data saved:', result);
  } catch (error) {
    console.error('Error while putting data into the database:', error);
  }
};

// Gets all the content from the database
export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error while fetching data from the database:', error);
    return [];
  }
};

initdb();
