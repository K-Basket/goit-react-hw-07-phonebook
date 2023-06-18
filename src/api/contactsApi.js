import axios from 'axios';

export const getContacts = async () => {
  const { data } = await axios(
    `https://648d87dc2de8d0ea11e7f308.mockapi.io/contacts`
  );
  return data;
};

getContacts().then(console.log);

export const deleteContact = async id => {
  const { data } = await axios.delete(
    `https://648d87dc2de8d0ea11e7f308.mockapi.io/contacts/${id}`
  );
  return data; // обязятельно возвращать объект
};

// deleteContact(38);

export const postContacts = async () => {
  return await axios.post(
    `https://648d87dc2de8d0ea11e7f308.mockapi.io/contacts`,
    {
      createdAt: '2023-06-10',
      // id: '39',
      name: 'Mango 3',
      phone: '044-345-67-89',
    }
  );
};

// postContacts();
