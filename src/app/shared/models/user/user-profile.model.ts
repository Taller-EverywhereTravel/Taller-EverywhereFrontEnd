export interface UserProfileResponse {
  id: number;
  name: string;
  mail: string;
  role: string | null;
  branch: {
    id: number;
    description: string;
    address: string;
    phone: string;
    mail: string;
    status: boolean;
    dateCreated: string;
    dateUpdated: string;
  } | null;
}

export interface UpdateUserNameRequest {
  name: string;
}
