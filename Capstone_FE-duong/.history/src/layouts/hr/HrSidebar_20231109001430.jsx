import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import DensitySmallIcon from '@mui/icons-material/DensitySmall'
import DraftsIcon from '@mui/icons-material/Drafts'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import UploadIcon from '@mui/icons-material/Upload'
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import { getDownloadURL, ref } from 'firebase/storage'
import { useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import { storage } from '../../firebase/config'
import useAuth from '../../hooks/useAuth'
const HrSidebar = () => {
  const { collapseSidebar, toggleSidebar, broken, collapsed } = useProSidebar()
  const [activeIndex, setActiveIndex] = useState(() => {
    const initialIndex =
      window.location.pathname === '/manage-user'
        ? 0
        : window.location.pathname === '/manage-profile'
          ? 1
          : window.location.pathname === '/request-list-hr'
            ? 2
            : window.location.pathname === '/request-hr-list'
              ? 3 : window.location.pathname === '/book-room-hr'
                ? 4 : window.location.pathname === '/notification-list-hr'
                  ? 5 : window.location.pathname === '/notification-list-hr'
                    ? 6 : window.location.pathname === '/notification-draftlist'
                      ? 7 : window.location.pathname === '/notification-uploadsent'
                        ? 8 : window.location.pathname === '/notification-uploadreceive'
                          ? 9 : window.location.pathname === '/notification-list-hr'
                            ? 10 : window.location.pathname === '/notification-schedulelist'
                              ? 11 : window.location.pathname === '/notification-department-hr'
    0
    return initialIndex
  })
  const [userProfileImage, setUserProfileImage] = useState('')
  const currentUser = useAuth()
  const imgurl = async () => {
    const storageRef = ref(storage, `/${currentUser.image}`)
    try {
      const url = await getDownloadURL(storageRef)
      setUserProfileImage(url)
    } catch (error) {
      console.error('Error getting download URL:', error)
    }
  }
  if (currentUser && currentUser.image) {
    imgurl()
  }
  return (
    <>
      <Sidebar
        style={{
          height: '100%',
          top: 'auto',
          border: 0
        }}
        breakPoint="md"
        backgroundColor="#fff">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml="15px"
          height="65px">
          {!collapsed ? (
            <Typography fontWeight="800" color="#000" fontSize="22px" sx={{ cursor: 'pointer' }}>
              BMS
            </Typography>
          ) : null}
          <IconButton
            onClick={() => {
              broken ? toggleSidebar() : collapseSidebar()
            }}
            sx={{ color: 'rgb(94, 53, 177)' }}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box height="60px" bgcolor="white" display="flex" alignItems="center" ml="20px" gap="20px">
          <Avatar
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40
            }}
            src={`${userProfileImage}`}
          />
          <Typography fontSize="15px" fontWeight="600">
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
        </Box>
        <Divider />
        {/* <Box mb="25px">
          <Box display="flex" justifyContent="center" alignItems="center">
            {!collapsed ? (
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={USERICON}
                style={{
                  cursor: 'pointer',
                  borderRadius: '50%',
                  marginBottom: '20px'
                }}
              />
            ) : null}
          </Box>
          <Box textAlign="center">
            {!collapsed ? (
              <Typography
                color="#000"
                sx={{ m: '10px 0 10px 0', fontSize: '20px', fontWeight: '700' }}>
                Ed Roh
              </Typography>
            ) : null}
            {!collapsed ? (
              <Typography variant="h5" color="#000">
                VP Fancy Admin
              </Typography>
            ) : null}
          </Box>
        </Box> */}
        <Menu
          menuItemStyles={{
            button: ({ active }) => {
              return {
                backgroundColor: active ? 'rgb(237, 231, 246)' : undefined,
                color: '#000',
                '&:hover': {
                  backgroundColor: 'rgb(237, 231, 246)',
                  color: 'rgb(94, 53, 177)',
                  borderRadius: '10px'
                }
              }
            }
          }}>
          <MenuItem
            active={activeIndex === 0}
            icon={<PersonAddIcon />}
            component={<Link to="/manage-user" onClick={() => setActiveIndex(0)} />}>
            {' '}
            Manage User
          </MenuItem>
          <MenuItem
            active={activeIndex === 1}
            icon={<ManageAccountsIcon />}
            component={<Link to="/manage-profile" onClick={() => setActiveIndex(1)} />}>
            {' '}
            Manage Profile
          </MenuItem>
          <MenuItem
            active={activeIndex === 2}
            icon={<AssignmentTurnedInIcon />}
            component={<Link to="/request-list-hr" onClick={() => setActiveIndex(2)} />}>
            {' '}
            Ticket Management
          </MenuItem>
          <MenuItem
            active={activeIndex === 3}
            icon={<ChecklistRtlIcon />}
            component={<Link to="/request-hr-list" onClick={() => setActiveIndex(3)} />}>
            {' '}
            Check Your Ticket
          </MenuItem>
          <MenuItem
            active={activeIndex === 4}
            icon={<CalendarViewMonthIcon />}
            component={<Link to="/book-room-hr" onClick={() => setActiveIndex(4)} />}>
            {' '}
            Book Room
          </MenuItem>
          <SubMenu
            label="Notification"
            icon={<NotificationsIcon />}
          >
            <MenuItem
              active={activeIndex === 5}
              icon={<ClearAllIcon />}
              component={<Link to="/notification-list-hr" onClick={() => setActiveIndex(5)} />}>
              {' '}
              All Notification
            </MenuItem>
            <MenuItem
              active={activeIndex === 6}
              icon={<DraftsIcon />}
              component={<Link to="/notification-draftlist" onClick={() => setActiveIndex(6)} />}>
              {' '}
              Draft
            </MenuItem>
            <SubMenu
              label='Sent&Receive'
              icon={<UploadIcon />}>
              <MenuItem
                active={activeIndex === 7}
                icon={<ForwardToInboxIcon />}
                component={<Link to="/notification-uploadsent" onClick={() => setActiveIndex(7)} />}>
                {' '}
                Sent
              </MenuItem>
              <MenuItem
                active={activeIndex === 8}
                icon={<MarkunreadMailboxIcon />}
                component={<Link to="/notification-uploadreceive" onClick={() => setActiveIndex(8)} />}>
                {' '}
                Receive
              </MenuItem>
            </SubMenu>

            <SubMenu
              label='Scheduled'
              icon={<CalendarTodayIcon />}
            >
              <MenuItem
                active={activeIndex === 9}
                icon={<DensitySmallIcon />}
                component={<Link to="/notification-department-hr" onClick={() => setActiveIndex(9)} />}>
                {' '}
                All
              </MenuItem>
              <MenuItem
                active={activeIndex === 10}
                icon={<ContactMailIcon />}
                component={<Link to="/notification-schedulelist" onClick={() => setActiveIndex(10)} />}>
                {' '}
                Personal
              </MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sidebar>
    </>
  )
}
export default HrSidebar
