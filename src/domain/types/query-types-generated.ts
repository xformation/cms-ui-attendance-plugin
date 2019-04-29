/* tslint:disable */
//  This file was automatically generated and should not be edited.

// export type StudentAttendanceFilterInput = {
//   branchId?: string | null;
//   departmentId?: string | null;
//   batchId?: string | null;
//   sectionId?: string | null;
//   subjectId?: string | null;
//   studentId?: string | null;
//   studentName?: string | null;
//   attendanceDate?: string | null;
//   lectureId?: string | null;
// };

// export type DailyAttendanceVo = {
//   studentId?: string | null;
//   studentName?: string | null;
//   currentDateStatus?: string | null;
//   previousOneDayStatus?: string | null;
//   previousTwoDayStatus?: string | null;
//   previousThreeDayStatus?: string | null;
//   comments?: string | null;
// };

// export type AddStudentAttendanceInput = {
//   id?: number | null;
//   attendanceStatus?: string | null;
//   comments?: string | null;
//   student: {
//     studentName?: any | null;
//   };
//   lecture: {
//     id?: any | null;
//   };
// };

// export type AddStudentAttendanceMutationVariables = {
//   input: AddStudentAttendanceInput;
// };

// export type AddStudentAttendanceMutation = {
//   addStudentAttendance: {
//     studentAttendance: {
//       id: number;
//       attendanceStatus: string;
//       comments: string;
//       student: {
//         studentName: any;
//       };
//       lecture: {
//         id: any;
//       };
//     };
//   };
// };

/* Location */

// export type locationListQuery = {
//   locations: Array<{
//     id: string;
//     name: string;
//     address: string;
//     appliesTo: string;
//   }>;
// };

// export type locationQueryVariables = {
//   locationId: any;
// };

// export type locationQuery = {
//   location: {
//     id: any;
//     name: string;
//     address: string;
//     appliesTo: string;
//   };
// };

// export type locationDetailsFragment = {
//   id: any;
//   name: string;
//   address: string;
//   appliesTo: string;
// };

// export type locationSummaryFragment = {
//   id: any;
//   name: string;
//   address: string;
//   appliesTo: string;
// };

/* StudentAttendance */

// export type StudentAttendanceListQuery = {
//   studentAttendances: Array<{
//     id: number;
//     attendanceStatus: string;
//     comments: string;
//     student: {
//       studentName: any;
//     };
//     lecture: {
//       id: any;
//     };
//   }>;
// };

export type DailyStudentAttendanceListQuery = {
  getDailyStudentAttendanceData: Array<{
    studentId: number;
    studentName: string;
    currentDateStatus: string;
    previousOneDayStatus: string;
    previousTwoDayStatus: string;
    previousThreeDayStatus: string;
    comments: string;
  }>;
};

// export type DailyStudentAttendanceDetailsFragment = {
//   studentId: number;
//   studentName: string;
//   currentDateStatus: string;
//   previousOneDayStatus: string;
//   previousTwoDayStatus: string;
//   previousThreeDayStatus: string;
//   comments: string;
// };

// export type StudentAttendanceQueryVariables = {
//   studentAttendanceId: number;
// };

// export type StudentAttendanceQuery = {
//   studentAttendance: {
//     id: number;
//     attendanceStatus: string;
//     comments: string;
//     student: {
//       studentName: any;
//     };
//     lecture: {
//       id: any;
//     };
//   };
// };

// export type StudentAttendanceFragment = {
//   id: number;
//   attendanceStatus: string;
//   comments: string;
//   student: {
//     studentName: any;
//   };
//   lecture: {
//     id: any;
//   };
// };

// export type StudentAttendanceDetailsFragment = {
//   id: number;
//   attendanceStatus: string;
//   comments: string;
//   student: {
//     studentName: any;
//   };
//   lecture: {
//     id: any;
//   };
// };

// export type StudentAttendanceSummaryFragment = {
//   id: number;
//   attendanceStatus: string;
//   comments: string;
//   student: {
//     studentName: any;
//   };
//   lecture: {
//     id: any;
//   };
// };

// export type UpdateStudentAttendanceInput = {
//   id: number;
//   attendanceStatus?: string | null;
//   comments?: string | null;
//   student: {
//     studentName?: any | null;
//   };
//   lecture: {
//     id?: any | null;
//   };
// };

// export type UpdateStudentAttendanceMutationVariables = {
//   input: UpdateStudentAttendanceInput;
// };

// export type UpdateStudentAttendanceMutation = {
//   updateStudentAttendance: {
//     studentAttendance: {
//       id: number;
//       attendanceStatus: string;
//       comments: string;
//       student: {
//         studentName: any;
//       };
//       lecture: {
//         id: any;
//       };
//     };
//   };
// };

/* tslint:enable */
