import * as React from 'react';

import * as moment from 'moment';
import { AttendanceServices } from '../_services';
// import * as StudentAttendanceFilterQueryGql from './StudentAttendanceFilterQuery.graphql';
import * as StudentAttendanceUpdateMutationGql from './StudentAttendanceUpdateMutation.graphql';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { graphql, MutationFunc, compose } from "react-apollo";
import {ReactFunctionOrComponentClass, UpdateStudentAttendanceMutation} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

// type updateStudentAttendanceRootProps = RouteComponentProps<{}>;
  
// type StudentAttendancePageProps = updateStudentAttendanceRootProps & {
//   mutateUpd: MutationFunc<UpdateStudentAttendanceMutation>;
// };



// const UpdateStudentAttendance = (TargetComponent: ReactFunctionOrComponentClass<StudentAttendancePageProps>) => {
// //   compose(
//   graphql<UpdateStudentAttendanceMutation, updateStudentAttendanceRootProps, StudentAttendancePageProps>(StudentAttendanceUpdateMutationGql, {
//     name: "mutateUpd"
//   })
// //   )
// };

interface dummyprop {
    name: string;
}
class DummyComponent extends React.Component<dummyprop>{
    render(){
        return (<div>this.props.name</div>);
    }
}
export default DummyComponent;