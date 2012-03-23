/*
 * JQuery UI Split button Extended v0.2
 * https://github.com/Sergik666/JQuery-UI-SplitButtonEx
 *
 * Copyright 2012, Sergey Vasylchenko
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: March 23 00:53:29 2012 +0200
 */

(function ($, window, document, undefined) {

	var SplitButtonEx = {
		init: function (options) {
			var self = this;

			self.options = $.extend({}, $.fn.splitButtonEx.options, options);

			this.createSplitButton();

			this.createMenu();

			this.initButton();
			this.subscribeMenuEvenets();
		},
		createSplitButton: function () {
			var self = this;
			var $button = self.options.button;

			var buttonSetStyle = '';
			if (self.options.buttonSetStyle)
				buttonSetStyle = 'style = "' + self.options.splitButtonExStyle + '"';

			$button.wrap("<div " + buttonSetStyle + "></div>");
			$button.after('<button id="select">Select button</button>');

			var $buttonsContainer = $button.parent();

			var splitButtonExStyle = '';
			if (self.options.splitButtonExStyle)
				splitButtonExStyle = 'style = "' + self.options.splitButtonExStyle + '"';

			$buttonsContainer.wrap("<div " + splitButtonExStyle + "></div>");
		},
		createMenu: function () {
			var self = this;
			var $button = self.options.button;

			var $buttonsContainer = $button.parent();

			var listClass = '';
			if (self.options.listClass)
				listClass = 'class="' + self.options.listClass + '"';

			$buttonsContainer.after('<ul ' + listClass + '></ul>');

			var $menuList = $buttonsContainer.next();

			var menuButtons = self.options.menuButtons;

			for (var index in menuButtons) {

				if (!menuButtons[index])
					continue;

				if (menuButtons[index].caption === '-') {
					$menuList.append('<li><hr style="height: 6px; clear: both; border-bottom: 1px solid rgb(217, 217, 217); border-top: 0px; border-left: 0px; border-right: 0px;"/></li>');
					continue;
				}

				var listItemStyle = '';
				if (self.options.listItemStyle)
					listItemStyle = 'style = "' + self.options.listItemStyle + '"';

				var $link = $('<a data-index="' + index + '" href="#"></a>');
				if (menuButtons[index].imageUrl)
					$link.append('<img style="margin:1px 5px 1px 2px;padding: 0px;float:left;" src="' + menuButtons[index].imageUrl + '" />');

				$link.append('<span >' + menuButtons[index].caption + '</span>');
				//$link.append('<span style="margin:0px 0px 0px 3px;padding: 0px;float:left;">' + menuButtons[index].caption + '</span>');

				var $listItem = $('<li ' + listItemStyle + '></li>');
				$listItem.append($link);

				$menuList.append($listItem);
			};
		},
		initButton: function () {
			var self = this;
			var $button = self.options.button;

			$button
				.button(self.options.buttonSettings ? self.options.buttonSettings : { text: true })
				.click(function (event) {
					event.preventDefault();

					self.options.click();
				})
				.next()
				.button({
					text: false,
					icons: {
						secondary: "ui-icon-triangle-1-s"
					}
				})
				.click(function () {

					var menu = $(this).parent().next().show().position({
						my: "left top",
						at: "left bottom",
						of: $(this).prev()
					});
					$(document).one("click", function () {
						menu.hide();
					});
					return false;
				})
				.parent().buttonset()
				.next().hide().menu();

		},
		subscribeMenuEvenets: function () {
			var self = this;
			var $button = self.options.button;

			var $splitButtonListItems = $button.parent().next().find('li');

			var menuButtons = self.options.menuButtons;

			for (var index in menuButtons) {

				$splitButtonListItems.eq(index).find('a').click(function (event) {

					event.preventDefault();

					var listIndex = $(this).data("index");

					if (typeof menuButtons[listIndex].click === 'function') {
						menuButtons[listIndex].click();
					} 
				});
			}
		}
	};

	$.fn.splitButtonEx = function (options) {
		var splitButtonEx = Object.create(SplitButtonEx);

		options.button = $(this);

		splitButtonEx.init(options);
	};

	$.fn.splitButtonEx.options = {
		//button: ''
	};

})(jQuery, window, document);