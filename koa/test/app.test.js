const main = require('../app');
const should = require('should');
const request = require('supertest')(main);
const BASEURL = 'http://localhost:3000/';
describe('api', () => {
	describe('params test', () => {
		it('测试无data情况下的返回结果', () => {
			request
				.post(`${BASEURL}/test`)
				.send({})
				.expect(200, function(err, res) {
					console.log(res.text);
					res.text.should.containEql('参数错误');
				});
		});
	});
});
