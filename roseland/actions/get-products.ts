import {  Product } from "@/types"
import qs from 'query-string'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`
interface PromiseProps {
    products: Product[]
}

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<PromiseProps> => {

    const url = qs.stringifyUrl({
        url: URL,
        query: {
            categoryId: query.categoryId,
            isFeatured: query.isFeatured
        }
    })

    const res = await fetch(url)

    return res.json()
}

export default getProducts