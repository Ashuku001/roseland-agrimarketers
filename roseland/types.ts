export interface BillboardType {
    id: string,
    label: string,
    imageUrl:string,
}

export type Categories = Category[]

export interface Category {
    id: number,
    name: string,
    billboard: BillboardType
}

export interface Product {
    id: number;
    category: Category;
    name: string;
    price: number;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[],
    quantity: number
}
export interface CartItemType {
    id: number;
    category: Category;
    name: string;
    price: number;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[],
    quantity: number,
    totalPrice: number
}

export interface Image {
    id: number,
    url: string;
}

export interface Size {
    id: number;
    name:string;
    value: string;
}
export interface Color {
    id: number;
    name:string;
    value: string;
}


// Blog types

type Base = {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

export interface PostType extends Base {
    author: Author;
    body: Block[];
    categories: BlogCategory[];
    mainImage: BlogImage;
    slug: Slug;
    title: string;
    description: string;
}

interface Author extends Base {
    bio: Block[];
    image: BlogImage;
    name: string;
    slug: Slug;
}

interface BlogImage {
    _type: "image";
    asset: Reference
}

interface Reference {
    _ref: string;
    _type: "reference";
}

interface Slug {
    _type: "slug";
    current: string
}

interface Block {
    _key: string;
    _type: "block"
    children: Span[],
    markDefs: any[];
    style: "normal" | "h1" | "h3" | "h4" | "blockquote"
}

interface Span {
    _key: string;
    _type: "span";
    marks: string[];
    text: string[]
}

interface BlogCategory extends Base {
    description: string;
    title: string
}

interface mainImage {
    _type: "image";
    asset: "Reference"
}

interface Title {
    _type: string;
    current: string
}