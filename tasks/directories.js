function insertSubtree(tree, subtree) {
    Object.keys(subtree).forEach((key) => {
        if (!tree[key]) {
            tree[key] = subtree[key];
        }

        if (typeof tree[key] === 'object') {
            insertSubtree(tree[key], subtree[key]);
        }
    });
}

function printSubtree(subtree, indent = 0) {
    Object.keys(subtree).forEach((key) => {
        console.log(`${new Array(indent).fill('-').join('')}${key}`);

        if (typeof subtree[key] === 'object') {
            printSubtree(subtree[key], indent + 2);
        }
    });
}

function printTree(paths) {
    const tree = {};

    for (let i = 0; i < paths.length; i++) {
        let subtree = {};
        const path = paths[i].split('/');

        for (let j = path.length - 1; j >= 0; j--) {
            if (j === path.length - 1) {
                subtree[path[j]] = path[j];
            } else {
                subtree = { [path[j]]: subtree };
            }
        }

        insertSubtree(tree, subtree);
    }

    printSubtree(tree);
}

// printTree([
//     'app/src/app/app.jsx',
//     'app/src/app/app.css',
//     'kokoko.tss',
//     'foo/bar/topor.good',
//     'app/src/components/slider/slider.css',
//     'app/src/components/slider/slider.tsx',
//     'app/src/components/button/button.css',
//     'app/src/components/button/button.tsx',
// ]);
