import gql from 'graphql-tag';

export const ADD_ACD_HISTORY = gql`
  fragment studentattendance on StudentAttendance {
    id
    attendanceStatus
    comments
    student {
      studentName
    }
    lecture {
      id
    }
  }
`;
