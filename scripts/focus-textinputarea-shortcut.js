// 简化修复版本
document.addEventListener('keydown', function(event) {
    // 只监听 Ctrl+I，排除 Ctrl+Shift+I
    if ((event.ctrlKey || event.metaKey) && 
        event.key.toLowerCase() === 'i' && 
        !event.shiftKey && 
        !event.altKey) {
        
        event.preventDefault();
        
        const input = document.querySelector('[placeholder="在这里输入消息，按 Enter 发送..."]');
        
        if (input) {
            input.focus();
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
