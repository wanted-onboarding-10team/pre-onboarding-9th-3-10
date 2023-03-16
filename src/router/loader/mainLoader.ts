import { getApi } from 'utils/api/data';

const mainLoader = async () => {
  const {
    data: { response },
  } = await getApi();

  const data = Object.keys(response).map(item => {
    return {
      day: item.split(' ')[0],
      time: item.split(' ')[1],
      ...response[item],
    };
  });

  return data;
};

export default mainLoader;
