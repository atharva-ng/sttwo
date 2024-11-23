import "./new.css";

const NewNavbar = () =>
{
    return (
        <>
        <div className="topnav">
            <a href="#home" className="left">
            <div className='nav-left'
            >
              <img src='/logo.svg' alt='Logo' className='nav-logo' />
              <span className='site-title'>ST II</span>
            </div>
            </a>
            <a href="#about" className="split">Logout</a>
        </div>
        </>
    );
};

export default NewNavbar;