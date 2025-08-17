// 简化修复版本
document.addEventListener('keydown', function(event) {
    // 只监听 Ctrl+I，排除 Ctrl+Shift+I
    if ((event.ctrlKey || event.metaKey) && 
        event.key.toLowerCase() === 'i' && 
        !event.shiftKey && 
        !event.altKey) {
        
        event.preventDefault();
        
        const inputbar = document.getElementById('inputbar');
        if (!inputbar) {
            console.log('非聊天页面，焦点快捷键未激活');
            return;
        }
        
        const input = inputbar.querySelector('textarea');
        
        if (input) {
            input.focus();
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
