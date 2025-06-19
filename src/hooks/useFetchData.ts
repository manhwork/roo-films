import { useEffect, useState, useCallback } from 'react';
import { http } from '../utils/http';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetchOptions {
    method?: HttpMethod;
    data?: any;
    headers?: Record<string, string>;
}

export function useFetchData<T = any>(url: string, options: FetchOptions = {}) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchData = useCallback(async () => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        try {
            let response;
            const { method = 'GET', data: requestData, headers } = options;

            switch (method) {
                case 'GET':
                    response = await http.get(url, { headers });
                    break;
                case 'POST':
                    response = await http.post(url, requestData, { headers });
                    break;
                case 'PUT':
                    response = await http.put(url, requestData, { headers });
                    break;
                case 'PATCH':
                    response = await http.patch(url, requestData, { headers });
                    break;
                case 'DELETE':
                    response = await http.delete(url, { headers });
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }

            if (isMounted) {
                setData(response.data);
            }
        } catch (err) {
            if (isMounted) {
                setError(err);
            }
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch };
}

// Hook riêng cho POST
export function usePostData<T = any>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const postData = useCallback(
        async (postData: any) => {
            setLoading(true);
            setError(null);

            try {
                const response = await http.post(url, postData);
                setData(response.data);
                return response.data;
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url]
    );

    return { data, loading, error, postData };
}

// Hook riêng cho PATCH
export function usePatchData<T = any>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const patchData = useCallback(
        async (patchData: any) => {
            setLoading(true);
            setError(null);

            try {
                const response = await http.patch(url, patchData);
                setData(response.data);
                return response.data;
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url]
    );

    return { data, loading, error, patchData };
}

// Hook riêng cho DELETE
export function useDeleteData<T = any>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const deleteData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await http.delete(url);
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url]);

    return { data, loading, error, deleteData };
}
