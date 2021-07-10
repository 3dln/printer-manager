import IProduct from './product';

export default interface ICart {
    id: string;
    product: IProduct;
    count: number;
}