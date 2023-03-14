export const fetchData = (url: string) => {
  return fetch(url)
    .then(response => response.json())
    .then(response => response.response)
    .catch(error => {
      throw console.error(error instanceof Error ? error.message : error);
    });
};
