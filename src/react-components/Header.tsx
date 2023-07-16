import '../styles/Header.css';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';

function Header() {
    const history = useHistory();
    const libraryMatch = useRouteMatch("/libraries/:id");
    const bookMatch = useRouteMatch("/libraries/:id/books/:book_id");

    const returntoLibraries = () => {
        history.push(`/libraries`);
    };

    return (
        <header className="header">
            <NavLink exact to="/">
                <img src="/bookhaven_logo.png" alt="BookHaven logo" className="bookhaven-logo" />
            </NavLink>
            { (libraryMatch || bookMatch) ? <button className="return-to-libraries-btn" onClick={returntoLibraries}>Return to Libraries</button> : null }
        </header>
    );
};

export default Header;