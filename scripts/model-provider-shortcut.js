// 简化修复版本
document.addEventListener('keydown', function(event) {
    // 监听 Ctrl+N，添加模型服务
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'n') {
        event.preventDefault();

        const activeMenuItem = document.querySelector('ul[class^=SettingMenus-] li[class^="MenuItem-"].active');
        if (!activeMenuItem?.parentElement?.href?.endsWith('#/settings/provider')) {
            console.log('非模型服务页面，【Ctrl+N】快捷键未激活');
            return;
        };
        document.querySelector('[class^=SettingContent-] [class^=ProviderListContainer-] [class^=AddButtonWrapper-] > button')?.click();
        setTimeout(() => {
            document.querySelector('.ant-modal-body input[placeholder="例如 OpenAI"]')?.focus();
        });
    }
});
