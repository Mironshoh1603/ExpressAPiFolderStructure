import { useMatch, useNavigate} from 'react-router-dom';

export function ExternalNavLink({ to, parent, children}) {
    const match = useMatch(`/${parent}/${to}`);
    const navigate = useNavigate();
    return (
        <li 
            className={`drawer--menu ${match && 'active-menu'}`}
            onClick={() => navigate(to)}
        >{children}</li>
    );
}

export function RedirectLink({ to, children , Append, className}) {
    const navigate = useNavigate();
    const navigateTo = () => navigate(to);
    return (
        <Append className={className} onClick={navigateTo}>
            {children}
        </Append>
    );
}