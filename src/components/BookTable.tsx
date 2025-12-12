import type { Book } from '../types';

interface Props {
    books: Book[];
    onEdit: (book: Book) => void;
}

export const BookTable = ({ books }: Props) => {
    return (
        <table className="table table-striped mt-3">
            <thead className="table-dark">
                <tr>
                    <th>ID</th><th>Título</th><th>Autor</th><th>ISBN</th><th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {books.map(b => (
                    <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.isbn}</td>
                        <td>{b.stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
