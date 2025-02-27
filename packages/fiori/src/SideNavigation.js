import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import List from "@ui5/webcomponents/dist/List.js";
import StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";
import Tree from "@ui5/webcomponents/dist/Tree.js";
import TreeItem from "@ui5/webcomponents/dist/TreeItem.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SideNavigationTemplate from "./generated/templates/SideNavigationTemplate.lit.js";
import SideNavigationItemPopoverContentTemplate from "./generated/templates/SideNavigationItemPopoverContentTemplate.lit.js";
import {
	SIDE_NAVIGATION_POPOVER_HIDDEN_TEXT,
	SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_COLLAPSED_LIST_ITEMS_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_LIST_ITEMS_ARIA_ROLE_DESC,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import SideNavigationCss from "./generated/themes/SideNavigation.css.js";
import SideNavigationPopoverCss from "./generated/themes/SideNavigationPopover.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation",
	managedSlots: true,
	fastNavigation: true,
	properties: /** @lends sap.ui.webc.fiori.SideNavigation.prototype */ {
		/**
		 * Defines whether the <code>ui5-side-navigation</code> is expanded or collapsed.
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 */
		collapsed: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_popoverContent: {
			type: Object,
		},
	},
	slots: /** @lends sap.ui.webc.fiori.SideNavigation.prototype */ {
		/**
		 * Defines the main items of the <code>ui5-side-navigation</code>. Use the <code>ui5-side-navigation-item</code> component
		 * for the top-level items, and the <code>ui5-side-navigation-sub-item</code> component for second-level items, nested
		 * inside the items.
		 *
		 * @public
		 * @type {sap.ui.webc.fiori.ISideNavigationItem[]}
		 * @slot items
		 */
		"default": {
			propertyName: "items",
			invalidateOnChildChange: true,
			type: HTMLElement,
		},

		/**
		 * Defines the header of the <code>ui5-side-navigation</code>.
		 *
		 * <br><br>
		 * <b>Note:</b> The header is displayed when the component is expanded - the property <code>collapsed</code> is false;
		 *
		 * @public
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.11
		 * @slot
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Defines the fixed items at the bottom of the <code>ui5-side-navigation</code>. Use the <code>ui5-side-navigation-item</code> component
		 * for the fixed items, and optionally the <code>ui5-side-navigation-sub-item</code> component to provide second-level items inside them.
		 *
		 * <b>Note:</b> In order to achieve the best user experience, it is recommended that you keep the fixed items "flat" (do not pass sub-items)
		 *
		 * @public
		 * @type {sap.ui.webc.fiori.ISideNavigationItem[]}
		 * @slot
		 */
		fixedItems: {
			type: HTMLElement,
			invalidateOnChildChange: true,
		},
	},
	events: /** @lends sap.ui.webc.fiori.SideNavigation.prototype */ {
		/**
		 * Fired when the selection has changed via user interaction
		 *
		 * @event sap.ui.webc.fiori.SideNavigation#selection-change
		 * @param {HTMLElement} item the clicked item.
		 * @allowPreventDefault
		 * @public
		 */
		"selection-change": {
			detail: {
				item: {
					type: HTMLElement,
				},
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>SideNavigation</code> is used as a standard menu in applications.
 * It consists of three containers: header (top-aligned), main navigation section (top-aligned) and the secondary section (bottom-aligned).
 * <ul>
 * <li>The header is meant for displaying user related information - profile data, avatar, etc.</li>
 * <li>The main navigation section is related to the user’s current work context</li>
 * <li>The secondary section is mostly used to link additional information that may be of interest (legal information, developer communities, external help, contact information and so on). </li>
 * </ul>
 *
 * <h3>Usage</h3>
 *
 * Use the available <code>ui5-side-navigation-item</code> and <code>ui5-side-navigation-sub-item</code> components to build your menu.
 * The items can consist of text only or an icon with text. The use or non-use of icons must be consistent for all items on one level.
 * You must not combine entries with and without icons on the same level. We strongly recommend that you do not use icons on the second level.
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigation.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";</code> (for <code>ui5-side-navigation-item</code>)
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";</code> (for <code>ui5-side-navigation-sub-item</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.SideNavigation
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-side-navigation
 * @since 1.0.0-rc.8
 * @appenddocs sap.ui.webc.fiori.SideNavigationItem sap.ui.webc.fiori.SideNavigationSubItem
 * @public
 */
class SideNavigation extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get staticAreaStyles() {
		return [SideNavigationPopoverCss];
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SideNavigationCss;
	}

	static get template() {
		return SideNavigationTemplate;
	}

	static get staticAreaTemplate() {
		return SideNavigationItemPopoverContentTemplate;
	}

	static get dependencies() {
		return [
			List,
			StandardListItem,
			Tree,
			TreeItem,
			ResponsivePopover,
		];
	}

	onBeforeRendering() {
		this._items = this.items.map(item => {
			return {
				item,
				selected: ((item.items.some(subItem => subItem.selected) && this.collapsed) || item.selected),
			};
		});

		this._fixedItems = this.fixedItems.map(item => {
			return {
				item,
				selected: ((item.items.some(subItem => subItem.selected) && this.collapsed) || item.selected),
			};
		});
	}

	_setSelectedItem(item) {
		if (!this.fireEvent("selection-change", { item }, true)) {
			return;
		}

		this._walk(current => {
			current.selected = false;
		});
		item.selected = true;
	}

	_buildPopoverContent(item) {
		this._popoverContent = {
			mainItem: item,
			mainItemSelected: item.selected && !item.items.some(subItem => subItem.selected),
			// add one as the first item is the main item
			selectedSubItemIndex: item.items.findIndex(subItem => subItem.selected) + 1,
			subItems: item.items,
		};
	}

	async _onAfterOpen() {
		// as the tree/list inside the popover is never destroyed,
		// item navigation index should be managed, because items are
		// dynamically recreated and tabIndexes are not updated
		const tree = await this.getPickerTree();
		const index = this._popoverContent.selectedSubItemIndex;
		tree.focusItemByIndex(index);
	}

	get accSideNavigationPopoverHiddenText() {
		return SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_POPOVER_HIDDEN_TEXT);
	}

	get ariaRoleDescNavigationList() {
		return this.collapsed ? SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC) : SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC);
	}

	get ariaRoleDescNavigationListItem() {
		return this.collapsed ? SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_COLLAPSED_LIST_ITEMS_ARIA_ROLE_DESC) : SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_LIST_ITEMS_ARIA_ROLE_DESC);
	}

	handleTreeItemClick(event) {
		const treeItem = event.detail.item;
		const item = treeItem.associatedItem;

		if (!item.wholeItemToggleable) {
			item.fireEvent("click");
		} else {
			item.expanded = !item.expanded;
		}

		if (item.selected && !this.collapsed) {
			return;
		}

		if (this.collapsed && item.items.length) {
			this._buildPopoverContent(item);
			const currentTree = this._itemsTree === event.target ? this._itemsTree : this._fixedItemsTree;
			this.openPicker(currentTree._getListItemForTreeItem(treeItem));
		} else {
			this._setSelectedItem(item);
		}
	}

	handlePopoverItemClick(event) {
		const listItem = event.detail.item;
		const item = listItem.associatedItem;

		item.fireEvent("click");
		if (item.selected) {
			return;
		}

		this._setSelectedItem(item);
		this.closePicker();
	}

	async getPicker() {
		return (await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]");
	}

	async openPicker(opener) {
		const responsivePopover = await this.getPicker();
		responsivePopover.showAt(opener);
	}

	async closePicker() {
		const responsivePopover = await this.getPicker();
		responsivePopover.close();
	}

	async getPickerTree() {
		const picker = await this.getPicker();
		const sideNav = picker.querySelector("[ui5-side-navigation]");
		return sideNav._itemsTree;
	}

	get hasHeader() {
		return !!this.header.length;
	}

	get showHeader() {
		return this.hasHeader && !this.collapsed;
	}

	get _itemsTree() {
		return this.getDomRef().querySelector("#ui5-sn-items-tree");
	}

	get _fixedItemsTree() {
		return this.getDomRef().querySelector("#ui5-sn-fixed-items-tree");
	}

	_walk(callback) {
		this.items.forEach(current => {
			callback(current);

			current.items.forEach(currentSubitem => {
				callback(currentSubitem);
			});
		});

		this.fixedItems.forEach(current => {
			callback(current);

			current.items.forEach(currentSubitem => {
				callback(currentSubitem);
			});
		});
	}

	static async onDefine() {
		[SideNavigation.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			super.onDefine(),
		]);
	}
}

SideNavigation.define();

export default SideNavigation;
