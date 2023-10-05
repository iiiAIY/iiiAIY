export interface IPeople {
  id: number,
  firstName : string,
  lastName : string,
  patronymic? : string,
  company : string
  moreInfo? : IPeopleInfo,
}

export interface IPeopleInfo {
  id : number,
  age: number,
  post?: string,
  tel: string,
  email : string,
  education : IEducation,
  peopleId : number
}

export interface IEducation {
  educationalInstitution : string,
  specialization : string,
  yearOfGraduation : number
}
