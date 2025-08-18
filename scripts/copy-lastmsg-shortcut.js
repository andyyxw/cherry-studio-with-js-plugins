// 复制消息快捷键
document.addEventListener('keydown', function(event) {
    // 监听 Ctrl+Shift+C
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c' && event.shiftKey && !event.altKey) {
        
        event.preventDefault();
        
        // 查找所有 MessageFooter 元素
        const messageFooters = document.querySelectorAll('.MessageFooter');
        
        if (messageFooters.length > 0) {
            const messages = [];
            
            // 收集所有 footer 的位置信息
            messageFooters.forEach(footer => {
                const rect = footer.getBoundingClientRect();
                messages.push({
                    element: footer,
                    top: rect.top
                });
            });
            
            // 如果没有找到任何消息，则直接退出
            if (messages.length === 0) {
                return;
            }
            
            // 按 top 属性排序，找到视觉上最靠下的消息
            messages.sort((a, b) => a.top - b.top);
            
            const bottomMostFooter = messages[messages.length - 1].element;

            if (bottomMostFooter) {
                // 找到 menubar 元素
                const menubar = bottomMostFooter.querySelector('.menubar');
                
                if (menubar) {
                    // 找到带有 message-action-button 类的 div 元素
                    const actionButtons = menubar.querySelectorAll('div.message-action-button');
                    
                    // 找到复制图标按钮
                    let copyButton = null;
                    actionButtons.forEach((btn) => {
                        const hasCopyIcon = btn.querySelector('svg.lucide-copy');
                        if (hasCopyIcon) {
                            copyButton = btn;
                        }
                    });
                    
                    if (copyButton) copyButton.click();
                }
            }
        }
    }
});