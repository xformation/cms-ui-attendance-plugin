import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import * as React from 'react';
import {withApollo} from 'react-apollo';
import {GET_ATTENDANCE_DATA_FOR_ADMIN, UPDATE_STUDENT_ATTENDANCE_DATA} from '../_queries';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';

//import withStudentAtndDataLoader from "./withStudentAtndDataLoader";

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
    return (
      <DatePicker
        selected={this.state.startDate}
        value={this.state.startDate}
        onChange={this.handleChange}
        id="dtPicker"
        name="dtPicker"
      />
    );
  }
}

// type StudentAttendanceRootProps = RouteComponentProps<{
//   branchId: string;
//   academicYearId: string;
//   lectureDate: string;
// }> & {
//     data: QueryProps & LoadStudentAtndQueryCacheForAdmin;
//   }

// type StudentAttendancePageProps = StudentAttendanceRootProps & {
//   mutate: MutationFunc<StudentAttendanceListQueryTypeForAdmin>;
//   mutateUpd: MutationFunc<UpdateStudentAttendanceMutation>;
// };

type StudentAttendanceState = {
  studentFilterData: any;
  branches: any;
  academicYears: any;
  departments: any;
  batches: any;
  // semesters: any,
  subjects: any;
  sections: any;
  lectures: any;
  dtPicker: any;
  terms: any;
  attendanceMasters: any;
  submitted: any;
  startDate: any;
  searchKey: any;
  sortBy: any;
  attendanceCacheForAdmin: any,
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

export interface MarkAttendanceProps extends React.HTMLAttributes<HTMLElement>{
  [data: string]: any;
  user?: any;
  attendanceCacheForAdmin?: any;
  branchId?: any;
  academicYearId?: any;
  departmentId?: any;
  teacherId?: any;
}
class MarkAttendance extends React.Component<MarkAttendanceProps, StudentAttendanceState> {
  constructor(props: MarkAttendanceProps) {
    super(props);
    // const params = new URLSearchParams(location.search);
    this.state = {
      user: this.props.user,
      attendanceCacheForAdmin: this.props.attendanceCacheForAdmin,
      branchId: null,
      academicYearId: null,
      departmentId: null,
      teacherId: null,
      studentFilterData: {
        // branch: {
        //   id: this.props.branchId
        // },
        // academicYear: {
        //   id: this.props.academicYearId
        // },
        // department: {
        //   id: this.props.departmentId
        // },
        batch: {
          id: '',
        },
        // semester: {
        //   id: ""
        // },
        subject: {
          id: '',
        },
        section: {
          id: '',
        },
        lecture: {
          id: '',
        },
        term: {
          id: '',
        },
        attendanceMaster: {
          id: '',
        },
        mutateResult: [],
        filtered: [],
        selectedIds: '',
        payLoad: [],
        textValueMap: {},
        txtCmtVal: {},
      },
      searchKey: '',
      sortBy: '',
      branches: [],
      academicYears: [],
      departments: [],
      batches: [],
      // semesters: [],
      subjects: [],
      sections: [],
      lectures: [],
      dtPicker: [],
      terms: [],
      attendanceMasters: [],
      submitted: false,
      startDate: moment(),
    };

    // this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    // this.createSemesters = this.createSemesters.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.createSections = this.createSections.bind(this);
    this.createLectures = this.createLectures.bind(this);
    this.createTerms = this.createTerms.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.registerSocket = this.registerSocket.bind(this);
  }

  async componentDidMount(){
    await this.registerSocket();
  }

  registerSocket() {
    const socket = wsCmsBackendServiceSingletonClient.getInstance();

    socket.onmessage = (response: any) => {
        let message = JSON.parse(response.data);
        console.log("MarkAttendance. message received from server ::: ", message);
        this.setState({
            branchId: message.selectedBranchId,
            academicYearId: message.selectedAcademicYearId,
            departmentId: message.selectedDepartmentId,
            teacherId: message.userId,
        });
        console.log("MarkAttendance. branchId: ",this.state.branchId);
        console.log("MarkAttendance. departmentId: ",this.state.departmentId); 
        console.log("MarkAttendance. ayId: ",this.state.academicYearId);  
    }

    socket.onopen = () => {
        console.log("MarkAttendance. Opening websocekt connection on Admission EnquiryPage.tsx. User : ",this.state.user.login);
        socket.send(this.state.user.login);
    }

    window.onbeforeunload = () => {
        console.log("MarkAttendance. Closing websocket connection with cms backend service");
    }
  }

  createTerms(terms: any) {
    let termsOptions = [
      <option key={0} value="">
        Select Term
      </option>,
    ];
    for (let i = 0; i < terms.length; i++) {
      let desc = 'From ' + terms[i].strStartDate + ' - To - ' + terms[i].strEndDate;
      termsOptions.push(
        <option key={terms[i].id} value={terms[i].id}>
          {desc}
        </option>
      );
    }
    return termsOptions;
  }

  // createDepartments(departments: any, selectedBranchId: any, selectedAcademicYearId: any) {
  //   let departmentsOptions = [<option key={0} value="">Select Department</option>];
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
      console.log('bat', id);
      let dptId = batches[i].department.id;
      console.log('dep', dptId);
      if (parseInt(dptId, 10) === parseInt(selectedDepartmentId, 10)) {
        batchesOptions.push(
          <option key={id} value={id}>
            {batches[i].batch}
          </option>
        );
      }
    }
    return batchesOptions;
  }
  createSubjects(subjects: any, selectedDepartmentId: any, selectedBatchId: any) {
    let subjectsOptions = [
      <option key={0} value=""> Select Subject </option>,
    ];
    for (let i = 0; i < subjects.length; i++) {
      let id = subjects[i].id;
      if ( parseInt(subjects[i].department.id, 10) === parseInt(selectedDepartmentId, 10) &&
           parseInt(subjects[i].batch.id, 10) === parseInt(selectedBatchId, 10)
      ) {
          subjectsOptions.push( <option key={id} value={id}> {subjects[i].subjectDesc} </option> );
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
    let sectionsOptions = [
      <option key={0} value="">
        Select Section
      </option>,
    ];
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].id;
      let sbthId = '' + sections[i].batch.id;
      if (sbthId == selectedBatchId) {
        sectionsOptions.push(
          <option key={id} value={id}>
            {sections[i].section}
          </option>
        );
      }
    }
    return sectionsOptions;
  }

  createLectures( lectures: any, attendanceMasters: any, selectedSubjectId: any, selectedBatchId: any, selectedSectionId: any, changedDate: any ) {
    let subObj: any = document.querySelector('#subject');
    var curDateS = moment(new Date()).format('DD-MM-YYYY');
    var curDate = moment(curDateS, 'DD-MM-YYYY');
    // var curDate = moment(new Date(), "DD-MM-YYYY");

    if (changedDate !== null) {
      var tmpDt = moment(changedDate).format('DD-MM-YYYY');
      curDate = moment(tmpDt, 'DD-MM-YYYY');
    }
    let lecturesOptions = [
      <option key={0} value="">
        Select Lecture
      </option>,
    ];
    for (let i = 0; i < lectures.length; i++) {
      let id = lectures[i].id;
      console.log('lec', id);
      let lcDt = moment(lectures[i].strLecDate, 'DD-MM-YYYY');
      // console.log('llcDtec', lcDt);
      let amBthId = lectures[i].attendancemaster.batch.id;
      // console.log('amBthId', amBthId);
      let sub = lectures[i].attendancemaster.teach.subject.subjectDesc;
      let sec = lectures[i].attendancemaster.section;
      console.log('subject - ', sub);
      console.log('section - ', sec);
      
      if ( lcDt.isSame(curDate) && parseInt(amBthId, 10) === parseInt(selectedBatchId, 10) &&
            parseInt(selectedSubjectId, 10) ===  parseInt(lectures[i].attendancemaster.teach.subject.id, 10)
      ) {
        let amSecId = lectures[i].attendancemaster.section !== null ? '' + lectures[i].attendancemaster.section.id : '';
        if (amSecId !== '') {
          if (parseInt(amSecId, 10) === parseInt(selectedSectionId, 10)) {
            lecturesOptions.push(
              <option key={id} value={id}>
                {/* {lectures[i].id} */}
                {lectures[i].attendancemaster.teach.subject.subjectDesc} :{' '}
                {lectures[i].startTime} - {lectures[i].endTime}
              </option>
            );
          }
        } else {
          lecturesOptions.push(
            <option key={id} value={id}>
              {/* {lectures[i].id} */}
              {lectures[i].attendancemaster.teach.subject.subjectDesc} :{' '}
              {lectures[i].startTime} - {lectures[i].endTime}
            </option>
          );
        }
      }
    }

    return lecturesOptions;
  }

  // createLectures(lectures: any, attendanceMasters: any, selectedBatchId: any, selectedSectionId: any, changedDate: any) {
  //   let amId = "";
  //   for (let a = 0; a < attendanceMasters.length; a++) {
  //     let atndBthId = "" + attendanceMasters[a].batch.id;
  //     let atndSecId = "" + attendanceMasters[a].section.id;

  //     if (selectedBatchId === atndBthId && selectedSectionId === atndSecId) {
  //       amId = attendanceMasters[a].id;
  //       break;
  //     }
  //   }
  //   // var curDate = moment(new Date()).format("DD-MM-YYYY");
  //   let subObj: any = document.querySelector("#subject");
  //   // let dtPk: any = document.querySelector("#dtPicker");
  //   var curDate = moment(new Date(), "DD-MM-YYYY");

  //   // if(dtPk !== null){
  //   //   // curDate = dtPk.value;
  //   //   var ary = dtPk.value.split("/");
  //   //   var tmpDt = ary[0] + "-" + ary[1] + "-" + ary[2];
  //   //   curDate = moment(tmpDt, "DD-MM-YYYY");
  //   // }

  //   if (changedDate !== null) {
  //     var tmpDt = moment(changedDate).format("DD-MM-YYYY");
  //     curDate = moment(tmpDt, "DD-MM-YYYY");
  //   }
  //   // curDate = curDate.replaceAll("/", "-");
  //   let lecturesOptions = [<option key={0} value="">Select Lecture</option>];
  //   for (let i = 0; i < lectures.length; i++) {
  //     let id = lectures[i].id;
  //     // var lcdt = new DatePickerComponent(lectures[i].strLecDate);
  //     let lecAtndMsId = lectures[i].attendancemaster.id;
  //     let lcDt = moment(lectures[i].strLecDate, "DD-MM-YYYY")
  //     if (lcDt.isSame(curDate) && lecAtndMsId === amId) { //lcDt.isSame(curDate)
  //       lecturesOptions.push(
  //         <option key={id} value={id}>{subObj.options[subObj.selectedIndex].text} : {lectures[i].startTime} - {lectures[i].endTime}</option>
  //       );
  //     }
  //   }

  //   return lecturesOptions;
  // }

  // isCorrectDate(strDate: any){
  //   var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  //   return regex.test(strDate) ? true : false;
  // }

  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true,
    });

    const {studentFilterData, academicYearId, branchId, departmentId, attendanceCacheForAdmin} = this.state;
    e.preventDefault();

    if ( branchId && departmentId && studentFilterData.batch.id 
        && studentFilterData.section.id && studentFilterData.lecture.id ) {
      
      // let myDate:Date = moment(dateString,"YYYY-MM-DD").format("DD-MM-YYYY")

      let dtPk: any = document.querySelector('#dtPicker');
      let selectedDate = this.state.startDate; //moment(dtPk.value, "DD/MM/YYYY");//.format("DD-MM-YYYY");
      var tmpDt = moment(selectedDate).format('DD-MM-YYYY');
      selectedDate = moment(tmpDt, 'DD-MM-YYYY');
      console.log('Date at the time of submission : ', selectedDate);
      let terms = attendanceCacheForAdmin.terms;
      // console.log('su', terms);
      for (let i = 0; i < terms.length; i++) {
        let id = '' + terms[i].id + '';
        if (studentFilterData.term.id === id) {
          let startDate = moment(terms[i].strStartDate, 'DD-MM-YYYY'); //.format("DD-MM-YYYY");
          let todayDate = moment(); //.format("DD-MM-YYYY");
          if (selectedDate.isAfter(todayDate)) {
            alert(
              'Selected date cannot be a future date. Date is allowed to choose till today.'
            );
            return;
          } else if (selectedDate.isBefore(startDate)) {
            alert(
              'Selected date cannot be a past date from term start date. History Date is allowed to choose till term start date.'
            );
            return;
          }
        }
      }

      e.target.querySelector('#term').setAttribute('disabled', true);
      // e.target.querySelector("#department").setAttribute("disabled", true);
      e.target.querySelector('#batch').setAttribute('disabled', true);
      // e.target.querySelector("#semester").setAttribute("disabled", true);
      e.target.querySelector('#subject').setAttribute('disabled', true);
      e.target.querySelector('#section').setAttribute('disabled', true);
      e.target.querySelector('#lecture').setAttribute('disabled', true);

      // e.target.querySelector("#detailGrid").setAttribute("class", "tflex bg-heading mt-1");
      e.target.querySelector('#detailGridTable').removeAttribute('class');

      dtPk.setAttribute('disabled', true);
      console.log('date picker value : ', moment(selectedDate).format('DD-MM-YYYY'));

      let studentFilterInputData = {
        branchId: branchId,
        departmentId: departmentId,
        batchId: studentFilterData.batch.id,
        sectionId: studentFilterData.section.id,
        subjectId: studentFilterData.subject.id,
        attendanceDate: moment(selectedDate).format('DD-MM-YYYY'),
        lectureId: studentFilterData.lecture.id,
        academicYearId: academicYearId,
        termId: studentFilterData.term.id,
      };

      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute('disabled', true);
      // let dataSavedMessage: any = document.querySelector(".data-saved-message");
      // dataSavedMessage.style.display = "none";
      console.log('calling mutation to get attendance data :::::: ');
      // return getStudentAttendanceDataForAdmin({
      //   variables: {filter: studentFilterInputData},
      // })
      this.props.client.mutate({
        mutation: GET_ATTENDANCE_DATA_FOR_ADMIN,
        variables: { 
          filter: studentFilterInputData
        },
      }).then((data: any) => {
          const sdt = data;
          studentFilterData.mutateResult = [];
          studentFilterData.mutateResult.push(sdt);
          studentFilterData.filtered.push(sdt);
          this.setState({studentFilterData: studentFilterData});
          console.log('Query Result ::::: ', studentFilterData.mutateResult);

          btn.removeAttribute('disabled');
          let optTr: any = document.querySelector('#term');
          optTr.removeAttribute('disabled');
          // let optDt: any = document.querySelector("#department");
          // optDt.removeAttribute("disabled");
          let optBt: any = document.querySelector('#batch');
          optBt.removeAttribute('disabled');
          // let optSm: any = document.querySelector("#semester");
          // optSm.removeAttribute("disabled");
          let optSb: any = document.querySelector('#subject');
          optSb.removeAttribute('disabled');
          let optSc: any = document.querySelector('#section');
          optSc.removeAttribute('disabled');
          let optLc: any = document.querySelector('#lecture');
          optLc.removeAttribute('disabled');
          dtPk.removeAttribute('disabled');
        })
        .catch((error: any) => {
          btn.removeAttribute('disabled');
          let optTr: any = document.querySelector('#term');
          optTr.removeAttribute('disabled');
          // let optDt: any = document.querySelector("#department");
          // optDt.removeAttribute("disabled");
          let optBt: any = document.querySelector('#batch');
          optBt.removeAttribute('disabled');
          // let optSm: any = document.querySelector("#semester");
          // optSm.removeAttribute("disabled");
          let optSb: any = document.querySelector('#subject');
          optSb.removeAttribute('disabled');
          let optSc: any = document.querySelector('#section');
          optSc.removeAttribute('disabled');
          let optLc: any = document.querySelector('#lecture');
          optLc.removeAttribute('disabled');
          dtPk.removeAttribute('disabled');
          console.log( 'Error - attendannce for admin role: ', error );
          return Promise.reject(
            `Could not retrieve student attendance data for admin: ${error}`
          );
        });
    // }
    }
  };

  onChange = (e: any) => {
    const {name, value} = e.nativeEvent.target;
    const {studentFilterData} = this.state;
    if (name === 'term') {
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          term: {
            id: value,
          },
          // department: {
          //   id: ""
          // },
          batch: {
            id: '',
          },
          section: {
            id: '',
          },
          semester: {
            id: '',
          },
        },
      });
    } else if (name === 'batch') {
      // else if (name === "department") {
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
      // }
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          batch: {
            id: value,
          },
          subject: {
            id: '',
          },
          section: {
            id: '',
          },
          semester: {
            id: '',
          },
        },
      });
    } else if (name === 'semester') {
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          semester: {
            id: value,
          },
        },
      });
    } else if (name === 'subject') {
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          subject: {
            id: value,
          },
          lecture: {
            id: '',
          },
        },
      });
    } else if (name === 'section') {
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          section: {
            id: value,
          },
        },
      });
    } else if (name === 'lecture') {
      this.setState({
        studentFilterData: {
          ...studentFilterData,
          lecture: {
            id: value,
          },
        },
      });
    } else if (name === 'searchKey') {
      this.setState({
        searchKey: value,
      });
    } else if (name === 'sortBy') {
      this.setState({
        sortBy: value,
      });
    }
  };

  onClick = (e: any) => {
    const {studentFilterData} = this.state;

    e.preventDefault();
    studentFilterData.selectedIds = '';
    let els = document.querySelectorAll('input[type=checkbox]');
    const delim = '#~#';
    var empty = [].filter.call(els, function(el: any) {
      let txt: any = document.querySelector('#t' + el.id);
      let txtIds: any;
      if (el.checked) {
        const eid = '' + el.id + delim + 'PRESENT' + delim;
        var txtData = '';
        if (txt != null) {
          var tmp = studentFilterData.textValueMap['t' + el.id];
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
        const eid = '' + el.id + delim + 'ABSENT' + delim;
        var txtData = '';
        if (txt != null) {
          var tmp = studentFilterData.textValueMap['t' + el.id];
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

    let btn: any = document.querySelector('#btnSave');
    btn.setAttribute('disabled', true);
    
    this.props.client.mutate({
      mutation: UPDATE_STUDENT_ATTENDANCE_DATA,
      variables: { 
        input: studentFilterData.payLoad
      },
    })
      .then((data: any) => {
        btn.removeAttribute('disabled');
        console.log('Update Result: ', data.data.updateStudentAttendanceData.statusDesc);
        alert(data.data.updateStudentAttendanceData.statusDesc);
      })
      .catch((error: any) => {
        btn.removeAttribute('disabled');
        console.log('there is some error while updating student attendance data', error);
        return Promise.reject(
          `there is some error while updating student attendance data: ${error}`
        );
      });
  };

  handleChange = (e: any) => {
    const {id, value} = e.nativeEvent.target;
    const {studentFilterData} = this.state;
    const key = id;
    const val = value;
    e.preventDefault();
    studentFilterData.textValueMap[key] = val;
    this.setState({
      studentFilterData: studentFilterData,
    });
  };

  changeDate = (e: any) => {
    const {studentFilterData, attendanceCacheForAdmin} = this.state;
    const varDt = e;
    console.log('handling date picker changed date...', varDt);
    this.setState({
      startDate: varDt,
    });

    this.createLectures(
      attendanceCacheForAdmin.lectures,
      attendanceCacheForAdmin.attendanceMasters,
      studentFilterData.subject.id,
      studentFilterData.batch.id,
      studentFilterData.section.id,
      varDt
    );
  };

  createGrid(ary: any) {
    const {studentFilterData, searchKey, sortBy} = this.state;
    const retVal = [];
    const len = ary.length;
    let trimmedSearchKey = searchKey.trim();
    if (sortBy) {
      this.sortStudents(ary, sortBy);
    }
    for (let pd = 0; pd < len; pd++) {
      let v = ary[pd];
      for (let x = 0; x < v.data.getStudentAttendanceDataForAdmin.length; x++) {
        let k = v.data.getStudentAttendanceDataForAdmin[x];
        if (
          !trimmedSearchKey ||
          (trimmedSearchKey && k.studentName.indexOf(trimmedSearchKey) !== -1)
        ) {
          retVal.push(
            <tbody>
              <tr>
                <td>{k.studentId}</td>
                <td>{k.studentName}</td>
                <td>
                  {k.currentDateStatus === 'PRESENT' && (
                    <label className="switch">
                      {' '}
                      <input type="checkbox" id={k.studentId} name={k.studentId} defaultChecked />{' '}
                      <span className="slider" />{' '}
                    </label>
                  )}
                  {k.currentDateStatus === 'ABSENT' && (
                    <label className="switch">
                      {' '}
                      <input type="checkbox" id={k.studentId} name={k.studentId} />{' '}
                      <span className="slider" />{' '}
                    </label>
                  )}
                  {k.currentDateStatus === 'LECTURE_NOT_SCHEDULED' && <label>N/A</label>}
                </td>
                <td>
                  <input type="text" id={'t' + k.studentId} defaultValue={k.comments} maxLength={255} onChange={this.handleChange} />
                </td>
              </tr>
            </tbody>
          );
        }
      }
    }
    return retVal;
  }
  sortStudents(arr: any, sortBy: any) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      let studentList = arr[i].data.getStudentAttendanceDataForAdmin;
      studentList.sort((a: any, b: any) => {
        if (sortBy === 'studentName') {
          if (a[sortBy] > b[sortBy]) {
            return 1;
          } else if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          return 0;
        } else {
          return parseInt(a[sortBy]) - parseInt(b[sortBy]);
        }
      });
    }
  }
  render() {
    // const { data: {createStudentAttendanceCacheForAdmin, refetch}, mutate, mutateUpd, history, match, } = this.props;
    const { studentFilterData, attendanceCacheForAdmin, branchId, departmentId } = this.state;

    return (
      <section className="plugin-bg-white">
        <h5 className="bg-heading p-1">
          {/* <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '} */}
          Admin Attendance
        </h5>
        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit}>
            <table id="t-attendance" className="markAttendance">
              <thead>
                <tr>
                  <th>Term</th>
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
                  <td>
                    <select required name="term" id="term" onChange={this.onChange} value={studentFilterData.term.id} className="gf-form-input" >
                      {
                        this.createTerms(attendanceCacheForAdmin.terms )
                      }
                    </select>
                  </td>
                  {/* <td>
                    <select required name="department" id="department" onChange={this.onChange} value={departmentId} className="gf-form-input max-width-22">
                      {this.createDepartments(filterCache.createStudentAttendanceCacheForAdmin.departments, branchId, academicYearId)}
                    </select>
                  </td> */}
                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={studentFilterData.batch.id} className="gf-form-input max-width-22" >
                      {
                        this.createBatches(attendanceCacheForAdmin.batches, departmentId )
                      }
                    </select>
                  </td>
                  {/* <td>
                    <select required name="semester" id="semester" onChange={this.onChange} value={studentFilterData.semester.id} className="gf-form-input max-width-22">
                      {this.createSemesters(filterCache.createStudentAttendanceCacheForAdmin.semesters)}
                    </select>
                  </td> */}
                  <td>
                    <select required name="subject" id="subject" onChange={this.onChange} value={studentFilterData.subject.id} className="gf-form-input max-width-22" >
                      {
                        this.createSubjects( attendanceCacheForAdmin.subjects, departmentId, studentFilterData.batch.id )
                      }
                    </select>
                  </td>
                  <td>
                    <select required name="section" id="section" onChange={this.onChange} value={studentFilterData.section.id} className="gf-form-input max-width-22" >
                      {
                        this.createSections( attendanceCacheForAdmin.sections, studentFilterData.batch.id )
                      }
                    </select>
                  </td>
                  <td>
                    <select required name="lecture" id="lecture" onChange={this.onChange} value={studentFilterData.lecture.id} className="gf-form-input max-width-22" >
                      {
                        this.createLectures( attendanceCacheForAdmin.lectures, attendanceCacheForAdmin.attendanceMasters, studentFilterData.subject.id, studentFilterData.batch.id, studentFilterData.section.id, this.state.startDate )
                      }
                    </select>
                  </td>
                  <td>
                    {/* <DatePickerComponent id="dtPicker" name="dtPicker" className="markDate" onChange={this.onClick}/> */}
                    <DatePicker selected={this.state.startDate} value={this.state.startDate} onChange={this.changeDate} id="dtPicker" name="dtPicker" />
                  </td>
                  <td>
                    <button className="btn btn-primary" type="submit" id="btnTakeAtnd" name="btnTakeAtnd" style={{width: '130px'}} >
                      Take Attendance
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <div className="tflex bg-heading mt-1" id="detailGrid">
              <h4 className="p-1 py-2 mb-0">Mark Attendance</h4>
              <div className="hhflex">
                <div className="mx-2">
                  <select
                    className="ma-select" name="sortBy" onChange={this.onChange} value={this.state.sortBy} >
                    <option value="">Sort By</option>
                    <option value="studentName">Name</option>
                    <option value="studentId">ID</option>
                  </select>
                </div>
                <div className="h-center ma-select">
                  <input type="text" placeholder="Search Student" className="ma-select" name="searchKey" value={this.state.searchKey} onChange={this.onChange} />
                  <i className="fa fa-search" aria-hidden="true" />
                </div>
              </div>
            </div> */}

            <div className="hide" id="detailGridTable">
              <table className="fwidth" id="matable">
                <thead>
                  <tr>
                    <th>Student Id</th>
                    <th>Student Name</th>
                    <th>Attendance</th>
                    <th>Comments</th>
                  </tr>
                </thead>

                {this.createGrid(this.state.studentFilterData.mutateResult)}
              </table>

              <div className="d-flex fwidth justify-content-between pt-2">
                <p />
                <div>
                  <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick} >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

// export default withLoadingHandler(

//   compose(
//     graphql<StudentAttendanceListQueryTypeForAdmin, StudentAttendanceRootProps>(StudentAttendanceFilterQueryGql, {
//       name: "mutate"
//     }),
//     graphql<UpdateStudentAttendanceMutation, StudentAttendanceRootProps>(StudentAttendanceUpdateMutationGql, {
//       name: "mutateUpd",
//     }),
//   )

//   (MarkAttendance) as any
// );

export default withApollo(MarkAttendance)

// export default graphql(CRET_STU_ATD_CAC_ADM, {
//   options: ({}) => ({
//     variables: {
//       branchId: 1951,
//       academicYearId: 1701,
//       // lectureDate: moment(new Date()).format('DD-MM-YYYY'),
//     },
//   }),
// })(
//   withLoadingHandler(compose(
//     graphql(CRET_STU_ATD_CAC_ADM, {name: 'createStudentAttendanceCacheForAdmin'}),
//     graphql(GET_STU_ATTE_DATA, {name: 'getStudentAttendanceDataForAdmin'}),
//     graphql(UPD_STU_ATTE_DATA, {name: 'updateStudentAttendanceData'})
//   )(MarkAttendance) as any)
// );
