import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { AttendanceServices } from '../_services';
import * as ListStudentAttendanceGql from './ListStudentAttendanceQuery.graphql';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { gql, graphql, QueryProps } from "react-apollo";
import {
  StudentAttendanceListQuery,
  StudentAttendanceFragment,
  StudentAttendanceData,
} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

type StudentAttendanceListPageOwnProps = RouteComponentProps<{}>;
type StudentAttendanceListPageProps = StudentAttendanceListPageOwnProps & {
  studentDataListQry: QueryProps & StudentAttendanceListQuery;
};

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

type StudentFilterCriteria = {
  studentFilterData: any,
  branches: any,
  academicYears: any,
  teachers: any,
  departments: any,
  batches: any,
  semesters: any,
  subjects: any,
  sections: any,
  lectures: any,
  dtPicker: any,
  teaches: any,
  attendanceMasters: any,
  submitted: any
};

class TeacherAttendance extends React.Component<StudentAttendanceListPageProps, StudentFilterCriteria>{
  
  constructor(props: any) {
    super(props);
    this.state = {
      studentFilterData: {
            branch: {
              id: 1001
            },
            academicYear: {
              id: 1051
            },
            teacher: {
              id: 1301
            },
            department: {
                id: ""
            },
            batch: {
                id: ""
            },
            semester: {
                id: ""
            },
            subject: {
                id: ""
            },
            section: {
                id: ""
            },
            lecture: {
                id: ""
            },
            dtPicker: {
                dt: DatePickerComponent
            },
            teach: {
                id: ""
            },
            attendanceMaster: {
                id: ""
            }
        },
        branches: [],
        academicYears: [],
        teachers: [],
        departments: [],
        batches: [],
        semesters: [],
        subjects: [],
        sections: [],
        lectures: [],
        dtPicker: [],
        teaches: [],
        attendanceMasters: [],
        submitted: false
    };
    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSemesters = this.createSemesters.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.createSections = this.createSections.bind(this);
    this.createLectures = this.createLectures.bind(this);
  }

  componentDidMount() {
    Promise.all([AttendanceServices.getDepartments(), AttendanceServices.getYears(), AttendanceServices.getSemesters(), AttendanceServices.getSubjects(), AttendanceServices.getSections(), AttendanceServices.getLectures(), AttendanceServices.getTeaches(), AttendanceServices.getAttendanceMasters() ]).then(
        data => {
            let departments = data[0];
            let batches = data[1];
            let semesters = data[2];
            let subjects = data[3];
            let sections = data[4];
            let lectures = data[5];
            let teaches = data[6];
            let attendanceMasters = data[7];
            this.setState({
                departments,
                batches,
                semesters,
                subjects,
                sections,
                lectures,
                teaches,
                attendanceMasters
            });
        },
        error => {
            console.log(error);
        }
    );
  }

  createDepartments(departments: any, selectedBranchId: any, selectedAcademicYearId: any) {
    let departmentsOptions = [<option key={0} value="">Select department</option>];
    for (let i = 0; i < departments.length; i++) {
      if (selectedBranchId == departments[i].branch.id && selectedAcademicYearId == departments[i].academicyear.id) {
          departmentsOptions.push(
            <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
        );
      }
    }
    return departmentsOptions;
  }
  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
        let id = batches[i].id;
        if (batches[i].departmentId == selectedDepartmentId) {
            batchesOptions.push(
                <option key={id} value={id}>{batches[i].batch}</option>
            );
        }
    }
    return batchesOptions;
  }
  createSubjects(subjects: any, selectedDepartmentId: any, selectedBatchId: any, selectedTeacherId: any){
    let subjectsOptions = [<option key={0} value="">Select Subject</option>];
    for (let i = 0; i < subjects.length; i++) {
        let id = subjects[i].id;
        if (subjects[i].department.id == selectedDepartmentId && subjects[i].batch.id == selectedBatchId && subjects[i].teacherId == selectedTeacherId) {
          subjectsOptions.push(
                <option key={id} value={id}>{subjects[i].subjectDesc}</option>
            );
        }
    }
    return subjectsOptions;
  }
  createSemesters(semesters: any){
    let subjectsOptions = [<option key={0} value="">Select Semester</option>];
    for (let i = 0; i < semesters.length; i++) {
        let id = semesters[i].id;
        subjectsOptions.push(
            <option key={id} value={id}>{semesters[i].description}</option>
        ); 
    }
    return subjectsOptions;
  }
  createSections(sections: any, selectedBatchId: any) {
    let batchesOptions = [<option key={0} value="">Select Section</option>];
    for (let i = 0; i < sections.length; i++) {
        let id = sections[i].id;
        if (sections[i].batchId == selectedBatchId) {
            batchesOptions.push(
                <option key={id} value={id}>{sections[i].section}</option>
            );
        }
    }
    return batchesOptions;
  }
  createLectures(lectures: any, teaches: any, attendanceMasters: any, subjectId: any, teacherId: any, batchId: any, sectionId: any){
    let theachId  = "";
    for (let a = 0; a < teaches.length; a++) {
      if(subjectId == teaches[a].subject.id && teacherId == teaches[a].teacher.id){
        theachId = teaches[a].id;
        break;
      }
    }

    let amId  = "";
    for (let a = 0; a < attendanceMasters.length; a++) {
      if(theachId == attendanceMasters[a].teach.id && batchId == attendanceMasters[a].batch.id && sectionId == attendanceMasters[a].section.id){
        amId = attendanceMasters[a].id;
        break;
      }
    }

    var todayTime = new Date();
    var month = todayTime.getMonth() + 1;
    var ms = month < 10 ? "0"+month : month;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var dd =  day + "/" + ms + "/" + year; 
    var dp = new DatePickerComponent(dd);
    
    let subjectsOptions = [<option key={0} value="">Select Lecture</option>];
    for (let i = 0; i < lectures.length; i++) {
        let id = lectures[i].id;
        var lcdt = new DatePickerComponent(lectures[i].strLecDate);
        if(lcdt.props === dp.props && lectures[i].attendancemaster.id === amId){
          subjectsOptions.push(
            <option key={id} value={id}>Lecture - {i+1} : {lectures[i].startTime} - {lectures[i].endTime}</option>
          ); 
        }
    }
    return subjectsOptions;
  }
  onFormSubmit = (e: any) => {
    this.setState({
        submitted: true
    });
    const { studentDataListQry } = this.props;
    const { studentFilterData } = this.state;
    e.preventDefault();
    if (studentFilterData.branch.id && studentFilterData.department.id &&  studentFilterData.batch.id && studentFilterData.section.id && studentFilterData.lecture.id) {
      var todayTime = new Date();
      var month = todayTime.getMonth() + 1;
      var ms = month < 10 ? "0"+month : month;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var dd =  day + "/" + ms + "/" + year; 
      var dp = new DatePickerComponent(dd);

        let dplStudentData = {
            ...studentFilterData,
            branchId: studentFilterData.branch.id,
            departmentId: studentFilterData.department.id,
            batchId: studentFilterData.batch.id,
            sectionId: studentFilterData.section.id,
            attendanceDate: studentFilterData.dtPicker.dt,
            lectureId: studentFilterData.lecture.id
        };
        
        // delete dplStudentData.branch;
        // delete dplStudentData.department;
        // delete dplStudentData.batch;
        // delete dplStudentData.section;
        // delete dplStudentData.__typename;
        let btn = e.target.querySelector("button[type='submit']");
        btn.setAttribute("disabled", true);
        let dataSavedMessage: any = document.querySelector(".data-saved-message");
        dataSavedMessage.style.display = "none";
        return studentDataListQry.refetch({
            variables: { input: dplStudentData },
        }).then((data: any) => {
            btn.removeAttribute("disabled");
            dataSavedMessage.style.display = "inline-block";
            // location.href = `${location.origin}/plugins/ems-student/page/students`;
        }).catch((error: any) => {
            btn.removeAttribute("disabled");
            dataSavedMessage.style.display = "inline-block";
            console.log('there was an error sending the query result', error);
            return Promise.reject(`Could not retrieve student attendance data: ${error}`);
        });
    }
}

  onChange = (e: any) => {
    const { name, value } = e.nativeEvent.target;
    const { studentFilterData } = this.state;
    if (name === "department") {
        this.setState({
          studentFilterData: {
                ...studentFilterData,
                department: {
                    id: value
                },
                batch: {
                    id: ""
                },
                section: {
                    id: ""
                }
            }
        });
    }else if (name === "batch") {
        this.setState({
          studentFilterData: {
                ...studentFilterData,
                batch: {
                    id: value
                },
                subject: {
                    id: ""
                },
                section: {
                    id: ""
                }
            }
        });
    }else if (name === "semester") {
      this.setState({
        studentFilterData: {
              ...studentFilterData,
              semester: {
                  id: value
              }
          }
      });
    }else if (name === "subject") {
      this.setState({
        studentFilterData: {
              ...studentFilterData,
              subject: {
                  id: value
              },
              lecture: {
                  id: ""
              }
          }
      });
    }else if (name === "section") {
      this.setState({
        studentFilterData: {
              ...studentFilterData,
              section: {
                  id: value
              }
          }
      });
    }else if (name === "lecture") {
      this.setState({
        studentFilterData: {
              ...studentFilterData,
              lecture: {
                  id: value
              }
          }
      });
    } 

  }

  render() {
    const { history, match, studentDataListQry } = this.props;
    const { studentFilterData, departments, batches, semesters, subjects, sections, lectures, teaches, attendanceMasters, submitted } = this.state;
    return (
      <section className="plugin-bg-white">
        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
          Teacher - Mark Attendance
        </h3>
        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit}>
            <table id="t-attendance">
              <thead>
                <th>Department</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Subject</th>
                <th>Section</th>
                <th>Lectures</th>
                <th>Date</th>
                <th>Take Attendace</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select name="department" onChange={this.onChange} value={studentFilterData.department.id} className="gf-form-input max-width-22">
                        {this.createDepartments(departments, studentFilterData.branch.id, studentFilterData.academicYear.id)}
                    </select>
                  </td>
                  <td>
                    <select name="batch" onChange={this.onChange} value={studentFilterData.batch.id} className="gf-form-input max-width-22">
                        {this.createBatches(batches, studentFilterData.department.id)}
                    </select>
                  </td>
                  <td>
                    <select name="semester" onChange={this.onChange} value={studentFilterData.semester.id} className="gf-form-input max-width-22">
                        {this.createSemesters(semesters)}
                    </select>
                  </td>
                  <td>
                    <select name="subject" onChange={this.onChange} value={studentFilterData.subject.id} className="gf-form-input max-width-22">
                        {this.createSubjects(subjects, studentFilterData.department.id, studentFilterData.batch.id, studentFilterData.teacher.id)}
                    </select>
                  </td>
                  <td>
                    <select name="section" onChange={this.onChange} value={studentFilterData.section.id} className="gf-form-input max-width-22">
                        {this.createSections(sections, studentFilterData.batch.id)}
                    </select>
                  </td>
                  <td>
                    <select name="lecture" onChange={this.onChange} value={studentFilterData.lecture.id} className="gf-form-input max-width-22">
                        {this.createLectures(lectures, teaches, attendanceMasters, studentFilterData.subject.id, studentFilterData.teacher.id, studentFilterData.batch.id, studentFilterData.section.id)}
                    </select>
                  </td>
                  <td>
                    <DatePickerComponent />
                  </td>
                  <td>
                    <button className="btn bs" type="submit">Take Attendance</button>
                    <a href="/plugins/ems-attendance/page/teachermarkattendance" className="btn btn-primary">
                      Take Attendance
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
    </section>
    );
  }
}
  

// export default TeacherAttendance;
export default withRouter(
  graphql<StudentAttendanceListQuery, StudentAttendanceListPageOwnProps, StudentAttendanceListPageProps>(ListStudentAttendanceGql)(
    TeacherAttendance
  )
);
