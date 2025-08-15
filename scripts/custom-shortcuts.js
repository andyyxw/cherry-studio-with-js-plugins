// 自定义快捷键和实用工具
console.log('⌨️ 自定义快捷键脚本已加载');

// 添加快捷键监听
document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+C: 复制当前页面信息
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
        e.preventDefault();
        copyPageInfo();
    }
    
    // Ctrl+Shift+E: 导出页面数据
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyE') {
        e.preventDefault();
        exportPageData();
    }
    
    // Alt+Q: 快速搜索
    if (e.altKey && e.code === 'KeyQ') {
        e.preventDefault();
        quickSearch();
    }
    
    // F1: 显示所有快捷键帮助
    if (e.code === 'F1') {
        e.preventDefault();
        showShortcutHelp();
    }
    
    // Ctrl+Alt+T: 显示当前时间
    if (e.ctrlKey && e.altKey && e.code === 'KeyT') {
        e.preventDefault();
        const now = new Date().toLocaleString();
        if (typeof showToast === 'function') {
            showToast(`当前时间: ${now}`);
        }
        console.log(`⏰ 当前时间: ${now}`);
    }
    
    // Ctrl+Alt+U: 显示当前URL信息
    if (e.ctrlKey && e.altKey && e.code === 'KeyU') {
        e.preventDefault();
        const url = window.location.href;
        const title = document.title;
        if (typeof showToast === 'function') {
            showToast('URL信息已复制到控制台');
        }
        console.log(`🔗 当前页面: ${title}`);
        console.log(`🔗 URL: ${url}`);
    }
});

// 复制页面信息到剪贴板
function copyPageInfo() {
    const info = {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toLocaleString(),
        selectedText: window.getSelection().toString(),
        links: Array.from(document.querySelectorAll('a')).map(a => a.href).slice(0, 10)
    };
    
    const infoText = `页面标题: ${info.title}
URL: ${info.url}
时间: ${info.timestamp}
选中文本: ${info.selectedText}
前10个链接:
${info.links.join('\n')}`;
    
    try {
        navigator.clipboard.writeText(infoText).then(() => {
            if (typeof showToast === 'function') {
                showToast('页面信息已复制到剪贴板');
            }
            console.log('📋 页面信息已复制到剪贴板');
        }).catch(() => {
            console.log('📋 页面信息:', infoText);
            if (typeof showToast === 'function') {
                showToast('复制失败，信息已输出到控制台');
            }
        });
    } catch (error) {
        console.log('📋 页面信息:', infoText);
        if (typeof showToast === 'function') {
            showToast('复制失败，信息已输出到控制台');
        }
    }
}

// 导出页面数据
function exportPageData() {
    const data = {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        cookies: document.cookie,
        localStorage: {...localStorage},
        sessionStorage: {...sessionStorage},
        links: Array.from(document.querySelectorAll('a')).map(a => ({href: a.href, text: a.textContent.trim()})),
        images: Array.from(document.querySelectorAll('img')).map(img => img.src),
        forms: Array.from(document.querySelectorAll('form')).length,
        inputs: Array.from(document.querySelectorAll('input')).length
    };
    
    try {
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `page-data-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (typeof showToast === 'function') {
            showToast('页面数据已导出为JSON文件');
        }
        console.log('💾 页面数据已导出');
    } catch (error) {
        console.log('💾 导出失败:', error.message);
        console.log('💾 页面数据:', data);
        if (typeof showToast === 'function') {
            showToast('导出失败，数据已输出到控制台');
        }
    }
}

// 快速搜索页面内容
function quickSearch() {
    const query = prompt('请输入搜索内容:');
    if (!query) return;
    
    // 清除之前的高亮
    document.querySelectorAll('.quick-search-highlight').forEach(el => {
        el.classList.remove('quick-search-highlight');
        el.style.backgroundColor = '';
        el.style.outline = '';
    });
    
    // 添加高亮样式
    if (!document.getElementById('quick-search-style')) {
        const style = document.createElement('style');
        style.id = 'quick-search-style';
        style.innerHTML = '.quick-search-highlight { background-color: #ffff0080 !important; outline: 2px solid #ff0000 !important; }';
        document.head.appendChild(style);
    }
    
    const elements = document.querySelectorAll('*');
    let found = 0;
    
    elements.forEach(el => {
        if (el.children.length === 0 && el.textContent.toLowerCase().includes(query.toLowerCase())) {
            el.classList.add('quick-search-highlight');
            found++;
        }
    });
    
    if (found > 0) {
        if (typeof showToast === 'function') {
            showToast(`找到 ${found} 个匹配项`);
        }
        console.log(`🔍 搜索"${query}"找到 ${found} 个匹配项`);
        
        // 5秒后清除高亮
        setTimeout(() => {
            document.querySelectorAll('.quick-search-highlight').forEach(el => {
                el.classList.remove('quick-search-highlight');
            });
        }, 5000);
    } else {
        if (typeof showToast === 'function') {
            showToast('未找到匹配内容');
        }
        console.log(`🔍 搜索"${query}"未找到匹配内容`);
    }
}

// 显示快捷键帮助
function showShortcutHelp() {
    // 移除现有帮助窗口
    const existing = document.getElementById('shortcut-help-window');
    if (existing) {
        existing.remove();
        return;
    }
    
    const helpWindow = document.createElement('div');
    helpWindow.id = 'shortcut-help-window';
    helpWindow.innerHTML = `
        <div style="position: fixed; top: 50px; left: 50%; transform: translateX(-50%); 
                    background: white; border: 2px solid #ccc; border-radius: 8px; 
                    padding: 20px; z-index: 10000; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    max-width: 500px; font-family: Arial, sans-serif; max-height: 80vh; overflow-y: auto;">
            <h3 style="margin: 0 0 15px 0; color: #333;">🚀 脚本注入器快捷键</h3>
            <div style="font-size: 14px; line-height: 1.6;">
                <strong>基础功能:</strong><br>
                • F1: 显示/关闭此帮助<br>
                • Ctrl+Shift+I: 显示注入器状态<br>
                • Ctrl+Shift+R: 重新加载页面<br>
                • Ctrl+Alt+T: 显示当前时间<br>
                • Ctrl+Alt+U: 显示URL信息<br><br>
                
                <strong>聚焦功能:</strong><br>
                • Alt+F: 聚焦搜索框<br>
                • Ctrl+K: 聚焦第一个输入框<br><br>
                
                <strong>UI增强:</strong><br>
                • Ctrl+Shift+D: 切换暗黑模式<br>
                • Ctrl +/-/0: 页面缩放<br>
                • Alt+H: 元素高亮工具<br><br>
                
                <strong>实用工具:</strong><br>
                • Ctrl+Shift+C: 复制页面信息<br>
                • Ctrl+Shift+E: 导出页面数据<br>
                • Alt+Q: 快速搜索<br>
            </div>
            <button onclick="document.getElementById('shortcut-help-window').remove()" 
                    style="margin-top: 15px; padding: 8px 16px; background: #007cba; 
                           color: white; border: none; border-radius: 4px; cursor: pointer;">
                关闭 (或再按F1)
            </button>
        </div>
    `;
    
    document.body.appendChild(helpWindow);
    console.log('❓ 快捷键帮助窗口已显示');
    
    // 10秒后自动关闭
    setTimeout(() => {
        if (document.getElementById('shortcut-help-window')) {
            document.getElementById('shortcut-help-window').remove();
        }
    }, 10000);
}

console.log('✅ 自定义快捷键已加载:');
console.log('  - F1: 显示所有快捷键帮助');
console.log('  - Ctrl+Shift+C: 复制页面信息');
console.log('  - Ctrl+Shift+E: 导出页面数据');
console.log('  - Alt+Q: 快速搜索');
console.log('  - Ctrl+Alt+T: 显示时间');
console.log('  - Ctrl+Alt+U: 显示URL信息');