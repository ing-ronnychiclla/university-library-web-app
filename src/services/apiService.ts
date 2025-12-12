import axios from 'axios';
import type { Book, CreateBookDto } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:5262/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
        
            console.error(`API Error ${error.response.status}:`, error.response.data);
        } else if (error.request) {
            
            console.error('No response from API:', error.request);
        } else {
        
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
