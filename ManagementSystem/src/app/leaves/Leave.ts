export interface Leave{
  id:number;
  leavetype : number;
  from: string; // Represented as a string in ISO 8601 format
  to : string; // Represented as a string in ISO 8601 format
  numberOfDays: number ;
  note: string;
  employee: number;

}

