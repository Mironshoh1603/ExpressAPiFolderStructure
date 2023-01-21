import { RedirectLink } from '../utils/partials';
import { Button as CircleButton } from '@mui/material';
import { 
    Call as CallIcon, 
    Info as InfoIcon, 
    Login as LoginIcon,
    Help as HelpIcon,
    Newspaper as NewsIcon
} from '@mui/icons-material'
import GroupsIcon from '@mui/icons-material/Groups';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

export default function Home() {
    return (
        <div className='home'>
            <div className='home__overview'>
                <div className='home__overview--logo'/>
                <div className='home__overview--options'>
                    <div className='overview__options'>
                        <RedirectLink Append={CircleButton} className={'overview__options--circle'}>
                            <Inventory2Icon/> Томожня 
                        </RedirectLink>
                        <RedirectLink Append={CircleButton} className={'overview__options--circle'}>
                            <HelpIcon/> FAQ
                        </RedirectLink>
                        <RedirectLink Append={CircleButton} className={'overview__options--circle'}>
                            <GroupsIcon/> Форум 
                        </RedirectLink>
                        <RedirectLink Append={CircleButton} className={'overview__options--circle'}>
                            <CallIcon/>  Контакты
                        </RedirectLink>
                        <RedirectLink Append={CircleButton} className={'overview__options--circle'}>
                            <HelpIcon/> About Us
                        </RedirectLink>
                        <RedirectLink Append={CircleButton} className={'overview__options--circle'}>
                            <NewsIcon/> Новости
                        </RedirectLink>
                        <RedirectLink Append={CircleButton} className={'overview__options--circle'}>
                            <FolderCopyIcon/> Ресурсы
                        </RedirectLink>
                        <RedirectLink Append={CircleButton} className={'overview__options--circle'}>
                            <HandshakeIcon/> Партнёры 
                        </RedirectLink>
                        
                        <RedirectLink 
                            to={'/auth/user'} 
                            Append={CircleButton} 
                            className={'overview__options--circle active-option'}
                            id={'active-option'}
                        >
                            <LoginIcon/> Вход
                        </RedirectLink>
                    </div>
                    <figure className='overview__parent'>
                        <figure className='overview__placeholder'>
                            <p>Не следует, однако забыватъ, мто укрепление и развитие структуры представлатъ</p>
                        </figure>
                    </figure>
                </div>
            </div>
            <div className='home__layout'/>
        </div>
    );
}