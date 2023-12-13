import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui'
import requestApi from '../../../services/requestApi'

const appointments = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 6, 23, 9, 30),
    endDate: new Date(2018, 6, 23, 11, 30)
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2018, 6, 23, 12, 0),
    endDate: new Date(2018, 6, 23, 13, 0)
  },
  {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2018, 6, 23, 14, 30),
    endDate: new Date(2018, 6, 23, 15, 30)
  },
  {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2018, 6, 24, 10, 0),
    endDate: new Date(2018, 6, 24, 11, 0)
  },
  {
    title: 'Final Budget Review',
    startDate: new Date(2018, 6, 24, 12, 0),
    endDate: new Date(2018, 6, 24, 13, 35)
  },
  {
    title: 'New Brochures',
    startDate: new Date(2018, 6, 24, 14, 30),
    endDate: new Date(2018, 6, 24, 15, 45)
  },
  {
    title: 'Install New Database',
    startDate: new Date(2018, 6, 25, 9, 45),
    endDate: new Date(2018, 6, 25, 11, 15)
  },
  {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2018, 6, 25, 12, 0),
    endDate: new Date(2018, 6, 25, 14, 0)
  },
  {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2018, 6, 25, 15, 15),
    endDate: new Date(2018, 6, 25, 16, 30)
  },
  {
    title: 'Customer Workshop',
    startDate: new Date(2018, 6, 26, 11, 0),
    endDate: new Date(2018, 6, 26, 12, 0)
  },
  {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2018, 6, 26, 11, 0),
    endDate: new Date(2018, 6, 26, 13, 30)
  },
  {
    title: 'Brochure Design Review',
    startDate: new Date(2018, 6, 26, 14, 0),
    endDate: new Date(2018, 6, 26, 15, 30)
  },
  {
    title: 'Create Icons for Website',
    startDate: new Date(2018, 6, 27, 10, 0),
    endDate: new Date(2018, 6, 27, 11, 30)
  },
  {
    title: 'Upgrade Server Hardware',
    startDate: new Date(2018, 6, 27, 14, 30),
    endDate: new Date(2018, 6, 27, 16, 0)
  },
  {
    title: 'Submit New Website Design',
    startDate: new Date(2018, 6, 27, 16, 30),
    endDate: new Date(2018, 6, 27, 18, 0)
  },
  {
    title: 'Launch New Website',
    startDate: new Date(2018, 6, 26, 12, 20),
    endDate: new Date(2018, 6, 26, 14, 0)
  },
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 6, 16, 9, 30),
    endDate: new Date(2018, 6, 16, 15, 30)
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2018, 6, 16, 12, 0),
    endDate: new Date(2018, 6, 16, 13, 0)
  },
  {
    title: 'Install New Database',
    startDate: new Date(2018, 6, 17, 15, 45),
    endDate: new Date(2018, 6, 18, 12, 15)
  },
  {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2018, 6, 18, 12, 35),
    endDate: new Date(2018, 6, 18, 14, 15)
  },
  {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2018, 6, 19, 15, 15),
    endDate: new Date(2018, 6, 20, 20, 30)
  },
  {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2018, 6, 20, 20, 0),
    endDate: new Date(2018, 6, 20, 13, 30)
  },
  {
    title: 'Brochure Design Review',
    startDate: new Date(2018, 6, 20, 14, 10),
    endDate: new Date(2018, 6, 20, 15, 30)
  },
  {
    title: 'Vacation',
    startDate: new Date(2018, 5, 22),
    endDate: new Date(2018, 6, 1)
  },
  {
    title: 'Vacation',
    startDate: new Date(2018, 6, 28),
    endDate: new Date(2018, 7, 7)
  }
]

const ChangeLogView = () => {
  const [data, setData] = useState(appointments)
  const BoolEditor = () => {
    return null
  }
  const DateEditor = ({ ...restProps }) => {
    return <AppointmentForm.DateEditor {...restProps}></AppointmentForm.DateEditor>
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
        <AppointmentForm.Label text="Department" />
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
    return (
      <Paper>
        <Scheduler data={data} height="auto">
          <ViewState />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip />
          <AppointmentForm
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
