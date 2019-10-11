import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as moment from 'moment';
import * as LoadStudentAtndQueryGql from './LoadStudentAtndQuery.graphql';
import {ReactFunctionOrComponentClass, LoadStudentAtndQueryCacheForAdmin} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

type withStudentAtndPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId:  string;
  lectureDate: string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadStudentAtndQueryCacheForAdmin ;
};

const withStudentAtndDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
const params = new URLSearchParams(location.search);
let ayId = params.get('ayid') ;
let bId = params.get('bid') ;

if(ayId == null || ayId == undefined) {
  ayId = "0";
}  
if(bId == null || bId == undefined) {
  bId = "0";
}
console.log("Academic year id from URL : ",ayId); 
console.log("Branch id from URL : ",bId);

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


