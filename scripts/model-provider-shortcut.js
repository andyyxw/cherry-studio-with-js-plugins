// 模型服务页 快捷键
document.addEventListener('keydown', function(event) {
    // 监听 Ctrl+N，添加模型服务
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'n') {
        event.preventDefault();

        if (!document.querySelector('a[class^=MenuItemLink-]:has(> li[class^="MenuItem-"].active)')?.href?.endsWith('#/settings/provider')) {
            console.log('非模型服务页面，【Ctrl+N】快捷键未激活');
            return;
        };
        document.querySelector('[class^=SettingContent-] [class^=ProviderListContainer-] [class^=AddButtonWrapper-]:last-of-type > button')?.click();
        setTimeout(() => {
            document.querySelector('.ant-modal-body form .ant-form-item:has(label[title="提供商名称"]) input')?.focus();
        });
    }

    // 监听 Ctrl+F，搜索服务
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
        event.preventDefault();

        if (!document.querySelector('a[class^=MenuItemLink-]:has(> li[class^="MenuItem-"].active)')?.href?.endsWith('#/settings/provider')) {
            console.log('非模型服务页面，【Ctrl+F】快捷键未激活');
            return;
        };
        document.querySelector('[class^=SettingContent-] [class^=ProviderListContainer-] [class^=AddButtonWrapper-]:first-of-type input')?.focus();
    }
});
