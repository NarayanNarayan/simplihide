const fs = require('fs');
const ph = require('path');
const {encryptName,decryptName}=require('./crypt.js');

function encfile(filepathrelative,encfunc=(v)=>v,folderName="output"){
    if (!fs.existsSync(ph.dirname(ph.join(folderName,filepathrelative)))) {
        fs.mkdirSync(ph.dirname(ph.join(folderName,filepathrelative)),{ recursive: true });
    }
    data = fs.readFileSync(filepathrelative);
    encdata = Buffer.allocUnsafe(data.length);

    for(var i=0;i<data.length;i++){
        encdata[i]=encfunc(data[i]);
    }
    fs.writeFileSync(ph.join(folderName,filepathrelative),encdata);
}

function getPathAsList(path){
    var basepath=ph.dirname(path);
    if(basepath===path) return [path];
    else return [...getPathAsList(basepath),ph.basename(path)];
}
function getEncryptedPath(path){
    var pathlist=getPathAsList(path);
    var newpathlist=pathlist.map(encryptName);
    return ph.join(...newpathlist);
}
function getDecryptedPath(path){
    var pathlist=getPathAsList(path);
    var newpathlist=pathlist.map(decryptName);
    return ph.join(...newpathlist);
}

function encfilenpath(filepathrelative,encfunc=(v)=>v,folderName="output"){
    var newfilepath=getEncryptedPath(filepathrelative);
    if (!fs.existsSync(ph.dirname(ph.join(folderName,newfilepath)))) {
        fs.mkdirSync(ph.dirname(ph.join(folderName,newfilepath)),{ recursive: true });
    }
    data = fs.readFileSync(filepathrelative);
    encdata = Buffer.allocUnsafe(data.length);

    for(var i=0;i<data.length;i++){
        encdata[i]=encfunc(data[i]);
    }
    fs.writeFileSync(ph.join(folderName,newfilepath),encdata);
}
function decfilenpath(filepathrelative,encfunc=(v)=>v,folderName="output"){
    var newfilepath=getDecryptedPath(filepathrelative);
    if (!fs.existsSync(ph.dirname(ph.join(folderName,newfilepath)))) {
        fs.mkdirSync(ph.dirname(ph.join(folderName,newfilepath)),{ recursive: true });
    }
    data = fs.readFileSync(filepathrelative);
    encdata = Buffer.allocUnsafe(data.length);

    for(var i=0;i<data.length;i++){
        encdata[i]=encfunc(data[i]);
    }
    fs.writeFileSync(ph.join(folderName,newfilepath),encdata);
}

var path = process.cwd()
var files = []

function getFiles(path, files){
    fs.readdirSync(path).forEach(function(file){
        var subpath = path + '/' + file;
        if(fs.lstatSync(subpath).isDirectory()){
            getFiles(subpath, files);
        } else {
            files.push(path + '/' + file);
        }
    });
    return files;
}

function encDir(path,outpath="encrypted"){
    getFiles(path,[]).forEach((v)=> encfilenpath(v,(z)=>255-z,outpath));
}
function decDir(path,outpath="decrypted"){
    getFiles(path,[]).forEach((v)=> decfilenpath(v,(z)=>255-z,outpath));
}

module.exports={encDir,decDir}


