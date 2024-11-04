export type CreateCategoryType = {};

export type EditCategoryType = Partial<CreateCategoryType> & {
  categoryid: number;
  categoryname?: string;
  image?: File;
};
