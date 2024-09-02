import { LoaderFunctionArgs } from 'react-router-dom';

export const travelLocationLoader = async ({ params }: LoaderFunctionArgs) => {
  const { location } = params;
  return location
}