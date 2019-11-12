import gql from 'graphql-tag';

export const GET_STU_DATA = gql`
  mutation getDailyStudentAttendanceData($filter: StudentAttendanceFilterInput!) {
    getDailyStudentAttendanceData(filter: $filter) {
      studentId
      studentName
      currentDateStatus
      previousOneDayStatus
      previousTwoDayStatus
      previousThreeDayStatus
      comments
    }
  }
`;
