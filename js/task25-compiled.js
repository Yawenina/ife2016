'use strict';

var $ = function $(el) {
    return document.querySelector(el);
};
//缓存DOM
var container = $('.container');
var list = $('.list');

//折叠菜单
function toggleMenu(e) {
    var className = e.target.className;
    if (className.includes('open')) {
        className = className.replace(/open/, 'close');
    } else if (className.includes('close')) {
        className = className.replace(/close/, 'open');
    }
    e.target.className = className;
}

//添加节点
function addNode(e) {
    //缓存DOM
    var contentDiv = e.target.parentNode.parentNode;
    var nextElem = contentDiv.nextElementSibling;

    var text = prompt('请输入添加节点的内容!');
    if (text === null) {
        return false;
    }
    if (text == '') text = '未命名';
    //添加内容
    var strHTML = '<li><div class="content">\n                        ' + text + '\n                    <span class="add"><i class="fa fa-plus"></i></span>\n                    <span class="remove"><i class="fa fa-times"></i></span>\n                </div></li>';
    var template = document.createElement('template');
    template.innerHTML = strHTML;

    //1.若为root,则添加li;2.若后面有同辈元素且为UL,则在同辈元素中添加;3.若后面无同辈元素,则新增加同辈元素UL
    if (contentDiv.className.includes('root')) {
        contentDiv.parentNode.appendChild(template.content);
    } else if (nextElem && nextElem.nodeName == 'UL') {
        nextElem.appendChild(template.content);
    } else {
        strHTML = '<ul>' + strHTML + '</ul>';
        template.innerHTML = strHTML;
        contentDiv.parentNode.appendChild(template.content);
        contentDiv.className = 'open content';
    }
}

function removeNode(e) {
    var li = e.target.parentNode.parentNode.parentNode;
    var parent = li.parentNode;

    //如果是ul的最后一个Li,则给div.content取消文件夹icon
    if (parent.children.length == 1) {
        parent.parentNode.firstElementChild.className = 'content';
        parent.parentNode.removeChild(parent);
    } else {
        parent.removeChild(li);
        //如果只剩顶级目录,则取消顶级目录的文件夹icon
        if (list.children.length == 1) {
            list.firstElementChild.className = 'content';
        }
    }
}

function handler(e) {
    var className = e.target.className;
    if (className.includes('content')) {
        toggleMenu(e);
    } else if (className.includes('fa-plus')) {
        addNode(e);
    } else if (className.includes('fa-times')) {
        removeNode(e);
    }
}
container.addEventListener('click', handler);

//# sourceMappingURL=task25-compiled.js.map