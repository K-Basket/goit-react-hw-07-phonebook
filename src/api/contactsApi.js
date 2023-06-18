import axios from 'axios';

export const getContacts = async () => {
  const { data } = await axios(
    `https://648d87dc2de8d0ea11e7f308.mockapi.io/contacts`
  );
  return data;
};

// getContacts().then(console.log);
