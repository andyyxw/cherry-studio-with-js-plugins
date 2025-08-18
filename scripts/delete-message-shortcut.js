// 删除消息快捷键
document.addEventListener('keydown', function(event) {
    // 监听 Ctrl+Shift+D
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd' && event.shiftKey && !event.altKey) {
        
        event.preventDefault();
        
        // 定位到所有 MessageFooter 元素
        const messageFooters = document.querySelectorAll('.MessageFooter');
        
        // 直接选择最后一个MessageFooter（真正的最后一条消息）
        let bottomMostFooter = null;
        
        if (messageFooters.length > 0) {
            bottomMostFooter = messageFooters[messageFooters.length - 1];
        }
        
        if (bottomMostFooter) {
            // 找到 menubar 元素
            const menubar = bottomMostFooter.querySelector('.menubar');
            
            // 找到带有 message-action-button 类的 div 元素
            const actionButtons = menubar.querySelectorAll('div.message-action-button');
            
            // 找到垃圾桶图标按钮
            let deleteButton = null;
            actionButtons.forEach((btn) => {
                const hasTrashIcon = btn.querySelector('svg.lucide-trash');
                if (hasTrashIcon) {
                    deleteButton = btn;
                }
            });
            
            if (deleteButton) {
                // 在点击前设置DOM观察器，这样弹窗一出现就能处理
                const observer = new MutationObserver((mutations) => {
                    const popover = document.querySelector('.ant-popover-content');
                    if (popover) {
                        // 找到弹窗后立即处理
                        observer.disconnect(); // 停止观察
                        
                        // 查找带有 ant-btn-primary 和 ant-btn-dangerous 类的确认按钮
                        const dangerousButtons = popover.querySelectorAll('.ant-btn-primary.ant-btn-dangerous');
                        if (dangerousButtons.length > 0) {
                            dangerousButtons[0].click();
                        }
                    }
                });
                
                // 观察整个文档的变化
                observer.observe(document.body, {
                    childList: true, // 监控子节点的添加或删除
                    subtree: true,   // 监控所有后代节点
                    attributes: false,
                    characterData: false
                });
                
                // 点击删除按钮
                deleteButton.click();
            }
        }
    }
});