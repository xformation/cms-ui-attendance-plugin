import gql from 'graphql-tag';

export const GET_STU_ATTE_DATA = gql`
  mutation getStudentAttendanceDataForAdmin($filter: StudentAttendanceFilterInput!) {
    getStudentAttendanceDataForAdmin(filter: $filter) {
      studentId
      studentName
      currentDateStatus
      comments
    }
  }
`;
