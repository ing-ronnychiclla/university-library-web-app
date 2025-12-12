import axios from 'axios';
import type { Book, CreateBookDto } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:5262/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add error interceptor for debugging
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Server responded with error status
            console.error(`API Error ${error.response.status}:`, error.response.data);
        } else if (error.request) {
            // Request made but no response
            console.error('No response from API:', error.request);
        } else {
            // Error setting up request
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const bookService = {
    getAll: async (): Promise<Book[]> => {
        const res = await api.get('/books');
        return res.data;
    },
    create: async (dto: CreateBookDto): Promise<Book> => {
        const res = await api.post('/books', dto);
        return res.data;
    },
};

export default api;
