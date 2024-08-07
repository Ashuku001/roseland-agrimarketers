
import { type DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'

// Customise this function to show the correct URL based on the current document
function getPreviewUrl() {
  return `${ process.env.NEXT_PULIC_VERCEL_URL || "https://localhost:3000" }/api/preview`
}

// Import this into the deskTool() plugin
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: () => getPreviewUrl(),
          })
          .title('Preview'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}