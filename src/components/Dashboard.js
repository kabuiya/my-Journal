import React from "react";
import { useState, useEffect } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = () => { 
    const [entries, setEntries] = useState([]);
    const [entry, newEntry] = useState()
    const [isOverlayVisible, setOverlayVisible] = useState(false);



  const AddNew = () => {
      setOverlayVisible(true);
  };

  const handleTextareaChange = (event) => {
      newEntry(event.target.value)

  };
    
    async function saveEntry() {
        
        if (!entry) {
            alert('cannot add empty entry!')
            setOverlayVisible(false);
        } else {
            try {
            const response =  await fetch('http://127.0.0.1:5000/api/v1/add_entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({  'content':entry }),

            });
            if (!response.ok) {
                if (response.status === 401) {
                     window.location.replace('/login');
                }
                    throw new Error('Network response was not ok');
            }
            
         const result = await response.json();
            alert('sucesully added.')
            location.reload();
            newEntry('')
            setOverlayVisible(false);
      
    } catch (error) {
                alert(`Failed! An error occurred: ${error.message}`);
                newEntry('')
                setOverlayVisible(false);
                
    }}}

    const disableOverlay = () => {
        setOverlayVisible(false);
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/v1/logout', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                    
                },
                
            });

            if (response.ok) {
                localStorage.removeItem('token'); 
                localStorage.removeItem('entries');
                window.location.replace('/')
                
            } else {
               alert('Logout failed:', response.statusText);
                
            }
        } catch (error) {
            alert('Error logging out:', error);
            
        }
    }

   
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/v1/get_entries', {
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
                setEntries(data['user_entries']);
            })
            .catch(error => {
               alert('Error fetching data:', error);
            });
   
    }, []);
   
    
    return (
        <div className=" card_diary base_flexCenter base_flexColumn layout_gap30 layout_container">
            <h1 className="text_center ">MyDiary</h1>
            <div className="settings">
                <button className="base_noBorder bg_primary base_textWhite" onClick={AddNew}>Add Entry</button>
            </div>
            <div className="util_marginLeft_auto util_alignSelf_end util_padding10 base_flexColumn layout_gap10">
                <a href="/setting"><SettingsIcon /></a>
                <button className="base_noBorder bg_primary base_textWhite" onClick={handleLogout}>logout</button>
            </div>
            {entries && entries.length >0 ? (
                entries.map((ent, index) => (
                    <div key={index} className="entryContent">
                        <h6 className="text_underline  headerColor">DATE: {ent[2]}</h6>
                        <p className="util_truncate text_cursive text_lineHeight250 text_entry ">{ent[1].substring(0, 200)}...</p>
                        <Link to={`/product/${ent[0]}`} className="btn btn-secondary">
                            See More
                        </Link>
                    </div>
                ))
            ) : (
                <p>No diary entries available! Hit addEntry button to add.</p>
            )}
            
            {isOverlayVisible && (
                <div className="util_overlay base_flexCenter">
                <div className="overlayContent">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">New Entry</label>
                        <textarea className="form-control"  style={{ height: '300px' }} id="exampleFormControlTextarea1" rows="3" value={entry}
                        onChange={handleTextareaChange} placeholder="Type Here." ></textarea>
                    </div>
                    <div className="base_flexCenter layout_gap20">
                        <button className="base_noBorder bg_primary base_textWhite" onClick={saveEntry}>save</button>
                        <button className="base_noBorder bg_primary base_textWhite" onClick={disableOverlay}>cancel</button>
                    </div>
                </div>
                </div>
            )}

            
        </div>
    )
}

export default Dashboard;