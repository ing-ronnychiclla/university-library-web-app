export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    stock: number;
}

export interface CreateBookDto {
    title: string;
    author: string;
    isbn: string;
    stock: number;
}

export interface Loan {
    id: number;
    bookId: number;
    bookTitle: string;
    studentName: string;
    loanDate: string;
    status: string;
}

export interface CreateLoanDto {
    bookId: number;
    studentName: string;
}