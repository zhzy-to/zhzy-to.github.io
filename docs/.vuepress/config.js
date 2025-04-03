// 整站配置
module.exports = {
    lang: 'zh-CN',
    title: 'Zh\'s 小记',
    description: '',
    //base: '/',    // 部署的域名路径配置
    //dest: "./dist", // 打包后的输出目录 注意要与git action 自动部署文件的 build dir一致
    // head设置
    head: [
        [
            "link",
            {
                "rel": "icon",
                "href": "/favicon.ico"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ]
    ],
    // 主题配置
    theme: "reco",
    themeConfig: {
        "nav": [
            {
                "text": "首页",
                "link": "/",
                "icon": "reco-home"
            },
            // {
            //     "text": "TimeLine",
            //     "link": "/timeline/",
            //     "icon": "reco-date"
            // },

            // {
            //     "text": "文档",
            //     "icon": "reco-message",
            //     "items": [
            //         {
            //             "text": "vuepress-reco",
            //             "link": "/docs/theme-reco/"
            //         }
            //     ]
            // },

            {
                "text": "联系",
                "icon": "reco-message",
                "items": [
                    {
                        "text": "GitHub",
                        "link": "https://github.com/zhzy-to",
                        "icon": "reco-github"
                    }
                ]
            }
        ],
        "sidebar": {
            "/docs/go" : [
                ""
            ]
        },
        "type": "blog",
        "blogConfig": {
            "category": {
                "location": 2,
                "text": "分类"
            },
            "tag": {
                "location": 3,
                "text": "标签"
            }
        },
        "friendLink": [
            {
                "title": "vuepress-theme-reco",
                "desc": "A simple and beautiful vuepress Blog & Doc theme.",
                "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                "link": "https://vuepress-theme-reco.recoluan.com"
            }
        ],
        "logo": "/avatar.jpg",
        "search": true,
        "searchMaxSuggestions": 10,
        "lastUpdated": "Last Updated",
        "author": "zhzy-to",
        "authorAvatar": "/avatar.jpg",
        //"record": "xxxx",
        "startYear": "2017"
    },
    markdown: {
        "lineNumbers": true
    },
    // 插件
    plugins: [
        // 看板娘
        // [
        //     '@vuepress-reco/vuepress-plugin-kan-ban-niang',
        //     {
        //         theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
        //     }
        // ],
        ['cursor-effects', {
            size: 2, // size of the particle, default: 2
            shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
            zIndex: 999999999, // z-index property of the canvas, default: 999999999
        }],
        ['dynamic-title', {
            showIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
            showText: '欢迎回来',
            hideIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
            hideText: '欢迎再来',
            recoverTime: 2000,
        }],
        [
            '@vuepress-reco/vuepress-plugin-bgm-player',
            {
                audios: [
                    {
                        name: 'Nutag',
                        artist: 'H.Q / ZebraZebra',
                        url:'/bgm/Nutag.m4a',
                        cover:'/bgm/Nutag.jpg',
                    },
                    // {
                    //     name: 'Fly',
                    //     artist: 'ANU',
                    //     url:'/bgm/Fly.m4a',
                    //     cover:'/bgm/Fly.jpg',
                    // },
                    {
                        name: 'Hello World',
                        artist: 'Alan Walker / Torine',
                        url:'/bgm/Hello World.m4a',
                        cover:'/bgm/Hello World.jpg',
                    },
                    // {
                    //     name: '锡尼河畔',
                    //     artist: '阿斯罕 / 吴兰塔娜',
                    //     url:'/bgm/xinihepan.m4a',
                    //     cover:'/bgm/xinihepan.jpg',
                    // },
                    {
                        name: 'Here And Now',
                        artist: 'Paxel',
                        url:'/bgm/Here And Now.m4a',
                        cover:'/bgm/Here And Now.jpg',
                    },
                ] ,
                // 是否默认缩小
                autoShrink: true,
                // 缩小时缩为哪种模式
                shrinkMode: 'float',
                // 悬浮窗样式
                floatStyle:{ bottom: '10px', 'z-index': '999999' }
            }
        ],

    ],
}
