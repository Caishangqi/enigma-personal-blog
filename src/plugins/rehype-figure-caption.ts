/**
 * Rehype plugin to convert image + italic caption to figure/figcaption
 *
 * Converts HTML like:
 *   <p><img ...><em>Caption</em></p>
 *
 * To:
 *   <figure>
 *     <img ...>
 *     <figcaption>Caption</figcaption>
 *   </figure>
 *
 * Matching Origin Realms blog post style exactly
 *
 * This is a rehype plugin (works on HTML AST) because Astro's image
 * optimization runs after remark plugins, so we need to process
 * the final HTML structure.
 */

import { visit } from 'unist-util-visit';
import type { Root, Element, Text } from 'hast';

export default function rehypeFigureCaption() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index: number | undefined, parent: Element | Root | undefined) => {
      if (index === undefined || parent === undefined) return;

      // Look for <p> elements
      if (node.tagName !== 'p') return;

      const children = node.children.filter(
        (child) => !(child.type === 'text' && /^\s*$/.test((child as Text).value))
      );

      // Check if paragraph contains: img (possibly with text nodes) followed by em
      // Pattern: [img, ...text nodes..., em]
      if (children.length < 2) return;

      const firstChild = children[0];
      const lastChild = children[children.length - 1];

      // First child must be an img element
      const isFirstImg = firstChild.type === 'element' && (firstChild as Element).tagName === 'img';
      // Last child must be an em element
      const isLastEm = lastChild.type === 'element' && (lastChild as Element).tagName === 'em';

      if (!isFirstImg || !isLastEm) return;

      const imgElement = firstChild as Element;
      const emElement = lastChild as Element;

      // Get caption text from em
      const captionText = emElement.children
        .filter((child): child is Text => child.type === 'text')
        .map((child) => child.value)
        .join('');

      if (!captionText) return;

      // Create figure element
      const figureElement: Element = {
        type: 'element',
        tagName: 'figure',
        properties: {},
        children: [
          { type: 'text', value: '\n  ' },
          imgElement,
          { type: 'text', value: '\n  ' },
          {
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [{ type: 'text', value: captionText }],
          },
          { type: 'text', value: '\n' },
        ],
      };

      // Replace the paragraph with the figure
      (parent.children as Element[])[index] = figureElement;
    });
  };
}
