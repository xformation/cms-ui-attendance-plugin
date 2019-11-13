import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as moment from 'moment';
import * as LoadStudentAtndQueryGql from './LoadStudentAtndQuery.graphql';
import { ReactFunctionOrComponentClass, LoadStudentAtndQuery, LoadStudentAtndQueryVariables } from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

type withStudentAtndPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId: string;
  teacherId: string;
  lectureDate: string;
}>;

type TargetComponentProps = {
  data: QueryProps & LoadStudentAtndQuery;
};


const withStudentAtndDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
  const params = new URLSearchParams(location.search);
  const sigUser = params.get('signedInUser');
  let ayId = params.get('ayid') ;
  let bId = params.get('bid') ;

  if(ayId === null || ayId === undefined) {
    ayId = "0";
  }  
  if(bId === null || bId === undefined) {
    bId = "0";
  }

  return graphql<LoadStudentAtndQuery, withStudentAtndPageDataLoaderProps, TargetComponentProps>(LoadStudentAtndQueryGql, {
    options: ({ match }) => ({
      variables: {
        branchId: bId, 
        academicYearId: ayId, 
        teacherId: sigUser,
        lectureDate: moment(new Date()).format("DD-MM-YYYY")
      }
    })
  })(withLoadingHandler(TargetComponent));
};

export default withStudentAtndDataLoader


