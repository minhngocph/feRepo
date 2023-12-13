import ChatIcon from '@mui/icons-material/Chat'
import { Box, Divider, IconButton, Typography, Link } from '@mui/material'
import AccountPopover from '../../../../components/AccountPopover'
import NotificationsPopover from '../../../../components/NotificationsPopover'
import { Link as LinkRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ChatTopbar = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        height="65px"
        bgcolor="#fff">
        {currentUser?.role === 'hr' ? (
          <LinkRouter to="/manage-user" style={{textDecoration: 'none'}}>
            <Typography fontWeight="800" color="#000" fontSize="22px" sx={{ cursor: 'pointer' }}>
              BMS
            </Typography>
          </LinkRouter>
        ) : currentUser?.role === 'employee' ? (
          <LinkRouter to="/request-list-employee" style={{textDecoration: 'none'}}>
            <Typography fontWeight="800" color="#000" fontSize="22px" sx={{ cursor: 'pointer' }}>
              BMS
            </Typography>
          </LinkRouter>
        ) : currentUser?.role === 'manager' ? (
          <LinkRouter to="/request-list-manager">
            <Typography fontWeight="800" color="#000" fontSize="22px" sx={{ cursor: 'pointer' }}>
              BMS
            </Typography>
          </LinkRouter>
        ) : currentUser?.role === 'admin' ? (
          <LinkRouter to="/request-list-admin">
            <Typography fontWeight="800" color="#000" fontSize="22px" sx={{ cursor: 'pointer' }}>
              BMS
            </Typography>
          </LinkRouter>
        ) : currentUser?.role === 'security' ? (
          <LinkRouter to="/manage-user">
            <Typography fontWeight="800" color="#000" fontSize="22px" sx={{ cursor: 'pointer' }}>
              BMS
            </Typography>
          </LinkRouter>
        ) : (
          <></>
        )}
        <Box display="flex" gap="10px" alignItems="center">
          <NotificationsPopover />
          <Link href="/chat">
            <IconButton sx={{ color: 'rgb(94, 53, 177)' }} size="small">
              <ChatIcon />
            </IconButton>
          </Link>
          <AccountPopover />
        </Box>
      </Box>
      <Divider />
    </>
  )
}

export default ChatTopbar
