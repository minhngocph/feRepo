import { Box, Button, MenuItem, Select, TextField, FormControl, InputLabel } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import securityApi from '../../../services/securityApi'
import DataTableStrangerLog from './component/DataTable'

const StrangerLogSecurity = () => {
  const [month, setMonth] = useState(new Date())
  const [firstTime, setFirstTime] = useState(new Date())
  const [lastTime, setLastTime] = useState(new Date())
  const [listDevice, setListDevice] = useState([])
  const [device, setDevice] = useState('')
  const [listStranger, setListStranger] = useState([])
  const [isLoading, setIsLoading] = useState(false)  
  useEffect(() => {
    const listAllDevice = async () => {
      try {
        const response = await securityApi.listAllDevice()
        setListDevice(response)
      } catch (error) {
        console.log(error)
        
      }
    }
    listAllDevice()
  }, [])

  const handleChangeDevice = (e) => {
    setDevice(e.target.value)
  }

  const handleSearch = async () => {
    if (device !== '') {
        
      let data = {
        date: format(month, 'yyyy-MM-dd'),
        startTime: format(firstTime, 'HH:mm:ss'),
        endTime: format(lastTime, 'HH:mm:ss'),
        deviceId: device
      }
      console.log(data)
      try {
        setIsLoading(true)
        const response = await securityApi.getListStrangerLogByDayAndDevice(data)
        setListStranger(response)
        setIsLoading(false)
      } catch (error) {
        if (error.response.status === 400) {
            toast.error('End time must be greater than start time')
            setIsLoading(false)
          }
      }
    } else {
      toast.error('Please select device ')
      setIsLoading(false)
    }
  }
  console.log(listStranger)
  const columns = [
    {
        field: 'image',
        headerName: 'Image',
        flex: 1,
        renderCell: (params) => {
          return (
            <img
              src={`data:image/png;base64, ${params.row?.image}`}
              style={{
                height: 150,
                width: 150
              }}
            />
          )
        }
      },
    {
      field: 'snapId',
      headerName: 'Snap Id',
      flex: 1
    },
    {
      field: 'time',
      headerName: 'Time',
      flex: 1
    },
    {
      field: 'temperature',
      headerName: 'Temperature',
      flex: 1
    },
    {
      field: 'deviceId',
      headerName: 'Device Id',
      flex: 1
    },
    {
      field: 'deviceName',
      headerName: 'Device Name',
      flex: 1
    },
    {
      field: 'room',
      headerName: 'Room',
      flex: 1
    }
  ]

  return (
    <Box m={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          maxDate={new Date()}
          // minDate={formatDateNotTime(createdDate?.createdDate)}
          value={month}
          views={['day', 'month', 'year']}
          onChange={(newDate) => setMonth(newDate.toDate())}
          renderInput={(props) => <TextField sx={{ width: '20%' }} {...props} />}
        />
      </LocalizationProvider>

      <Box mt={3} display="flex" gap={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            // ampm={false}
            // minDate={formatDateNotTime(createdDate?.createdDate)}
            value={firstTime}
            views={['hours', 'minutes', 'seconds']}
            onChange={(newTime) => setFirstTime(newTime.toDate())}
            renderInput={(props) => <TextField sx={{ width: '20%' }} {...props} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            // ampm={false}
            // minDate={formatDateNotTime(createdDate?.createdDate)}
            value={lastTime}
            views={['hours', 'minutes', 'seconds']}
            onChange={(e) => setLastTime(e.toDate())}
            renderInput={(props) => <TextField sx={{ width: '20%' }} {...props} />}
          />
        </LocalizationProvider>

        {listDevice && (
          <>
            <FormControl sx={{ width: '30%' }}>
              <InputLabel id="demo-simple-select-label">Device</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={device}
                label="Device"
                onChange={(e) => handleChangeDevice(e)}>
                {listDevice.map((item, index) => (
                  <MenuItem key={index} value={item?.deviceId}>
                    {item?.deviceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        <Button variant="contained" sx={{ width: '10%' }} onClick={(e) => handleSearch(e)}>
          Search
        </Button>
      </Box>
      <Box mt={3}>
        <DataTableStrangerLog rows={listStranger} columns={columns} isLoading={isLoading} />
      </Box>
    </Box>
  )
}

export default StrangerLogSecurity
