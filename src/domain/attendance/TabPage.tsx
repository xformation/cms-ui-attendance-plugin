import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import Attendance from './Attendance';
// import {FaUserGraduate} from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import {config} from '../../config';

export default class AttendancesTab extends React.Component<any, any> {
  LOGGED_IN_USER = new URLSearchParams(location.search).get('signedInUser');
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      permissions: [],
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.getUserPermissions = this.getUserPermissions.bind(this);
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  async componentDidMount(){
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
    const {activeTab, permissions} = this.state;
    return (
      <section className="tab-container">
          <div >
            {/* <img src="../../img/students.png" alt="" /> */}
            {/* <h4 >Attendance</h4> */}
            <h3 className="bg-heading p-1">
              <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
              Mark Attendance
            </h3>
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
              this.LOGGED_IN_USER !== 'admin' && permissions["Attendance"] !== null && permissions["Attendance"] !== undefined ?
                <TabPane tabId={0}>
                  <Attendance permissions={permissions}/>
                </TabPane>
              : this.LOGGED_IN_USER === 'admin' ?
                <TabPane tabId={0}>
                  <Attendance permissions={permissions}/>
                </TabPane>
              : null
            }
            
          </TabContent>
      </section>
    );
  }
}
