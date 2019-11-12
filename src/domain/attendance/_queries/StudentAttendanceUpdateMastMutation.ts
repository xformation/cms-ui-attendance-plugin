import gql from 'graphql-tag';

export const UPD_STU_ATTE_DATA = gql`
  mutation updateStudentAttendanceData($input: [StudentAttendanceUpdateFilter!]!) {
    updateStudentAttendanceData(input: $input) {
      statusCode
      statusDesc
    }
  }
`;
