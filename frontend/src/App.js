import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = async (keyword) => {
    try {
      const response = await axios.get(`/api/books/search?keyword=${keyword}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleCreateBook = async (bookData) => {
    try {
      await axios.post('/api/books', bookData);
      fetchBooks();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const handleUpdateBook = async (id, bookData) => {
    try {
      await axios.put(`/api/books/${id}`, bookData);
      fetchBooks();
      setEditingBook(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  return (
    <div className="App">
      <div className="container mt-4">
        <h1 className="text-center mb-4">Bookstore Management</h1>
        
        <div className="row mb-4">
          <div className="col-md-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="col-md-4 text-end">
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingBook(null);
                setShowForm(true);
              }}
            >
              Add New Book
            </button>
          </div>
        </div>

        {showForm && (
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleUpdateBook : handleCreateBook}
            onCancel={() => {
              setEditingBook(null);
              setShowForm(false);
            }}
          />
        )}

        <BookList
          books={books}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />
      </div>
    </div>
  );
}

export default App;