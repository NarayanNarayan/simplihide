const fs = require('fs');
var KeyBase=undefined;
try{
    KeyBase = require('../keybase.json');
}catch(e){
    KeyBase=genkeybase();
    console.log(KeyBase);
    fs.writeFileSync("keybase.json",JSON.stringify(KeyBase));
}
function rand(n = 10){
    return Math.floor(n * Math.random())
}

function randPermutation(n) {
    var m = new Array(n);
    var rv = new Array(n);
    for(var i=0;i<n;i++) m[i]=i;
    for(var i=n;i>0;i--){
        var t=rand(i);
        rv[m[t]]=i-1;
        m[t]=m[i-1];
    }
    return rv;
}

function inv(v){
    var n=v.length;
    var v_inv = new Array(n);
    for(var i=0;i<n;i++) v_inv[v[i]]=i;
    return v_inv;
}

function encrypt(inp,m){
    var n=m.length;
    var out=new Array(n);
    for(var i=0;i<n;i++) out[m[i]]=inp[i];
    return out;
}
function decrypt(inp,m){
    var n=m.length;
    var out=new Array(n);
    for(var i=0;i<n;i++) out[i]=inp[m[i]];
    return out;
}
function genkeybase(n=50){
    var keybase=new Array(n+1);
    for(var i=0;i<=n;i++) keybase[i]=randPermutation(i);
    return keybase;
}

function encryptName(name){
    return encrypt(name,KeyBase[name.length]).join('');
}
function decryptName(name){
    return decrypt(name,KeyBase[name.length]).join('');
}
rp=randPermutation(10)
er=encrypt(rp,rp);
console.log(er);

module.exports={encryptName,decryptName};