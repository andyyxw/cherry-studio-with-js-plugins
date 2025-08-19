// 停止消息快捷键
document.addEventListener('keydown', function(event) {
    // 检测按下回车键
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
        // 获取输入框元素
        const inputbar = document.getElementById('inputbar');
        if (!inputbar) {
            return;
        }
        
        const textarea = inputbar.querySelector('textarea');
        
        // 检查焦点是否在输入框上
        if (textarea && document.activeElement === textarea) {
            // 查找带有 class="lucide lucide-circle-pause" 的 SVG 元素
            const pauseIcon = document.querySelector('svg.lucide.lucide-circle-pause');
            
            if (pauseIcon) {
                // 获取父级 button 元素
                const stopButton = pauseIcon.closest('button');
                
                if (stopButton) {
                    // 阻止默认的回车行为
                    event.preventDefault();
                    
                    // 模拟点击停止按钮
                    stopButton.click();
                    
                    console.log('检测到暂停图标，已点击停止按钮');
                }
            }
        }
    }
});
