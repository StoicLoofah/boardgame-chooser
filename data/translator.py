fin_boardgame = open('boardgame-data.csv', 'r')
boardgame_body = {}

for line in fin_boardgame:
	split = line.rstrip('\n').split(',')
	boardgame_body[split[0]] = '<h3><a href="{0}">{1}</a></h3><img src="{2}" />'.format(split[2], split[1], split[3])
		
fin_boardgame.close()


fin = open('raw-data.csv', 'r')
fout = open('temp.js', 'w')

for line in fin:
	split = line.rstrip('\n').split(',')
	choices = ''
	for i in range(2, len(split), 2):
		choices += "{{text:'{0}',target:'{1}'}},".format(split[i], split[i + 1])
	body = boardgame_body.get(split[0], split[1])
	fout.write("'{0}':{{body:'{1}',choices:[{2}]}},\n".format(split[0], body, choices))
		
fin.close()
fout.close()