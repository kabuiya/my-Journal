import React, { useEffect, useState } from "react";


const SettingsPage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: ''
    })
    const [editedUserDetails, setEditedUserDetails] = useState({
    username: '',
    email: ''
});

    const toggleEditMode = () => {
        if (isEditing) {
            
        }
        setIsEditing(!isEditing);
    };

    const cancelEdit = () => {
        setIsEditing(false)
    };

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/v1/profile', {
             
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {

                        window.location.replace('/login')
                    } throw new Error('Network response was not ok');
                } 
                return response.json()
            })
            .then(data => {
                setUserDetails({
                    username: data.details[1],
                    email: data.details[0]
                });
                setEditedUserDetails(
                    {
                    username: data.details[1],
                    email: data.details[0]
                }
                )
                setIsEditing(false);
            })
            .catch(error => {
                alert('Error fetching data:de', error);
            });
    }, [])
   

    


const saveChanges = () => {
    fetch('http://127.0.0.1:5000/api/v1/profile/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            'username': editedUserDetails.username,
            'email_address': editedUserDetails.email
        }),
    })
    .then(response => {
        if (response.status === 401) {
            window.location.replace('/login');
            throw new Error('Unauthorized');
        }
        return response.json().then(data => ({ status: response.status, body: data }));
    })
    .then(({ status, body }) => {
        if (status === 200) {
            // Success
           setUserDetails(editedUserDetails);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } else {
            if (body.error) {
                if (body.error.includes('username already exists')) {
                    alert('This username is already taken. Please choose a different username.');
                } else if (body.error.includes('email already exists')) {
                    alert('This email is already registered. Please use a different email address.');
                } else {
                    alert(body.error);
                }
                setEditedUserDetails(userDetails)
            } else {
                throw new Error('An unexpected error occurred');
            }
            setIsEditing(false);
        }
    })
    .catch(error => {
        alert('Error updating user details:', error);
        if (error.message !== 'Unauthorized') {
            alert('Failed to update profile. Please try again later.');
        }
    });
};

    
    const deleteAccount = async () => {
        try {
            if (window.confirm('Are you sure you want to delete this Account?')) {
                const response = await fetch('http://127.0.0.1:5000/api/v1/del_account', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete');
                }
                localStorage.removeItem('token');
                window.location.replace('/')
            }
        } catch (error) {
            alert('Error deleting product:', error);
        }
    };
        

    return (
        <div className=" base_fullHeight base_flexCenter base_flexColumn">
            <div className="profileDetails">
                <h4>Account Details</h4>
                <p>
                    <strong>Username:</strong>{' '}
                    {isEditing ? (
                        <input
                            type="text"
                            defaultValue={userDetails.username}
                            onChange={(e) => setEditedUserDetails({...editedUserDetails, username: e.target.value})}
                        />
                                            ) : (
                        <span>{userDetails.username}</span>
                    )
                    }
                </p>
                <p>
                    <strong>Email:</strong>{' '}
                    {isEditing ? (
                        <input
                            type="email"
                            defaultValue={userDetails.email}
                            onChange={(e) => setEditedUserDetails({...editedUserDetails, email: e.target.value})}
                        />

                     ) : (
                        <span>{userDetails.email}</span>
                    )
                    }
                </p>
            </div>
            <div className='base_flexCenter layout_gap20'>
                {isEditing ? (
                    <>
                        <button type="button" className="btn btn-success" onClick={saveChanges}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                    </>
                ) : (
                    <button type="button" className="btn btn-primary" onClick={toggleEditMode}>Edit</button>
                )}
                <button type="button" className="btn btn-danger" onClick={deleteAccount}>Delete Account</button>
            </div>
        </div>
    );
}
export default SettingsPage;