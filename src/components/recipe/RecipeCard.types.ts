import { Url } from "url";

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: Url;
  tags: Array<string>;
}
