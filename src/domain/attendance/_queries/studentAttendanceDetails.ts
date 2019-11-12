import gql from 'graphql-tag';

export const ADD_ACD_HISTORY = gql`
  # import "./studentattendance.graphql"

  fragment studentAttendanceDetails on StudentAttendance {
    ...studentattendance
  }
`;
