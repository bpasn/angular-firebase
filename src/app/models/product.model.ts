export interface ProductModel {
  create_product_by: string;
  id: string;
  product_review:number,
  product_name: string;
  product_color: string;
  product_desc: string;
  product_additional: ProductAdditionalModel;
  product_image: ProductImageModel
}

export interface ProductAdditionalModel {
  size: string;
  price: string;
  quality: string;
}


export interface ProductImageModel {
  base64: string;
  name: string;
}
