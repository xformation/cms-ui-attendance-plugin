import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as moment from 'moment';
import * as LoadStudentAtndQueryGql from './LoadStudentAtndQuery.graphql';
import {ReactFunctionOrComponentClass, LoadStudentAtndQueryCacheForAdmin} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';
import { constants } from '../../../constants';

type withStudentAtndPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId:  string;
  lectureDate: string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadStudentAtndQueryCacheForAdmin ;
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
  
  const dt = Promise.resolve(getGlobalConfig(sigUser));
  dt.then ((data) => {
    if(data.selectedAcademicYearId){
      ayId = data.selectedAcademicYearId;
    }
    if(data.selectedBranchId){
      bId = data.selectedBranchId;
    }
  });

  // fetch('http://localhost:8080/api/cmssettings?userName='+sigUser)
  // .then(res => res.json())
  // .then((data) => {
  //     console.log("1. Setting data :::::::::::");
  //     bId = data.selectedBranchId;
  //     ayId = data.selectedAcademicYearId;  
  // })
  // .catch((error: any) => {
  //   console.log('Error while fetching global settings : ', error);
  // });
  // console.log("2. All done :::::::::::");  
        
  return graphql<LoadStudentAtndQueryCacheForAdmin, withStudentAtndPageDataLoaderProps, TargetComponentProps>(LoadStudentAtndQueryGql, {
      options: ({ match }) => ({
        variables: {
          // branchId: match.params.branchId,
          // academicYearId: match.params.branchId,
          branchId: bId,
          academicYearId: ayId,
          lectureDate: moment(new Date()).format("DD-MM-YYYY")
        }
      })
    })(withLoadingHandler(TargetComponent));
};


export default withStudentAtndDataLoader 


