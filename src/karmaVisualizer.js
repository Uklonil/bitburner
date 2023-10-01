const doc = eval("document");

export async function main(ns) {
    const HUDElement = doc.querySelector("table").firstChild;

    const statName = "Karma";
    var statValue = 0;
    var percent = 50;

    var text = htmlToElement(`
	<tr class="MuiTableRow-root css-1dix92e" id="custom-stat">
	<th class="jss14 MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row">
	<p class="jss18 MuiTypography-root MuiTypography-body1 css-cxl1tz">${statName}&nbsp;</p></th>
	<td class="jss14 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
	<p class="jss18 MuiTypography-root MuiTypography-body1 css-cxl1tz">${statValue}</p></td>
	<td class="jss14 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
	<p class="jss18 MuiTypography-root MuiTypography-body1 css-cxl1tz" id="overview-cha-hook"></p></td></tr>`);

    HUDElement.children[15].after(text);

    ns.atExit(() => { text.remove(); }); // Removes stat on script kill

    while(true){
        statValue = ns.heart.break();

        // Updating elements
        // Very inneficient

        text.remove();

        text = htmlToElement(`
			<tr class="MuiTableRow-root css-1dix92e" id="custom-stat">
			<th class="jss14 MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row">
			<p class="jss18 MuiTypography-root MuiTypography-body1 css-cxl1tz">${statName}&nbsp;</p></th>
			<td class="jss14 MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
			<p class="jss18 MuiTypography-root MuiTypography-body1 css-cxl1tz">${statValue}</p></td>
			<td class="MuiTableCell-root jss12 MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-7v1cxh">
			<p class="MuiTypography-root MuiTypography-body1 css-96jjjo" id="overview-int-hook"></p></td></tr>
			<tr class="MuiTableRow-root css-1dix92e">
			<th class="MuiTableCell-root jss11 MuiTableCell-body MuiTableCell-sizeMedium css-hadb7u" scope="row" colspan="2" style="padding-bottom: 2px; position: relative; top: -3px;">
			<span class="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-bnrm1a" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
			<span class="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate css-14usnx9"></span></span></th></tr>`
        );

        HUDElement.children[15].after(text);

        await ns.sleep(1000);
    }
}

// https://stackoverflow.com/a/35385518/11131159
function htmlToElement(html) {
    var template = doc.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}