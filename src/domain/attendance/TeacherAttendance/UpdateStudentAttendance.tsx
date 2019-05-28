import * as React from 'react';

import * as moment from 'moment';
// import { AttendanceServices } from '../_services';
import * as StudentAttendanceUpdateMutationGql from './StudentAttendanceUpdateMutation.graphql';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { graphql, MutationFunc, compose } from "react-apollo";
import { ReactFunctionOrComponentClass, UpdateStudentAttendanceMutation } from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

type updateStudentAttendanceRootProps = RouteComponentProps<{}>;

type TargetComponentProps = {
    mutateUpd: MutationFunc<UpdateStudentAttendanceMutation> & UpdateStudentAttendanceMutation;
};

const UpdateStudentAttendance = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<UpdateStudentAttendanceMutation, updateStudentAttendanceRootProps, TargetComponentProps>(StudentAttendanceUpdateMutationGql)(
        (TargetComponent)
    );
};

export default UpdateStudentAttendance;