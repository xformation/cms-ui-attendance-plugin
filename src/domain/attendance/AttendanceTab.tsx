import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Attendance from './Attendance';
import { FaUserGraduate } from 'react-icons/fa';


export default class AttendancesTab extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <section className="tab-container">
        <div className="tab-flex p-1">
          {/* <img src="../../img/students.png" alt="" /> */}
          <h5><FaUserGraduate className="m-1 fa-2x" /></h5>
          <h5 className="p-1">Attendance</h5>
        </div>
        <Nav tabs className="pl-3 pl-3 mb-4 mt-4 boxShadow">
          {/* <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 0 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(0);
              }}
            >
              MarkAttendance
              {/* AttendanceOverview 
            </NavLink>
          </NavItem> */}
          <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 0 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(0);
              }}
            >
              Attendance
              {/* MarkAttendance */}
            </NavLink>
          </NavItem>
          {/* <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 2 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(2);
              }}
            >
              TeacherAttendance
            </NavLink>
          </NavItem> */}
          {/* <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 3 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(3);
              }}
            >
              TeacherMarkAttendance
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={activeTab} className="border-right">
          {/* <TabPane tabId={0}>
            <AttendanceOverview />
          </TabPane> */}
          <TabPane tabId={0}>
          <Attendance />
          </TabPane>
          {/* <TabPane tabId={2}>
            <TeacherAttendance />
          </TabPane> */}
          {/* <TabPane tabId={3}>
            <TeacherMarkAttendance />
          </TabPane> */}
        </TabContent>
      </section>
    );
  }
}
