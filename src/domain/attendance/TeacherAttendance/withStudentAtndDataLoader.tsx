import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as moment from 'moment';
import * as LoadStudentAtndQueryGql from './LoadStudentAtndQuery.graphql';
import {ReactFunctionOrComponentClass, LoadStudentAtndQuery, LoadStudentAtndQueryVariables} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';


type withStudentAtndPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId:  string;
  teacherId: string;
  lectureDate: string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadStudentAtndQuery ;
};

const withStudentAtndDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<LoadStudentAtndQuery, withStudentAtndPageDataLoaderProps, TargetComponentProps>(LoadStudentAtndQueryGql, {
      options: ({ match }) => ({
        variables: {
          // branchId: match.params.branchId,
          // academicYearId: match.params.branchId,
          // teacherId: match.params.branchId
          branchId: 1851,
          academicYearId: 1701,
          teacherId: 2178,
          lectureDate: moment(new Date()).format("DD-MM-YYYY")
        }
      })
    })(withLoadingHandler(TargetComponent));
};

export default withStudentAtndDataLoader 


