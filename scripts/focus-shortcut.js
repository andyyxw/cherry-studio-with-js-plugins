// 聚焦快捷键脚本
console.log('🔍 聚焦快捷键脚本已加载');

const originalTitle = document.title;
let blinkInterval = null;

function showNotification(message) {
    // 标题闪烁提醒
    document.title = `🔔 ${message}`;
    
    if (blinkInterval) {
        clearInterval(blinkInterval);
    }
    
    blinkInterval = setInterval(function() {
        document.title = document.title === originalTitle ? `🔔 ${message}` : originalTitle;
    }, 500);
    
    setTimeout(function() {
        if (blinkInterval) {
            clearInterval(blinkInterval);
            blinkInterval = null;
        }
        document.title = originalTitle;
    }, 3000);
    
    // 显示Toast提示
    if (typeof showToast === 'function') {
        showToast(message);
    }
    console.log(`📢 ${message}`);
}

// 添加聚焦快捷键
document.addEventListener('keydown', function(e) {
    // Alt+F: 聚焦搜索框
    if (e.altKey && e.code === 'KeyF') {
        e.preventDefault();
        
        const searchInput = document.querySelector('input[type="search"], input[type="text"], .search-input, [placeholder*="搜索"], [placeholder*="search"]');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
            showNotification('搜索框已聚焦');
        } else {
            showNotification('未找到搜索输入框');
        }
    }
    
    // Ctrl+K: 聚焦第一个输入框
    if (e.ctrlKey && e.code === 'KeyK') {
        e.preventDefault();
        const firstInput = document.querySelector('input, textarea');
        if (firstInput) {
            firstInput.focus();
            showNotification('第一个输入框已聚焦');
        } else {
            showNotification('页面中没有找到输入框');
        }
    }
});

console.log('✅ 聚焦快捷键已注册: Alt+F (搜索框), Ctrl+K (第一个输入框)');