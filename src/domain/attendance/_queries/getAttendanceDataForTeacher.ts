import gql from 'graphql-tag';

export const GET_ATTENDANCE_DATA_FOR_TEACHER = gql`
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
