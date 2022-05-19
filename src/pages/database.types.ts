interface DBPin{
    _id: string;
    title: string;
    url: string;
    author: string;
    commentsCount: number;
    date: number;
    likesCount: number;
    dislikesCount: number;
  }
  
  interface DBUser{
    _id: string;
    username: string;
    email: string;
    saved: string[];
    created: string[];
    followers: string[];
    avatar: string;
    password: string;
    tag: string;
    following: string[];
  }

  interface DBComment{
    _id: string;
    user: string;
    text: string;
    pin: string;
    date: number;
  }

  interface DBDetailedPinProps {
    _id: string;
    url: string;
    title: string;
    author: {
        username: string;
        followers: number[];
        avatar: string;
        tag: string;
    }
    likesCount: number;
    dislikesCount: number;
    comments: string[];
}

export type {DBPin, DBUser, DBDetailedPinProps};