import { EditingState, ViewState, IntegratedEditing } from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  AppointmentTooltip,
  Appointments,
  DateNavigator,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui'
import Paper from '@mui/material/Paper'
import moment from 'moment'
import { useEffect, useState } from 'react'
import holidayApi from '../../../services/holidayApi'
import { useSelector } from 'react-redux'
const ChangeLogView = () => {
  const [holidays, setHolidays] = useState([])
  const BoolEditor = () => {
    return null
  }
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  useEffect(() => {
    const fetchAllHolidays = async () => {
      const res = await holidayApi.getAllHoliday()
      const updatedData = res.map((item) => {
        const endDate = parseInt(item.toDate.split('-')[2]) + 1
        const updateEndDate = item.toDate.replace(item.toDate.split('-')[2], endDate.toString())
        return {
          id: item.holidayId,
          startDate: item.fromDate,
          endDate: updateEndDate,
          title: item.title,
          content: item.content,
          username: item.username
        }
      })
      setHolidays(updatedData)
    }
    fetchAllHolidays()
  }, [])

  const DayScaleCell = (props) => (
    <MonthView.DayScaleCell {...props} onClick={() => console.log(props.startDate)} />
  )
  const DateEditor = ({ ...restProps }) => {
    return (
      <AppointmentForm.DateEditor
        style={{ display: 'flex', gap: '10px' }}
        {...restProps}></AppointmentForm.DateEditor>
    )
  }

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChangeContent = (nextValue) => {
      onFieldChange({ content: nextValue })
    }

    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}>
        <AppointmentForm.Label text="Content" />
        <AppointmentForm.TextEditor
          value={appointmentData.content}
          onValueChange={onCustomFieldChangeContent}
          placeholder="Write your content"
          type="multilineTextEditor"
        />
      </AppointmentForm.BasicLayout>
    )
  }
  const TextEditor = (props) => {
    if (props.type === 'multilineTextEditor') {
      return null
    }
    return <AppointmentForm.TextEditor {...props} />
  }

  const LabelComponent = (props) => {
    if (props.text === 'More Information') {
      return null
    }
  }

  const commitChanges = async ({ added, deleted }) => {
    if (added) {
      const dateStart = moment(added.startDate.toString())
      const timeStart = dateStart.format('YYYY-MM-DD')
      const dateEnd = moment(added.endDate.toString())
      const timeEnd = dateEnd.format('YYYY-MM-DD')

      let data = {
        userId: currentUser?.accountId,
        title: added.title,
        content: added.content,
        fromDate: timeStart,
        toDate: timeEnd
      }

      let dataAdd = {
        id: currentUser?.accountId,
        startDate: dateStart.format('YYYY-MM-DD'),
        endDate: dateEnd.add(1, 'days').format('YYYY-MM-DD'),
        title: added.title,
        content: added.content
      }
      const res = await holidayApi.createHoliday(data)
      setHolidays((prevData) => {
        let newData = [...prevData]
        if (added && res === 1) {
          newData = [...newData, dataAdd]
        }

        return newData
      })
    }

    if (deleted !== undefined) {
      setHolidays((prevData) => {
        let newData = [...prevData]
        holidayApi.deleteHoliday(deleted)
        newData = newData.filter((appointment) => appointment.id !== deleted)
        console.log('asd')
        return newData
      })
    }
  }

  console.log(holidays)
  return (
    <Paper>
      <Scheduler data={holidays} height="auto">
        <ViewState />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <MonthView dayScaleCellComponent={DayScaleCell} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip showDeleteButton />
        <ConfirmationDialog />
        <AppointmentForm
          readOnly={false}
          booleanEditorComponent={BoolEditor}
          labelComponent={LabelComponent}
          dateEditorComponent={DateEditor}
          textEditorComponent={TextEditor}
          basicLayoutComponent={BasicLayout}
        />
      </Scheduler>
    </Paper>
  )
}

export default ChangeLogView