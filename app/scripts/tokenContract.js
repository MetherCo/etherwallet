const tokenInterface = require('./tokens/tokenContractAbi.json');
const tokenContract = function () {
  this.tokensAbi = {};
  for (var i in tokenInterface) this.tokensAbi[tokenInterface[i].name] = tokenInterface[i];
}

tokenContract.prototype.getDataString = function(func, inputs) {
  var fullFuncName = ethUtil.solidityUtils.transformToFullName(func);
  var funcSig = ethFuncs.getFunctionSignature(fullFuncName);
  var typeName = ethUtil.solidityUtils.extractTypeName(fullFuncName);
  var types = typeName.split(',');
  types = types[0] === "" ? [] : types;
  console.log(fullFuncName)
  console.log(funcSig)
  console.log(typeName)
  console.log(types)
  return '0x' + funcSig + ethUtil.solidityCoder.encodeParams(types, inputs);
};

/**
 * tokenContract.prototype.getAllBalance - description
 *
 * @param  {type} to       description
 * @param  {string address, boolean name, boolean website, boolean email, integer count} params
 * @param  {type} callback description
 * @return {type}          description
 */
tokenContract.prototype.getAllBalance = function(to, params) {
  const address = params.address ? params.address : '';
  const name = params.name ? params.name : true;
  const website = params.website ? params.website : true;
  const email = params.email ? params.email : true;
  const count = params.count ? params.count : 0;

  ajaxReq.getEthCall({
    to: to,
    data: this.getDataString(this.tokensAbi.getAllBalance, [address, name, website, email, count])
  }, function(data) {
    if(data.error || data.data === '0x') console.log(data, "error");
    else {
      return ethFuncs.decode(data.data);
    };
  })
};

tokenContract.prototype.addSetToken = function(to, from, params) {
  const name = params.name ? params.name : '';
  const symbol = params.symbol ? params.symbol : '';
  const address = params.address ? params.address : '';
  const decimal = params.decimal ? params.decimal : 0;
  const website = params.website ? params.website : '';
  const email = params.email ? params.email : '';
  const nonce = params.nonce ? params.nonce : 0;

  // ajaxReq.getEthCall({
  // 	to: to,
	// 	value: 0x0,
	// 	gas: 21000,
	// 	nonce: nonce,
	// 	gasPrice: 1000000000, // 1 gwei
  //   data: this.getDataString(this.tokensAbi.getAllBalance, [address, name, website, email, count])
  // }, function(data) {
  //   if(data.error || data.data === '0x') console.log(data, "error");
  //   else {
  //     return ethFuncs.decode(data.data);
  //   };
  // })
  //
  console.log(this.getDataString(this.tokensAbi.addSetToken, [name, symbol, address, decimal, website, email, nonce]));
}

tokenContract.prototype.getToken = function(to, address) {
  ajaxReq.getEthCall({
    to: to,
    data: this.getDataString(this.tokensAbi.getToken, [address])
  }, function(data) {
    if(data.error || data.data === '0x') console.log(data, "error");
    else {
      return ethFuncs.decode(data.data);
    };
  });
}

module.exports = tokenContract;
