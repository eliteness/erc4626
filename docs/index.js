STATE = {};
function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};

document.addEventListener('DOMContentLoaded', function() {
    //paintStatic();
	let v = new URLSearchParams(window.location.search).get("v");
	if( v !== null) {
		console.log( "found vault from url" , v);
		if( ethers.utils.isAddress(v) ) {
			$("inp-addr").value = v;
		}
	}
	let c = new URLSearchParams(window.location.search).get("c");
	if( c !== null) { STATE.uCHAINID = c; }
});

window.addEventListener(
	'load',
	async function() {
		console.log("waitin for 3 secs..");
		$("cw_m").innerHTML = "Connecting.. Please wait."
		setTimeout(async () => { await basetrip(); }, 3000);
	},
	false
);


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("tablinks_"+tabName).className+=" active";
    document.getElementById(tabName).style.display = "block";
    //evt?.currentTarget?.className += " active";
    //window.location = "#"+tabName;
}



async function basetrip() {
	////provider = new ethers.providers.JsonRpcProvider("https://base.llamarpc.com")//https://mainnet.base.org");
	////if(window.ethereum) window.ethereum.selectedAddress="0x167d87a906da361a10061fe42bbe89451c2ee584"
	////else window.ethereum = {selectedAddress:"0x167d87a906da361a10061fe42bbe89451c2ee584"}
	////await dexstats();
	/////////////
	////return;

	if(!(window.ethereum)){
		$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");
		return;
	}
	else {
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){
			console.log("Found old wallet:", window.ethereum.selectedAddress);
			cw();
		}
		else {
			console.log("Didnt find a connected wallet!");
			cw();
		}
	}


	//DrefreshFarm()
	arf();
	cw();
	await dexstats();
}



async function cw() {
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2() {
	if(!(window.ethereum)){notice(`Metamask not detected!<br>Please Refresh the Page<br><div onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Refresh</div>`);return(0)}
	if(typeof provider == "undefined"){notice(`Provider not detected!<br>Please connect with a web3 provider or wallet and refresh this page.<br><div onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Refresh</div>`);return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML=
		"<div>"
		+(window.ethereum.selectedAddress).substr(0,10)
		+"..."
		+(window.ethereum.selectedAddress).substr(34)
		+"</div><div class='hint'>On "
		+Object.keys(ALL_CHAINS).filter( e => ALL_CHAINS[e].chainId == _chainid)[0]??"unknown-chain"
		+"</div>"
	;
	//$("cw").innerHTML= `<div>Connected to your Wallet <br> ${window.ethereum.selectedAddress}</div>`
	//$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	//if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}

/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d) {
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+"K"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}
function fornum2(n,d) {
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(4)+""}
	else if(_n>0){n_=(_n).toFixed(8)+""}
	return(n_);
}


function fornum5(n,d) { // full flex
	return (Number(n)/10**Number(d)).toLocaleString(undefined,{maximumFractionDigits:d}) ;
}
function fornum6(n,f) {
	return (Number(n)).toLocaleString(undefined,{maximumFractionDigits:f}) ;
}
// use f when thousands separator is in play, else use f=4 default
function fornum7(n,d,f) {
	let _num = (Number(n)/10**Number(d));
	f = (f == undefined) ? 0 : f;
	return (
		(_num < 1e3)
			? _num.toLocaleString(undefined,{ maximumFractionDigits: ((f>4) ? f : 4) })
			: _num.toLocaleString(undefined,{ maximumFractionDigits: f })
		)
	;
}

function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
	console.log(c)
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const timeFormat = (timestamp) => {const seconds = Math.floor((Date.now() - timestamp) / 1000);const prefix = seconds < 0 ? "For the next " : "Expired ";const absSeconds = Math.abs(seconds);return prefix + (absSeconds < 60 ? absSeconds + " seconds" : absSeconds < 3600 ? Math.floor(absSeconds / 60) + " minutes" : absSeconds < 86400 ? Math.floor(absSeconds / 3600) + " hours" : absSeconds < 2592000 ? Math.floor(absSeconds / 86400) + " days" : absSeconds < 31536000 ? Math.floor(absSeconds / 2592000) + " months" : Math.floor(absSeconds / 31536000) + " years") + (seconds < 0 ? "" : " ago");};

LPABI = ["function balanceOf(address) public view returns(uint)","function metadata() public view returns(uint,uint,uint,uint,bool,address,address)","function getAssetPrice(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function earned(address,address) public view returns(uint)","function earnings(address,address) public view returns(uint)","function name() public view returns(string)","function symbol() public view returns(string)","function tvl() public view returns(uint)","function tvlDeposits() public view returns(uint)","function apr() public view returns(uint)","function totalSupply() public view returns(uint)","function deposit(uint)","function withdraw(uint)","function depositAll()","function withdrawAll()","function mint(uint)","function redeem(uint)","function mintAll()","function redeemAll()"]

DEPOSITOR_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"nft","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"veAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"md","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"mb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wen","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"nft","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"veAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rd","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wen","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ELTOKEN","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VENFT","outputs":[{"internalType":"contract IVotingEscrow","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VOTER","outputs":[{"internalType":"contract IVoter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mi","type":"uint256"}],"name":"copyVotesFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"floor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"_farm","type":"address"}],"name":"getAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"}],"name":"getApr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"}],"name":"getTvl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address[]","name":"_farms","type":"address[]"},{"internalType":"address[]","name":"_pricing","type":"address[]"}],"name":"info","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_vo","type":"address"},{"internalType":"address","name":"_el","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintingFeesToBurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintingFeesToDao","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_inc","type":"uint256"}],"name":"rawQuote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redemptionFeesToBurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redemptionFeesToDao","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_t","type":"address"},{"internalType":"uint256","name":"_a","type":"uint256"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"d","type":"address"}],"name":"setDAO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_md","type":"uint256"},{"internalType":"uint256","name":"_mb","type":"uint256"},{"internalType":"uint256","name":"_rdv","type":"uint256"},{"internalType":"uint256","name":"_rb","type":"uint256"}],"name":"setFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_f","type":"uint256"}],"name":"setFloor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"setID","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_p","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_m","type":"address"},{"internalType":"bool","name":"_b","type":"bool"}],"name":"setVoteManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_p","type":"address[]"},{"internalType":"uint256[]","name":"_w","type":"uint256[]"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voteManager","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voteReset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tamt","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]

CTOKEN_ABI = [{"inputs":[{"internalType":"address","name":"underlying_","type":"address"},{"internalType":"contract ComptrollerInterface","name":"comptroller_","type":"address"},{"internalType":"contract InterestRateModel","name":"interestRateModel_","type":"address"},{"internalType":"uint256","name":"initialExchangeRateMantissa_","type":"uint256"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"address payable","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AcceptAdminPendingAdminCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"actualAddAmount","type":"uint256"}],"name":"AddReservesFactorFreshCheck","type":"error"},{"inputs":[],"name":"BorrowCashNotAvailable","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"BorrowComptrollerRejection","type":"error"},{"inputs":[],"name":"BorrowFreshnessCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateAccrueBorrowInterestFailed","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateAccrueCollateralInterestFailed","type":"error"},{"inputs":[],"name":"LiquidateCloseAmountIsUintMax","type":"error"},{"inputs":[],"name":"LiquidateCloseAmountIsZero","type":"error"},{"inputs":[],"name":"LiquidateCollateralFreshnessCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateComptrollerRejection","type":"error"},{"inputs":[],"name":"LiquidateFreshnessCheck","type":"error"},{"inputs":[],"name":"LiquidateLiquidatorIsBorrower","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateRepayBorrowFreshFailed","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateSeizeComptrollerRejection","type":"error"},{"inputs":[],"name":"LiquidateSeizeLiquidatorIsBorrower","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"MintComptrollerRejection","type":"error"},{"inputs":[],"name":"MintFreshnessCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"RedeemComptrollerRejection","type":"error"},{"inputs":[],"name":"RedeemFreshnessCheck","type":"error"},{"inputs":[],"name":"RedeemTransferOutNotPossible","type":"error"},{"inputs":[],"name":"ReduceReservesAdminCheck","type":"error"},{"inputs":[],"name":"ReduceReservesCashNotAvailable","type":"error"},{"inputs":[],"name":"ReduceReservesCashValidation","type":"error"},{"inputs":[],"name":"ReduceReservesFreshCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"RepayBorrowComptrollerRejection","type":"error"},{"inputs":[],"name":"RepayBorrowFreshnessCheck","type":"error"},{"inputs":[],"name":"SetComptrollerOwnerCheck","type":"error"},{"inputs":[],"name":"SetInterestRateModelFreshCheck","type":"error"},{"inputs":[],"name":"SetInterestRateModelOwnerCheck","type":"error"},{"inputs":[],"name":"SetPendingAdminOwnerCheck","type":"error"},{"inputs":[],"name":"SetReserveFactorAdminCheck","type":"error"},{"inputs":[],"name":"SetReserveFactorBoundsCheck","type":"error"},{"inputs":[],"name":"SetReserveFactorFreshCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"TransferComptrollerRejection","type":"error"},{"inputs":[],"name":"TransferNotAllowed","type":"error"},{"inputs":[],"name":"TransferNotEnough","type":"error"},{"inputs":[],"name":"TransferTooMuch","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"cashPrior","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"interestAccumulated","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"borrowIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"AccrueInterest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"borrowAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accountBorrows","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"Borrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"liquidator","type":"address"},{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"repayAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"cTokenCollateral","type":"address"},{"indexed":false,"internalType":"uint256","name":"seizeTokens","type":"uint256"}],"name":"LiquidateBorrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"mintAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"mintTokens","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"NewAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract ComptrollerInterface","name":"oldComptroller","type":"address"},{"indexed":false,"internalType":"contract ComptrollerInterface","name":"newComptroller","type":"address"}],"name":"NewComptroller","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract InterestRateModel","name":"oldInterestRateModel","type":"address"},{"indexed":false,"internalType":"contract InterestRateModel","name":"newInterestRateModel","type":"address"}],"name":"NewMarketInterestRateModel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldPendingAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newPendingAdmin","type":"address"}],"name":"NewPendingAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldReserveFactorMantissa","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newReserveFactorMantissa","type":"uint256"}],"name":"NewReserveFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"redeemer","type":"address"},{"indexed":false,"internalType":"uint256","name":"redeemAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"redeemTokens","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"repayAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accountBorrows","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"RepayBorrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"benefactor","type":"address"},{"indexed":false,"internalType":"uint256","name":"addAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTotalReserves","type":"uint256"}],"name":"ReservesAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"admin","type":"address"},{"indexed":false,"internalType":"uint256","name":"reduceAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTotalReserves","type":"uint256"}],"name":"ReservesReduced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_acceptAdmin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"addAmount","type":"uint256"}],"name":"_addReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"compLikeDelegatee","type":"address"}],"name":"_delegateCompLikeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reduceAmount","type":"uint256"}],"name":"_reduceReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ComptrollerInterface","name":"newComptroller","type":"address"}],"name":"_setComptroller","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract InterestRateModel","name":"newInterestRateModel","type":"address"}],"name":"_setInterestRateModel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newPendingAdmin","type":"address"}],"name":"_setPendingAdmin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newReserveFactorMantissa","type":"uint256"}],"name":"_setReserveFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"accrualBlockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accrueInterest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOfUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"borrowAmount","type":"uint256"}],"name":"borrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"borrowBalanceCurrent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"borrowBalanceStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowRatePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"comptroller","outputs":[{"internalType":"contract ComptrollerInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exchangeRateCurrent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"exchangeRateStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountSnapshot","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"underlying_","type":"address"},{"internalType":"contract ComptrollerInterface","name":"comptroller_","type":"address"},{"internalType":"contract InterestRateModel","name":"interestRateModel_","type":"address"},{"internalType":"uint256","name":"initialExchangeRateMantissa_","type":"uint256"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ComptrollerInterface","name":"comptroller_","type":"address"},{"internalType":"contract InterestRateModel","name":"interestRateModel_","type":"address"},{"internalType":"uint256","name":"initialExchangeRateMantissa_","type":"uint256"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"interestRateModel","outputs":[{"internalType":"contract InterestRateModel","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isCToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"repayAmount","type":"uint256"},{"internalType":"contract CTokenInterface","name":"cTokenCollateral","type":"address"}],"name":"liquidateBorrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"mintAmount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingAdmin","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolSeizeShareMantissa","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"redeemTokens","type":"uint256"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"redeemAmount","type":"uint256"}],"name":"redeemUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"repayAmount","type":"uint256"}],"name":"repayBorrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"repayAmount","type":"uint256"}],"name":"repayBorrowBehalf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveFactorMantissa","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"liquidator","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"seizeTokens","type":"uint256"}],"name":"seize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supplyRatePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract EIP20NonStandardInterface","name":"token","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBorrows","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBorrowsCurrent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

EL_27_ABI = [{"inputs": [],"name": "LA","outputs": [{"internalType": "contract ILA","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IP","name": "p","type": "address"}],"name": "bucketList","outputs": [{"internalType": "uint24[]","name": "","type": "uint24[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint24[]","name": "inp","type": "uint24[]"}],"name": "cast_24_256","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "farmType","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland","name": "farm","type": "address"},{"internalType": "address","name": "user","type": "address"},{"internalType": "address","name": "guard","type": "address"}],"name": "getClset","outputs": [{"internalType": "uint256[13]","name": "ret","type": "uint256[13]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address[3][]","name": "_id","type": "address[3][]"}],"name": "getClsets","outputs": [{"internalType": "uint256[13][]","name": "","type": "uint256[13][]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland","name": "farm","type": "address"},{"internalType": "contract IELM","name": "elm","type": "address"},{"internalType": "address","name": "user","type": "address"}],"name": "getElmaCompoundFarm","outputs": [{"internalType": "uint256[18]","name": "ret","type": "uint256[18]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland[]","name": "_farms","type": "address[]"},{"internalType": "contract IELM[]","name": "_elm","type": "address[]"},{"internalType": "address","name": "_user","type": "address"}],"name": "getElmaCompoundFarms","outputs": [{"internalType": "uint256[18][]","name": "","type": "uint256[18][]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland","name": "farm","type": "address"},{"internalType": "address","name": "user","type": "address"}],"name": "getSimpleFarm","outputs": [{"internalType": "uint256[7]","name": "ret","type": "uint256[7]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland[]","name": "_farms","type": "address[]"},{"internalType": "address","name": "_user","type": "address"}],"name": "getSimpleFarms","outputs": [{"internalType": "uint256[7][]","name": "","type": "uint256[7][]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "address","name": "_pool","type": "address"}],"name": "getTotalPosition","outputs": [{"internalType": "uint256","name": "x","type": "uint256"},{"internalType": "uint256","name": "y","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILA","name": "_la","type": "address"}],"name": "initializer","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "address","name": "_pair","type": "address"}],"name": "positionOf","outputs": [{"internalType": "uint256[]","name": "bIds","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsX","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsY","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidities","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_f","type": "address"},{"internalType": "uint256","name": "_t","type": "uint256"}],"name": "setFarmType","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_wrapper","type": "address"},{"internalType": "address","name": "_vault","type": "address"},{"internalType": "address","name": "_vaultPool","type": "address"}],"name": "setVaultPools","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "vaultPools","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "vaults","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"}]

IERC4626 = [
	"function asset() external view returns(address)",
	"function name() external view returns(string memory)",
	"function symbol() external view returns(string memory)",
	"function decimals() external view returns(uint)",
	"function totalSupply() external view returns(uint)",
	"function balanceOf(address) external view returns(uint)",
	"function allowance(address,address) external view returns(uint)",
	"function totalAssets() external view returns(uint)",
	//"function () external view returns(uint)",
	"function convertToShares(uint assets) external view returns(uint shares)",
	"function convertToAssets(uint shares) external view returns(uint assets)",

	"function approve(address, uint) external",
	"function deposit(uint assets, address receiver) external returns(uint shares)",
	"function mint(uint shares, address receiver) external returns(uint assets)",
	"function withdraw(uint assets, address receiver, address owner) external returns(uint shares)",
	"function redeem(uint shares, address receiver, address owner) external returns(uint assets)",
]

async function paintStatic(_params) {
}

async function dexstats() {
	if( window.ethereum.selectedAddress == null ) {
		notice(`<h3>Welcome to the ERC4626 App</h3> Please First Switch to desired chain in your Wallet Manully, Then Refresh this Page, then Connect your wallet & Enter the address of the ERC4626 Vault you wish to explore.`);
		return;
	}
	let _ca = $("inp-addr").value;
	if( ! ethers.utils.isAddress(_ca) ) {
		notice(`<h3>Welcome to the ERC4626 App</h3> Please Connect your wallet & Enter the address of the ERC4626 Vault you wish to explore.`);
		return;
	}

	STATE.c_v = new ethers.Contract( _ca , IERC4626, provider );

	_rdv = await Promise.all( [
		STATE.c_v.asset(),
		STATE.c_v.name(),
		STATE.c_v.symbol(),
		STATE.c_v.totalSupply(),
		STATE.c_v.balanceOf( window.ethereum.selectedAddress ),
		STATE.c_v.totalAssets(),
		STATE.c_v.decimals(),
	] ) ;

	STATE.vault = {
		addr : _ca,
		name : (_rdv[1]),
		symb : (_rdv[2]),
		tsup : BigInt(_rdv[3]),
		ubal : BigInt(_rdv[4]),
		aaum : BigInt(_rdv[5]),
		deci : Number(_rdv[6]),
	}

	STATE.c_a = new ethers.Contract( _rdv[0] , IERC4626, provider );

	_rda = await Promise.all( [
		STATE.c_a.name(),
		STATE.c_a.symbol(),
		STATE.c_a.totalSupply(),
		STATE.c_a.balanceOf( window.ethereum.selectedAddress ),
		STATE.c_a.decimals(),
		STATE.c_a.allowance( window.ethereum.selectedAddress , STATE.vault.addr ),
	] ) ;

	STATE.asset = {
		addr : (_rdv[0]),
		name : (_rda[0]),
		symb : (_rda[1]),
		tsup : BigInt(_rda[2]),
		ubal : BigInt(_rda[3]),
		deci : Number(_rda[4]),
		allw : BigInt(_rda[5])
	}

	STATE.vault.dom = ( Number(STATE.vault.aaum) / Number(STATE.asset.tsup) * 100 ) ;
	STATE.vault.ratio = ( (Number(STATE.vault.aaum)/10**Number(STATE.asset.deci)) / (Number(STATE.vault.tsup)/10**Number(STATE.vault.deci))  )

	$("l-as-1").innerHTML = STATE.asset.symb;
	$("l-as-2").innerHTML = STATE.asset.symb;
	$("l-as-3").innerHTML = STATE.asset.symb;
	$("l-as-4").innerHTML = STATE.asset.symb;

	$("l-sh-1").innerHTML = STATE.vault.symb;
	$("l-sh-2").innerHTML = STATE.vault.symb;
	$("l-sh-3").innerHTML = STATE.vault.symb;
	$("l-sh-4").innerHTML = STATE.vault.symb;



	$("footer-contracts").innerHTML = `
		<div class="grid-two-col">
			<div>
				<a target="_blank" href="https://chainlist.org/?testnets=true&search=${Number(window.ethereum.chainId)}">
					View Chain ID ${Number(window.ethereum.chainId)} on Chainlist
				</a>
			</div>
			<div>${STATE.asset.symb} ・ ${STATE.asset.addr}</div>
			<div>${STATE.vault.symb} ・ ${STATE.vault.addr}</div>
		</div>
		<br><br>
		<a target="_blank" href="${DOCS_LINK}">Read our Docs</a>
	`;


	$("topstat-aum-as").innerHTML = fornum7(STATE.vault.aaum, STATE.asset.deci, 0);
	//$("topstat-ts-as").innerHTML = fornum(STATE.asset.ts, STATE.asset.deci);
	$("topstat-ts-sh").innerHTML = fornum7(STATE.vault.tsup, STATE.vault.deci, 0);
	$("topstat-ratio").innerHTML = ( STATE.vault.ratio ).toFixed(6)+"x";
	$("topstat-dom").innerHTML = ( STATE.vault.dom ).toFixed(6)+"%";


	$("l-as-bal").innerHTML = fornum7(STATE.asset.ubal, STATE.asset.deci, STATE.asset.deci);
	$("l-sh-bal").innerHTML = fornum7(STATE.vault.ubal, STATE.vault.deci, STATE.vault.deci);
	$("l-as-allw").innerHTML = (STATE.asset.ubal <= STATE.asset.allw) ? "Granted" : "Required";

    const _hiddens = document.getElementsByClassName("hidden");
    for (i = _hiddens.length - 1 ; i >= 0 ; i--) {
        _hiddens[i].className = _hiddens[i].className.replace("hidden", "");
    }




	return;
}


async function arf(){
	let c=0;
	var xfr = setInterval(
		async function(){
			console.log("refreshing farm stats", new Date(), c );
			try {
				if( ethers?.utils?.isAddress(window?.ethereum?.selectedAddress) ) { gubs();}
				dexstats()
			}
			catch(e) { console.log('hmm..'); }
			c++;
		},
		16_000
	);
}
async function gubs() {
	dexstats()
	return;
}









async function stake(ismax) {
	notice(`Updating latest balances, allowances and Asset & Vault data..`);
	await dexstats();

	s_v = new ethers.Contract( STATE.vault.addr , IERC4626, signer );
	s_a = new ethers.Contract( STATE.asset.addr , IERC4626, signer );

	al = await Promise.all([
		STATE.asset.allw,
		STATE.asset.ubal
	]);

	_oamt = null;

	if(ismax) {
		_oamt = al[1];
	}

	else {
		_oamt = $("stake-amt").value;
		if(!isFinite(_oamt) || _oamt<1/(10**STATE.asset.deci)){notice(`Invalid ${STATE.asset.symb} amount!`); return;}
		_oamt = BigInt(Math.floor(_oamt * (10**STATE.asset.deci)))
	}


	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Amount:</h3>${Number(_oamt)/(10**STATE.asset.deci)}<br><h3>Actual Balance:</h3>${Number(al[1])/(10**STATE.asset.deci)}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${STATE.asset.symb}.`);return}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${STATE.vault.symb} vault required allowance to spend your ${STATE.asset.symb}.<br><br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		//let _tr = await _WRAP.approve(FARM,_oamt);
		let _tr = await s_a.approve(STATE.vault.addr, ethers.constants.MaxUint256);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			Transaction hash: ${_tr.hash}
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/(10**STATE.asset.deci)} ${STATE.asset.symb} granted.<br>
			Transaction hash: ${_tr.hash}
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
	}

	notice(`
		<h3>Order Summary</h3>
		<b>Staking ${STATE.asset.symb}</b><br>
		${STATE.asset.symb} to Stake: <b>${fornum5(_oamt,STATE.asset.deci)}</b><br>
		${STATE.vault.symb} expected: <b>${fornum5( Number(_oamt) / STATE.vault.ratio , STATE.asset.deci)}</b>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await s_v.deposit(_oamt, window.ethereum.selectedAddress);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<h4>Staking ${STATE.asset.symb}</h4>
		${STATE.vault.symb} expected: <b>${fornum5( Number(_oamt) / STATE.vault.ratio , STATE.asset.deci)}</b>
		${STATE.asset.symb} Staking: <b>${fornum5(_oamt,STATE.asset.deci)}</b>
		<br><br>Transaction hash: ${_tr.hash}
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		${STATE.asset.symb} Staked: <b>${fornum5(_oamt,STATE.asset.deci)}</b>
		${STATE.vault.symb} expected: <b>${fornum5( Number(_oamt) / STATE.vault.ratio , STATE.asset.deci)}</b>
		<br><br>Transaction hash: ${_tr.hash}
	`);
	gubs();
}

async function unstake(ismax) {
	notice(`Updating latest balances, allowances and Asset & Vault data..`);
	await dexstats();

	s_v = new ethers.Contract( STATE.vault.addr , IERC4626, signer );
	s_a = new ethers.Contract( STATE.asset.addr , IERC4626, signer );

	al = await Promise.all([
		STATE.vault.ubal
	]);


	_oamt = null;

	if(ismax) {
		_oamt = al[0];
	}
	else {
		_oamt = $("unstake-amt").value;
		if(!isFinite(_oamt)){notice(`Invalid ${STATE.vault.symb} amount!`); return;}
		_oamt = BigInt(Math.floor(_oamt * (10**STATE.vault.deci)));
	}

	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Staked Balance!</h2><h3>Desired Amount:</h3>${Number(_oamt)/(10**STATE.vault.deci)}<br><h3>Actual Staked Balance:</h3>${al[1]/(10**STATE.vault.deci)}<br><br><b>Please reduce the amount and retry again, or Stake some more ${WRAP_NAME}.`); return}

	notice(`
		<h3>Order Summary</h3>
		<b>Withdrawing ${STATE.vault.symb}</b><br>

		${STATE.vault.symb} to redeem: <b>${fornum5(_oamt,STATE.vault.deci)}</b><br>
		${STATE.asset.symb} expected: <b>${fornum5( Number(_oamt) * STATE.vault.ratio , STATE.vault.deci)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await s_v.redeem(_oamt, window.ethereum.selectedAddress, window.ethereum.selectedAddress);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<h4>Unstaking ${STATE.vault.symb}</h4>
		${STATE.vault.symb} to redeem: <b>${fornum5(_oamt,STATE.vault.deci)}</b><br>
		${STATE.asset.symb} expected: <b>${fornum5( Number(_oamt) * STATE.vault.ratio , STATE.vault.deci)}</b>
		<br><br>Transaction hash: ${_tr.hash}
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		${STATE.vault.symb} to redeem: <b>${fornum5(_oamt,STATE.vault.deci)}</b><br>
		${STATE.asset.symb} expected: <b>${fornum5( Number(_oamt) * STATE.vault.ratio , STATE.vault.deci)}</b>
		<br><br>Transaction hash: ${_tr.hash}
	`);
	gubs();
}
