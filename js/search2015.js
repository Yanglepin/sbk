function SearchSubmit(field, e) {
	var keystr = field;
	if (keystr == '' || keystr == '请输入要搜索的关键字') {
		alert('请输入要搜索的关键字！');
		return false;
	}
	else if (keystr.length > 30) {
		alert('搜索的关键字不能大于30字符！');
		return false;
	}

	var str = document.location.hostname;
	var url = "";
	if (str == "app.jianke.com") {
	    url = 'http://msearch.jianke.com/appprod?wd=' + encodeURI(keystr.replace('<', '').replace('>', '')).toLowerCase() + '&lg=1'
	} else {
	    url = 'http://msearch.jianke.com/prod?wd=' + encodeURI(keystr.replace('<', '').replace('>', '')).toLowerCase() + '&lg=1';
	}
	window.location.href = url;
	if (window.event) {
		window.event.returnValue = false;
	}
	else e.preventDefault();
}
function checksearch(e) {
	field = document.getElementById('wd').value;
	var eve = e || window.event;

	
	
	if (field == '' && eve.keyCode == 13) {
		alert('请输入搜索内容！');
		return false;
	}
	else if (eve.keyCode == 13) {
		SearchSubmit(field);
		return false;
	}
}
function checkbottomsearch(e, field) {
	var eve = e || window.event;
	if (field == '' && eve.keyCode == 13) {
		alert('请输入搜索内容！');
		return false;
	}
	else if (eve.keyCode == 13) {
		SearchSubmit(field);
		return false;
	}
}
function getSearchTip() {
	$(function () {
		$('#wd').autocomplete('http://search.jianke.com/ajax/getSearchTip?r=' + Math.random(), {
			dataType: 'jsonp',
			max: 10,
			minChars: 1,
			width: 396,
			scrollHeight: 300,
			cacheLength: 0,
			selectFirst: 0,
			parse: function (data) {
				$('.search_pro ul').html('');
				return $.map(eval(data), function (row) {
					var strnickname = row.kindname.replace(/<\/?[^>]*>/g, '');
					strnickname = strnickname.replace(/&nbsp;/gi, '');
					if (strnickname.length > 16) {
						strnickname = strnickname.substr(0, 16) + "…";
					}
					$('.search_pro ul').append('<li><a href="javascript:void(0)">' + strnickname + '</a></li>');
					//return {
					//	data: row,
					//	value: strnickname,
					//	result: strnickname
					//}
				});
			}
		});
	});
}
$(document).ready(function () {
	getSearchTip();
	$('.search_pro li').live('click', function () {
	    var str = document.location.hostname;
	    var url = "";
	    if (str == "app.jianke.com") {
	        url = 'http://msearch.jianke.com/appprod?wd=' + encodeURI($(this).find('a').html().replace('<', '').replace('>', '')).toLowerCase() + '&lg=1'
	    } else {
	       url= 'http://msearch.jianke.com/prod?wd=' + encodeURI($(this).find('a').html().replace('<', '').replace('>', '')).toLowerCase() + '&lg=1'
	    }
	    location.href =url
	});
	
	$("#wd").bind('input propertychange',function () {
		field = document.getElementById('wd').value;

		if (field != "") {
			$(".del_btn").show();
			$('p.dele').show();
			$('a.dele').hide();
		} else {
			$(".del_btn").hide();
			$('p.dele').hide();
			$('a.dele').show();
		}
	});

	$(".d-search2 .del_btn").click(function () {
		$(this).hide();
		$(".bton-keyword").val("");
		$('p.dele').hide();
		$('a.dele').show();
		$("#wd").focus();
	});

});
