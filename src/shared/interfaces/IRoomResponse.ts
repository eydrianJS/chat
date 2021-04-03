interface IRoomSingleUserResponse {
  dbUser: any;
  id: string;
  room: string;
  username: string;
}

export interface IRoomResponse {
  room: string;
  users: IRoomSingleUserResponse[];
}
