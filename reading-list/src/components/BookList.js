import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {getBooksQuery} from './../queries/queries';
import BookDetails from './BookDetails';

// queries


const BookList = (props) => {

    const [selected, setSelected] = useState(null)
   const { loading, error, data } = useQuery(getBooksQuery);
   

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error :(</p>;

   const { books } = data;

   const bookListItems = books.map( ({ id, name }) => {
      return <li onClick={(e)=>setSelected(id)} key={id}>{name}</li>;
   });

   return (
      <div>
         <ul id="book-list">{bookListItems}</ul>
         <BookDetails bookId={selected}/>
      </div>
   );
};

export default BookList;