// import { Avatar } from '@mui/material';
import React, { FC } from 'react';
// import nullimage from '../../components/Images'
import AvatarMenu from '../AvatarMenu';

import './index.css';

interface HeaderProps {
    usesrname?: string;
}

const Header: FC<HeaderProps> = ({
    usesrname,
}) => {
    return (
      
        <header className="Header">
           
           
            {/* <Link to={PAGE_LIST_THING} className="LinkWithoutStyle">
                <Typography
                    variant="h4"
                    component="h1"
                    className="Header__title"
                >
                    {title}
                </Typography>
            </Link> */}

            <AvatarMenu>
                <div className="Header__avatarWrap">
                    {usesrname && (
                        <span className="Header__usesrname">
                            {usesrname}
                        </span>
                    )}
                    {/* <Avatar
                        src={nullimage}
                    /> */}
                </div>
            </AvatarMenu>
        </header>
    );
}

export default Header;
