import axios from 'axios';

export const getContacts = async () => {
  const { data } = await axios(
    `https://648d87dc2de8d0ea11e7f308.mockapi.io/contacts`
  );
  return data;
};

// getContacts().then(console.log);

export const deleteContact = async id => {
  const { data } = await axios.delete(
    `https://648d87dc2de8d0ea11e7f308.mockapi.io/contacts/${id}`
  );
  return data;
};

// deleteContact(38);

export const addContact = async contact => {
  const { data } = await axios.post(
    `https://648d87dc2de8d0ea11e7f308.mockapi.io/contacts`,
    contact
  );

  return data;
};
