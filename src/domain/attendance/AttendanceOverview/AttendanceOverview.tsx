import * as React from "react";
import DatePicker from "react-datepicker";
import * as moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class DatePickerComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date: any) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />

        );
    }
}
const AttendanceOverview = () =>
    <section className="plugin-bg-white">
        <h3 className="bg-heading p-1">
            <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true"></i> Admin - Attendance Overview
        </h3>
        <div className="p-1">
            <div className="dflex j-start">
                <div className="fwidth">
                    <label>Choose Date</label>
                    <DatePickerComponent />
                    {/* <input type="date" name="" id="" value="12/06/19" /> */}
                </div>
                <div className="fwidth pr-1">
                    <label>Filter By</label>
                    <select className="fwidth">
                        <option value="">Computer Science</option>
                        <option value="">Information Technology</option>
                        <option value="">Electrical</option>
                    </select>
                </div>
                <div className="fwidth">
                    <label>Semester</label>
                    <select className="fwidth">
                        <option value="">Sem - 1</option>
                        <option value="">Sem - 2</option>
                    </select>
                </div>
            </div>
            <h3 className="bg-heading mt-3 p-1 mb-0">Computer Science Sem 1</h3>
            <table className="fwidth">
                <thead>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Period 1</th>
                    <th>Break</th>
                    <th>Period 2</th>
                    <th>Period 3</th>
                    <th>Period 4</th>
                    <th>Period 5</th>
                    <th>Lunch</th>
                    <th>Period 6</th>
                    <th>Period 7</th>
                    <th>Period 8</th>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={2}>1st Year</td>
                        <td>A</td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-danger-bg p-1 hasTooltip"><i className="fa fa-close" aria-hidden="true"></i> Unmarked
<a className="tooltip-red" href="/plugins/ems-attendance/page/markattendance">Take Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                    </tr>
                    <tr>

                        <td>B</td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-danger-bg p-1 hasTooltip"><i className="fa fa-close" aria-hidden="true"></i> Unmarked
<a className="tooltip-red" href="/plugins/ems-attendance/page/markattendance">Take Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>2nd Year</td>
                        <td>A</td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-danger-bg p-1 hasTooltip"><i className="fa fa-close" aria-hidden="true"></i> Unmarked
<a className="tooltip-red" href="/plugins/ems-attendance/page/markattendance">Take Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                    </tr>
                    <tr>

                        <td>B</td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-danger-bg p-1 hasTooltip"><i className="fa fa-close" aria-hidden="true"></i> Unmarked
<a className="tooltip-red" href="/plugins/ems-attendance/page/markattendance">Take Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>3rd Year</td>
                        <td>A</td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-danger-bg p-1 hasTooltip"><i className="fa fa-close" aria-hidden="true"></i> Unmarked
<a className="tooltip-red" href="/plugins/ems-attendance/page/markattendance">Take Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                    </tr>
                    <tr>

                        <td>B</td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-danger-bg p-1 hasTooltip"><i className="fa fa-close" aria-hidden="true"></i> Unmarked
<a className="tooltip-red" href="/plugins/ems-attendance/page/markattendance">Take Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>4th Year</td>
                        <td>A</td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-danger-bg p-1 hasTooltip"><i className="fa fa-close" aria-hidden="true"></i> Unmarked
<a className="tooltip-red" href="/plugins/ems-attendance/page/markattendance">Take Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                    </tr>
                    <tr>
                        <td>B</td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
<a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-danger-bg p-1 hasTooltip"><i className="fa fa-close" aria-hidden="true"></i> Unmarked
<a className="tooltip-red" href="/plugins/ems-attendance/page/markattendance">Take Attendance</a>
                        </span></td>
                        <td></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                        <td><span className="btn btn-success hasTooltip"><i className="fa fa-check" aria-hidden="true"></i> Marked
                        <a href="/plugins/ems-attendance/page/markattendance">Edit Attendance</a>
                        </span></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </section>;
export default AttendanceOverview;