import React, {useState, useMemo, useCallback} from 'react';
import { useQuery, useMutation  } from '@apollo/react-hooks';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from './../queries/queries';

// queries


const getOptions = (loading, error, data) => {
    if (loading) {
       return <option disabled>Loading Authors...</option>;
    } else if (error) {
       return <option disabled>Error loading Authors</option>;
    } else {
       return data.authors.map(({ name, id }) => {
          return (
             <option key={id} value={id}>
                {name}
             </option>
          );
       });
    }
 };

const AddBook = () => {

    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);
    // const [name, genre, author] = useState({
    //     name: '',
    //     genre: '',
    //     author: ''
    // });
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    // console.log(author);
 
    const options = useMemo(() => getOptions(loading, error, data), [
       loading,
       error,
       data
    ]);

    const submitForm = useCallback(
        e => {
           e.preventDefault();
           addBook({
              variables: {
                 name,
                 genre,
                 authorId
              },
              refetchQueries: [{query: getBooksQuery}]
           });
        },
        [name, genre, authorId]
     );
 
    return (
       <form id="add-book" onSubmit={submitForm}>
          <div className="field">
             <label>Book name:</label>
             <input type="text" onChange={(e)=>setName(e.target.value)}/>
          </div>
 
          <div className="field">
             <label>Genre:</label>
             <input type="text" onChange={(e)=>setGenre(e.target.value)}/>
          </div>
 
          <div className="field">
             <label>Author:</label>
             <select onChange={(e)=>setAuthorId(e.target.value)}>
                <option>Select Author</option>
                {options}
             </select>
          </div>
 
          <button>Add book</button>
       </form>
    );
 };
 
 export default AddBook;

