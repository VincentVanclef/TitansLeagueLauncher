import { WebsiteRoles } from "@/core/Constants";

interface IApplicationUser {
  accountId: number;
  email: string;
  firstname: string;
  id: string;
  joinDate: Date;
  lastname: string;
  location: string;
  roles: WebsiteRoles[];
  totalVotes: number;
  username: string;
  vp: number;
  dp: number;
}

class ApplicationUser implements IApplicationUser {
  accountId: number;
  email: string;
  firstname: string;
  id: string;
  joinDate: Date;
  lastname: string;
  location: string;
  roles: WebsiteRoles[];
  totalVotes: number;
  username: string;
  vp: number;
  dp: number;

  constructor(
    accountId: number,
    email: string,
    firstname: string,
    id: string,
    joinDate: Date,
    lastname: string,
    location: string,
    roles: WebsiteRoles[],
    totalVotes: number,
    username: string,
    vp: number,
    dp: number
  ) {
    this.id = id;
    this.accountId = accountId;
    this.email = email;
    this.firstname = firstname;
    this.joinDate = joinDate;
    this.lastname = lastname;
    this.location = location;
    this.roles = roles;
    this.totalVotes = totalVotes;
    this.username = username;
    this.vp = vp;
    this.dp = dp;
  }
}

export { ApplicationUser, IApplicationUser };
