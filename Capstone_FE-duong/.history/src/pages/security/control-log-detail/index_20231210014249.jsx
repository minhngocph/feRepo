import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import securityApi from '../../../services/securityApi'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import ChatTopbar from '../../common/chat/components/ChatTopbar'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../firebase/config'

const ControlLogDetail = () => {
  const { username, controlLogId } = useParams()
  console.log(username)
  console.log(controlLogId)
  const [control, setControl] = useState()
  const [AvatarImg, setAvatarImg] = useState('')

  useEffect(() => {
    const getControlLogDetail = async () => {
      let res = await securityApi.getControlLogDetail(username, controlLogId)
      const base64Data = res?.image
      if (!base64Data) {
        return
      }

      const binaryData = atob(base64Data)
      const byteNumbers = new Array(binaryData.length)
      for (let i = 0; i < binaryData.length; i++) {
        byteNumbers[i] = binaryData.charCodeAt(i)
      }
      const uint8Array = new Uint8Array(byteNumbers)
      console.log(uint8Array);
      const blob = new Blob([uint8Array])
  
      const blobUrl = URL.createObjectURL(blob)
      console.log(blobUrl);
      setControl(res)
    }
    getControlLogDetail()
  }, [])

  const imgurl = async () => {
    const storageRef = ref(storage, `/${control?.avatar}`)
    try {
      const url = await getDownloadURL(storageRef)
      setAvatarImg(url)
    } catch (error) {
      console.error('Error getting download URL:', error)
    }
  }

  if (control && control?.avatar) {
    imgurl()
  }

  console.log(control)

  return (
    <Box>
      <ChatTopbar />
      <Box display="flex" alignItems="center" mb={3}>
        <Box flex="1">
          <Avatar
            src={AvatarImg}
            sx={{
              margin: 'auto',
              height: 140,
              width: 140
            }}
          />
        </Box>
        <Box flex="1" display="flex" marginTop="40px" height="80px">
          <Box flex="1" textAlign="left" borderRight="1px solid #999">
            <Typography fontSize={20}>Account: </Typography>
            <Typography fontSize={20} mt={4}>
              Role:{' '}
            </Typography>
          </Box>
          <Box flex="2" textAlign="left" marginLeft="20px">
            <Typography fontSize={20}>{control?.account}</Typography>
            <Typography fontSize={20} mt={4} sx={{ textTransform: 'capitalize' }}>
              {control?.role}{' '}
            </Typography>
          </Box>
        </Box>
        <Box flex="1" display="flex" marginTop="40px" height="80px">
          <Box flex="1" textAlign="left" borderRight="1px solid #999">
            <Typography fontSize={20}>Department </Typography>
            <Typography fontSize={20} mt={4}>
              Hire Date{' '}
            </Typography>
          </Box>
          <Box flex="2" textAlign="left" marginLeft="20px">
            <Typography fontSize={20} sx={{ textTransform: 'capitalize' }}>
              {control?.department}{' '}
            </Typography>
            <Typography fontSize={20} mt={4}>
              {control?.hireDate}{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box m={5}>
        <Avatar
          src={control?.image}
          sx={{
            marginLeft: '135px',
            height: 140,
            width: 140
          }}
        />
        <Box display="flex" marginLeft="100px">
          <Box flex="1" display="flex" marginTop="40px" height="220px">
            <Box flex="1" textAlign="left" borderRight="1px solid #999">
              <Typography fontSize={20}>Device Id </Typography>
              <Typography fontSize={20} mt={4}>
                Device Name{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                Date/Time{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                Similar{' '}
              </Typography>
            </Box>
            <Box flex="2" textAlign="left" marginLeft="20px">
              <Typography fontSize={20} sx={{ textTransform: 'capitalize' }}>
                {control?.deviceId}{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                {control?.deviceName}{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                {control?.time}{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                {control?.similar} %{' '}
              </Typography>
            </Box>
          </Box>

          <Box flex="1" display="flex" marginTop="40px" height="220px">
            <Box flex="1" textAlign="left" borderRight="1px solid #999">
              <Typography fontSize={20}>Operator </Typography>
              <Typography fontSize={20} mt={4}>
                Person ID{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                Verify Status{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                Temperature{' '}
              </Typography>
            </Box>
            <Box flex="2" textAlign="left" marginLeft="20px">
              <Typography fontSize={20} sx={{ textTransform: 'capitalize' }}>
                {control?.operator}{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                {control?.personId}{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                {control?.verifyStatus}{' '}
              </Typography>
              <Typography fontSize={20} mt={4}>
                {control?.temperature} <span>&deg; C</span>{' '}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ControlLogDetail
