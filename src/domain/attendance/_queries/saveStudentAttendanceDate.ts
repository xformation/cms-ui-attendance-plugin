import gql from 'graphql-tag';

export const UPDATE_STUDENT_ATTENDANCE_DATA = gql`
  mutation updateStudentAttendanceData($input: [StudentAttendanceUpdateFilter!]!) {
    updateStudentAttendanceData(input: $input) {
      statusCode
      statusDesc
    }
  }
`;
