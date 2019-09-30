import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as moment from 'moment';
import * as LoadStudentAtndQueryGql from './LoadStudentAtndQuery.graphql';
import { ReactFunctionOrComponentClass, LoadStudentAtndQuery, LoadStudentAtndQueryVariables } from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';
import { constants } from '../../../constants'

type withStudentAtndPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId: string;
  teacherId: string;
  lectureDate: string;
}>;

type TargetComponentProps = {
  data: QueryProps & LoadStudentAtndQuery;
};

async function getGlobalConfig(sigUser: any) {
  const rs = await fetch(constants.CMS_GLOBAL_CONFIG_URL+'?userName='+sigUser);
  const json = await rs.json();
  return json;
} 

const withStudentAtndDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
  const params = new URLSearchParams(location.search);
  const sigUser = params.get('signedInUser');
  let ayId = "0";
  let bId = "0";  
  let teacherId = "0";

  const dt = Promise.resolve(getGlobalConfig(sigUser));
  dt.then ((data) => {
    if(data.selectedAcademicYearId){
      ayId = data.selectedAcademicYearId;
    }
    if(data.selectedBranchId){
      bId = data.selectedBranchId;
    }
    if(data.userId){
      teacherId = data.userId;
    }
  });

  return graphql<LoadStudentAtndQuery, withStudentAtndPageDataLoaderProps, TargetComponentProps>(LoadStudentAtndQueryGql, {
    options: ({ match }) => ({
      variables: {
        branchId: bId, 
        academicYearId: ayId, 
        teacherId: teacherId,
        lectureDate: moment(new Date()).format("DD-MM-YYYY")
      }
    })
  })(withLoadingHandler(TargetComponent));
};

export default withStudentAtndDataLoader


