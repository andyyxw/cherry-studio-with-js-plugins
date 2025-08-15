// UI增强脚本
console.log('🎨 UI增强脚本已加载');

// 添加暗黑模式样式
const darkModeCSS = `
    .dark-mode {
        filter: invert(1) hue-rotate(180deg);
    }
    .dark-mode img, .dark-mode video, .dark-mode iframe {
        filter: invert(1) hue-rotate(180deg);
    }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = darkModeCSS;
document.head.appendChild(styleElement);

// 页面缩放控制
let currentZoom = 1;

// 添加快捷键监听
document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+D: 切换暗黑模式
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyD') {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        if (typeof showToast === 'function') {
            showToast(isDark ? '已开启暗黑模式' : '已关闭暗黑模式');
        }
        console.log(isDark ? '🌙 暗黑模式已开启' : '☀️ 暗黑模式已关闭');
    }
    
    // Ctrl + = : 页面放大
    if (e.ctrlKey && e.code === 'Equal') {
        e.preventDefault();
        currentZoom += 0.1;
        document.body.style.zoom = currentZoom;
        const percentage = Math.round(currentZoom * 100);
        if (typeof showToast === 'function') {
            showToast(`缩放: ${percentage}%`);
        }
        console.log(`🔍 页面缩放: ${percentage}%`);
    }
    
    // Ctrl + - : 页面缩小
    if (e.ctrlKey && e.code === 'Minus') {
        e.preventDefault();
        currentZoom = Math.max(0.5, currentZoom - 0.1);
        document.body.style.zoom = currentZoom;
        const percentage = Math.round(currentZoom * 100);
        if (typeof showToast === 'function') {
            showToast(`缩放: ${percentage}%`);
        }
        console.log(`🔍 页面缩放: ${percentage}%`);
    }
    
    // Ctrl + 0 : 重置缩放
    if (e.ctrlKey && e.code === 'Digit0') {
        e.preventDefault();
        currentZoom = 1;
        document.body.style.zoom = currentZoom;
        if (typeof showToast === 'function') {
            showToast('缩放已重置');
        }
        console.log('🔄 页面缩放已重置');
    }
    
    // Alt+H: 元素高亮工具
    if (e.altKey && e.code === 'KeyH') {
        e.preventDefault();
        document.body.style.cursor = 'crosshair';
        
        function highlightElement(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const element = event.target;
            element.style.outline = '3px solid #ff0000';
            element.style.backgroundColor = '#ffff0040';
            
            if (typeof showToast === 'function') {
                showToast('元素已高亮显示');
            }
            console.log('🎯 元素已高亮:', element);
            
            document.body.style.cursor = 'default';
            document.removeEventListener('click', highlightElement, true);
        }
        
        document.addEventListener('click', highlightElement, true);
        if (typeof showToast === 'function') {
            showToast('请点击要高亮的元素');
        }
        console.log('🎯 元素高亮模式已激活，请点击要高亮的元素');
    }
});

console.log('✅ UI增强功能已加载:');
console.log('  - Ctrl+Shift+D: 切换暗黑模式');
console.log('  - Ctrl +/-/0: 页面缩放');
console.log('  - Alt+H: 元素高亮工具');