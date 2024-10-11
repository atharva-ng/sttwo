import React, { useState, useEffect } from 'react';
import './CommunityNoticeBoard.css';

const CommunityNoticeBoard = ({ isAdmin }) => {
//   const [notices, setNotices] = useState([
//     { id: 1, title: 'Welcome!', content: 'Welcome to our community board.', date: new Date().toISOString() },
//   ]);
//   const [newNotice, setNewNotice] = useState({ title: '', content: '' });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewNotice(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newNotice.title && newNotice.content) {
//       setNotices(prev => [
//         { id: prev.length + 1, ...newNotice, date: new Date().toISOString() },
//         ...prev
//       ]);
//       setNewNotice({ title: '', content: '' });
//     }
//   };

//   return (
//     <div className="notice-board">
//       <h1>Community Notice Board</h1>
      
//       {isAdmin && (
//         <form onSubmit={handleSubmit} className="notice-form">
//           <h2>Post a New Notice</h2>
//           <input
//             type="text"
//             name="title"
//             value={newNotice.title}
//             onChange={handleInputChange}
//             placeholder="Notice Title"
//             className="input-field"
//           />
//           <textarea
//             name="content"
//             value={newNotice.content}
//             onChange={handleInputChange}
//             placeholder="Notice Content"
//             className="input-field"
//           />
//           <button type="submit" className="submit-button">Post Notice</button>
//         </form>
//       )}

//       <div className="notices-container">
//         {notices.map(notice => (
//           <div key={notice.id} className="notice">
//             <h3 className="notice-title">{notice.title}</h3>
//             <p className="notice-content">{notice.content}</p>
//             <div className="notice-date">
//               Posted on: {new Date(notice.date).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    start_date: '',
    end_date: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://3.109.108.99:5007/api/community-communications/notices/';

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notices');
      }
      const data = await response.json();
      setNotices(data);
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
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNotice),
        });

        if (!response.ok) {
          throw new Error('Failed to post notice');
        }

        const postedNotice = await response.json();
        setNotices(prev => [postedNotice, ...prev]);
        setNewNotice({ title: '', content: '', start_date: '', end_date: '' });
      } catch (err) {
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