import { getApi } from 'utils/api/data';

const mainLoader = async () => {
  const {
    data: { response },
  } = await getApi();
  console.log(response);
  return response;
};

export default mainLoader;
