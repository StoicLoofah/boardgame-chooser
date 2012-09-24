function QsOnly(data, options){
	var defaults = {
		nodeBody: $('#q-body'),
		pathsElem: $('#q-paths'),
		historyElem: $('#q-history'),
	};
	
	var t = this;
	
    for(var attrname in defaults)
		t[attrname] = defaults[attrname];
    for(var attrname in options)
		t[attrname] = options[attrname];

	t.data = data;
	t.history = [];
	
	t.init = function() {		
		t.pathsElem.on('click', 'a', function(){
			var newNode = $(this).attr('href').substring(3);
			history.pushState($(this).attr('href').substring(3), '', $(this).attr('href'));
			t.setNode(newNode, $(this).text());
			return false;
		});
		
		$(window).bind('popstate', function(e){
			console.debug(event);
			console.debug("location: " + document.location + ", state: " + event.state);
			
			var state = event.state;			
			if(state != null) {
				t.history.pop();
				t.printFullHistory();
			} else {
				state = t.startNode || t.data.startNode;
				t.buildHistory(state);
			}
			t.curNode = undefined;
			t.setNode(state);
			return false;
		});
		
		t.historyElem.on('click', 'a', function(){
			var newNode = $(this).attr('href').substring(3);
			var index = t.history.indexOf(newNode);
			if(index != -1) {
				t.history.splice(index);
				t.printFullHistory();
			} else {
				t.buildHistory(newNode);
			}
			history.pushState(newNode, '', $(this).attr('href'));
			t.curNode = undefined;
			t.setNode(newNode);
			return false;
		});
	};
	
	t.buildHistory = function(curNode){
		t.history = [];
		while(curNode != t.data.startNode) {
			for(var node in t.data.nodes){
				var nodeData = t.data.nodes[node];
				for(var choice in nodeData.choices){
					if(nodeData.choices[choice]['target'] == curNode) {
						t.history.push([node, nodeData.choices[choice]['text']]);
						curNode = node; 
					}
				}
			}
		}
		t.history.reverse();
		t.printFullHistory();		
	}
	
	t.printFullHistory = function(){
		t.historyElem.empty();
		for(var i in t.history){
			t.addToHistoryElem(t.history[i][0], t.data.nodes[t.history[i][0]].body, t.history[i][1]);
		}
	}
	
	t.addToHistoryElem = function(node, nodeBody, choiceText){
		t.historyElem.prepend($('<a>', {
			href: '?s=' + node,
		}).text(nodeBody),
		'&nbsp;' + choiceText,
		'<br />'
		);
	}
	
	t.setNode = function(node, choiceText){
		if(typeof t.curNode != 'undefined'){
			t.history.push([t.curNode, choiceText]);
			t.addToHistoryElem(t.curNode, t.data.nodes[t.curNode].body, choiceText);
		}
		t.curNode = node;
		var nodeData = t.data.nodes[t.curNode];
		t.nodeBody.html(nodeData.body);
		t.pathsElem.empty();
		for(var i in nodeData.choices){
			t.pathsElem.append($('<a>', {
				href: '?s=' + nodeData.choices[i].target,
			}).text(nodeData.choices[i].text),
			'<br />'
			);
		}
	}
	
	t.init();
	
}