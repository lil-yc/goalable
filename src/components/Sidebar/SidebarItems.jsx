import Home from './Home'
import Notifications from './Notifications'
import ProfileLink from './ProfileLink'
import CreatePost from './CreatePost'
import Search from './Search'

import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

const SidebarItems = () => {
    return (
        <>

            <Home />
            <Search />
            {/* <Notifications /> */}
            <CreatePost />
            {/* <Link
                to={`/createpost`}
                as={RouterLink}
            ></Link> */}
            <ProfileLink />

        </>
    )
}

export default SidebarItems