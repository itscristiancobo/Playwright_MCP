export class NavigateMenu{

    private menuItems: Record<string, string> = {
        'who we are': 'button[href="/who-we-are"]',
        'what we do': 'button[href="/what-we-do"]',
        'industries and functions': 'button span:has-text("Industries and Functions")',
        'insights': 'button[href="/insights"]',
        'careers': 'a[href="/careers"][aria-expanded]',
        'contact': 'a[href="/contact"][aria-expanded]',
    };

    private footerItems: Record<string, string> = {
        'who we are': 'ul li a[href="/who-we-are"]',
        'what we do': 'ul li a[href="/what-we-do"]',
        'insights': 'ul li a[href="/insights"]',
        'blogs': 'ul li a[href="https://blogs.perficient.com"]',
    };
        
    private pageList: Record<string, string> = {
        'who we are':'https://www.perficient.com/who-we-are',
        'what we do':'https://www.perficient.com/what-we-do',
        'insights':'https://www.perficient.com/insights',
        'partners':'https://www.perficient.com/who-we-are/partners',
        'leadership':'https://www.perficient.com/who-we-are/leadership',
        'strategy and transformation':'https://www.perficient.com/what-we-do/strategy-and-transformation',
        'commerce':'https://www.perficient.com/functions/commerce',
        'automotive':'https://www.perficient.com/industries/automotive',
        'blogs':'https://blogs.perficient.com/',
    }

    private subMenusItems: Record<string, Record<string, string>> = {
        'who we are': { 
            'who we are': 'div.sub-navigation-list a[href="/who-we-are"]', 
            'partners': 'div.sub-navigation-list a[href="/who-we-are/partners"]', 
            'leadership': 'div.sub-navigation-list a[href="/who-we-are/leadership"]', 
            'culture': 'div.sub-navigation-list a[href="/who-we-are/culture"]', 
            'community': 'div.sub-navigation-list a[href="/who-we-are/community"]', 
            'awards': 'div.sub-navigation-list a[href="/who-we-are/awards]', 
            'news room': 'div.sub-navigation-list a[href="/brand-ambassadros"]', 
            'brand ambassadros': 'div.sub-navigation-list a[href="/news-room"]', 
        },
        'what we do': { 
            'what we do': 'div.sub-navigation-list a[href="/what-we-do"]',
            'strategy and transformation': 'div.sub-navigation-list a[href="/what-we-do/strategy-and-transformation"]' 
        },
        'industries and functions': {
            'functions': 'div.sub-navigation-text a[href="/functions"]',
            'commerce': 'div.sub-navigation-list a[href="/functions/commerce"]',
            'industries': 'div.sub-navigation-text a[href="/industries"]',
            'automotive': 'div.sub-navigation-list a[href="/industries/automotive"]'
        },
        'insights': { 
            'insights': 'div.sub-navigation-list a[href="/insights"]',
            'blogs': 'div.sub-navigation-list a[href="/insights/blogs"]',
         },
    };

    getMenuItem(menu: string): string {
        return this.menuItems[menu.toLowerCase()] ?? undefined;
    }

    getPageUrl(pageName: string):string|undefined{
        return this.pageList[pageName.toLowerCase()] ?? undefined;
    }

    getFirstSubMenuItem(menu: string): string | undefined {
        const submenu = this.subMenusItems[menu.toLowerCase()];
        return submenu ? Object.values(submenu)[0] : undefined;
    }

    getSubMenuItem(menu: string,option: string): string | undefined{
        return this.subMenusItems[menu.toLowerCase()][option.toLowerCase()] ?? undefined;
    }

    getFooterItem(option:string):string | undefined{
        return this.footerItems[option.toLowerCase()] ?? undefined;
    }

}