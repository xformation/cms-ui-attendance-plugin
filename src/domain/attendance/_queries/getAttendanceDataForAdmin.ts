import gql from 'graphql-tag';

export const GET_ATTENDANCE_DATA_FOR_ADMIN = gql`
  mutation getStudentAttendanceDataForAdmin($filter: StudentAttendanceFilterInput!) {
    getStudentAttendanceDataForAdmin(filter: $filter) {
      studentId
      studentName
      currentDateStatus
      comments
    }
  }
`;
