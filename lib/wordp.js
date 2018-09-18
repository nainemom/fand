const stringSearcher = require('string-search');

const combinations = (str) => {
  const fn = (active, rest, a) => {
      if (!active && !rest)
          return;
      if (!rest) {
          a.push(active);
      } else {
          fn(active + rest[0], rest.slice(1), a);
          fn(active, rest.slice(1), a);
      }
      return a;
  }
  return fn("", str, []);
}

const rearrange = (word) => {
	var words = [];
  
  if (!word || typeof word !== 'string')
  	return 'Invalid input!';

	function helper(prefix, str) {
		if (str.length === 1) {
			if (words.indexOf(prefix + str) < 0) {
				words.push(prefix + str);
			}
		} else {
			str.split('').forEach(function(letter, index) {
				var substr = str.slice(0, index) + str.slice(index + 1);
				helper(prefix + letter, substr);
			});
		}
	}

	helper('', word);
	return words;
}

const search = (dic, word) => new Promise((resolve, reject) => {
	const allPosible = [].concat(...combinations(word).map(wd => rearrange(wd)))
    const regex = allPosible.map(wd => wd.split('').map(lt => `[${lt}]`).join('+')).map(rg => `(${rg})`).join('|')
	stringSearcher.find(dic, regex).then((resultArr) => {
		const findedWords = resultArr.map(wd => wd.text.replace('\r', '')).filter((item, pos, self) => self.indexOf(item) == pos).filter(wd => wd.length <= word.length).filter(wd => {
			return wd.split('').filter(lt => word.indexOf(lt) === -1).length === 0
		})
		resolve(findedWords)
	}).catch(reject)
})
module.exports = {
  combinations,
  rearrange,
  search
}