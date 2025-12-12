import 'bootstrap/dist/css/bootstrap.min.css';
import { BooksPage } from './pages/BooksPage';

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Library App</span>
        </div>
      </nav>
      <main>
        <BooksPage />
      </main>
    </div>
  );
}

export default App;