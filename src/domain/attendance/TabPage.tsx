import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import Attendance from './Attendance';
import {FaUserGraduate} from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import {config} from '../../config';
import wsCmsBackendServiceSingletonClient from '../../wsCmsBackendServiceClient';

export default class AttendancesTab extends React.Component<any, any> {
  LOGGED_IN_USER = new URLSearchParams(location.search).get('signedInUser');
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      permissions: [],
      branchId: null,
      academicYearId: null,
      departmentId: null,
      teacherId: null,
      isLoading: false,
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.getUserPermissions = this.getUserPermissions.bind(this);
    this.registerSocket = this.registerSocket.bind(this);
  }

  async registerSocket() {
    
    const socket = wsCmsBackendServiceSingletonClient.getInstance();
    
    socket.onmessage = async (response: any) => {
        let message = JSON.parse(response.data);
        console.log("Attendance TabPage. message received from server ::: ", message);
        this.setState({
            branchId: message.selectedBranchId,
            academicYearId: message.selectedAcademicYearId,
            departmentId: message.selectedDepartmentId,
            teacherId: message.userId,
        });
        await console.log("Attendance TabPage. branchId: ",this.state.branchId);
        console.log("Attendance TabPage. departmentId: ",this.state.departmentId);
        console.log("Attendance TabPage. ayId: ",this.state.academicYearId);
        console.log("Attendance TabPage. teacherId: ",this.state.teacherId);  
        
    }

    socket.onopen = async () =>  {
       console.log("Attendance TabPage. Opening websocekt connection on TabPage. User : ",new URLSearchParams(location.search).get("signedInUser"));
       await socket.send(new URLSearchParams(location.search).get("signedInUser"));
    }

    window.onbeforeunload = () => {
        console.log("Attendance index. Closing websocekt connection on TabPage.tsx");
    }
    
    

  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  async componentDidMount(){
    await this.registerSocket();
    await this.getUserPermissions();
    console.log("Permissions : ",this.state.permissions);
  }

  async getUserPermissions(){
    if(this.LOGGED_IN_USER !== 'admin' && this.LOGGED_IN_USER !== null) {
      const URL = config.CMS_GLOBAL_CONFIG_URL + '?userName=' + this.LOGGED_IN_USER;
      await fetch(URL).then(
        response => response.json()
      ).then(res =>{
          const perm = res.loginResponse.authz.permissions;
          const arr: any = [];
          perm.map((item: any) =>{
            arr[item] = item;
          });
          this.setState({
            permissions: arr,
          });
      })
    } 
  }

  render() {
    const {activeTab, permissions, academicYearId, branchId, departmentId, teacherId } = this.state;
    return (
      <section className="tab-container">
          <div >
            {/* <img src="../../img/students.png" alt="" /> */}
            {/* <h4 >Attendance</h4> */}
            {/* <h3 className="bg-heading p-1">
              <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
              Mark Attendance
            </h3> */}
            <div className="">
              <h5><FaUserGraduate className="fa-2x" />Attendance</h5>
            </div>
          </div>
          <Nav tabs className="pl-3 pl-3 mb-4 mt-4 boxShadow">
            {/* {
              console.log("permissions :::::: ",permissions)
            } */}
            {
              this.LOGGED_IN_USER !== 'admin' && permissions["Attendance"] !== null && permissions["Attendance"] !== undefined ?
                <NavItem className="cursor-pointer">
                  <NavLink className={`${activeTab === 0 ? 'active' : ''}`} onClick={() => { this.toggleTab(0); }} >
                    Attendance
                  </NavLink>
                </NavItem>
              : this.LOGGED_IN_USER === 'admin' ?
                <NavItem className="cursor-pointer">
                  <NavLink className={`${activeTab === 0 ? 'active' : ''}`} onClick={() => { this.toggleTab(0); }} >
                    Attendance
                  </NavLink>
                </NavItem>
              : null
            }

          </Nav>
          
          
              <TabContent activeTab={activeTab} className="border-right">
              {
                (this.LOGGED_IN_USER !== 'admin' && permissions["Attendance"] !== null && permissions["Attendance"] !== undefined ?
                  <TabPane tabId={0}>
                    <Attendance permissions={permissions}/>
                  </TabPane>
                : this.LOGGED_IN_USER === 'admin' ?
                  <TabPane tabId={0}>
                    <Attendance permissions={permissions}/>
                  </TabPane>
                : null) 
              }
              
            </TabContent>
             
          
      </section>
    );
  }
}
