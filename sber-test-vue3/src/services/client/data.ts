import {CategoryMenuItem, SubCategoryMenuItem, TreeList, Tree} from '../types'
import * as utils from '../utils'

const checkSubCategoryMenuItemList = (items: SubCategoryMenuItem [], search: string): boolean => 
    items.filter(sub => utils.findSubString(sub.title, search) || utils.findStringInLookupModelItemList(sub.items, search)).length > 0

export const filterCategoryItems = (item: CategoryMenuItem, search: string) => utils.findSubString(item.title, search) || checkSubCategoryMenuItemList(item.items, search)

export const filterTree = (item: Tree, search: string): boolean => utils.findSubString(item.title, search) || utils.findStringInLookupModelItemList(item.items, search)

export const categoryList: CategoryMenuItem [] = [
    {
        recordId: 1,
        title: 'Level 1: Main Category 1',
        items: [
            {
                recordId: 1,
                title: 'Level 2: Subcategory 1',
                items: [
                    {
                        recordId: 1,
                        title: 'Menu Item 1'
                    },
                    {
                        recordId: 2,
                        title: 'Menu Item 2'
                    },
                    {
                        recordId: 3,
                        title: 'Menu Item 3'
                    }
                ]
            },
            {
                recordId: 2,
                title: 'Level 2: Subcategory 2',
                items: [
                    {
                        recordId: 4,
                        title: 'Menu Item 4'
                    },
                    {
                        recordId: 5,
                        title: 'Menu Item 5'
                    },
                    {
                        recordId: 6,
                        title: 'Menu Item 6'
                    }
                ]
            }
        ]
    },
    {
        recordId: 2,
        title: 'Level 1: Main Category 2',
        items: [
            {
                recordId: 3,
                title: 'Level 2: Subcategory 3',
                items: [
                    {
                        recordId: 7,
                        title: 'Menu Item 7'
                    },
                    {
                        recordId: 8,
                        title: 'Menu Item 8'
                    }
                ]
            },
            {
                recordId: 4,
                title: 'Level 2: Subcategory 1',
                items: [
                    {
                        recordId: 9,
                        title: 'Menu Item 9'
                    }
                ]
            },
            {
                recordId: 5,
                title: 'Level 2: Subcategory 5',
                items: [
                    {
                        recordId: 10,
                        title: 'Menu Item 10'
                    },
                    {
                        recordId: 11,
                        title: 'Menu Item 11'
                    }
                ]
            }
        ]
    },
    {
        recordId: 3,
        title: 'Level 1: Main Category 3',
        items: [
            {
                recordId: 6,
                title: 'Level 2: Subcategory 6',
                items: [
                    {
                        recordId: 12,
                        title: 'Menu Item 12'
                    },
                    {
                        recordId: 13,
                        title: 'Menu Item 13'
                    },
                    {
                        recordId: 14,
                        title: 'Menu Item 14'
                    },
                    {
                        recordId: 15,
                        title: 'Menu Item 15'
                    }
                ]
            }
        ]
    },
    {
        recordId: 4,
        title: 'Level 1: Main Category 4',
        items: [
            {
                recordId: 7,
                title: 'Level 2: Subcategory 7',
                items: [
                    {
                        recordId: 16,
                        title: 'Menu Item 16'
                    }
                ]
            },
            {
                recordId: 8,
                title: 'Level 2: Subcategory 8',
                items: [
                    {
                        recordId: 17,
                        title: 'Menu Item 17'
                    },
                    {
                        recordId: 18,
                        title: 'Menu Item 18'
                    }
                ]
            }
        ]
    }
]

export const treesData: TreeList [] = [
    {
        recordId: 1,
        title: 'Title for Tree List 1',
        items: [
            {
                recordId: 1,
                status: "active",
                title: 'Title for Tree Data 1',
                items: [
                    {
                        recordId: 1,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 2,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 3,
                        title: "item data",
                        value: 40
                    },
                    {
                        recordId: 4,
                        title: "item data",
                        value: 20
                    },
                    {
                        recordId: 5,
                        title: "item data",
                        value: 60
                    }
                ]
            },
            {
                recordId: 2,
                status: "edit",
                title: 'Title for Tree Data 2',
                items: [
                    {
                        recordId: 6,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 7,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 8,
                        title: "item data",
                        value: 40
                    },
                    {
                        recordId: 9,
                        title: "item data",
                        value: 20
                    },
                    {
                        recordId: 10,
                        title: "item data",
                        value: 60
                    }
                ]
            },
            {
                recordId: 3,
                status: "active",
                title: 'Title for Tree Data 3',
                items: [
                    {
                        recordId: 12,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 13,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 14,
                        title: "item data",
                        value: 40
                    },
                    {
                        recordId: 15,
                        title: "item data",
                        value: 20
                    },
                    {
                        recordId: 16,
                        title: "item data",
                        value: 60
                    }
                ]
            }
        ]
    },
    {
        recordId: 2,
        title: 'Title for Tree List 2',
        items: [
            {
                recordId: 4,
                status: "active",
                title: 'Title for Tree Data 4',
                items: [
                    {
                        recordId: 17,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 18,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 19,
                        title: "item data",
                        value: 40
                    },
                    {
                        recordId: 20,
                        title: "item data",
                        value: 20
                    },
                    {
                        recordId: 1,
                        title: "item data",
                        value: 60
                    }
                ]
            },
            {
                recordId: 5,
                status: "onApproval",
                title: 'Title for Tree Data 5',
                items: [
                    {
                        recordId: 21,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 22,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 23,
                        title: "item data",
                        value: 40
                    },
                    {
                        recordId: 24,
                        title: "item data",
                        value: 20
                    },
                    {
                        recordId: 25,
                        title: "item data",
                        value: 60
                    }
                ]
            }
        ]
    },
    {
        recordId: 3,
        title: 'Title for Tree List 3',
        items: [
            {
                recordId: 6,
                status: "active",
                title: 'Title for Tree Data 6',
                items: [
                    {
                        recordId: 26,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 27,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 28,
                        title: "item data",
                        value: 40
                    },
                    {
                        recordId: 29,
                        title: "item data",
                        value: 20
                    },
                    {
                        recordId: 30,
                        title: "item data",
                        value: 60
                    }
                ]
            },
            {
                recordId: 7,
                status: "active",
                title: 'Title for Tree Data 7',
                items: [
                    {
                        recordId: 31,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 32,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 33,
                        title: "item data",
                        value: 40
                    }
                ]
            }
        ]
    },
    {
        recordId: 4,
        title: 'Title for Tree List 4',
        items: [
            {
                recordId: 8,
                status: "active",
                title: 'Title for Tree Data 8',
                items: [
                    {
                        recordId: 34,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 35,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 36,
                        title: "item data",
                        value: 40
                    },
                    {
                        recordId: 37,
                        title: "item data",
                        value: 20
                    },
                    {
                        recordId: 38,
                        title: "item data",
                        value: 60
                    }
                ]
            },
            {
                recordId: 9,
                status: "decline",
                title: 'Title for Tree Data 9',
                items: [
                    {
                        recordId: 39,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 40,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 41,
                        title: "item data",
                        value: 40
                    }
                ]
            }
        ]
    },
    {
        recordId: 5,
        title: 'Title for Tree List 5',
        items: [
            {
                recordId: 10,
                status: "active",
                title: 'Title for Tree Data 10',
                items: [
                    {
                        recordId: 42,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 43,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 1,
                        title: "item data",
                        value: 40
                    },
                    {
                        recordId: 44,
                        title: "item data",
                        value: 20
                    },
                    {
                        recordId: 45,
                        title: "item data",
                        value: 60
                    }
                ]
            },
            {
                recordId: 11,
                status: "edit",
                title: 'Title for Tree Data 11',
                items: [
                    {
                        recordId: 46,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 47,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },{
        recordId: 6,
        title: 'Title for Tree List 6',
        items: [
            {
                recordId: 12,
                status: "onApproval",
                title: 'Title for Tree Data 12',
                items: [
                    {
                        recordId: 48,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 49,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 50,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 51,
                        title: "item data",
                        value: 30
                    }
                ]
            },
            {
                recordId: 13,
                status: "active",
                title: 'Title for Tree Data 13',
                items: [
                    {
                        recordId: 52,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 53,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 7,
        title: 'Title for Tree List 7',
        items: [
            {
                recordId: 14,
                status: "decline",
                title: 'Title for Tree Data 14',
                items: [
                    {
                        recordId: 54,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 55,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 56,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 57,
                        title: "item data",
                        value: 30
                    }
                ]
            },
            {
                recordId: 15,
                status: "edit",
                title: 'Title for Tree Data 15',
                items: [
                    {
                        recordId: 58,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 59,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 8,
        title: 'Title for Tree List 8',
        items: [
            {
                recordId: 16,
                status: "active",
                title: 'Title for Tree Data 16',
                items: [
                    {
                        recordId: 60,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 61,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 62,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 63,
                        title: "item data",
                        value: 30
                    }
                ]
            },
            {
                recordId: 17,
                status: "active",
                title: 'Title for Tree Data 17',
                items: [
                    {
                        recordId: 64,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 65,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 9,
        title: 'Title for Tree List 9',
        items: [
            {
                recordId: 18,
                status: "active",
                title: 'Title for Tree Data 18',
                items: [
                    {
                        recordId: 66,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 67,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 68,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 69,
                        title: "item data",
                        value: 30
                    }
                ]
            },
            {
                recordId: 19,
                status: "onApproval",
                title: 'Title for Tree Data 19',
                items: [
                    {
                        recordId: 70,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 71,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 10,
        title: 'Title for Tree List 10',
        items: [
            {
                recordId: 20,
                status: "active",
                title: 'Title for Tree Data 20',
                items: [
                    {
                        recordId: 72,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 73,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 11,
        title: 'Title for Tree List 11',
        items: [
            {
                recordId: 21,
                status: "active",
                title: 'Title for Tree Data 21',
                items: [
                    {
                        recordId: 74,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 75,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 12,
        title: 'Title for Tree List 12',
        items: [
            {
                recordId: 22,
                status: "active",
                title: 'Title for Tree Data 22',
                items: [
                    {
                        recordId: 76,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 77,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 13,
        title: 'Title for Tree List 13',
        items: [
            {
                recordId: 23,
                status: "active",
                title: 'Title for Tree Data 23',
                items: [
                    {
                        recordId: 78,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 79,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 80,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 81,
                        title: "item data",
                        value: 30
                    }
                ]
            },
            {
                recordId: 24,
                status: "edit",
                title: 'Title for Tree Data 24',
                items: [
                    {
                        recordId: 81,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 82,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 14,
        title: 'Title for Tree List 14',
        items: [
            {
                recordId: 25,
                status: "active",
                title: 'Title for Tree Data 25',
                items: [
                    {
                        recordId: 83,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 84,
                        title: "item data",
                        value: 30
                    }
                ]
            },
            {
                recordId: 26,
                status: "active",
                title: 'Title for Tree Data 26',
                items: [
                    {
                        recordId: 85,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 86,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 15,
        title: 'Title for Tree List 15',
        items: [
            {
                recordId: 27,
                status: "active",
                title: 'Title for Tree Data 27',
                items: [
                    {
                        recordId: 87,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 88,
                        title: "item data",
                        value: 30
                    },
                    {
                        recordId: 89,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 90,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 16,
        title: 'Title for Tree List 16',
        items: [
            {
                recordId: 28,
                status: "onApproval",
                title: 'Title for Tree Data 28',
                items: [
                    {
                        recordId: 91,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 92,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 17,
        title: 'Title for Tree List 17',
        items: [
            {
                recordId: 29,
                status: "active",
                title: 'Title for Tree Data 29',
                items: [
                    {
                        recordId: 93,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 94,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    },
    {
        recordId: 18,
        title: 'Title for Tree List 18',
        items: [
            {
                recordId: 30,
                status: "active",
                title: 'Title for Tree Data 30',
                items: [
                    {
                        recordId: 95,
                        title: "item data",
                        value: 10
                    },
                    {
                        recordId: 96,
                        title: "item data",
                        value: 30
                    }
                ]
            }
        ]
    }
]