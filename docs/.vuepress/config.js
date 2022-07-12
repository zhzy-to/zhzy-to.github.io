// 整站配置
module.exports = {
    lang: 'zh-CN',
    title: 'Zh\'s 小记',
    description: '',
    dest: "public",
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
            {
                "text": "TimeLine",
                "link": "/timeline/",
                "icon": "reco-date"
            },
            {
                "text": "Docs",
                "icon": "reco-message",
                "items": [
                    {
                        "text": "vuepress-reco",
                        "link": "/docs/theme-reco/"
                    }
                ]
            },
            {
                "text": "GitHub",
                "icon": "reco-message",
                "items": [
                    {
                        "text": "GitHub",
                        "link": "https://github.com/recoluan",
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
                "text": "Tag"
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
        [
            '@vuepress-reco/vuepress-plugin-kan-ban-niang',
            {
                theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
            }
        ],
        ['cursor-effects', {
            size: 2, // size of the particle, default: 2
            shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
            zIndex: 999999999, // z-index property of the canvas, default: 999999999
        }],
        ['dynamic-title', {
            showIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
            showText: '欢迎回来~',
            hideIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
            hideText: '客官不要走嘛~',
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
                        //url: 'https://m801.music.126.net/20220712151420/f024f9365172d19a72d1e2607bafa190/jdyyaac/5559/5352/065c/b36e12bd2bd8972ac05b16c556806a95.m4a',
                        //cover: 'https://p2.music.126.net/KRB5QvbzVvcsnvYVIuJVIw==/109951163292383888.jpg?param=130y130'
                    },
                    {
                        name: 'Fly',
                        artist: 'ANU',
                        url:'/bgm/Fly.m4a',
                        cover:'/bgm/Fly.jpg',
                        //url: 'https://m701.music.126.net/20220712152838/d09ab4797d4d36af6b00cb3bc09937a5/jdyyaac/0759/520e/0053/033f01e2ceedf53aa4c3799c520713ed.m4a',
                        //cover: 'https://p1.music.126.net/yp8qCRkDQj2NzQ68hzhEJA==/19145795974603349.jpg?param=130y130'
                    },
                    {
                        name: 'Hello World',
                        artist: 'Alan Walker / Torine',
                        url:'/bgm/Hello World.m4a',
                        cover:'/bgm/Hello World.jpg',
                        //url: 'https://m701.music.126.net/20220712153628/b12fd501aaaa693a7c671392413aeed5/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/12592097549/b722/4bc1/f19b/a44c8b75a1eb342024e81131db4354e4.m4a',
                        //cover: 'https://p1.music.126.net/yp8qCRkDQj2NzQ68hzhEJA==/19145795974603349.jpg?param=130y130'
                    },
                    {
                        name: '锡尼河畔',
                        artist: '阿斯罕 / 吴兰塔娜',
                        url:'/bgm/xinihepan.m4a',
                        cover:'/bgm/xinihepan.jpg',
                        //url: 'https://m10.music.126.net/20220712155009/d906958bd47124b0f3b224f071ae9dc7/yyaac/055c/535d/5358/267d71af71d70b054d4ad2e18f4e4101.m4a',
                        //cover: 'https://p2.music.126.net/-6OpZwJwUuW2FbFTQyuqaQ==/109951164399125591.jpg?param=130y130'
                    },
                    {
                        name: 'Here And Now',
                        artist: 'Paxel',
                        url:'/bgm/Here And Now.m4a',
                        cover:'/bgm/Here And Now.jpg',
                        //url: 'https://m10.music.126.net/20220712162532/773da050537aed4441a2979a9ba4749b/yyaac/obj/wonDkMOGw6XDiTHCmMOi/3943770218/61a8/f397/9fb7/b2ce4d276a5f28e6581e09abfad29eba.m4a',
                        //cover: 'https://p1.music.126.net/2RuDEzqA0_dFA6d0pS_nmQ==/109951163220268056.jpg?param=130y130'
                    },
                ] ,
                // 是否默认缩小
                autoShrink: true,
                // 缩小时缩为哪种模式
                shrinkMode: 'float',
                // 悬浮窗样式
                floatStyle:{ bottom: '10px', 'z-index': '999999' }
            }
        ]
    ],
}
