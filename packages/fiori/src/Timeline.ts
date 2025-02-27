import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
// @ts-ignore
import { TIMELINE_ARIA_LABEL } from "./generated/i18n/i18n-defaults.js";
import TimelineTemplate from "./generated/templates/TimelineTemplate.lit.js";
import TimelineItem from "./TimelineItem.js";

// Styles
import styles from "./generated/themes/Timeline.css.js";
import TimelineLayout from "./types/TimelineLayout.js";

const SHORT_LINE_WIDTH = "ShortLineWidth";
const LARGE_LINE_WIDTH = "LargeLineWidth";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-timeline</code> component shows entries (such as objects, events, or posts) in chronological order.
 * A common use case is to provide information about changes to an object, or events related to an object.
 * These entries can be generated by the system (for example, value XY changed from A to B), or added manually.
 * There are two distinct variants of the timeline: basic and social. The basic timeline is read-only,
 * while the social timeline offers a high level of interaction and collaboration, and is integrated within SAP Jam.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.Timeline
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-timeline
 * @appenddocs sap.ui.webc.fiori.TimelineItem
 * @public
 * @since 0.8.0
 */
@customElement("ui5-timeline")
@languageAware
class Timeline extends UI5Element {
	/**
	 * Defines the items orientation.
	 *
	 * <br><br>
	 * <b>Note:</b>
	 * Available options are:
	 * <ul>
	 * <li><code>Vertical</code></li>
	 * <li><code>Horizontal</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.fiori.types.TimelineLayout}
	 * @name sap.ui.webc.fiori.Timeline.prototype.layout
	 * @defaultvalue "Vertical"
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property({ type: TimelineLayout, defaultValue: TimelineLayout.Vertical })
	layout!: TimelineLayout;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.fiori.Timeline.prototype.accessibleName
	 * @defaultvalue: ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Determines the content of the <code>ui5-timeline</code>.
	 *
	 * @type {sap.ui.webc.fiori.ITimelineItem[]}
	 * @name sap.ui.webc.fiori.Timeline.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<TimelineItem>;

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TimelineTemplate;
	}

	static i18nBundle: I18nBundle;

	_itemNavigation: ItemNavigation;

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this.items,
		});
	}

	static get dependencies() {
		return [TimelineItem];
	}

	static async onDefine() {
		Timeline.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	get ariaLabel() {
		return this.accessibleName
			? `${Timeline.i18nBundle.getText(TIMELINE_ARIA_LABEL as I18nText)} ${this.accessibleName}`
			: Timeline.i18nBundle.getText(TIMELINE_ARIA_LABEL as I18nText);
	}

	_onfocusin(e: FocusEvent) {
		const target = e.target as TimelineItem;

		this._itemNavigation.setCurrentItem(target);
	}

	onBeforeRendering() {
		this._itemNavigation._navigationMode = this.layout === TimelineLayout.Horizontal ? NavigationMode.Horizontal : NavigationMode.Vertical;

		for (let i = 0; i < this.items.length; i++) {
			this.items[i].layout = this.layout;
			if (this.items[i + 1] && !!this.items[i + 1].icon) {
				this.items[i]._lineWidth = SHORT_LINE_WIDTH;
			} else if (this.items[i].icon && this.items[i + 1] && !this.items[i + 1].icon) {
				this.items[i]._lineWidth = LARGE_LINE_WIDTH;
			}
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const target = e.target as TimelineItem;

		if (isTabNext(e)) {
			if (!target.nameClickable || getEventMark(e) === "link") {
				this._handleTabNextOrPrevious(e, isTabNext(e));
			}
		} else if (isTabPrevious(e)) {
			this._handleTabNextOrPrevious(e);
		}
	}

	_handleTabNextOrPrevious(e: KeyboardEvent, isNext?: boolean) {
		const target = e.target as TimelineItem;
		const nextTargetIndex = isNext ? this.items.indexOf(target) + 1 : this.items.indexOf(target) - 1;
		const nextTarget = this.items[nextTargetIndex];
		if (!nextTarget) {
			return;
		}
		if (nextTarget.nameClickable && !isNext) {
			e.preventDefault();
			nextTarget.focusLink();
			return;
		}
		e.preventDefault();
		nextTarget.focus();
		this._itemNavigation.setCurrentItem(nextTarget);
	}
}

Timeline.define();

export default Timeline;
