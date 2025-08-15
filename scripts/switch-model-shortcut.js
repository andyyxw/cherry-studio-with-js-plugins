// 模型切换快捷键
document.addEventListener('keydown', function(event) {
    // 监听 Ctrl+Shift+M
    if ((event.ctrlKey || event.metaKey) && 
        event.key.toLowerCase() === 'm' && 
        event.shiftKey && 
        !event.altKey) {
        
        event.preventDefault();
        
        // 查找 home-navbar div
        const homeNavbar = document.querySelector('.home-navbar');
        
        if (homeNavbar) {
            // 在 home-navbar 中查找 home-navbar-right
            const homeNavbarRight = homeNavbar.querySelector('.home-navbar-right');
            
            if (homeNavbarRight) {
                // 获取第一个按钮
                const targetButton = homeNavbarRight.querySelector('button');
                
                if (targetButton) {
                    // 模拟点击按钮
                    targetButton.click();
                }
            }
        }
    }
});
