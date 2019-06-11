const buildRenderer = (controlName, litTemplate) => {
	return `
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
${litTemplate}
export default block0;`
};

module.exports = {
	generateTemplate: buildRenderer
};
