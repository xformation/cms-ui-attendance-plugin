import * as React from 'react';
// import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { AttendanceServices } from '../_services';
import * as StudentAttendanceFilterQueryGql from './StudentAttendanceFilterQuery.graphql';
import * as StudentAttendanceUpdateMutationGql from './StudentAttendanceUpdateMutation.graphql';
// import UpdateStudentAttendance from "./UpdateStudentAttendance";
import { withRouter, RouteComponentProps } from 'react-router';
import { graphql, MutationFunc, compose } from "react-apollo";
import {
  ReactFunctionOrComponentClass,
  DailyStudentAttendanceListQuery,
  UpdateStudentAttendanceMutation
} from '../../types';
// import { any } from 'async';
// import withLoadingHandler from '../../../components/withLoadingHandler';
// import { strict } from 'assert';

type StudentAttendanceRootProps = RouteComponentProps<{}, {}, any>;

type StudentAttendancePageProps = StudentAttendanceRootProps & {
  mutate: MutationFunc<DailyStudentAttendanceListQuery>;
};

type StudentAttendanceUpdatePageProps = StudentAttendanceRootProps & {
  mutateUpd: MutationFunc<UpdateStudentAttendanceMutation>;
};



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

class SaData {
  studentIds: any;
  lectureId: any;
  constructor(studentIds: any, lectureId: any) {
    this.studentIds = studentIds;
    this.lectureId = lectureId;
  }
}

class TeacherAttendance extends React.Component<StudentAttendancePageProps, StudentFilterCriteria>{
  constructor(props: any, a: any) {
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
            teach: {
                id: ""
            },
            attendanceMaster: {
                id: ""
            },
            mutateResult: [],
            selectedIds: "",
            payLoad: [],
            textValueMap: {}
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
    Promise.all([AttendanceServices.getDepartments(), AttendanceServices.getYears(), AttendanceServices.getSemesters(), AttendanceServices.getSubjects(), AttendanceServices.getSections(), AttendanceServices.getLectures(), AttendanceServices.getTeaches(), AttendanceServices.getAttendanceMasters()]).then(
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
  createSubjects(subjects: any, selectedDepartmentId: any, selectedBatchId: any, selectedTeacherId: any) {
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
  createSemesters(semesters: any) {
    let semestersOptions = [<option key={0} value="">Select Semester</option>];
    for (let i = 0; i < semesters.length; i++) {
      let id = semesters[i].id;
      semestersOptions.push(
        <option key={id} value={id}>{semesters[i].description}</option>
      );
    }
    return semestersOptions;
  }
  createSections(sections: any, selectedBatchId: any) {
    let sectionsOptions = [<option key={0} value="">Select Section</option>];
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].id;
      if (sections[i].batchId == selectedBatchId) {
        sectionsOptions.push(
          <option key={id} value={id}>{sections[i].section}</option>
        );
      }
    }
    return sectionsOptions;
  }
  createLectures(lectures: any, teaches: any, attendanceMasters: any, subjectId: any, teacherId: any, batchId: any, sectionId: any) {
    let theachId = "";
    for (let a = 0; a < teaches.length; a++) {
      if (subjectId == teaches[a].subject.id && teacherId == teaches[a].teacher.id) {
        theachId = teaches[a].id;
        break;
      }
    }

    let amId = "";
    for (let a = 0; a < attendanceMasters.length; a++) {
      if (theachId == attendanceMasters[a].teach.id && batchId == attendanceMasters[a].batch.id && sectionId == attendanceMasters[a].section.id) {
        amId = attendanceMasters[a].id;
        break;
      }
    }

    // var todayTime = new Date();
    // var month = todayTime.getMonth() + 1;
    // var ms = month < 10 ? "0"+month : month;
    // var day = todayTime.getDate();
    // var year = todayTime.getFullYear();
    // var dd =  day + "-" + ms + "-" + year;
    var dd1 = moment(new Date()).format("DD-MM-YYYY");
    // console.log('moment date dd1 : '+dd1);
    // var dp = new DatePickerComponent(dd1);


    // let dtP1 = document.querySelector("#dtPicker");
    // console.log("date picker object : ",dtP1);

    let lecturesOptions = [<option key={0} value="">Select Lecture</option>];
    for (let i = 0; i < lectures.length; i++) {
      let id = lectures[i].id;
      // var lcdt = new DatePickerComponent(lectures[i].strLecDate);
      if (lectures[i].strLecDate === dd1 && lectures[i].attendancemaster.id === amId) {
        lecturesOptions.push(
          <option key={id} value={id}>Lecture - {i + 1} : {lectures[i].startTime} - {lectures[i].endTime}</option>
        );

      }
    }

    return lecturesOptions;
  }

  // isCorrectDate(strDate: any){
  //   var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  //   return regex.test(strDate) ? true : false;
  // }

  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true
    });

    const { mutate } = this.props;
    const { studentFilterData } = this.state;
    e.preventDefault();

    // if(btn.id === 'btnTakeAtnd'){
    if (studentFilterData.branch.id && studentFilterData.department.id && studentFilterData.batch.id && studentFilterData.section.id && studentFilterData.lecture.id) {

      e.target.querySelector("#department").setAttribute("disabled", true);
      e.target.querySelector("#batch").setAttribute("disabled", true);
      e.target.querySelector("#semester").setAttribute("disabled", true);
      e.target.querySelector("#subject").setAttribute("disabled", true);
      e.target.querySelector("#section").setAttribute("disabled", true);
      e.target.querySelector("#lecture").setAttribute("disabled", true);
      e.target.querySelector("#lecture").setAttribute("disabled", true);
      e.target.querySelector("#detailGrid").setAttribute("class", "tflex bg-heading mt-1");
      e.target.querySelector("#detailGridTable").removeAttribute("class");

      // var todayTime = new Date();
      // var month = todayTime.getMonth() + 1;
      // var ms = month < 10 ? "0"+month : month;
      // var day = todayTime.getDate();
      // var year = todayTime.getFullYear();
      // var dd =  year+"-"+ms+"-"+day;
      // var dp = new DatePickerComponent(dd);

      // let dtP = moment(new Date()).format("DD-MM-YYYY");
      //e.target.querySelector("#dtPicker");
      // if(this.isCorrectDate(dtP.value) === false){
      //   dtP = moment(new Date()).format("DD-MM-YYYY");
      // }
      // console.log("date picker selected values : ", dtP.value);
      // console.log("moment date : ",   moment(new Date(dtP.value)).format("DD-MM-YYYY"));
      let studentFilterInputData = {
        branchId: studentFilterData.branch.id,
        departmentId: studentFilterData.department.id,
        batchId: studentFilterData.batch.id,
        sectionId: studentFilterData.section.id,
        subjectId: studentFilterData.subject.id,
        attendanceDate: moment(new Date()).format("DD-MM-YYYY"),
        lectureId: studentFilterData.lecture.id,
        teacherId: studentFilterData.teacher.id,
        academicYearId: studentFilterData.academicYear.id
      };

      // delete dplStudentData.branch;
      // delete dplStudentData.department;
      // delete dplStudentData.batch;
      // delete dplStudentData.section;
      // delete dplStudentData.__typename;
      let btn = e.target.querySelector("button[type='submit']");
      // btn.setAttribute("disabled", true);
      // let dataSavedMessage: any = document.querySelector(".data-saved-message");
      // dataSavedMessage.style.display = "none";
      return mutate({
        variables: { filter: studentFilterInputData },
      }).then(data => {
        const sdt = data;
        studentFilterData.mutateResult.push(sdt);
        this.setState({
          studentFilterData: studentFilterData
        });
        console.log('Query Result ::::: ', studentFilterData.mutateResult);

        // btn.removeAttribute("disabled");
        // dataSavedMessage.style.display = "inline-block";
        // location.href = `${location.origin}/plugins/ems-attendance/page/teacherattendance/${data}`;
      }).catch((error: any) => {
        // btn.removeAttribute("disabled");
        // dataSavedMessage.style.display = "inline-block";
        console.log('there was an error sending the query result', error);
        return Promise.reject(`Could not retrieve student attendance data: ${error}`);
      });
    }
    // }


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
    } else if (name === "batch") {
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
    } else if (name === "semester") {
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          semester: {
            id: value
          }
        }
      });
    } else if (name === "subject") {
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
    } else if (name === "section") {
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          section: {
            id: value
          }
        }
      });
    } else if (name === "lecture") {
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

  onClick = (e: any) => {
    // const { mutateUpd } = this.props;
    // const { mutate } = this.props;
    const { studentFilterData } = this.state;
    
    e.preventDefault();
    studentFilterData.selectedIds = "";
    let els = document.querySelectorAll("input[type=checkbox]");
    const delim = "#~#";
    var empty = [].filter.call( els, function( el: any ) {
      let txt : any = document.querySelector("#t"+el.id);
      let txtIds: any;
      if(el.checked){
        const eid = ""+ el.id+delim+"PRESENT"+delim
        var txtData = ""; 
        if(txt != null){
            var tmp  = studentFilterData.textValueMap["t"+el.id];
            if(tmp === undefined){
              txtData = txt.value;
            }else{
              txtData = tmp; 
            }
        }
        
        txtIds = eid+txtData;
        let sadt = new SaData(txtIds, studentFilterData.lecture.id);
        studentFilterData.payLoad.push(sadt);
      }else{
        const eid = ""+ el.id+delim+"ABSENT"+delim
        var txtData = ""; 
        if(txt != null){
            var tmp  = studentFilterData.textValueMap["t"+el.id];
            if(tmp === undefined){
              txtData = txt.value;
            }else{
              txtData = tmp; 
            }
        }
        
        txtIds = eid+txtData;
        let sadt = new SaData(txtIds, studentFilterData.lecture.id);
        studentFilterData.payLoad.push(sadt);
      }
      
    });
    console.log('total IDS : ',studentFilterData.selectedIds);    
    AttendanceServices.updateStudentAttendance(studentFilterData.payLoad).then(response => 
      alert(response.statusDesc)
      );
    
  }

  handleChange= (e: any) => {
    const { id, value} = e.nativeEvent.target;
    const { studentFilterData } = this.state;
    const key  = id;
    const val  = value;
    e.preventDefault();
    studentFilterData.textValueMap[key] = val;
    this.setState({
      studentFilterData: studentFilterData
    });
 
  }

  render() {
    // const { mutate, mutateUpd } = this.props;
    // const { mutate } = this.props;
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
                <tr>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>Subject</th>
                  <th>Section</th>
                  <th>Lectures</th>
                  <th>Date</th>
                  <th>Take Attendace</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select required name="department" id="department" onChange={this.onChange} value={studentFilterData.department.id} className="gf-form-input max-width-22">
                      {this.createDepartments(departments, studentFilterData.branch.id, studentFilterData.academicYear.id)}
                    </select>
                  </td>
                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={studentFilterData.batch.id} className="gf-form-input max-width-22">
                      {this.createBatches(batches, studentFilterData.department.id)}
                    </select>
                  </td>
                  <td>
                    <select required name="semester" id="semester" onChange={this.onChange} value={studentFilterData.semester.id} className="gf-form-input max-width-22">
                      {this.createSemesters(semesters)}
                    </select>
                  </td>
                  <td>
                    <select required name="subject" id="subject" onChange={this.onChange} value={studentFilterData.subject.id} className="gf-form-input max-width-22">
                      {this.createSubjects(subjects, studentFilterData.department.id, studentFilterData.batch.id, studentFilterData.teacher.id)}
                    </select>
                  </td>
                  <td>
                    <select required name="section" id="section" onChange={this.onChange} value={studentFilterData.section.id} className="gf-form-input max-width-22">
                      {this.createSections(sections, studentFilterData.batch.id)}
                    </select>
                  </td>
                  <td>
                    <select required name="lecture" id="lecture" onChange={this.onChange} value={studentFilterData.lecture.id} className="gf-form-input max-width-22">
                      {this.createLectures(lectures, teaches, attendanceMasters, studentFilterData.subject.id, studentFilterData.teacher.id, studentFilterData.batch.id, studentFilterData.section.id)}
                    </select>
                  </td>
                  <td>
                    <input type="text" value={moment(new Date()).format("DD-MM-YYYY")} disabled ></input>
                  </td>
                  <td>
                    <button className="btn btn-primary" type="submit" id="btnTakeAtnd" name="btnTakeAtnd" >Take Attendance</button>

                  </td>
                </tr>
              </tbody>
            </table>

            <div className="hide" id="detailGrid">
              <h4 className="p-1 py-2 mb-0">Mark Attendance</h4>
              <div className="hhflex">
                
                <div className="mx-2">
                  <select className="ma-select">
                    <option value="">Sort By</option>
                    <option value="">Name</option>
                    <option value="">ID</option>
                  </select>
                </div>
                <div className="h-center ma-select">
                  <input type="text" placeholder="Search Student" className="ma-select" />
                  <i className="fa fa-search" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="hide" id="detailGridTable">
                <table className="fwidth"  id="matable">
                  <thead >
                    <tr>
                      <th>Student Id</th>
                      <th>Student Name</th>
                      <th>Today</th>
                      <th>{moment(new Date()).subtract(1, "days").format("DD-MM-YYYY")}</th>
                      <th>{moment(new Date()).subtract(2, "days").format("DD-MM-YYYY")}</th>
                      <th>{moment(new Date()).subtract(3, "days").format("DD-MM-YYYY")}</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          this.state.studentFilterData.mutateResult.map((pd: any) => (
                            pd.data.getDailyStudentAttendanceData.map((k: any) => (
                                <tr>
                                  <td>{k.studentId}</td>
                                  <td>{k.studentName}</td>
                                  <td>
                                      { k.currentDateStatus === 'PRESENT' && 
                                        (
                                          <label className="switch">
                                          {' '}
                                          <input type="checkbox" id={k.studentId} name={k.studentId} defaultChecked /> <span className="slider" />{' '}
                                        </label>
                                        )
                                      }
                                      { k.currentDateStatus === 'ABSENT' && 
                                        (
                                          <label className="switch">
                                          {' '}
                                          <input type="checkbox" id={k.studentId} name={k.studentId} /> <span className="slider" />{' '}
                                        </label>
                                        )
                                      }
                                      { k.currentDateStatus === 'LECTURE_NOT_SCHEDULED' && 
                                        (
                                          <label >N/A</label>
                                        )
                                      }
                                  </td>
                                  <td>
                                    { k.previousOneDayStatus === 'PRESENT' && 
                                        (
                                          <span className="check-square">
                                            <i className="fa fa-check" aria-hidden="true" />
                                          </span>
                                        )
                                      }
                                      { k.previousOneDayStatus === 'ABSENT' && 
                                        (
                                          <span className="check-square-red">
                                            <i className="fa fa-times" aria-hidden="true" />
                                          </span>
                                        )
                                      }
                                      { k.previousOneDayStatus === 'LECTURE_NOT_SCHEDULED' && 
                                        (
                                          <label >N/A</label>
                                        )
                                      }
                                  </td>
                                  <td>
                                      { k.previousTwoDayStatus === 'PRESENT' && 
                                        (
                                          <span className="check-square">
                                            <i className="fa fa-check" aria-hidden="true" />
                                          </span>
                                        )
                                      }
                                      { k.previousTwoDayStatus === 'ABSENT' && 
                                        (
                                          <span className="check-square-red">
                                            <i className="fa fa-times" aria-hidden="true" />
                                          </span>
                                        )
                                      }
                                      { k.previousTwoDayStatus === 'LECTURE_NOT_SCHEDULED' && 
                                        (
                                          <label >N/A</label>
                                        )
                                      }
                                  </td>
                                  <td>
                                      { k.previousThreeDayStatus === 'PRESENT' && 
                                        (
                                          <span className="check-square">
                                            <i className="fa fa-check" aria-hidden="true" />
                                          </span>
                                        )
                                      }
                                      { k.previousThreeDayStatus === 'ABSENT' && 
                                        (
                                          <span className="check-square-red">
                                            <i className="fa fa-times" aria-hidden="true" />
                                          </span>
                                        )
                                      }
                                      { k.previousThreeDayStatus === 'LECTURE_NOT_SCHEDULED' && 
                                        (
                                          <label >N/A</label>
                                        )
                                      }
                                  </td>
                                  <td >
                                      <input type="text" id={"t"+k.studentId} defaultValue={k.comments} maxLength={255} onChange={this.handleChange} ></input>
                                  </td>
                                </tr>
                            ))
                          ))
                      }
                  </tbody>
                </table>

                <div className="d-flex fwidth justify-content-between pt-2">
                  <p></p>
                  <div>
                    
                    <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick}>Save</button>
                    
                  </div>
              </div>

            </div>

          </form>
        </div>



      </section>



    );
  }
}


// export default TeacherAttendance;
// export default withRouter(
//   graphql<DailyStudentAttendanceListQuery, StudentAttendanceListPageOwnProps>(StudentAttendanceFilterQueryGql) (
//     TeacherAttendance
//   )
// );

export default withRouter(
  compose(
    
    graphql<DailyStudentAttendanceListQuery, StudentAttendanceRootProps>(StudentAttendanceFilterQueryGql, {
      name: "mutate"
    })
    // ,
    // graphql<UpdateStudentAttendanceMutation, StudentAttendanceRootProps>(StudentAttendanceUpdateMutationGql, {
    //   name: "mutateUpd"
    // })
  )
  (TeacherAttendance)
);  