import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

interface type {
  checked: boolean;
}

class DatePickerComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date: any) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return <DatePicker selected={this.state.startDate} onChange={this.handleChange} />;
  }
}

const MarkAttendance = () => (
  <section className="plugin-bg-white">
    <h3 className="bg-heading p-1">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
      Teacher - Mark Attendance
    </h3>
    <div className="p-1">
      <table id="t-attendance">
        <thead>
          <th>Department</th>
          <th>Year</th>
          <th>Subject</th>
          <th>Section</th>
          <th>Date</th>
          <th>Take Attendace</th>
        </thead>
        <tbody>
          <tr>
            <td>
              {' '}
              <select>
                <option value="">Computer Science</option>
                <option value="">Information Technology</option>
                <option value="">Electrical</option>
              </select>
            </td>
            <td>
              <select>
                <option value="">i Year </option>
                <option value="">ii Year </option>
                <option value="">iii Year </option>
                <option value="">iv Year </option>
              </select>
            </td>
            <td>
              {' '}
              <select>
                <option value="">Operating System</option>
                <option value="">Signals and Systems</option>
              </select>
            </td>
            <td>
              <select>
                <option value="">A</option>
                <option value="">B</option>
              </select>
            </td>
            <td>
              <DatePickerComponent />
            </td>
            <td>
              <a href="/plugins/ems-attendance/page/teachermarkattendance" className="btn btn-primary">
                Take Attendance
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);

export default MarkAttendance;
