import React, { useState, useEffect,useContext } from 'react';
import './CommunityNoticeBoard.css';

import { AuthContext } from "./../shared/context/auth-context";

const CommunityNoticeBoard = ({ isAdmin }) => {

  const { token } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    start_date: '',
    end_date: '',
    categoryId: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://3.109.108.99:5007/api/community-communications/notices';


  //***************I think you will have to memoize this
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}`,{
        method: 'GET', 
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',  
        },
    });
      if (!response.ok) {
        throw new Error('Failed to fetch notices');
      }
      const data = await response.json();
      setNotices(data.notices);
    } catch (err) {
      setError('Failed to load notices. Please try again later.');
      console.error('Error fetching notices:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newNotice.title && newNotice.content && newNotice.start_date && newNotice.end_date) {
      try {
        console.log(newNotice);
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNotice),
        });

        if (!response.ok) {
          console.log(response);
          throw new Error('Failed to post notice');
        }
        const postedNotice = await response.json();
        setNotices(prev => [postedNotice, ...prev]);
        setNewNotice({ title: '', content: '', start_date: '', end_date: '' });

        window.location.reload();
      } catch (err) {
        console.log(err); 
        setError('Failed to post notice. Please try again.');
        console.error('Error posting notice:', err);
      }
    }
  };

  return (
    <div className="notice-board">
      <h1>Community Notice Board</h1>
      
      {isAdmin && (
        <form onSubmit={handleSubmit} className="notice-form">
          <h2>Post a New Notice</h2>
          <input
            type="text"
            name="title"
            value={newNotice.title}
            onChange={handleInputChange}
            placeholder="Notice Title"
            className="input-field"
            maxLength="255"
            required
          />
          <textarea
            name="content"
            value={newNotice.content}
            onChange={handleInputChange}
            placeholder="Notice Content"
            className="input-field"
            required
          />
          <input
            type="date"
            name="start_date"
            value={newNotice.start_date}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="date"
            name="end_date"
            value={newNotice.end_date}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <button type="submit" className="submit-button">Post Notice</button>
        </form>
      )}

      {isLoading && <div className="loading">Loading notices...</div>}
      {error && <div className="error">{error}</div>}

      <div className="notices-container">
        {notices.length > 0 ? (
          notices.map(notice => (
            <div key={notice.id} className="notice">
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-content">{notice.content}</p>
              <div className="notice-date">
                Start Date: {new Date(notice.start_date).toLocaleDateString()}
                <br />
                End Date: {new Date(notice.end_date).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          !isLoading && <div className="no-notices">There are currently no active notices.</div>
        )}
      </div>
    </div>
  );
};

export default CommunityNoticeBoard;