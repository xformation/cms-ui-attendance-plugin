import * as React from 'react';

import * as moment from 'moment';
// import { AttendanceServices } from '../_services';
import * as StudentAttendanceUpdateMutationGql from './StudentAttendanceUpdateMutation.graphql';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { graphql, MutationFunc, compose } from "react-apollo";
import { UPD_STU_ATTE_DATA } from '../_queries';
import withLoadingHandler from '../../../components/withLoadingHandler';
import { ReactFunctionOrComponentClass } from '../../../components/form/types';
// UPD_STU_ATTE_DATAimport { UpdateStudentAttendanceMutation } from './query-generated';

// type updateStudentAttendanceRootProps = RouteComponentProps<{}>;

// type TargetComponentProps = {
//     mutateUpd: MutationFunc<UpdateStudentAttendanceMutation> & UpdateStudentAttendanceMutation;
// };

const updateStudentAttendanceData = (TargetComponent: ReactFunctionOrComponentClass<any>) => {
    return graphql<any, any, any>(UPD_STU_ATTE_DATA)(
        (TargetComponent)
    );
};

export default updateStudentAttendanceData;