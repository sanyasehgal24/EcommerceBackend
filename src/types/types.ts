import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.js";


export interface NewUserRequestBody {
    name : string,
    email  : string,
    photo  : string,
    gender  : string,
  
    _id  : string,
   
    dob  : Date,
}
export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;

  
export interface NewProductRequestBody {
    name: string;
    category: string;
    price: number;
    stock: number;
  }
  export type SearchRequestQuery = {
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
  };
  
  export interface BaseQuery {
    name?: {
      $regex: string;
      $options: string;
    };
    price?: { $lte: number };
    category?: string;
  }
  export type InvalidateCacheProps = {
    product?: boolean;
    order?: boolean;
    admin?: boolean;
    userId?: string;
    orderId?: string;
    productId?: string | string[];
  };

  export type ShippingInfoType = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
  };

  export type OrderItemType = {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string;
  };
  export const reduceStock = async (orderItems: OrderItemType[]) => {
    for (let i = 0; i < orderItems.length; i++) {
      const order = orderItems[i];
      const product = await Product.findById(order.productId);
      if (!product) throw new Error("Product Not Found");
      product.stock -= order.quantity;
      await product.save();
    }
  };
  export interface NewOrderRequestBody {
    shippingInfo: ShippingInfoType;
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    orderItems: OrderItemType[];
  }
 