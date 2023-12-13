import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Box, Button, Grid, MenuItem, Paper, Select, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { AttendenceFrom, RoomRequestForm, OtRequest, DepartmentRequest, LeaveRequest } from './DataFrom'

const Data = () => {


  // const handleChange = (event) => {
  //   setAge(event.target.value)
  // }
  // const handleChange2 = (event) => {
  //   setA(event.target.value)
  // }
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange3 = (event) => {
    setSelectedValue(event.target.value);
  };
  const theme = useTheme()
  return (
    <>

      <Box bgcolor={theme.palette.bgColorPrimary.main}>

        <Box p={3}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography fontSize="18px" fontWeight="700">
                  Request creator
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="500">Full name</Typography>
                <TextField
                  sx={{ bgcolor: '#EEEEEE', width: '100%' }}
                  size="small"
                  value="Quang Thinh"
                  inputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="500">Email</Typography>
                <TextField
                  sx={{ bgcolor: '#EEEEEE', width: '100%' }}
                  size="small"
                  value="abc@gmail.com"
                  inputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box p={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <Typography fontWeight="500">Service</Typography>
              <Select
                value={selectedValue}
                onChange={handleChange3}
                sx={{ width: '100%', height: '38px' }}
                displayEmpty>
                <MenuItem value="">
                  <em>Service Type</em>
                </MenuItem>
                <MenuItem value='leave_request'>Leave Request</MenuItem>
                <MenuItem value='ot_request'>OT Request</MenuItem>
                <MenuItem value="attendence_request">Attendence Request</MenuItem>
                <MenuItem value="room_request">Room request</MenuItem>
                <MenuItem value="department_change_request">Department change request</MenuItem>
              </Select>
              {selectedValue === 'room_request' && <RoomRequestForm />}
              {selectedValue === 'attendence_request' && <AttendenceFrom />}
              {selectedValue === 'ot_request' && <OtRequest />}
              {selectedValue === 'leave_request' && <LeaveRequest />}
              {selectedValue === 'department_change_request' && <DepartmentRequest />}
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default Data
