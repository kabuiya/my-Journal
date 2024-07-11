

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams(); 
    const [ent, setEnt] = useState(null)
    const [editable, setEditable] = useState(false); 
    const [updatedEntry, setUpdatedEntry] = useState(null);


       const editEntry = () => {
           setEditable(true); 
           setUpdatedEntry(ent.content);   
       };


    const cancelEdit = () => {
        setEditable(false);
        setUpdatedEntry(ent.content);
    }

    useEffect(() => {
            const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/get_entry/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.replace('/login')
                    }
                     throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setEnt(data.user_entry);
                

            } catch (error) {
               alert('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);


    const handleUpdate = async () => {
        if (!updatedEntry.trim()) {
            alert('cannot update with null')
            setEditable(false)
            return;

        }
        try {
            const updatedProduct = {
                'content': updatedEntry
                
            };

            const response = await fetch(`http://127.0.0.1:5000/api/v1/update_entry/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedProduct)
            });
            if (!response.ok) {
                if (response.status === 401) {
                    alert('Session Eexoired, log in again!')
                     window.location.replace('/login');
                }
                    throw new Error('Network response was not ok');
            }
            setEnt((prev) => ({ ...prev, content: updatedEntry }));
            setEditable(false);
        } catch (error) {
            alert('Error updating product:', error);
        }
    };

    const deleteEntry = async () => {
        try {
            if (window.confirm('Are you sure you want to delete this product?')) {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/delete_entry/${id}`, {
                    method: 'DELETE',
                     headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                if (response.status === 401) {
                     window.location.replace('/login');
                }
                    throw new Error('Network response was not ok');
            }
                window.history.back()
            }
        } catch (error) {
            alert('Error deleting product:', error);
        }
    };


    return (
        <div className="entry">
            {ent ?
                (   
                    <div className='entryContent'>
                    <h2 className='headerColor'>{ent.date}</h2>
                    {editable ? (
                        <textarea
                            value={updatedEntry}
                            onChange={(e) => setUpdatedEntry(e.target.value)}
                            className="form-control editEntryContainer"
                            
                        />
                    ) : (   
                            <p className="util_truncate text_cursive text_lineHeight250 text_entry ">{updatedEntry|| ent.content}</p>          
                    )
                     } 
                    <div className='base_flexCenter layout_gap20'>
                        {editable ? (
                            <>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save</button>
                                 <button type="button" className="btn btn-primary" onClick={cancelEdit}>cancel</button>
                            </>
                            
                            ) : (
                                <button type="button" className="btn btn-success" onClick={editEntry}>Edit</button>
                            )}
                            <button type="button" className="btn btn-danger" onClick={deleteEntry}>Delete</button>
                        </div>
                </div>) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetail;
