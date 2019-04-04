/* tslint:disable */
//  This file was automatically generated and should not be edited.
export type AddStudentInput = {
  id?: number | null;
  studentName?: string | null;
  fatherName?: string | null;
  fatherMiddleName?: string | null;
  fatherLastName?: string | null;
  motherName?: string | null;
  motherMiddleName?: string | null;
  motherLastName?: string | null;
  aadharNo?: number | null;
  dateOfBirth?: number | null;
  placeOfBirth?: string | null;
  religion?: string | null;
  caste?: string | null;
  subCaste?: string | null;
  age?: number | null;
  sex?: string | null;
  bloodGroup?: string | null;
  addressLineOne?: string | null;
  addressLineTwo?: string | null;
  addressLineThree?: string | null;
  town?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: number | null;
  studentContactNumber?: number | null;
  alternateContactNumber?: number | null;
  studentEmailAddress?: string | null;
  alternateEmailAddress?: string | null;
  relationWithStudent?: string | null;
  name?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  contactNo?: number | null;
  emailAddress?: string | null;
  uploadPhoto?: string | null;
  admissionNo?: number | null;
  rollNo?: number | null;
  studentType?: string | null;
  batch: {
    batch?: any | null;
  };
  section: {
    section?: any | null;
  };
  branch: {
    branchName?: any | null;
  };
  department: {
    name?: any | null;
  };
};

export type AddStudentMutationVariables = {
  input: AddStudentInput;
};

export type AddStudentMutation = {
  addStudent: {
    student: {
      id: number;
      studentName: string;
      fatherName: string;
      fatherMiddleName: string;
      fatherLastName: string;
      motherName: string;
      motherMiddleName: string;
      motherLastName: string;
      aadharNo: number;
      dateOfBirth: number;
      placeOfBirth: string;
      religion: string;
      caste: string;
      subCaste: string;
      age: number;
      sex: string;
      bloodGroup: string;
      addressLineOne: string;
      addressLineTwo: string;
      addressLineThree: string;
      town: string;
      state: string;
      country: string;
      pincode: number;
      studentContactNumber: number;
      alternateContactNumber: number;
      studentEmailAddress: string;
      alternateEmailAddress: string;
      relationWithStudent: string;
      name: string;
      middleName: string;
      lastName: string;
      contactNo: number;
      emailAddress: string;
      uploadPhoto: string;
      admissionNo: number;
      rollNo: number;
      studentType: string;
      batch: {
        batch: any;
      };
      section: {
        section: any;
      };
      branch: {
        branchName: any;
      };
      department: {
        name: any;
      };
    };
  };
};

/* Location */

export type locationListQuery = {
  locations: Array<{
    id: string;
    name: string;
    address: string;
    appliesTo: string;
  }>;
};

export type locationQueryVariables = {
  locationId: any;
};

export type locationQuery = {
  location: {
    id: any;
    name: string;
    address: string;
    appliesTo: string;
  };
};

export type locationDetailsFragment = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

export type locationSummaryFragment = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

/* Student */

export type StudentListQuery = {
  // Return all known Pet Institutes
  students: Array<{
    id: number;
    studentName: string;
    fatherName: string;
    fatherMiddleName: string;
    fatherLastName: string;
    motherName: string;
    motherMiddleName: string;
    motherLastName: string;
    aadharNo: number;
    dateOfBirth: number;
    placeOfBirth: string;
    religion: string;
    caste: string;
    subCaste: string;
    age: number;
    sex: string;
    bloodGroup: string;
    addressLineOne: string;
    addressLineTwo: string;
    addressLineThree: string;
    town: string;
    state: string;
    country: string;
    pincode: number;
    studentContactNumber: number;
    alternateContactNumber: number;
    studentEmailAddress: string;
    alternateEmailAddress: string;
    relationWithStudent: string;
    emergencyContactName: string;
    emergencyContactMiddleName: string;
    emergencyContactLastName: string;
    emergencyContactNo: string;
    emergencyContactEmailAddress: string;
    uploadPhoto: string;
    admissionNo: number;
    rollNo: number;
    studentType: string;
    batch: {
      batch: any;
    };
    section: {
      section: any;
    };
    branch: {
      branchName: any;
    };
    department: {
      name: any;
    };
  }>;
};

export type StudentQueryVariables = {
  studentId: number;
};

export type StudentQuery = {
  student: {
    id: number;
    studentName: string;
    fatherName: string;
    fatherMiddleName: string;
    fatherLastName: string;
    motherName: string;
    motherMiddleName: string;
    motherLastName: string;
    aadharNo: number;
    dateOfBirth: number;
    placeOfBirth: string;
    religion: string;
    caste: string;
    subCaste: string;
    age: number;
    sex: string;
    bloodGroup: string;
    addressLineOne: string;
    addressLineTwo: string;
    addressLineThree: string;
    town: string;
    state: string;
    country: string;
    pincode: number;
    studentContactNumber: number;
    alternateContactNumber: number;
    studentEmailAddress: string;
    alternateEmailAddress: string;
    relationWithStudent: string;
    emergencyContactName: string;
    emergencyContactMiddleName: string;
    emergencyContactLastName: string;
    emergencyContactNo: string;
    emergencyContactEmailAddress: string;
    uploadPhoto: string;
    admissionNo: number;
    rollNo: number;
    studentType: string;
    batch: {
      batch: any;
    };
    section: {
      section: any;
    };
    branch: {
      branchName: string;
    };
    department: {
      name: string;
    };
  };
};

export type StudentFragment = {
  id: number;
  studentName: string;
  fatherName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  motherName: string;
  motherMiddleName: string;
  motherLastName: string;
  aadharNo: number;
  dateOfBirth: number;
  placeOfBirth: string;
  religion: string;
  caste: string;
  subCaste: string;
  age: number;
  sex: string;
  bloodGroup: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressLineThree: string;
  town: string;
  state: string;
  country: string;
  pincode: number;
  studentContactNumber: number;
  alternateContactNumber: number;
  studentEmailAddress: string;
  alternateEmailAddress: string;
  relationWithStudent: string;
  emergencyContactName: string;
  emergencyContactMiddleName: string;
  emergencyContactLastName: string;
  emergencyContactNo: string;
  emergencyContactEmailAddress: string;
  uploadPhoto: string;
  admissionNo: number;
  rollNo: number;
  studentType: string;
  batch: {
    batch: any;
  };
  section: {
    section: any;
  };
  branch: {
    branchName: string;
  };
  department: {
    name: string;
  };
};

export type StudentDetailsFragment = {
  id: number;
  studentName: string;
  fatherName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  motherName: string;
  motherMiddleName: string;
  motherLastName: string;
  aadharNo: number;
  dateOfBirth: number;
  placeOfBirth: string;
  religion: string;
  caste: string;
  subCaste: string;
  age: number;
  sex: string;
  bloodGroup: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressLineThree: string;
  town: string;
  state: string;
  country: string;
  pincode: number;
  studentContactNumber: number;
  alternateContactNumber: number;
  studentEmailAddress: string;
  alternateEmailAddress: string;
  relationWithStudent: string;
  emergencyContactName: string;
  emergencyContactMiddleName: string;
  emergencyContactLastName: string;
  emergencyContactNo: string;
  emergencyContactEmailAddress: string;
  uploadPhoto: string;
  admissionNo: number;
  rollNo: number;
  studentType: string;
  batch: {
    batch: any;
  };
  section: {
    section: any;
  };
  branch: {
    branchName: string;
  };
  department: {
    name: string;
  };
};

export type StudentSummaryFragment = {
  id: number;
  studentName: string;
  fatherName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  motherName: string;
  motherMiddleName: string;
  motherLastName: string;
  aadharNo: number;
  dateOfBirth: number;
  placeOfBirth: string;
  religion: string;
  caste: string;
  subCaste: string;
  age: number;
  sex: string;
  bloodGroup: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressLineThree: string;
  town: string;
  state: string;
  country: string;
  pincode: number;
  studentContactNumber: number;
  alternateContactNumber: number;
  studentEmailAddress: string;
  alternateEmailAddress: string;
  relationWithStudent: string;
  emergencyContactName: string;
  emergencyContactMiddleName: string;
  emergencyContactLastName: string;
  emergencyContactNo: string;
  emergencyContactEmailAddress: string;
  uploadPhoto: string;
  admissionNo: number;
  rollNo: number;
  studentType: string;
  batch: {
    batch: any;
  };
  section: {
    section: any;
  };
  branch: {
    branchName: string;
  };
  department: {
    name: string;
  };
};

export type UpdateStudentInput = {
  studentId: number;
  studentName?: string | null;
  fatherName?: string | null;
  fatherMiddleName?: string | null;
  fatherLastName?: string | null;
  motherName?: string | null;
  motherMiddleName?: string | null;
  motherLastName?: string | null;
  aadharNo?: number | null;
  dateOfBirth?: number | null;
  placeOfBirth?: string | null;
  religion?: string | null;
  caste?: string | null;
  subCaste?: string | null;
  age?: number | null;
  sex?: string | null;
  bloodGroup?: string | null;
  addressLineOne?: string | null;
  addressLineTwo?: string | null;
  addressLineThree?: string | null;
  town?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: number | null;
  studentContactNumber?: number | null;
  alternateContactNumber?: number | null;
  studentEmailAddress?: string | null;
  alternateEmailAddress?: string | null;
  relationWithStudent?: string | null;
  name?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  contactNo?: number | null;
  emailAddress?: string | null;
  uploadPhoto?: string | null;
  admissionNo?: number | null;
  rollNo?: number | null;
  studentType?: string | null;
  batch: {
    batch?: any | null;
  };
  section: {
    section?: any | null;
  };
  branch: {
    branchName?: any | null;
  };
  department: {
    name?: any | null;
  };
};

export type UpdateStudentMutationVariables = {
  input: UpdateStudentInput;
};

export type UpdateStudentMutation = {
  updateStudent: {
    student: {
      id: number;
      studentName: string;
      fatherName: string;
      fatherMiddleName: string;
      fatherLastName: string;
      motherName: string;
      motherMiddleName: string;
      motherLastName: string;
      aadharNo: number;
      dateOfBirth: number;
      placeOfBirth: string;
      religion: string;
      caste: string;
      subCaste: string;
      age: number;
      sex: string;
      bloodGroup: string;
      addressLineOne: string;
      addressLineTwo: string;
      addressLineThree: string;
      town: string;
      state: string;
      country: string;
      pincode: number;
      studentContactNumber: number;
      alternateContactNumber: number;
      studentEmailAddress: string;
      alternateEmailAddress: string;
      relationWithStudent: string;
      emergencyContactName: string;
      emergencyContactMiddleName: string;
      emergencyContactLastName: string;
      emergencyContactNo: string;
      emergencyContactEmailAddress: string;
      uploadPhoto: string;
      admissionNo: number;
      rollNo: number;
      studentType: string;
      batch: {
        batch: any;
      };
      section: {
        section: any;
      };
      branch: {
        branchName: string;
      };
      department: {
        name: string;
      };
    };
  };
};

/* tslint:enable */
