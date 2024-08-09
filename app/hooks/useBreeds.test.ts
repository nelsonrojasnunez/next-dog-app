import { renderHook, act, waitFor } from '@testing-library/react';
import useBreeds from './useBreeds';
import apiClient from '../services/api-client';
import { CanceledError, AxiosResponse } from 'axios';

jest.mock<AxiosResponse>('../services/api-client');

describe('useBreeds', () => {
  it('should abort the request on unmount', async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    const mockGet = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(new CanceledError()), 1000);
      });
    });
    apiClient.get.mockImplementation(mockGet);

    const { unmount } = renderHook(() => useBreeds());

    // Unmount the component to trigger the abort
    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });

  

  it('should handle network error', async () => {
    const mockGet = jest.fn().mockRejectedValue(new Error('Network Error'));
    (apiClient.get as jest.Mock).mockImplementation(mockGet);

    const { result } = renderHook(() => useBreeds());

    await waitFor(() => expect(result.current.error).toBe('Network Error'));
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle wrong URL', async () => {
    const mockGet = jest.fn().mockRejectedValue({ message: 'Request failed with status code 404' });
    (apiClient.get as jest.Mock).mockImplementation(mockGet);

    const { result } = renderHook(() => useBreeds());

    await waitFor(() => expect(result.current.error).toBe('Request failed with status code 404'));
    expect(result.current.isLoading).toBe(false);
  });

});