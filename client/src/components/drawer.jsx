import { useNavigate } from 'react-router-dom';
import { ExternalNavLink } from '../utils/partials';

function Drawer({ menuItems, to, parent }) {
    const navigate = useNavigate();

    const MenuBar = menuItems.map((item, index) => {
        return (
            <ExternalNavLink 
                to={item.label} 
                key={index}
                parent={parent}
            >{item.menu}</ExternalNavLink>
        );
    });
    return (
        <div className='app__view--drawer'>
            <div className='drawer'>
                <div className='drawer--logo'  onClick={() => navigate(to)}>
                    <div className='drawer--logo-sample'/>
                </div>
                <ul className='drawer--menubar'>{MenuBar}</ul>
            </div>
        </div>
    );
}

export default Drawer;