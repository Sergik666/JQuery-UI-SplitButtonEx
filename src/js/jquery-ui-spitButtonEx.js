/*
 * JQuery UI Spit button Extended v0.1
 * https://github.com/Sergik666/JQuery-UI-SplitButtonEx
 *
 * Copyright 2012, Sergey Vasylchenko
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: March 23 00:53:29 2012 +0200
 */

(function ($, window, document, undefined) {

	var SpitButtonEx = {
		init: function (options) {
			var self = this;

			self.options = $.extend({}, $.fn.spitButtonEx.options, options);

			this.createSplitButton();

			this.createMenu();

			this.initButton();
			this.subscribeMenuEvenets();
		},
		createSplitButton: function () {
			var self = this;
			var $button = self.options.button;		

			$button.wrap("<div></div>")
			$button.after('<button id="select">Select button</button>');

			$buttonsContainer = $button.parent();

			$buttonsContainer.wrap("<div></div>");
		},
		createMenu: function () {
			var self = this;
			var $button = self.options.button;		

			$buttonsContainer = $button.parent();
			$buttonsContainer.after('<ul></ul>');

			var $menuList = $buttonsContainer.next();

			var menuButtons = self.options.menuButtons;

			for (var index in menuButtons)
			{
				$menuList.append('<li><a data-index="'+ index +'" href="#">' + menuButtons[index].caption + '</a></li>');
			};
		},
		initButton: function () {
			var self = this;
			var $button = self.options.button;		

			$button
				.button({
					text: true /*,
					icons: {
						primary: "createContactButton"
					}*/
				})
				.click(function() {
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

			for (var index in menuButtons)
			{

				$splitButtonListItems.eq(index).find('a').click(function (event) {
					event.preventDefault();

					var index = $(this).data("index");

					if(typeof menuButtons[index].click === 'function')
						menuButtons[index].click();
				});
			}
		}
	};

	$.fn.spitButtonEx = function (options) {
		var spitButtonEx = Object.create(SpitButtonEx);

		options.button = $(this);

		spitButtonEx.init(options);
	};

	$.fn.spitButtonEx.options = {
		//button: ''
	};

})(jQuery, window, document);