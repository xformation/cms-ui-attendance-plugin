import * as React from 'react';
// import DatePicker from 'react-datepicker';
import * as moment from 'moment';
// import { AttendanceServices } from '../_services';
import * as StudentAttendanceFilterQueryGql from './StudentAttendanceFilterQuery.graphql';
// import * as LoadStudentAtndQueryGql from './LoadStudentAtndQuery.graphql';
import * as StudentAttendanceUpdateMutationGql from './StudentAttendanceUpdateMutation.graphql';
// import UpdateStudentAttendance from "./UpdateStudentAttendance";
// import { withRouter, RouteComponentProps } from 'react-router';
// import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose, withApollo } from "react-apollo";
import { GET_ATTENDANCE_DATA_FOR_TEACHER, UPDATE_STUDENT_ATTENDANCE_DATA } from '../_queries';
import withLoadingHandler from '../withLoadingHandler';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';
// import withStudentAtndDataLoader from "./withStudentAtndDataLoader";
// import { constants } from '../../../constants'

// type StudentAttendanceRootProps = {
//   data: QueryProps & LoadStudentAtndQuery;
// }

// type StudentAttendanceRootProps = RouteComponentProps<{
//   branchId: string;
//   academicYearId: string;
//   teacherId: string;
//   lectureDate: string;
// }> & {
//   data: QueryProps & LoadStudentAtndQuery;
// }

// type StudentAttendancePageProps = StudentAttendanceRootProps & {
//   getDailyStudentAttendanceData: MutationFunc<DailyStudentAttendanceListQuery>;
//   getDailyStudentAttendanceData: MutationFunc<UpdateStudentAttendanceMutation>;
// };

type StudentAttendanceState = {
  studentFilterData: any, 
  branches: any,
  academicYears: any,
  teachers: any,
  departments: any,
  batches: any,
  // semesters: any,
  subjects: any,
  sections: any,
  lectures: any,
  dtPicker: any,
  teaches: any,
  attendanceMasters: any,
  submitted: any,
  attendanceCacheForTeacher: any,
  branchId: any,
  academicYearId: any,
  departmentId: any,
  teacherId: any,
  user: any,
};

class SaData {
  studentIds: any;
  lectureId: any;
  constructor(studentIds: any, lectureId: any) {
    this.studentIds = studentIds;
    this.lectureId = lectureId;
  }
}

export interface TeacherAttendanceProps extends React.HTMLAttributes<HTMLElement>{
  [data: string]: any;
  user?: any;
  attendanceCacheForTeacher?: any;
  branchId?: any;
  academicYearId?: any;
  departmentId?: any;
  teacherId?: any;
}

class TeacherAttendance<T = {[data: string]: any}> extends React.Component<TeacherAttendanceProps, StudentAttendanceState>{
  constructor(props: TeacherAttendanceProps) {
    super(props);
    // const params = new URLSearchParams(location.search);
    this.state = {
      attendanceCacheForTeacher: this.props.attendanceCacheForTeacher,
      branchId: this.props.branchId,
      academicYearId: this.props.academicYearId,
      departmentId: this.props.departmentId,
      teacherId: this.props.teacherId,
      user: this.props.user,
      studentFilterData: {
        // branch: {
        //   id: this.props.branchId
        // },
        // academicYear: {
        //   id: this.props.academicYearId
        // },
        // teacher: {
        //   id: this.props.teacherId
        // },
        // department: {
        //   id: this.props.departmentId
        // },
        batch: {
          id: ""
        },
        // semester: {
        //   id: ""
        // },
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
      // semesters: [],
      subjects: [],
      sections: [],
      lectures: [],
      dtPicker: [],
      teaches: [],
      attendanceMasters: [],
      submitted: false
    };
    // this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    // this.createSemesters = this.createSemesters.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.createSections = this.createSections.bind(this);
    this.createLectures = this.createLectures.bind(this);
    this.registerSocket = this.registerSocket.bind(this);
  }


  async componentDidMount(){
    await this.registerSocket();
  }

  registerSocket() {
    const socket = wsCmsBackendServiceSingletonClient.getInstance();

    socket.onmessage = (response: any) => {
        let message = JSON.parse(response.data);
        console.log("TeacherAttendance. message received from server ::: ", message);
        this.setState({
            branchId: message.selectedBranchId,
            academicYearId: message.selectedAcademicYearId,
            departmentId: message.selectedDepartmentId,
            teacherId: message.userId,
        });
        console.log("TeacherAttendance. branchId: ",this.state.branchId);
        console.log("TeacherAttendance. departmentId: ",this.state.departmentId);  
        console.log("TeacherAttendance. ayId: ",this.state.academicYearId);  
    }

    socket.onopen = () => {
        console.log("TeacherAttendance. Opening websocekt connection. User : ",new URLSearchParams(location.search).get("signedInUser"));
        socket.send(new URLSearchParams(location.search).get("signedInUser"));
    }

    window.onbeforeunload = () => {
        console.log("TeacherAttendance. Closing websocket connection with cms backend service");
    }
  }

  // createDepartments(departments: any, selectedBranchId: any, selectedAcademicYearId: any) {
  //   let departmentsOptions = [<option key={0} value="">Select department</option>];
  //   for (let i = 0; i < departments.length; i++) {
  //     departmentsOptions.push(
  //       <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
  //     );

  //   }
  //   return departmentsOptions;
  // }

  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [ <option key={0} value=""> Select Year </option>, ];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = batches[i].department.id;
      if (parseInt(dptId, 10) === parseInt(selectedDepartmentId, 10)) {
        batchesOptions.push( <option key={id} value={id}> {batches[i].batch} </option> );
      }
    }
    return batchesOptions;
  }
  createSubjects(subjects: any, selectedDepartmentId: any, selectedBatchId: any) {
    let subjectsOptions = [<option key={0} value="">Select Subject</option>];
    for (let i = 0; i < subjects.length; i++) {
      let id = subjects[i].id;
      if (parseInt(subjects[i].department.id, 10) === parseInt(selectedDepartmentId, 10) && parseInt(subjects[i].batch.id, 10) === parseInt(selectedBatchId, 10)) {
        subjectsOptions.push(
          <option key={id} value={id}>{subjects[i].subjectDesc}</option>
        );
      }
    }
    return subjectsOptions;
  }
  // createSemesters(semesters: any) {
  //   let semestersOptions = [<option key={0} value="">Select Semester</option>];
  //   for (let i = 0; i < semesters.length; i++) {
  //     let id = semesters[i].id;
  //     semestersOptions.push(
  //       <option key={id} value={id}>{semesters[i].description}</option>
  //     );
  //   }
  //   return semestersOptions;
  // }
  createSections(sections: any, selectedBatchId: any) {
    let sectionsOptions = [<option key={0} value="">Select Section</option>];
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].id;
      let sbthId = sections[i].batch.id;
      if (parseInt(sbthId, 10) === parseInt(selectedBatchId, 10)) {
        sectionsOptions.push(
          <option key={id} value={id}>{sections[i].section}</option>
        );
      }
    }
    return sectionsOptions;
  }

  createLectures(lectures: any, attendanceMasters: any, selectedSubjectId: any, selectedBatchId: any, selectedSectionId: any) {
    let subObj: any = document.querySelector("#subject");
    var curDateS = moment(new Date()).format("DD-MM-YYYY");
    var curDate = moment(curDateS, "DD-MM-YYYY");
    let lecturesOptions = [<option key={0} value="">Select Lecture</option>];
    for (let i = 0; i < lectures.length; i++) {
      let id = lectures[i].id;
      let lcDt = moment(lectures[i].strLecDate, "DD-MM-YYYY");
      let amBthId = lectures[i].attendancemaster.batch.id;
      let amSubId = lectures[i].attendancemaster.teach.subject.id;
      if (lcDt.isSame(curDate) && parseInt(amBthId, 10) === parseInt(selectedBatchId, 10) && parseInt(selectedSubjectId, 10) === parseInt(amSubId)) {
        let amSecId = lectures[i].attendancemaster.section !== null ? ""+lectures[i].attendancemaster.section.id : "";
          
        if(amSecId !== ""){
          if(parseInt(amSecId, 10) === parseInt(selectedSectionId,10)){
            lecturesOptions.push(
              <option key={id} value={id}>{lectures[i].attendancemaster.teach.subject.subjectDesc} : {lectures[i].startTime} - {lectures[i].endTime}</option>
            );
          }
        }
        else{
          lecturesOptions.push(
            <option key={id} value={id}>{lectures[i].attendancemaster.teach.subject.subjectDesc} : {lectures[i].startTime} - {lectures[i].endTime}</option>
          );
        } 
        
      }
    }

    return lecturesOptions;
  }

  // createLectures(lectures: any, teaches: any, attendanceMasters: any, subjectId: any, selectedBatchId: any, selectedSectionId: any) {
  //   let theachId = "";
  //   for (let a = 0; a < teaches.length; a++) {
  //     let sbId = "" + teaches[a].subject.id;
  //     if (subjectId == sbId) {
  //       theachId = teaches[a].id;
  //       break;
  //     }
  //   }

  //   let amId = "";
  //   for (let a = 0; a < attendanceMasters.length; a++) {
  //     let atndBthId = "" + attendanceMasters[a].batch.id;
  //     let atndSecId = "" + attendanceMasters[a].section.id;
  //     let atndTchId = "" + attendanceMasters[a].teach.id;
  //     if (theachId == atndTchId && selectedBatchId == atndBthId && selectedSectionId == atndSecId) {
  //       amId = attendanceMasters[a].id;
  //       break;
  //     }
  //   }

  //   var curDate = moment(new Date()).format("DD-MM-YYYY");

  //   let lecturesOptions = [<option key={0} value="">Select Lecture</option>];
  //   for (let i = 0; i < lectures.length; i++) {
  //     let id = lectures[i].id;
  //     let lecAtndMsId = "" + lectures[i].attendancemaster.id;
  //     if (lectures[i].strLecDate == curDate && lecAtndMsId == amId) {
  //       lecturesOptions.push(
  //         <option key={id} value={id}>Lecture - {i + 1} : {lectures[i].startTime} - {lectures[i].endTime}</option>
  //       );

  //     }
  //   }

  //   return lecturesOptions;
  // }

  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true
    });

    const { mutate } = this.props;
    const { studentFilterData, academicYearId, branchId, departmentId, teacherId, user } = this.state;
    e.preventDefault();

    if (branchId && departmentId && studentFilterData.batch.id 
        && studentFilterData.section.id && studentFilterData.lecture.id) {

      // e.target.querySelector("#department").setAttribute("disabled", true);
      e.target.querySelector("#batch").setAttribute("disabled", true);
      // e.target.querySelector("#semester").setAttribute("disabled", true);
      e.target.querySelector("#subject").setAttribute("disabled", true);
      e.target.querySelector("#section").setAttribute("disabled", true);
      e.target.querySelector("#lecture").setAttribute("disabled", true);
      
      e.target.querySelector("#detailGrid").setAttribute("class", "tflex bg-heading mt-1");
      e.target.querySelector("#detailGridTable").removeAttribute("class");

      let studentFilterInputData = {
        branchId: branchId,
        departmentId: departmentId,
        batchId: studentFilterData.batch.id,
        sectionId: studentFilterData.section.id,
        subjectId: studentFilterData.subject.id,
        attendanceDate: moment(new Date()).format("DD-MM-YYYY"),
        lectureId: studentFilterData.lecture.id,
        teacherId: teacherId,
        academicYearId: academicYearId
      };


      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute("disabled", true);

      // return mutate({
      //   variables: { filter: studentFilterInputData },
      // })
      this.props.client.mutate({
        mutation: GET_ATTENDANCE_DATA_FOR_TEACHER,
        variables: { 
          filter: studentFilterInputData
        },
      }).then((data: any) => {
        const sdt = data;
        studentFilterData.mutateResult = [];
        studentFilterData.mutateResult.push(sdt);
        this.setState({
          studentFilterData: studentFilterData
        });
        console.log('Query Result ::::: ', studentFilterData.mutateResult);
        btn.removeAttribute("disabled");
        // let optDt : any = document.querySelector("#department");
        // optDt.removeAttribute("disabled");
        let optBt : any = document.querySelector("#batch");
        optBt.removeAttribute("disabled");
        // let optSm : any = document.querySelector("#semester");
        // optSm.removeAttribute("disabled");
        let optSb : any = document.querySelector("#subject");
        optSb.removeAttribute("disabled");
        let optSc : any = document.querySelector("#section");
        optSc.removeAttribute("disabled");
        let optLc : any = document.querySelector("#lecture");
        optLc.removeAttribute("disabled");
        

      }).catch((error: any) => {
        btn.removeAttribute("disabled");
        // let optDt : any = document.querySelector("#department");
        // optDt.removeAttribute("disabled");
        let optBt : any = document.querySelector("#batch");
        optBt.removeAttribute("disabled");
        // let optSm : any = document.querySelector("#semester");
        // optSm.removeAttribute("disabled");
        let optSb : any = document.querySelector("#subject");
        optSb.removeAttribute("disabled");
        let optSc : any = document.querySelector("#section");
        optSc.removeAttribute("disabled");
        let optLc : any = document.querySelector("#lecture");
        optLc.removeAttribute("disabled");
        console.log('there was an error sending the query result', error);
        return Promise.reject(`Could not retrieve student attendance data: ${error}`);
       
      });
    }
  }

  onChange = (e: any) => {
    const { name, value } = e.nativeEvent.target;
    const { studentFilterData } = this.state;
    // if (name === "department") {
    //   this.setState({
    //     studentFilterData: {
    //       ...studentFilterData,
    //       department: {
    //         id: value
    //       },
    //       batch: {
    //         id: ""
    //       },
    //       section: {
    //         id: ""
    //       },
    //       semester: {
    //         id: ""
    //       }
    //     }
    //   });
    // } else 
    if (name === "batch") {
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
          },
          semester: {
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
    const { studentFilterData } = this.state;

    e.preventDefault();
    
    studentFilterData.selectedIds = "";
    let els = document.querySelectorAll("input[type=checkbox]");
    const delim = "#~#";
    var empty = [].filter.call(els, function (el: any) {
      let txt: any = document.querySelector("#t" + el.id);
      let txtIds: any;
      if (el.checked) {
        const eid = "" + el.id + delim + "PRESENT" + delim
        var txtData = "";
        if (txt != null) {
          var tmp = studentFilterData.textValueMap["t" + el.id];
          if (tmp === undefined) {
            txtData = txt.value;
          } else {
            txtData = tmp;
          }
        }

        txtIds = eid + txtData;
        let sadt = new SaData(txtIds, studentFilterData.lecture.id);
        studentFilterData.payLoad.push(sadt);
      } else {
        const eid = "" + el.id + delim + "ABSENT" + delim
        var txtData = "";
        if (txt != null) {
          var tmp = studentFilterData.textValueMap["t" + el.id];
          if (tmp === undefined) {
            txtData = txt.value;
          } else {
            txtData = tmp;
          }
        }

        txtIds = eid + txtData;
        let sadt = new SaData(txtIds, studentFilterData.lecture.id);
        studentFilterData.payLoad.push(sadt);
      }
    });

    // console.log('total IDS : ', studentFilterData.selectedIds);
    let btn : any = document.querySelector("#btnSave");
    btn.setAttribute("disabled", true);
    // return mutateUpd({
    //   variables: { input: studentFilterData.payLoad },
    // })
    this.props.client.mutate({
      mutation: UPDATE_STUDENT_ATTENDANCE_DATA,
      variables: { 
        input: studentFilterData.payLoad
      },
    })
    .then((data: any) => {
      btn.removeAttribute("disabled");
      console.log('Update Result: ', data.data.updateStudentAttendanceData.statusDesc);
      alert(data.data.updateStudentAttendanceData.statusDesc);
    }).catch((error: any) => {
      btn.removeAttribute("disabled");
      console.log('there is some error while updating student attendance data', error);
      return Promise.reject(`there is some error while updating student attendance data: ${error}`);
    });



  }

  handleChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { studentFilterData } = this.state;
    const key = id;
    const val = value;
    e.preventDefault();
    studentFilterData.textValueMap[key] = val;
    this.setState({
      studentFilterData: studentFilterData
    });

  }

  render() {
    // const { data: { createStudentAttendanceCache, refetch }, mutate, mutateUpd } = this.props;
    // const { studentFilterData, departments, batches, semesters, subjects, sections, lectures, teaches, attendanceMasters, submitted } = this.state;
    const { studentFilterData, attendanceCacheForTeacher, departmentId, departments, batches, subjects, sections, lectures, teaches, attendanceMasters, submitted } = this.state;
    return (
      <section className="plugin-bg-white">
        <h5 className="bg-heading p-1">
          {/* <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '} */}
          Teacher Attendance
        </h5>
        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit}>
            <table id="t-attendance">
              <thead>
                <tr>
                  {/* <th>Department</th> */}
                  <th>Year</th>
                  {/* <th>Semester</th> */}
                  <th>Subject</th>
                  <th>Section</th>
                  <th>Lectures</th>
                  <th>Date</th>
                  <th>Take Attendace</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <td>
                    <select required name="department" id="department" onChange={this.onChange} value={departmentId} className="gf-form-input max-width-22">
                      {this.createDepartments(filterCache.createStudentAttendanceCache.departments, branchId, academicYearId)}
                    </select>
                  </td> */}
                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={studentFilterData.batch.id} className="gf-form-input max-width-22">
                      {
                        attendanceCacheForTeacher !== null && attendanceCacheForTeacher != undefined &&  (
                          this.createBatches(attendanceCacheForTeacher.batches, departmentId)
                        )
                        
                      }
                    </select>
                  </td>
                  {/* <td>
                    <select required name="semester" id="semester" onChange={this.onChange} value={studentFilterData.semester.id} className="gf-form-input max-width-22">
                      {this.createSemesters(filterCache.createStudentAttendanceCache.semesters)}
                    </select>
                  </td> */}
                  <td>
                    <select required name="subject" id="subject" onChange={this.onChange} value={studentFilterData.subject.id} className="gf-form-input max-width-22">
                      {
                        attendanceCacheForTeacher !== null && attendanceCacheForTeacher != undefined && (
                          this.createSubjects(attendanceCacheForTeacher.subjects, departmentId, studentFilterData.batch.id)
                        )  
                      }
                    </select>
                  </td>
                  <td>
                    <select required name="section" id="section" onChange={this.onChange} value={studentFilterData.section.id} className="gf-form-input max-width-22">
                      {
                        attendanceCacheForTeacher !== null && attendanceCacheForTeacher != undefined && (
                          this.createSections(attendanceCacheForTeacher.sections, studentFilterData.batch.id)
                        )
                      }
                    </select>
                  </td>
                  <td>
                    <select required name="lecture" id="lecture" onChange={this.onChange} value={studentFilterData.lecture.id} className="gf-form-input max-width-22">
                      {
                        attendanceCacheForTeacher !== null && attendanceCacheForTeacher != undefined && (
                          this.createLectures(attendanceCacheForTeacher.lectures, attendanceCacheForTeacher.attendanceMasters, studentFilterData.subject.id, studentFilterData.batch.id, studentFilterData.section.id)
                        )
                      }
                    </select>
                  </td>
                  <td>
                    <input type="text" value={moment(new Date()).format("DD-MM-YYYY")} disabled ></input>
                  </td>
                  <td>
                    <button className="btn btn-primary" type="submit" id="btnTakeAtnd" name="btnTakeAtnd" style={{ width: '130px' }} >Take Attendance</button>

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
              <table className="fwidth" id="matable">
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
                            {k.currentDateStatus === 'PRESENT' &&
                              (
                                <label className="switch">
                                  {' '}
                                  <input type="checkbox" id={k.studentId} name={k.studentId} defaultChecked /> <span className="slider" />{' '}
                                </label>
                              )
                            }
                            {k.currentDateStatus === 'ABSENT' &&
                              (
                                <label className="switch">
                                  {' '}
                                  <input type="checkbox" id={k.studentId} name={k.studentId} /> <span className="slider" />{' '}
                                </label>
                              )
                            }
                            {k.currentDateStatus === 'LECTURE_NOT_SCHEDULED' &&
                              (
                                <label >N/A</label>
                              )
                            }
                          </td>
                          <td>
                            {k.previousOneDayStatus === 'PRESENT' &&
                              (
                                <span className="check-square">
                                  <i className="fa fa-check" aria-hidden="true" />
                                </span>
                              )
                            }
                            {k.previousOneDayStatus === 'ABSENT' &&
                              (
                                <span className="check-square-red">
                                  <i className="fa fa-times" aria-hidden="true" />
                                </span>
                              )
                            }
                            {k.previousOneDayStatus === 'LECTURE_NOT_SCHEDULED' &&
                              (
                                <label >N/A</label>
                              )
                            }
                          </td>
                          <td>
                            {k.previousTwoDayStatus === 'PRESENT' &&
                              (
                                <span className="check-square">
                                  <i className="fa fa-check" aria-hidden="true" />
                                </span>
                              )
                            }
                            {k.previousTwoDayStatus === 'ABSENT' &&
                              (
                                <span className="check-square-red">
                                  <i className="fa fa-times" aria-hidden="true" />
                                </span>
                              )
                            }
                            {k.previousTwoDayStatus === 'LECTURE_NOT_SCHEDULED' &&
                              (
                                <label >N/A</label>
                              )
                            }
                          </td>
                          <td>
                            {k.previousThreeDayStatus === 'PRESENT' &&
                              (
                                <span className="check-square">
                                  <i className="fa fa-check" aria-hidden="true" />
                                </span>
                              )
                            }
                            {k.previousThreeDayStatus === 'ABSENT' &&
                              (
                                <span className="check-square-red">
                                  <i className="fa fa-times" aria-hidden="true" />
                                </span>
                              )
                            }
                            
                            {k.previousThreeDayStatus === 'LECTURE_NOT_SCHEDULED' &&
                              (
                                <label >N/A</label>
                              )
                            }
                          </td>
                          <td >
                              <input type="text" id={"t" + k.studentId} defaultValue={k.comments} maxLength={255} onChange={this.handleChange} ></input>
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
export default withApollo(TeacherAttendance)
//   export default graphql(CREATE_STU_CACHE, {
//     options: ({ }) => ({
//       variables: {
//         branchId: 1851,
//         academicYearId: 1701,
//         lectureDate: moment(new Date()).format("DD-MM-YYYY"),
//         teacherId: 2151
//       }
//     })
//   }) (withLoadingHandler(
  
//     compose(
//       graphql(GET_DAILY_ATTEN, { name: "getStudentAttendanceDataForAdmin" }),
//       graphql(GET_STU_DATA, { name: "updateStudentAttendanceData" }),
//     )
//     (TeacherAttendance) as any
//   )
// );
