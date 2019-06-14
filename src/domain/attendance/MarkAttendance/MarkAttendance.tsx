import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import * as React from 'react';
import * as StudentAttendanceFilterQueryGql from './StudentAttendanceFilterQuery.graphql';
import * as StudentAttendanceUpdateMutationGql from './StudentAttendanceUpdateMutation.graphql';
import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
import {
  LoadStudentAtndQueryCacheForAdmin,
  StudentAttendanceListQueryTypeForAdmin,
  UpdateStudentAttendanceMutation
} from '../../types';
import withStudentAtndDataLoader from "./withStudentAtndDataLoader";



interface type {
  checked: boolean;
}

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
    return <DatePicker selected={this.state.startDate} value={this.state.startDate} onChange={this.handleChange} id="dtPicker" name="dtPicker" />;
  }
}

type StudentAttendanceRootProps = RouteComponentProps<{
  branchId: string;
  academicYearId: string;
  lectureDate: string;
}> & {
  data: QueryProps & LoadStudentAtndQueryCacheForAdmin;
}

type StudentAttendancePageProps = StudentAttendanceRootProps & {
  mutate: MutationFunc<StudentAttendanceListQueryTypeForAdmin>;
  mutateUpd: MutationFunc<UpdateStudentAttendanceMutation>;
};

type StudentAttendanceState = {
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
  terms: any,
  attendanceMasters: any,
  submitted: any,
  startDate: any
};

class SaData {
  studentIds: any;
  lectureId: any;
  constructor(studentIds: any, lectureId: any) {
    this.studentIds = studentIds;
    this.lectureId = lectureId;
  }
}

class MarkAttendance extends React.Component<StudentAttendancePageProps, StudentAttendanceState>{
  constructor(props: StudentAttendancePageProps) {
    super(props);
    this.state = {
      studentFilterData: {
        branch: {
          id: 1851 //1001
        },
        academicYear: {
          id: 1701 //1051
        },
        teacher: {
          id: 2178 //1301
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
        term: {
          id: ""
        },
        attendanceMaster: {
          id: ""
        },
        mutateResult: [],
        filtered: [],
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
      terms: [],
      attendanceMasters: [],
      submitted: false,
      startDate: moment()
    };

    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSemesters = this.createSemesters.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.createSections = this.createSections.bind(this);
    this.createLectures = this.createLectures.bind(this);
    this.createTerms = this.createTerms.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  createTerms(terms: any) {

    let termsOptions = [<option key={0} value="">Select Term</option>];
    for (let i = 0; i < terms.length; i++) {
      let desc = 'From ' + terms[i].strStartDate + ' - To - ' + terms[i].strEndDate;
      termsOptions.push(
        <option key={terms[i].id} value={terms[i].id}>{desc}</option>
      );
    }
    return termsOptions;
  }

  createDepartments(departments: any, selectedBranchId: any, selectedAcademicYearId: any) {
    let departmentsOptions = [<option key={0} value="">Select Department</option>];
    for (let i = 0; i < departments.length; i++) {
      departmentsOptions.push(
        <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
      );
    }
    return departmentsOptions;
  }

  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = "" + batches[i].department.id;
      if (dptId == selectedDepartmentId) {
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
      if (subjects[i].department.id == selectedDepartmentId && subjects[i].batch.id == selectedBatchId) {
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
      let sbthId = "" + sections[i].batch.id;
      if (sbthId == selectedBatchId) {
        sectionsOptions.push(
          <option key={id} value={id}>{sections[i].section}</option>
        );
      }
    }
    return sectionsOptions;
  }

  createLectures(lectures: any, attendanceMasters: any, subjectId: any, selectedBatchId: any, selectedSectionId: any, changedDate: any) {
    let amId = "";
    for (let a = 0; a < attendanceMasters.length; a++) {
      let atndBthId = ""+attendanceMasters[a].batch.id;
      let atndSecId = ""+attendanceMasters[a].section.id;
      if (selectedBatchId === atndBthId && selectedSectionId === atndSecId) {
        amId = attendanceMasters[a].id;
        break;
      }
    }
    // var curDate = moment(new Date()).format("DD-MM-YYYY");
    let subObj : any = document.querySelector("#subject");
    // let dtPk: any = document.querySelector("#dtPicker");
    var curDate = moment(new Date(), "DD-MM-YYYY");

    // if(dtPk !== null){
    //   // curDate = dtPk.value;
    //   var ary = dtPk.value.split("/");
    //   var tmpDt = ary[0] + "-" + ary[1] + "-" + ary[2];
    //   curDate = moment(tmpDt, "DD-MM-YYYY");
    // }

    if(changedDate !== null){
      var tmpDt = moment(changedDate).format("DD-MM-YYYY");
      curDate = moment(tmpDt, "DD-MM-YYYY");
    }
    // curDate = curDate.replaceAll("/", "-");
    let lecturesOptions = [<option key={0} value="">Select Lecture</option>];
    for (let i = 0; i < lectures.length; i++) {
      let id = lectures[i].id;
      // var lcdt = new DatePickerComponent(lectures[i].strLecDate);
      let lecAtndMsId = lectures[i].attendancemaster.id;
      let lcDt = moment(lectures[i].strLecDate, "DD-MM-YYYY")
      if (lcDt.isSame(curDate) && lecAtndMsId === amId) { //lcDt.isSame(curDate)
        lecturesOptions.push(
          <option key={id} value={id}>{subObj.options[subObj.selectedIndex].text} : {lectures[i].startTime} - {lectures[i].endTime}</option>
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
      // let myDate:Date = moment(dateString,"YYYY-MM-DD").format("DD-MM-YYYY")

      let dtPk: any = document.querySelector("#dtPicker");
      let selectedDate = this.state.startDate;//moment(dtPk.value, "DD/MM/YYYY");//.format("DD-MM-YYYY");
      var tmpDt = moment(selectedDate).format("DD-MM-YYYY");
      selectedDate = moment(tmpDt, "DD-MM-YYYY");
      console.log("Date at the time of submission : ", selectedDate);
      let terms = this.props.data.createStudentAttendanceCacheForAdmin.terms;
      for (let i = 0; i < terms.length; i++) {
        let id = "" + terms[i].id + "";
        if (studentFilterData.term.id === id) {
          let startDate = moment(terms[i].strStartDate, "DD-MM-YYYY");//.format("DD-MM-YYYY");
          let todayDate = moment();//.format("DD-MM-YYYY");
          if (selectedDate.isAfter(todayDate)) {
            alert("Selected date cannot be a future date. Date is allowed to choose till today.");
            return;
          } else if (selectedDate.isBefore(startDate)) {
            alert("Selected date cannot be a past date from term start date. History Date is allowed to choose till term start date.");
            return;
          }
        }
      }

      e.target.querySelector("#term").setAttribute("disabled", true);
      e.target.querySelector("#department").setAttribute("disabled", true);
      e.target.querySelector("#batch").setAttribute("disabled", true);
      e.target.querySelector("#semester").setAttribute("disabled", true);
      e.target.querySelector("#subject").setAttribute("disabled", true);
      e.target.querySelector("#section").setAttribute("disabled", true);
      e.target.querySelector("#lecture").setAttribute("disabled", true);
      e.target.querySelector("#lecture").setAttribute("disabled", true);
      // e.target.querySelector("#detailGrid").setAttribute("class", "tflex bg-heading mt-1");
      e.target.querySelector("#detailGridTable").removeAttribute("class");

      dtPk.setAttribute("disabled", true);
      console.log('date picker value : ', moment(selectedDate).format("DD-MM-YYYY"));

      let studentFilterInputData = {
        branchId: studentFilterData.branch.id,
        departmentId: studentFilterData.department.id,
        batchId: studentFilterData.batch.id,
        sectionId: studentFilterData.section.id,
        subjectId: studentFilterData.subject.id,
        attendanceDate: moment(selectedDate).format("DD-MM-YYYY"),
        lectureId: studentFilterData.lecture.id,
        academicYearId: studentFilterData.academicYear.id,
        termId: studentFilterData.term.id
      };

      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute("disabled", true);
      // let dataSavedMessage: any = document.querySelector(".data-saved-message");
      // dataSavedMessage.style.display = "none";
      return mutate({
        variables: { filter: studentFilterInputData },
      }).then(data => {
        const sdt = data;
        studentFilterData.mutateResult = [];
        studentFilterData.mutateResult.push(sdt);
        studentFilterData.filtered.push(sdt);
        this.setState({
          studentFilterData: studentFilterData
        });
        console.log('Query Result ::::: ', studentFilterData.mutateResult);

        btn.removeAttribute("disabled");

        // dataSavedMessage.style.display = "inline-block";
        // location.href = `${location.origin}/plugins/ems-attendance/page/teacherattendance/${data}`;
      }).catch((error: any) => {
        btn.removeAttribute("disabled");
        // dataSavedMessage.style.display = "inline-block";
        console.log('there was an error sending the query result - attendannce for admin role: ', error);
        return Promise.reject(`Could not retrieve student attendance data for admin: ${error}`);
      });
    }
    // }


  }

  onChange = (e: any) => {
    const { name, value } = e.nativeEvent.target;
    const { studentFilterData } = this.state;
    if (name === "term") {
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          term: {
            id: value
          },
          department: {
            id: ""
          },
          batch: {
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
    } else if (name === "department") {
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
          },
          semester: {
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

    const { mutateUpd } = this.props;
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

    console.log('total IDS : ', studentFilterData.selectedIds);

    return mutateUpd({
      variables: { input: studentFilterData.payLoad },
    }).then(data => {
      console.log('Update Result: ', data.data.updateStudentAttendanceData.statusDesc);
      alert(data.data.updateStudentAttendanceData.statusDesc);
    }).catch((error: any) => {
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

  
  changeDate = (e: any) => {
   
    const { studentFilterData } = this.state;
    const varDt = e;
    console.log("handling date picker changed date...", varDt);
    this.setState({
      startDate : varDt
    });
    
    this.createLectures(this.props.data.createStudentAttendanceCacheForAdmin.lectures, this.props.data.createStudentAttendanceCacheForAdmin.attendanceMasters, studentFilterData.subject.id, studentFilterData.batch.id, studentFilterData.section.id, varDt);
  }


  render() {
    const { data: { createStudentAttendanceCacheForAdmin, refetch }, mutate, mutateUpd } = this.props;
    const { studentFilterData, departments, batches, semesters, subjects, sections, lectures, terms, attendanceMasters, submitted } = this.state;

    return (
      <section className="plugin-bg-white">
        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
          Admin - Mark Attendance
        </h3>
        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit} >
            <table id="t-attendance" className="markAttendance">
              <thead>
                <tr>
                  <th>Term</th>
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
                    <select required name="term" id="term" onChange={this.onChange} value={studentFilterData.term.id} className="gf-form-input">
                      {this.createTerms(this.props.data.createStudentAttendanceCacheForAdmin.terms)}
                    </select>
                  </td>
                  <td>
                    <select required name="department" id="department" onChange={this.onChange} value={studentFilterData.department.id} className="gf-form-input max-width-22">
                      {this.createDepartments(this.props.data.createStudentAttendanceCacheForAdmin.departments, studentFilterData.branch.id, studentFilterData.academicYear.id)}
                    </select>
                  </td>
                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={studentFilterData.batch.id} className="gf-form-input max-width-22">
                      {this.createBatches(this.props.data.createStudentAttendanceCacheForAdmin.batches, studentFilterData.department.id)}
                    </select>
                  </td>
                  <td>
                    <select required name="semester" id="semester" onChange={this.onChange} value={studentFilterData.semester.id} className="gf-form-input max-width-22">
                      {this.createSemesters(this.props.data.createStudentAttendanceCacheForAdmin.semesters)}
                    </select>
                  </td>
                  <td>
                    <select required name="subject" id="subject" onChange={this.onChange} value={studentFilterData.subject.id} className="gf-form-input max-width-22">
                      {this.createSubjects(this.props.data.createStudentAttendanceCacheForAdmin.subjects, studentFilterData.department.id, studentFilterData.batch.id, studentFilterData.teacher.id)}
                    </select>
                  </td>
                  <td>
                    <select required name="section" id="section" onChange={this.onChange} value={studentFilterData.section.id} className="gf-form-input max-width-22">
                      {this.createSections(this.props.data.createStudentAttendanceCacheForAdmin.sections, studentFilterData.batch.id)}
                    </select>
                  </td>
                  <td>
                    <select required name="lecture" id="lecture" onChange={this.onChange} value={studentFilterData.lecture.id} className="gf-form-input max-width-22">
                      {this.createLectures(this.props.data.createStudentAttendanceCacheForAdmin.lectures, this.props.data.createStudentAttendanceCacheForAdmin.attendanceMasters, studentFilterData.subject.id, studentFilterData.batch.id, studentFilterData.section.id, this.state.startDate)}
                    </select>
                  </td>
                  <td>
                    {/* <DatePickerComponent id="dtPicker" name="dtPicker" className="markDate" onChange={this.onClick}/> */}
                    <DatePicker selected={this.state.startDate} value={this.state.startDate} onChange={this.changeDate} id="dtPicker" name="dtPicker" />
                  </td>
                  <td>
                    <button className="btn btn-primary" type="submit" id="btnTakeAtnd" name="btnTakeAtnd" style={{ width: '130px' }}>Take Attendance</button>

                  </td>
                </tr>
              </tbody>
            </table>

            <div className="tflex bg-heading mt-1" id="detailGrid">
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
                    <th>Attendance</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.studentFilterData.mutateResult.map((pd: any) => (
                      pd.data.getStudentAttendanceDataForAdmin.map((k: any) => (
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

export default withStudentAtndDataLoader(

  compose(
    graphql<StudentAttendanceListQueryTypeForAdmin, StudentAttendanceRootProps>(StudentAttendanceFilterQueryGql, {
      name: "mutate"
    }),
    graphql<UpdateStudentAttendanceMutation, StudentAttendanceRootProps>(StudentAttendanceUpdateMutationGql, {
      name: "mutateUpd",
    }),

  )

    (MarkAttendance) as any
);