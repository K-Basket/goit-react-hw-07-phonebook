export const listSelector = state => state.contacts.filter;
export const itemsSelector = state => state.contacts.items;
export const isLoadingSelector = state => state.contacts.isLoading;
export const errorSelector = state => state.contacts.error;
