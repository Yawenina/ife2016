		//cache dom
		let container = document.querySelector('.container'),
					bf = document.getElementById('bf'),
					df = document.getElementById('df'),
					bfs = document.getElementById('bfs'),
					dfs = document.getElementById('dfs'),
					searchInput = document.getElementById('searchText'),
					addInput = document.getElementById('addInput'),
					addBtn = document.getElementById('add'),
					removeBtn = document.getElementById('remove');

		//声明所需变量			
		let text = '', //搜索内容
			addText = '', //添加元素内容
			divList = [], //遍历元素
			target = null, //点击按钮
			selectedElem = null; //选择的元素

		//深度优先遍历
		function traverseDF(node){
			(function searchChildren(node){
				for(let i=0,len=node.children.length;i<len;i++){
					searchChildren(node.children[i])
				}
				divList.push(node)
			})(node)
		}

		//广度优先遍历
		function traverseBF(node){
			let list = []
			list.push(node)
			let currentDiv = list.shift()

			while(currentDiv){
				for(let i=0,len = currentDiv.children.length;i<len;i++){
				list.push(currentDiv.children[i])
				}
				divList.push(currentDiv)
				currentDiv = list.shift()
			}
		}

		//遍历搜索
		function search(){
			if(!text.trim()){
				alert('please enter a search number')
				return false;
			}
			//根据id选择遍历类型,'b'为广度搜索，'d'为深度搜索
			target.id.indexOf('b') == -1 ? traverseDF(container) : traverseBF(container)
			let i = divList.findIndex(function(elem){
				return elem.firstChild.nodeValue.trim() == text
			})
			if(i== -1){
				alert('Sorry , please enter a number between 1 to 15')
				input.value = ''
			}else{
				divList.length = i+1
				changeColor(lastDivColor)
			}
		}



		//遍历动画函数
		function changeColor(callback){
			let i=0
			divList[i].style.background = 'pink'
			let timer  = setInterval(function(){
				i++;
				if(i<divList.length){
					divList[i].style.background = 'pink'
					divList[i-1].style.background = '#fff'
				}else{
					clearInterval(timer)
					callback()
				}
			},500)
		}

		//遍历动画中setInterval执行到最后时的回调函数，根据遍历和搜索的不同设置最后一个遍历的div的颜色
		function lastDivColor(){
			lastDiv = divList[divList.length-1]
			//如果id里有's'则为搜索，否则为遍历
			target.id.indexOf('s') == -1 ? lastDiv.style.background = '#fff' : lastDiv.style
			background = 'pink'
		}

		//将所有元素的背景色设置为白色
		function reset(){
			if(divList.length>0){
				divList[divList.length-1].style.background = '#fff'
				divList = []
			}
			if(selectedElem){
				selectedElem.style.background = '#fff'
			}
		}

		//添加子节点
		function addElem(){
			//判断有无选中元素
			if(!selectedElem){
				alert('请选中元素！')
				return false
			}
			//判断是否写入元素内容
			if(!addText){
				alert('请写入要添加的元素的内容！')
				return false
			}
			//将新增子节点加入到选中元素中
			let div = document.createElement('div')
			div.innerHTML = addText
			selectedElem.appendChild(div)
		}

		//删除元素
		function removeElem(){
			//判断有无选中元素
			if(!selectedElem){
				alert('请选中元素！')
				return false
			}
			//删除子元素
			selectedElem.innerHTML = ''
			//删除本身
			selectedElem.parentNode.removeChild(selectedElem)
		}

		//监听事件
		window.onload = function(){
			df.onclick = function(e){
				reset()
				target = e.target
				traverseDF(container)
				changeColor(lastDivColor)
			}

			bf.onclick = function(e){
				reset()
				target = e.target
				traverseBF(container)
				changeColor(lastDivColor)
			}

			searchInput.onchange = function(){
				text = searchInput.value
			}

			dfs.onclick = function(e){
				reset()
				target = e.target
				search()
			}

			bfs.onclick = function(e){
				reset()
				target = e.target
				search()
			}

			container.onclick = function(e){
				reset()
				//保存当前点击元素并设置背景色
				selectedElem = e.target
				selectedElem.style.background = '#ccddee'
			}

			addInput.onchange = function(){
				addText = addInput.value
			}

			addBtn.onclick = addElem
			removeBtn.onclick = removeElem
		}