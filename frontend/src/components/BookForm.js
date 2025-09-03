import React, { useState, useEffect } from 'react';

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    quantity: '',
    publishDate: ''
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        price: book.price || '',
        quantity: book.quantity || '',
        publishDate: book.publishDate || ''
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity)
    };
    
    if (book) {
      onSubmit(book.id, submitData);
    } else {
      onSubmit(submitData);
    }
  };

  return (
    <div className="form-container">
      <h3>{book ? 'Edit Book' : 'Add New Book'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="publishDate" className="form-label">Publish Date</label>
          <input
            type="date"
            className="form-control"
            id="publishDate"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {book ? 'Update Book' : 'Add Book'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;