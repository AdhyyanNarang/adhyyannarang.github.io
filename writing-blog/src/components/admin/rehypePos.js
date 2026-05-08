import { visit } from 'unist-util-visit';

// Surface mdast/hast source positions onto rendered DOM as data attrs,
// so click handlers can map back from rendered nodes to source offsets.
export default function rehypePos() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      const start = node.position?.start?.offset;
      const end = node.position?.end?.offset;
      if (start != null && end != null) {
        node.properties ||= {};
        node.properties.dataPosStart = String(start);
        node.properties.dataPosEnd = String(end);
      }
    });
  };
}
