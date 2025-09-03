import React from 'react';

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No books found. Add some books to get started!
      </div>
    );
  }

  return (
    <div className="row">
      {books.map(book => (
        <div key={book.id} className="col-md-4 mb-4">
          <div className="card book-card h-100">
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
              <p className="card-text">
                <strong>ISBN:</strong> {book.isbn}<br />
                <strong>Price:</strong> ${book.price}<br />
                <strong>Quantity:</strong> {book.quantity}<br />
                {book.publishDate && (
                  <><strong>Published:</strong> {new Date(book.publishDate).toLocaleDateString()}</>
                )}
              </p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => onEdit(book)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;