module.exports = async function (context, req, inputDocument) {
	context.res = {
		// status: 200, /* Defaults to 200 */
		body: inputDocument.map((x) => ({ id: x.id, name: x.name, park: x.park })),
	};
};
