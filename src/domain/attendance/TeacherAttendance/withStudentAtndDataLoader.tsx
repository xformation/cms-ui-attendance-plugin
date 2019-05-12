import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";

import * as LoadStudentAtndQueryGql from './LoadStudentAtndQuery.graphql';
import {ReactFunctionOrComponentClass, LoadStudentAtndQuery} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

type withStudentAtndPageDataLoaderProps = RouteComponentProps<{
    // branchId: string;
    // academicYearId: string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadStudentAtndQuery;
};

const withStudentAtndDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<LoadStudentAtndQuery, withStudentAtndPageDataLoaderProps, TargetComponentProps>(LoadStudentAtndQueryGql)(
      withLoadingHandler(TargetComponent)
    );
};

export default withStudentAtndDataLoader;
