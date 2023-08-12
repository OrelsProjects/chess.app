import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ApiService } from '../../../services/ApiService';


/**
 *
 * @returns Deals with my request details api
 * Caching handled by react query
 */
export const GetUserDetails = () => {
  const staffRequestService = ApiService.createInstance();

  return useQuery(['UserDetails'], async () => {
    const response: AxiosResponse = await staffRequestService.getCharacters();
    return response.data;
  });
};
