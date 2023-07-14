"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");

  const getBooks = async () => {
    const response = await axios.get(
      "http://www.mocky.io/v2/5e1683a23000004d00d56089"
    );
    setBooks(response.data);
  };

  const getAuthors = async () => {
    const response = await axios.get(
      "http://www.mocky.io/v2/5e1684a93000002c00d5608e"
    );
    setAuthors(response.data);
  };

  const getAuthorNameById = (id) => {
    const author = authors.find((author) => author.id === id);
    return author.name;
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <section>
      <div className="header">
        <h1>Best Sellers all times</h1>
        <div>
          <input
            type="text"
            placeholder="write something to search..."
            onChange={() => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
      {books
        .filter((book) => {
          if (search === "") {
            return book;
          } else if (book.title.toLowerCase().includes(search.toLowerCase())) {
            return book;
          }
        })
        .map(function (book, index) {
          return (
            <div key={(index + book.authorId).toString()} className="card">
              <div>
                <h4>{getAuthorNameById(book.authorId)}</h4>
                <div className="pill">authorid: {book.authorId} </div>
              </div>
              <div>
                <h6>{book.title}</h6>
                <p>{book.description}</p>
              </div>
              <div>
                <a href="#">Show book</a>
              </div>
            </div>
          );
        })}
    </section>
  );
}
