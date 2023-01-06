import { Student } from "./student";

export interface ServerResponse {
    success: boolean;
    message: string;
    errorType: string;
    data: any;
    exceptionNumber: number;
  }

