all:
	#node ./src/crypt.js output
	node ./src/fileman.js output
testc:
	node ./src/crypt.js output

clean:
	rm -r output
