import React, { useState } from 'react';

const AddImage = () => {
  const [books, setBooks] = useState([
    {
      BookNo: "",
      description: "",
      BookName: "",
      BookType: "",
      Author: "",
      pages: "",
      Price: "",
      yearPublished: "",
      rating: "",
      images: [], // Array to store multiple images
      Offer: "",
      discount: ""
    }
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedBooks = [...books];
    updatedBooks[index][name] = value;
    setBooks(updatedBooks);
  };

  const convertToB64 = (e, index) => {
    const files = e.target.files;

    if (files.length > 0) {
      const updatedBooks = [...books];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = () => {
          updatedBooks[index].images = [...updatedBooks[index].images, reader.result];
          setBooks(updatedBooks);
        };

        reader.readAsDataURL(files[i]);
      }
    }
  };

  const addBook = () => {
    setBooks([...books, { ...books[0] }]);
  };

  const removeBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(books);
    // Add logic to send multiple books to the server
    // addBooks(books)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      {books.map((book, index) => (
        <div key={index}>
          {/* ... your form fields for a single book ... */}
          <div className="form-outline mb-4">
            <input
              type="file"
              onChange={(e) => convertToB64(e, index)}
              id={`form3Example8-${index}`}
              className="form-control form-control-lg"
              multiple // Allow multiple file selection
            />
            <label className="form-label" htmlFor={`form3Example8-${index}`}>
              Images*
            </label>
          </div>
          {/* ... other form fields for a single book ... */}
          <button type="button" onClick={() => removeBook(index)}>
            Remove Book
          </button>
        </div>
      ))}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddImage;
