import { useLoaderData } from 'react-router-dom';

function Main() {
  const data = useLoaderData();
  console.log(data);
  return <>hello</>;
}
export default Main;
