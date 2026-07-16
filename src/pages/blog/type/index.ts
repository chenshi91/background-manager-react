export type TSearchParams={
  title?:string,
  content?:string,
  about?:string
}

export type TKey='title'|'content'|'about'

export  interface ArticleItem {
  _id: string;
  category_id: string;
  content: string;
  count_comment: number;
  count_fav: number;
  count_like: number;
  count_view: number;
  excerpt: string;
  publish_date: number;
  title: string;
  user_avater: string;
  user_id: string;
  username: string;
}

export  interface ArticleItemType {
  _id: string;
  name: string;
}