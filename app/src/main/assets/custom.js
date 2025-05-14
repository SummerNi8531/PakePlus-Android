// 链接点击处理函数 - 防止新窗口打开，确保所有链接在当前窗口加载
const handleLinkClick = (event) => {
    const linkElement = event.target.closest('a');
    
    // 如果不是链接点击事件，直接返回
    if (!linkElement || !linkElement.href) return;
    
    // 跳过内部导航链接和特殊协议
    const isInternalLink = linkElement.href.startsWith('#');
    const isSpecialProtocol = ['javascript:', 'mailto:', 'tel:'].some(
        protocol => linkElement.href.startsWith(protocol)
    );
    
    if (isInternalLink || isSpecialProtocol) return;
    
    // 检查是否需要拦截新窗口打开行为
    const shouldOverride = 
        linkElement.target === '_blank' || 
        document.querySelector('base[target="_blank"]') !== null;
    
    if (shouldOverride) {
        event.preventDefault();
        console.debug('[PakePlus] 拦截新窗口链接:', linkElement.href);
        window.location.href = linkElement.href;
    }
};

// 注册点击事件监听 - 使用命名函数便于后续移除
document.addEventListener('click', handleLinkClick, { capture: true });

// 打印项目信息
console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
);

// 导出初始化函数供外部调用（如果需要）
export const initLinkInterceptor = () => {
    // 检查是否已存在监听器避免重复注册
    if (!window.__pakeLinkInterceptorInstalled) {
        document.addEventListener('click', handleLinkClick, { capture: true });
        window.__pakeLinkInterceptorInstalled = true;
        console.debug('[PakePlus] 链接拦截器已安装');
    }
};