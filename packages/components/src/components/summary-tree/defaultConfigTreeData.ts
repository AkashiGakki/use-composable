export const defaultTreeData: Record<string, any>[] = [
  {
    id: 2,
    name: '项目1',
    parentId: 1,
    fileCount: 14,
    children: [
      {
        id: 8,
        name: '文件夹',
        parentId: 2,
        fileCount: 12,
        children: [
          {
            id: 137,
            name: 'sdd',
            parentId: 8,
            fileCount: 0,
          },
        ],
      },
      {
        id: 221,
        name: 'chrome test',
        parentId: 2,
        fileCount: 2,
      },
    ],
  },
  {
    id: 52,
    name: '项目2',
    parentId: 1,
    fileCount: 10,
    children: [
      {
        id: 54,
        name: '文件夹2-1',
        parentId: 52,
        fileCount: 10,
        children: [
          {
            id: 55,
            name: '文件夹2-1-1',
            parentId: 54,
            fileCount: 0,
            children: [
              {
                id: 56,
                name: '文件夹2-1-1-1',
                parentId: 55,
                fileCount: 0,
                children: [
                  {
                    id: 57,
                    name: '文件夹2-1-1-1-1',
                    parentId: 56,
                    fileCount: 0,
                    children: [
                      {
                        id: 58,
                        name: '文件夹2-1-1-1-1-1',
                        parentId: 57,
                        fileCount: 0,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 53,
    name: '文件夹1',
    parentId: 1,
    fileCount: 12,
    children: [
      {
        id: 80,
        name: '文件夹',
        parentId: 53,
        fileCount: 11,
      },
      {
        id: 224,
        name: '文件夹2',
        parentId: 53,
        fileCount: 0,
      },
    ],
  },
  {
    id: 69,
    name: '项目3',
    parentId: 1,
    fileCount: 55,
    children: [
      {
        id: 70,
        name: '文件夹1',
        parentId: 69,
        fileCount: 12,
        children: [
          {
            id: 4,
            name: '1',
            parentId: 70,
            fileCount: 3,
            children: [
              {
                id: 51,
                name: '文件夹2',
                parentId: 4,
                fileCount: 1,
              },
            ],
          },
        ],
      },
      {
        id: 91,
        name: '文件夹',
        parentId: 69,
        fileCount: 10,
      },
      {
        id: 102,
        name: '文件夹',
        parentId: 69,
        fileCount: 10,
      },
      {
        id: 113,
        name: '文件夹',
        parentId: 69,
        fileCount: 10,
      },
      {
        id: 121,
        name: '文件夹的副本',
        parentId: 69,
        fileCount: 10,
      },
      {
        id: 136,
        name: '点点点',
        parentId: 69,
        fileCount: 0,
      },
      {
        id: 140,
        name: 'hewei',
        parentId: 69,
        fileCount: 3,
        children: [
          {
            id: 142,
            name: 'hewei02',
            parentId: 140,
            fileCount: 1,
          },
        ],
      },
    ],
  },
]
