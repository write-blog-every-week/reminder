export interface BlogCount {
  userId: string;
  requiredCount: number;
}

export interface BlogUrl {
  userName: string;
  feedUrl: string;
}

export type UserData = BlogCount & BlogUrl;
