/* ================================================================
   CHINA TRAVEL DASHBOARD
   TRAVEL DATA

   THIS FILE CONTAINS YOUR ACTUAL TRIP INFORMATION.

   app.js handles the application.
   This file handles the CONTENT.

   ================================================================ */
const TRAVEL_DATA = {
    /* ============================================================
       SHANGHAI
       ============================================================ */
    shanghai: {
        name: "Shanghai",
        chineseName: "上海",
        icon: "🏙️",
        locations: [
            /* ====================================================
               THE BUND
               ==================================================== */
            {
                id: "bund",
                name: "The Bund",
                chineseName: "外滩",
                description:
                    "Waterfront area with historic colonial buildings facing the modern Pudong skyline.",
                map:
                    "https://maps.app.goo.gl/Yq2Cb3DuV5WqNGQh7",
                photos: [
                    {
                        src:
                            "images/shanghai/bund/01.jpg",
                        alt:
                            "The Bund"
                    }
                    /*
                     * ADD MORE PHOTOS:
                     *
                     * {
                     *     src: "images/shanghai/bund/02.jpg",
                     *     alt: "Our photo at The Bund"
                     * }
                     */
                ],
                social: [
                    {
                        platform: "instagram",
                        url: "https://www.instagram.com/reel/DYAAjywxGhl/"
                    },
                    {
                        platform: "tiktok",
                        url: "https://www.tiktok.com/@riogarlio/video/7587262459061292295"
                    },
                    {
                        platform: "rednote",
                        url: "https://www.xiaohongshu.com/explore/6a6b355b0000000006006584",
                        thumbnail: ""
                    },
                    {
                        platform: "tiktok",
                        url: "https://www.tiktok.com/@myminthe/photo/7625613701541809428"
                    }
                ]
            },
            /* ====================================================
               YU GARDEN
               ==================================================== */
            {
                id: "yugarden",
                name: "Yu Garden",
                chineseName: "豫园",
                description:
                    "A beautiful classical Chinese garden featuring Ming dynasty pavilions, ponds, rockeries and bridges.",
                map:
                    "https://maps.app.goo.gl/CeS2x4Nv2aC2MFdq6",
                photos: [
                    {
                        src:
                            "images/shanghai/yugarden/01.jpg",
                        alt:
                            "Yu Garden"
                    }
                ],
                social: [
 
                ]
            },
            /* ====================================================
               THAMES TOWN
               ==================================================== */
            {
                id: "thames",
                name: "Thames Town",
                description:
                    "A quirky town modeled after a traditional English village with cobbled streets and Tudor-style architecture.",
                map:
                    "https://maps.app.goo.gl/NdVS9nWTgQiHEYqz5",
                photos: [
                    {
                        src:
                            "images/shanghai/thames/01.jpg",
                        alt:
                            "Thames Town"
                    }
                ],
                social: [
                   
                ]
            },
            /* ====================================================
               SHANGHAI ROMANCE PARK
               ==================================================== */
            {
                id: "romance",
                name: "Shanghai Romance Park",
                description:
                    "Traditional Shanghai-inspired streets, architecture and entertainment.",
                map:
                    "https://maps.app.goo.gl/35rdisBLyf6vWd1B8",
                photos: [
                    {
                        src:
                            "images/shanghai/romance/01.jpg",
                        alt:
                            "Shanghai Romance Park"
                    }
                ],
                social: [
                    
                ]
            },
            /* ====================================================
               TIAN'AN QIANSHU
               ==================================================== */
            {
                id: "trees",
                name: "Tian'An QianShu",
                description:
                    "The famous 1,000 Trees mixed-use development in Shanghai.",
                map:
                    "https://maps.app.goo.gl/LJbHDCnPkxBQ7MCB8",
                photos: [
                    {
                        src:
                            "images/shanghai/trees/01.jpg",
                        alt:
                            "Tian'An QianShu"
                    }
                ],
                social: [
                    
                ]
            },
            /* ====================================================
               QIBAO ANCIENT TOWN
               ==================================================== */
            {
                id: "qibao",
                name: "Qibao Ancient Town",
                chineseName: "七宝古镇",
                description:
                    "A historic Shanghai water town with a history spanning roughly one thousand years.",
                map:
                    "https://maps.app.goo.gl/eC6BATKBSC5T7q5XA",
                photos: [
                    {
                        src:
                            "images/shanghai/qibao/01.jpg",
                        alt:
                            "Qibao Ancient Town"
                    }
                ],
                social: [
                    {
                        platform: "instagram",
                        embed: null
                    },
                    {
                        platform: "tiktok",
                        embed: null
                    },
                    {
                        platform: "rednote",
                        url:
                            "https://www.xiaohongshu.com/",
                        thumbnail:
                            "images/shanghai/qibao/01.jpg"
                    },
                    {
                        platform: "tiktok",
                        embed: null
                    }
                ]
            }
        ]
    },
    /* ============================================================
       SUZHOU
       ============================================================ */
    suzhou: {
        name: "Suzhou",
        chineseName: "苏州",
        icon: "🏯",
        locations: [
            {
                id: "humble",
                name: "Humble Administrator's Garden",
                chineseName: "拙政园",
                description:
                    "A legendary UNESCO World Heritage site showcasing classic Chinese landscape art.",
                map:
                    "https://maps.app.goo.gl/UUuSxw6aVkRRdLAy9",
                photos: [
                    {
                        src:
                            "images/suzhou/humble/01.jpg",
                        alt:
                            "Humble Administrator's Garden"
                    }
                ],
                social: [
                    {
                        platform: "instagram",
                        embed: null
                    },
                    {
                        platform: "tiktok",
                        embed: null
                    },
                    {
                        platform: "rednote",
                        url:
                            "https://www.xiaohongshu.com/",

                        thumbnail:
                            "images/suzhou/humble/01.jpg"
                    },
                    {
                        platform: "tiktok",
                        embed: null
                    }
                ]
            }
        ]
    },
    /* ============================================================
       HANGZHOU
       ============================================================ */
    hangzhou: {
        name: "Hangzhou",
        chineseName: "杭州",
        icon: "🌊",
        locations: [
            {
                id: "westlake",
                name: "West Lake",
                chineseName: "西湖",
                description:
                    "A breathtaking freshwater lake featuring historic temples, pagodas and lush gardens.",
                map:
                    "https://maps.app.goo.gl/FkNn5Bj9WpPw2NuV7",
                photos: [
                    {
                        src:
                            "images/hangzhou/westlake/01.jpg",
                        alt:
                            "West Lake Hangzhou"
                    }
                ],
                social: [
                    {
                        platform: "instagram",
                        embed: null
                    },
                    {
                        platform: "tiktok",
                        embed: null
                    },
                    {
                        platform: "rednote",
                        url:
                            "https://www.xiaohongshu.com/",
                        thumbnail:
                            "images/hangzhou/westlake/01.jpg"
                    },
                    {
                        platform: "tiktok",
                        embed: null
                    }
                ]
            }
        ]
    }
};