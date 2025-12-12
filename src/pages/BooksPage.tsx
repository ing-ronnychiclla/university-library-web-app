import { useEffect, useState } from 'react';
import type { Book } from '../types';
import { bookService } from '../services/apiService';
import { BookTable } from '../components/BookTable';

export const BooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [stock, setStock] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const loadBooks = async () => {
        try {
            const data = await bookService.getAll();
            setBooks(data);
        } catch (err) {
            console.error('Error loading books:', err);
            alert('Error loading books (see console)');
        }
    };

    useEffect(() => { loadBooks(); }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const dto = { title, author, isbn, stock };
        try {
            await bookService.create(dto);
            // reset form
            setTitle('');
            setAuthor('');
            setIsbn('');
            setStock(0);
            setShowForm(false);
            // reload list
            await loadBooks();
        } catch (err) {
            console.error('Create failed:', err);
            alert('Error creating book (see console)');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setAuthor('');
        setIsbn('');
        setStock(0);
        setShowForm(false);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Gestión de Libros</h2>
                <button 
                    className="btn btn-primary" 
                    onClick={() => setShowForm(true)}
                    disabled={showForm}
                >
                    Nuevo Libro
                </button>
            </div>

            {showForm && (
                <div className="card mb-4 p-4">
                    <h5>Crear Nuevo Libro</h5>
                    <form onSubmit={handleCreate}>
                        <div className="mb-3">
                            <label className="form-label">Título *</label>
                            <input 
                                className="form-control" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                                required 
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Autor *</label>
                            <input 
                                className="form-control" 
                                value={author} 
                                onChange={e => setAuthor(e.target.value)} 
                                required 
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">ISBN</label>
                            <input 
                                className="form-control" 
                                value={isbn} 
                                onChange={e => setIsbn(e.target.value)} 
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Stock *</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                value={stock} 
                                onChange={e => setStock(Number(e.target.value))} 
                                min={0}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="d-flex gap-2">
                            <button 
                                type="submit" 
                                className="btn btn-success"
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : 'Guardar'}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <h5 className="mt-4">Listado de Libros</h5>
            {books.length > 0 ? (
                <BookTable books={books} onEdit={() => {}} />
            ) : (
                <p className="text-muted">No hay libros registrados.</p>
            )}
        </div>
    );
};
