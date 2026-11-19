const supportedTypes = new Set(['objectifs', 'vocabulaire', 'attention', 'exercice']);

function convertDirectives(node) {
  if (!node.children) {
    return;
  }

  for (const child of node.children) {
    convertDirectives(child);
  }

  node.children = node.children.flatMap((child) => {
    if (child.type !== 'containerDirective') {
      return [child];
    }

    if (!supportedTypes.has(child.name)) {
      return [child];
    }

    return [
      {
        type: 'mdxJsxFlowElement',
        name: 'Encadre',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'type',
            value: child.name,
          },
        ],
        children: child.children,
      },
    ];
  });
}

export default function remarkEncadre() {
  return (tree) => {
    convertDirectives(tree);
  };
}
