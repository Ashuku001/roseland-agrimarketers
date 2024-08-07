import { client } from "./sanity.client";
import ImageUrlBuilder  from "@sanity/image-url";

// a preconfigured url-builder
const builder = ImageUrlBuilder(client)

function urlFor(source: any) {
    return builder.image(source)
}

export default urlFor