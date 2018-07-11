// 返回数据格式
function res(obj = { code: 0, msg: '提交成功' }) {
	let ret = {
		errCode: obj.code,
		message: obj.msg
	};
	return ret;
}

/** data检测
 * Returns x raised to the n-th power.
 * @param {obj} data 请求的data对象
 * @return {obj}  返回一个数据格式
 */
function hasData(data) {
	if (Object.keys(data).length == 0) {
		return { code: 1, msg: '参数错误' };
	}
	if (!data.hasOwnProperty('errorMsg')) {
		return { code: 1, msg: '缺少errorMsg字段' };
	}
}
function commen(ctx) {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
	ctx.set('Access-Control-Allow-Methods', 'POST,DELETEs,OPTION');
}
exports.message = async (ctx) => {
	commen(ctx);
	ctx.body = res(hasData(ctx.request.body));
};

exports.index = async (ctx) => {
	commen(ctx);
	ctx.response.body = 'Hello World';
};
